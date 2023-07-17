"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class EventBus {
    constructor() {
        /** 保存 key => set 映射 */
        this.map = new Map();
    }
    on(name, handler) {
        let set = this.map.get(name);
        if (!set) {
            set = new Set();
            this.map.set(name, set);
        }
        set.add(handler);
    }
    emit(name, value) {
        const set = this.map.get(name);
        if (!set)
            return;
        const copied = [...set];
        copied.forEach((fn) => fn(value));
    }
}
// libEnd
let ctx;
let notes = [];
let animationNotes = [];
//var tick:number=0; // @deprecated @unused
let tps = 144;
let song = null;
let autoPlay = false;
let combo = 0;
let sound_hit = null;
let sound_hit_manager = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let sound_bg = null;
let base_volume = 0.2;
var points_got = 0;
var points_total = 0;
var notes_total = 0;
var max_combo = 0;
var perfect = 0;
var good = 0;
var paused = false;
var tickTimes = [];
var trueTps = 0;
var debug = true;
var startTime = Date.now();
var sec = 0;
var paused_time = 0;
const bus = new EventBus();
class Path {
    constructor(_spd) {
        this.spd = _spd;
    }
    cal(t) {
        return [0, 0];
    }
}
class StaticPath extends Path {
    constructor(_spd, _x, _y) {
        super(_spd);
        this.x = _x;
        this.y = _y;
    }
    cal(t) {
        return [this.x, this.y];
    }
}
class LinePath extends Path {
    constructor(_spd, _fx, _fy, _tx, _ty) {
        super(_spd);
        this.fx = _fx;
        this.fy = _fy;
        this.tx = _tx;
        this.ty = _ty;
    }
    cal(t) {
        return [this.fx + (this.tx - this.fx) * t, this.fy + (this.ty - this.fy) * t];
    }
}
class ArcPath extends Path {
    constructor(_spd, _cx, _cy, _fx, _fy, _tx = 1600, _ty = 900) {
        super(_spd);
        if ((_fx - _cx) ** 2 + (_fy - _cy) ** 2 - (_tx - _cx) ** 2 - (_ty - _cy) ** 2 >= 0.01) {
            throw Error(`Invalid ArcPath for(${_cx} ${_cy} ${_fx} ${_fy} ${_tx} ${_ty})`);
        }
        this.cx = _cx;
        this.cy = _cy;
        this.fromx = _fx;
        this.fromy = _fy;
        this.tox = _tx;
        this.toy = _ty;
    }
    cal(t) {
        if (t < 0) {
            return [this.fromx, this.fromy];
        }
        if (t > 1) {
            return [this.tox, this.toy];
        }
        let ba = angcalc(this.cx, this.cy, this.fromx, this.fromy);
        let ea = angcalc(this.cx, this.cy, this.tox, this.toy);
        let ca = ba + (ea - ba) * t;
        let r = Math.sqrt((this.tox - this.cx) ** 2 + (this.toy - this.cy) ** 2);
        return [Math.cos(ca) * r + this.cx, Math.sin(ca) * r + this.cy];
    }
}
class SubscriberPath extends Path {
    constructor(_p) {
        super(_p.spd);
        this.p = _p;
    }
}
class Pow2SPath extends SubscriberPath {
    constructor(_p) {
        super(_p);
    }
    cal(t) {
        return this.p.cal(t ** 2);
    }
}
class ReversePow2SPath extends SubscriberPath {
    constructor(_p) {
        super(_p);
    }
    cal(t) {
        return this.p.cal((1 - t) ** 2);
    }
}
class MultiPath extends Path {
    constructor(_ps) {
        let spdsum = 0;
        _ps.forEach(element => {
            spdsum += element.spd;
        });
        super(spdsum);
        this.ps = _ps;
        this.ssp = [];
        let nss = 0;
        this.ssp.push(0);
        _ps.forEach(element => {
            nss += element.spd;
            this.ssp.push(nss / spdsum);
        });
    }
    cal(t) {
        for (let i = 1; i < this.ssp.length; i++) {
            if (t < this.ssp[i]) {
                let nt = (t - this.ssp[i - 1]) / (this.ssp[i] - this.ssp[i - 1]);
                return this.ps[i - 1].cal(nt);
            }
        }
        return this.ps[this.ps.length - 1].cal(1);
    }
}
class Note {
    constructor(_p, _h, _t, _y, _al) {
        this.p = _p;
        this.h = _h;
        this.t = _t;
        this.y = _y;
        this.a = 0;
        this.aa = 0;
        if (this.y == "A" && _al == undefined) {
            _al = 0;
        }
        this.al = _al;
    }
}
function renderText(text, x, y, align = "left", fontSize = 50, alpha = 1) {
    ctx.fillStyle = `rgba(255,255,255,${alpha})`;
    ctx.font = `${fontSize}px 'Courier New'`;
    ctx.textAlign = align;
    ctx.fillText(text, x, y);
}
function getQueryString(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURIComponent(r[2]);
    }
    return null;
}
function angcalc(cx, cy, ax, ay) {
    if (ay == cy) {
        return Math.PI;
    }
    if (ay < cy) {
        return Math.PI / 2 - Math.atan((ax - cx) / (ay - cy)) + Math.PI;
    }
    return Math.PI / 2 - Math.atan((ax - cx) / (ay - cy));
}
function drawnote(note) {
    if ((sec - note.h + note.p.spd) / note.p.spd < 0 || (sec - note.h + note.p.spd) / note.p.spd > 1) {
        return;
    }
    let np = note.p.cal((sec - note.h + note.p.spd) / note.p.spd);
    if (note.t == "A") {
        ctx.fillStyle = "rgb(0,220,240)";
    }
    else if (note.t == "B") {
        ctx.fillStyle = "rgb(220,70,20)";
    }
    else {
        ctx.fillStyle = "rgb(64,64,64)";
    }
    ctx.beginPath();
    ctx.arc(np[0], np[1], 88, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.strokeStyle = "rgb(255,255,255)";
    ctx.beginPath();
    ctx.arc(np[0], np[1], 80, 0, Math.PI * 2, true);
    ctx.stroke();
}
function drawClackLine(note) {
    if (note.y != "A") {
        return;
    }
    if ((sec - note.h + note.p.spd) / note.p.spd < 0 || (sec - note.al - note.h + note.p.spd) / note.p.spd > 1) {
        return;
    }
    let np = note.p.cal((sec - note.h + note.p.spd) / note.p.spd);
    ctx.moveTo(...np);
    for (let i = 0; i <= note.al; i += (1 / tps)) {
        let t = (sec - i - note.h + note.p.spd) / note.p.spd;
        t = Math.max(0, t);
        t = Math.min(1, t);
        np = note.p.cal(t);
        ctx.strokeStyle = "rgb(255,255,255)";
        ctx.lineTo(...np);
    }
    ctx.stroke();
}
function drawA(note) {
    let ad = sec - note.aa;
    if (note.a == 12 && ad < note.hi) {
        let np = note.p.cal(0);
        let rc = ad / note.hi + 1;
        ctx.fillStyle = `rgba(64,64,64,${rc - 1}`;
        ctx.beginPath();
        ctx.arc(np[0], np[1], 88, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.strokeStyle = `rgba(255,255,255,${rc - 1})`;
        ctx.beginPath();
        ctx.arc(np[0], np[1], 80, 0, Math.PI * 2, true);
        ctx.stroke();
    }
    else if (note.a == 11 && ad < note.ho) {
        let np = note.p.cal(1);
        let rc = ad / note.ho + 1;
        ctx.fillStyle = `rgba(64,64,64,${2 - rc}`;
        ctx.beginPath();
        ctx.arc(np[0], np[1], 88, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.strokeStyle = `rgba(255,255,255,${2 - rc})`;
        ctx.beginPath();
        ctx.arc(np[0], np[1], 80, 0, Math.PI * 2, true);
        ctx.stroke();
    }
    else if (note.a > 0 && ad < 0.25) {
        let rc = ad / 0.25 + 1;
        let np = note.p.cal(1);
        if (note.a == 1) {
            ctx.fillStyle = `rgba(160,144,0,${2 - rc})`;
        }
        else if (note.a == 2) {
            ctx.fillStyle = `rgba(0,167,195,${2 - rc})`;
        }
        ctx.beginPath();
        ctx.arc(np[0], np[1], 88 * rc, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.strokeStyle = `rgba(255,255,255,${2 - rc})`;
        ctx.beginPath();
        ctx.arc(np[0], np[1], 80 * rc, 0, Math.PI * 2, true);
        ctx.stroke();
    }
}
function drawTexts() {
    ctx.fillStyle = "rgb(255,255,255)";
    ctx.font = "50px 'Courier New'";
    ctx.textAlign = "center";
    ctx.fillText(`${combo}`, 1600, 60);
    ctx.fillText(`COMBO`, 1600, 120);
    ctx.textAlign = "right";
    ctx.fillText(`Point: ${(points_got / points_total * 100000).toFixed(0)}`, 3150, 60);
    ctx.fillText(`Music: ${(sec / song.length * 100).toFixed(2)}%`, 3150, 120);
    if (debug) {
        trueTps = tickTimes.length;
        if ((trueTps / tps) >= 0.00) {
            ctx.fillStyle = "rgb(255,0,255)";
        }
        if ((trueTps / tps) > 0.30) {
            ctx.fillStyle = "rgb(255,0,63)";
        }
        if ((trueTps / tps) > 0.60) {
            ctx.fillStyle = "rgb(255,0,0)";
        }
        if ((trueTps / tps) > 0.90) {
            ctx.fillStyle = "rgb(255,127,0)";
        }
        if ((trueTps / tps) > 0.95) {
            ctx.fillStyle = "rgb(255,255,0)";
        }
        if ((trueTps / tps) > 0.999) {
            ctx.fillStyle = "rgb(0,255,0)";
        }
        if ((trueTps / tps) > 0.99999) {
            ctx.fillStyle = "rgb(0,255,255)";
        }
        ctx.fillText(`TPS: ${trueTps.toFixed(2)}/${tps}`, 3150, 180);
        ctx.fillStyle = "rgb(255,255,255)";
        ctx.fillText(`Sec: ${sec.toFixed(3)} Paused: ${paused_time.toFixed(3)} Total: ${((Date.now() - startTime) / 1000).toFixed(3)} Music:${sound_bg.currentTime.toFixed(3)}`, 3150, 240);
    }
}
function parsePath(n) {
    let ep = n;
    let p = new Path(0);
    switch (ep.type) {
        case "arc":
            p = new ArcPath(ep.spd, ep.c[0], ep.c[1], ep.f[0], ep.f[1], ep.t[0], ep.t[1]);
            break;
        case "line":
            p = new LinePath(ep.spd, ep.f[0], ep.f[1], ep.t[0], ep.t[1]);
            break;
        case "static":
            p = new StaticPath(ep.spd, ep.pos[0], ep.pos[1]);
            break;
        case "pow2":
            p = new Pow2SPath(parsePath(ep.p));
            break;
        case "rpow2":
            p = new ReversePow2SPath(parsePath(ep.p));
            break;
        default:
            throw Error("Invalid path type");
    }
    return p;
}
function parseSong() {
    if (song === null) {
        throw Error("Song not loaded");
    }
    song.notes.forEach(element => {
        let ps = [];
        element.paths.forEach(pe => {
            ps.push(parsePath(pe));
        });
        let p = new MultiPath(ps);
        notes.push(new Note(p, element.h, element.track, element.type, element.al));
    });
    song.animationNotes.forEach(element => {
        let ps = [];
        element.paths.forEach(pe => {
            ps.push(parsePath(pe));
        });
        let p = new MultiPath(ps);
        let n = new Note(p, element.h, "M", element.type, element.al);
        n.ho = element.ho;
        n.hi = element.hi;
        animationNotes.push(n);
    });
    points_total = song.notes.length * 100;
    notes_total = song.notes.length;
}
function nextFrame() {
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0, 0, 3200, 1800);
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        var canvas = document.getElementById('main_canvas');
        ctx = canvas.getContext('2d');
        ctx.fillStyle = "rgb(0,0,0)";
        ctx.fillRect(0, 0, 3200, 1800);
        ctx.fillStyle = "rgb(200,200,200)";
        ctx.font = "200px 'Courier New'";
        ctx.textAlign = "center";
        ctx.fillText("游戏正在加载", 1600, 900);
        bus.on("hit", function (e) {
            combo++;
            max_combo = Math.max(combo, max_combo);
            if (e == 1) {
                points_got += 100;
                perfect += 1;
            }
            else if (e == 2) {
                points_got += 75;
                good += 1;
            }
        });
        bus.on("hit", function (e) {
            for (let i = 0; i < 16; i++) {
                if (Date.now() > sound_hit_manager[i]) {
                    sound_hit[i].play();
                    sound_hit_manager[i] = Date.now() + 200;
                    console.log(`Playing hit ${i}`);
                    break;
                }
            }
        });
        bus.on("miss", function (e) {
            combo = 0;
        });
        bus.on("tick", function (e) {
            let now = Date.now();
            tickTimes.push(now);
            while (now - tickTimes[0] >= 1000) {
                tickTimes.splice(0, 1);
            }
        });
        bus.on("start", function (e) {
            startTime = Date.now() - sound_bg.currentTime * 1000;
        });
        document.addEventListener("keydown", (e) => {
            let fetched = false;
            if (e.keyCode == 65) {
                notes.forEach((element) => {
                    if (element.a || element.t != "A") {
                        return;
                    }
                    if (Math.abs(element.h - sec) <= 0.08) {
                        fetched = true;
                        element.a = 1;
                        element.aa = sec;
                        bus.emit("hit", 1);
                    }
                    else if (Math.abs(element.h - sec) <= 0.16) {
                        fetched = true;
                        element.a = 2;
                        element.aa = sec;
                        bus.emit("hit", 2);
                    }
                });
                if (!fetched) {
                    bus.emit("miss", null);
                }
            }
            if (e.keyCode == 76) {
                notes.forEach((element) => {
                    if (element.a || element.t != "B") {
                        return;
                    }
                    if (Math.abs(element.h - sec) <= 0.08) {
                        fetched = true;
                        element.a = 1;
                        element.aa = sec;
                        bus.emit("hit", 1);
                    }
                    else if (Math.abs(element.h - sec) <= 0.16) {
                        fetched = true;
                        element.a = 2;
                        element.aa = sec;
                        bus.emit("hit", 2);
                    }
                });
                if (!fetched) {
                    bus.emit("miss", null);
                }
            }
        });
        document.addEventListener("keyup", (e) => {
            if (e.keyCode == 65) {
                notes.forEach((element) => {
                    if (element.a <= 0 || element.t != "A" || element.y != "A") {
                        return;
                    }
                    if (element.h + element.al - sec > 0 && element.h - sec < 0) {
                        points_got -= element.a == 1 ? 100 : 75;
                        if (element.a == 1) {
                            perfect--;
                        }
                        else {
                            good--;
                        }
                        element.a = -1;
                        element.aa = 0;
                        bus.emit("miss", null);
                    }
                });
            }
            if (e.keyCode == 76) {
                notes.forEach((element) => {
                    if (element.a <= 0 || element.t != "B" || element.y != "A") {
                        return;
                    }
                    if (element.h + element.al - sec > 0 && element.h - sec < 0) {
                        points_got -= element.a == 1 ? 100 : 75;
                        if (element.a == 1) {
                            perfect--;
                        }
                        else {
                            good--;
                        }
                        element.a = -1;
                        element.aa = 0;
                        bus.emit("miss", null);
                    }
                });
            }
        });
        let id = getQueryString("id");
        if (id == null) {
            ctx.fillStyle = "rgb(0,0,0)";
            ctx.fillRect(0, 0, 3200, 1800);
            ctx.fillStyle = "rgb(200,200,200)";
            ctx.fillText("游戏加载错误，请尝试刷新", 1600, 900);
            throw new Error("No data file given.");
        }
        yield fetch(`./${id}.json`).then((response) => __awaiter(this, void 0, void 0, function* () { return song = yield response.json(); }));
        if (song == undefined) {
            ctx.fillStyle = "rgb(0,0,0)";
            ctx.fillRect(0, 0, 3200, 1800);
            ctx.fillStyle = "rgb(200,200,200)";
            ctx.fillText("游戏加载错误，请尝试刷新", 1600, 900);
            throw new Error("Data file has nothing or corrupted or not exist.");
        }
        if (song.script) {
            yield fetch(`./${song.script}`).then((response) => __awaiter(this, void 0, void 0, function* () { return eval(yield response.text()); }));
        }
        sound_hit = [];
        for (let i = 0; i < 16; i++) {
            sound_hit.push(new Audio("./hit.mp3"));
        }
        if (song.bgsound) {
            sound_bg = new Audio(song.bgsound);
        }
        else {
            sound_bg = new Audio("./blank.mp3");
        }
        if (navigator.userAgent == "")
            yield new Promise((r) => { let t = setInterval(() => { if (sound_hit[0].readyState == HTMLMediaElement.HAVE_ENOUGH_DATA && sound_bg.readyState == HTMLMediaElement.HAVE_ENOUGH_DATA) {
                clearInterval(t);
                r(null);
            } }, 10); });
        sound_bg.volume = 0.5 * base_volume;
        sound_hit.forEach(e => {
            e.volume = 1 * base_volume;
        });
        parseSong();
        ctx.fillStyle = "rgb(0,0,0)";
        ctx.fillRect(0, 0, 3200, 1800);
        //let centerNote=new Note(new StaticPath(3600,1600,900),3600); 
        /*
        notes.push(new Note(new ArcPath(1,780,-200,-40,900),3));
        notes.push(new Note(new ArcPath(1,780,-200,-40,900),4));
        notes.push(new Note(new ArcPath(1,780,-200,-40,900),4.5));
        notes.push(new Note(new ArcPath(1,780,-200,-40,900),5));
        */
        //drawnote(new Note(new StaticPath(800,450),0,3600));
        let timer = setInterval(() => { if (sound_bg.currentTime > 0) {
            clearInterval(timer);
            bus.emit("start", null);
        } }, 1);
        sound_bg.play().catch(e => { alert("请打开“允许音频自动播放”，然后刷新"); });
        bus.on("start", () => {
            let mainTimer = setInterval(function () {
                return __awaiter(this, void 0, void 0, function* () {
                    if (paused) {
                        paused_time = (Date.now() - startTime) / 1000 - sec;
                        return;
                    }
                    nextFrame();
                    sec = (Date.now() - startTime) / 1000 - paused_time;
                    bus.emit("tick", sec);
                    animationNotes.forEach(element => {
                        if (element.a == 12 && sec - element.aa > element.hi) {
                            element.a = 0;
                            element.aa = 0;
                        }
                        else if (Math.abs(element.h - sec) <= 1.5 / tps) {
                            if (element.ho) {
                                element.a = 11;
                                element.aa = sec;
                            }
                        }
                        else if (element.hi != undefined && Math.abs((element.h - element.p.spd - element.hi) - sec) <= 1.5 / tps) {
                            element.a = 12;
                            element.aa = sec;
                        }
                        drawnote(element);
                        drawA(element);
                    });
                    notes.forEach(element => {
                        drawClackLine(element);
                    });
                    notes.forEach(element => {
                        if (autoPlay && !element.a && (Math.abs(element.h - sec) < 1.5 / tps)) {
                            element.a = 1;
                            element.aa = sec;
                            bus.emit("hit", 1);
                        }
                        else if ((sec - element.h) > 0.16 && !element.a) {
                            element.a = -1;
                            bus.emit("miss", null);
                        }
                        drawnote(element);
                    });
                    notes.forEach(element => {
                        drawA(element);
                    });
                    drawTexts();
                    if (sec >= song.length) {
                        clearInterval(mainTimer);
                        paused = true;
                        location.replace(`./finish.html?i=${id}&c=${max_combo}&t=${(points_got / points_total * 100000).toFixed(0)}&p=${perfect}&g=${good}&m=${notes_total - perfect - good}`);
                    }
                });
            }, 1000 / tps);
        });
    });
}
