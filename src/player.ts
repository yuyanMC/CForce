import "./style/player.css";
import hit from "./sounds/hit.mp3";
import blank from "./sounds/blank.mp3";

import {ClackLineCanvasObject, EnhancedContent, NoteCanvasObject, RGBAColor, TextCanvasObject} from './player/gui';
import {EventBus} from "./player/event";
import {Chart, JChart, Note} from "./player/chart";
import {getQueryString,setQueryString} from "./player/util";
import {DynamicJsonLoader, DynamicLoader, DynamicScriptLoader} from "./player/network";
import {EnhancedAudioContext, SoundManager} from "./player/sound";

let imageLoader:DynamicLoader=new DynamicLoader("images");
let soundLoader:DynamicLoader=new DynamicLoader("sounds");
let chartLoader:DynamicJsonLoader=new DynamicJsonLoader("charts");
let scriptLoader:DynamicScriptLoader=new DynamicScriptLoader("scripts");
let ctx: CanvasRenderingContext2D;
let chart: Chart;
let tps: number = 60;
let autoPlay: boolean = false;
let combo: number = 0;
/*
let hitSounds: Array<HTMLAudioElement> | null = null;
let hitSoundManager: Array<number> = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let backgroundMusic: HTMLAudioElement | null = null;
*/
let hitSoundManager:SoundManager;
let backgroundMusic:EnhancedAudioContext;
let hitVolume:number = 0.2;
let backgroundVolume:number = 0.1;
let pointsGot = 0;
let maxCombo = 0;
let perfect = 0;
let good = 0;
let paused = false;
let tickTimes: number[] = [];
let debug = true;
let startTime:number;
let sec :number;
let pausedTime = 0;
let ec: EnhancedContent;
let bus = new EventBus<{
    hit: number,
    miss: null,
    tick: number,
    start: null,
}>();

function renderText(text: string, x: number, y: number, align: CanvasTextAlign = "left", fontSize: number = 50, fill: RGBAColor | number = new RGBAColor(255, 255, 255)) {
    ec.render(new TextCanvasObject(text, x, y, align, fontSize, fill instanceof RGBAColor ? fill : new RGBAColor(255, 255, 255, fill)));
}

function drawNote(note: Note) {
    if ((sec - note.h + note.p.spd) / note.p.spd < 0 || (sec - note.h + note.p.spd) / note.p.spd > 1) {
        return;
    }
    let np = note.p.cal((sec - note.h + note.p.spd) / note.p.spd);
    let c: RGBAColor;
    if (note.t == "A") {
        c = new RGBAColor(0, 220, 240);
    } else if (note.t == "B") {
        c = new RGBAColor(220, 70, 20);
    } else {
        c = new RGBAColor(note.f[0], note.f[1], note.f[2]);
    }
    ec.render(new NoteCanvasObject(...np, c));
}

function drawClackLine(note: Note) {
    if (note.y != "A") {
        return;
    }
    if ((sec - note.h + note.p.spd) / note.p.spd < 0 || (sec - note.al! - note.h + note.p.spd) / note.p.spd > 1) {
        return;
    }
    ec.render(new ClackLineCanvasObject(note.p, (sec - note.al! - note.h + note.p.spd) / note.p.spd, (sec - note.h + note.p.spd) / note.p.spd))
}

function drawA(note: Note) {
    let ad = sec - note.aa;
    if (note.a == 12 && ad < note.hi!) {
        let np = note.p.cal(0);
        let rc = ad / note.hi! + 1;
        let c = new RGBAColor(note.f[0], note.f[1], note.f[2], rc - 1);
        ec.render(new NoteCanvasObject(...np, c));
    } else if (note.a == 11 && ad < note.ho!) {
        let np = note.p.cal(1);
        let rc = ad / note.ho! + 1;
        let c = new RGBAColor(note.f[0], note.f[1], note.f[2], 2 - rc);
        ec.render(new NoteCanvasObject(...np, c));
    } else if (note.a > 0 && ad < 0.25) {
        let rc = ad / 0.25 + 1;
        let np = note.p.cal(1);
        let c: RGBAColor = new RGBAColor(0, 0, 0, 0);
        if (note.a == 1) {
            c = new RGBAColor(160, 144, 0, 2 - rc);
        } else if (note.a == 2) {
            c = new RGBAColor(0, 167, 195, 2 - rc);
        }
        ec.render(new NoteCanvasObject(...np, c, rc * 88));
    }
}

function drawTexts() {
    ctx.fillStyle = "rgb(255,255,255)";
    ctx.font = "50px 'Courier New'";
    ctx.textAlign = "center";
    renderText(`${combo}`, 1600, 60, "center");
    renderText(`COMBO`, 1600, 120, "center");
    renderText(`Point: ${(pointsGot / chart.notesTotal / 100 * 100000).toFixed(0)}`, 3150, 60, "right");
    renderText(`Music: ${(sec / chart.length * 100).toFixed(2)}%`, 3150, 120, "right");
    if (debug) {
        let trueTps = tickTimes.length;
        let c = new RGBAColor(255, 0, 255);
        if ((trueTps / tps) >= 0.00) {
            c = new RGBAColor(255, 0, 255);
        }
        if ((trueTps / tps) > 0.30) {
            c = new RGBAColor(255, 0, 63);
        }
        if ((trueTps / tps) > 0.60) {
            c = new RGBAColor(255, 0, 0);
        }
        if ((trueTps / tps) > 0.90) {
            c = new RGBAColor(255, 127, 0);
        }
        if ((trueTps / tps) > 0.95) {
            c = new RGBAColor(255, 255, 0);
        }
        if ((trueTps / tps) > 0.999) {
            c = new RGBAColor(0, 255, 0);
        }
        if ((trueTps / tps) > 0.99999) {
            c = new RGBAColor(0, 255, 255);
        }
        renderText(`TPS: ${trueTps.toFixed(0)}/${tps}`, 3150, 180, "right", 50, c);
        renderText(`Sec: ${sec.toFixed(3)} Paused: ${pausedTime.toFixed(3)} Total: ${((Date.now() - startTime) / 1000).toFixed(3)} Music: ${backgroundMusic.actx.currentTime.toFixed(3)}`, 3150, 240, "right");
    }
}

function nextFrame() {
    ec.clear();
}

async function main() {
    let id = getQueryString("id");
    document.getElementById("canvas_box")!.style.backgroundImage = `url(${(await imageLoader.loadAsUrl(`${id}.png`).catch(() => {return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIW2P4DwQACfsD/Z8fLAAAAAAASUVORK5CYII="}))})`;
    let canvas: HTMLCanvasElement = document.getElementById('main_canvas') as HTMLCanvasElement;
    ctx = canvas.getContext('2d')!;
    ec = new EnhancedContent(ctx);
    ec.setBackGroundColor("rgba(0,0,0,0.5)");
    ec.clear();
    renderText("游戏正在加载", 1600, 900, "center", 200, new RGBAColor(200, 200, 200));
    bus.on("hit", function (e) {
        combo++;
        maxCombo = Math.max(combo, maxCombo);
        if (e == 1) {
            pointsGot += 100;
            perfect += 1;
        } else if (e == 2) {
            pointsGot += 75;
            good += 1;
        }
    });
    bus.on("hit", ()=> {
        hitSoundManager.play();
    });
    bus.on("miss", () => {
        combo = 0;
    });
    bus.on("tick", () => {
        let now = Date.now();
        tickTimes.push(now);
        while (now - tickTimes[0] >= 1000) {
            tickTimes.splice(0, 1);
        }
    });
    bus.on("start", () => {
        startTime = Date.now() - backgroundMusic.actx.currentTime * 1000;
    })
    document.addEventListener("keydown", (e) => {
        let fetched = false;
        if (e.keyCode == 65) {
            chart.notes.forEach((element) => {
                if (fetched) {
                    return;
                }
                if (element.a || element.t != "A") {
                    return;
                }
                if (Math.abs(element.h - sec) <= 0.08) {
                    fetched = true;
                    element.a = 1;
                    element.aa = sec;
                    bus.emit("hit", 1);
                } else if (Math.abs(element.h - sec) <= 0.16) {
                    fetched = true;
                    element.a = 2;
                    element.aa = sec;
                    bus.emit("hit", 2);
                }
            });
        }
        if (e.keyCode == 76) {
            chart.notes.forEach((element) => {
                if (fetched) {
                    return;
                }
                if (element.a || element.t != "B") {
                    return;
                }
                if (Math.abs(element.h - sec) <= 0.08) {
                    fetched = true;
                    element.a = 1;
                    element.aa = sec;
                    bus.emit("hit", 1);
                } else if (Math.abs(element.h - sec) <= 0.16) {
                    fetched = true;
                    element.a = 2;
                    element.aa = sec;
                    bus.emit("hit", 2);
                }
            });
        }
    });
    document.addEventListener("keyup", (e) => {
        if (e.keyCode == 65) {
            chart.notes.forEach((element) => {
                if (element.a <= 0 || element.t != "A" || element.y != "A") {
                    return;
                }
                if (element.h + element.al! - sec > 0 && element.h - sec < 0) {
                    pointsGot -= element.a == 1 ? 100 : 75;
                    if (element.a == 1) {
                        perfect--;
                    } else {
                        good--;
                    }
                    element.a = -1;
                    element.aa = 0;
                    bus.emit("miss", null);
                }
            });
        }
        if (e.keyCode == 76) {
            chart.notes.forEach((element) => {
                if (element.a <= 0 || element.t != "B" || element.y != "A") {
                    return;
                }
                if (element.h + element.al! - sec > 0 && element.h - sec < 0) {
                    pointsGot -= element.a == 1 ? 100 : 75;
                    if (element.a == 1) {
                        perfect--;
                    } else {
                        good--;
                    }
                    element.a = -1;
                    element.aa = 0;
                    bus.emit("miss", null);
                }
            });
        }
    });
    if (id == null) {
        ec.clear();
        renderText("游戏加载错误，请尝试刷新", 1600, 900, "center", 200, new RGBAColor(200, 200, 200));
        throw new Error("No data file given.");
    }
    let song:JChart;
    await chartLoader.loadAsJson(`${id}.json`).then(async (response) => song = response.default);
    if (song == undefined) {
        ec.clear();
        renderText("游戏加载错误，请尝试刷新", 1600, 900, "center", 200, new RGBAColor(200, 200, 200));
        throw new Error("Data file has nothing or corrupted or not exist.");
    }
    if (song.script) {
        await scriptLoader.inject(song.script);
    }
    ec.clear();
    renderText("点击屏幕开始", 1600, 900, "center", 200, new RGBAColor(230, 230, 230));
    await new Promise((resolve)=>{document.onclick=()=>{document.onclick=null;resolve(null);}});
    hitSoundManager=new SoundManager(hit);
    backgroundMusic=new EnhancedAudioContext(new AudioContext());
    await backgroundMusic.actx.suspend();
    await hitSoundManager.load();
    if (song.bgsound) {
        await backgroundMusic.load(await soundLoader.loadAsUrl(song.bgsound));
    } else {
        await backgroundMusic.load(blank);
    }
    backgroundMusic.setVolume(backgroundVolume);
    hitSoundManager.setVolume(hitVolume);
    chart=new Chart(song);
    bus.on("start", () => {
        let mainTimer = setInterval(async function () {
            if (paused) {
                pausedTime = (Date.now() - startTime) / 1000 - sec;
                return;
            }
            nextFrame();
            sec = (Date.now() - startTime) / 1000 - pausedTime;
            bus.emit("tick", sec);
            chart.animationNotes.forEach(element => {
                if (element.a == 12 && sec - element.aa > element.hi!) {
                    element.a = 0;
                    element.aa = 0;
                } else if (Math.abs(element.h - sec) <= 1.5 / tps) {
                    if (element.ho) {
                        element.a = 11;
                        element.aa = sec;
                    }
                } else if (element.hi != undefined && Math.abs((element.h - element.p.spd - element.hi) - sec) <= 1.5 / tps) {
                    element.a = 12;
                    element.aa = sec;
                }
                drawNote(element);
                drawA(element);
            });
            chart.notes.forEach(element => {
                drawClackLine(element);
            });
            chart.notes.forEach(element => {
                if (autoPlay && !element.a && (Math.abs(element.h - sec) < 1.5 / tps)) {
                    element.a = 1;
                    element.aa = sec;
                    bus.emit("hit", 1);
                } else if ((sec - element.h) > 0.16 && !element.a) {
                    element.a = -1;
                    bus.emit("miss", null);
                }
                drawNote(element);
            });
            chart.notes.forEach(element => {
                drawA(element);
            });
            drawTexts();
            if (sec >= song!.length) {
                clearInterval(mainTimer);
                paused = true;
                location.replace(`./finish.html${setQueryString({i:id,c:maxCombo,t:(pointsGot / chart.notesTotal / 100 * 100000).toFixed(0),p:perfect,g:good,m:chart.notesTotal - perfect - good})}`);
            }
        }, 1000 / tps);
    });
    ec.clear();
    await backgroundMusic.actx.resume();
    backgroundMusic.play();
    bus.emit("start",null);
}

if(debug){
    globalThis.cinject=(k:string,v:any)=>{
        eval(`${k}=${v}`);
    }
}

window.onload = main;
export {bus, renderText, drawNote, ctx, drawA, drawClackLine, tps, paused, sec};