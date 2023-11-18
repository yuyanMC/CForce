import {calculateAngle} from '../player/util';

class Chart {
    readonly notes: Note[];
    readonly animationNotes: Note[];
    readonly length: number;

    constructor(jChart: JChart) {
        this.notes = [];
        this.animationNotes = [];
        jChart.notes.forEach(element => {
            let ps: Array<Path> = [];
            element.paths.forEach(pe => {
                ps.push(Chart.parsePath(pe));
            });
            let p: Path = new MultiPath(ps);
            if (element.type !== "I") {
                this.notes.push(new Note(p, element.h, element.track, element.type, element.al, element.track == "A" ? [0, 220, 240] : [220, 70, 20]));
            } else {
                this.notes.push(new Note(p, element.h, element.track, element.type, 0, element.track == "A" ? [0, 220, 240] : [220, 70, 20]));
            }
        });
        jChart.animationNotes.forEach(element => {
            let ps: Array<Path> = [];
            element.paths.forEach(pe => {
                ps.push(Chart.parsePath(pe));
            });
            let p: Path = new MultiPath(ps);
            let n: Note;
            if (element.type !== "I") {
                n = new Note(p, element.h, "M", element.type, element.al, element.fill);
            } else {
                n = new Note(p, element.h, "M", element.type, undefined, element.fill);
            }
            n.ho = element.ho;
            n.hi = element.hi;
            this.animationNotes.push(n);
        });
        this.length = jChart.length;
    }

    private static parsePath(n: JPath) {
        let ep = n;
        let p: Path = new Path(0);
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
                p = new Pow2SPath(Chart.parsePath(ep.p), ep.f, ep.t);
                break;
            default:
                throw Error("Invalid path type");
        }
        return p;
    }
}

class Path {
    spd: number;

    constructor(_spd: number) {
        this.spd = _spd;
    }

    cal(t: number): [number, number] {
        return [0, 0];
    }
}

class StaticPath extends Path {
    x: number;
    y: number;

    constructor(_spd: number, _x: number, _y: number) {
        super(_spd);
        this.x = _x;
        this.y = _y;
    }

    cal(t: number): [number, number] {
        return [this.x, this.y];
    }
}

class LinePath extends Path {
    fx: number;
    fy: number;
    tx: number;
    ty: number;

    constructor(_spd: number, _fx: number, _fy: number, _tx: number, _ty: number) {
        super(_spd);
        this.fx = _fx;
        this.fy = _fy;
        this.tx = _tx;
        this.ty = _ty;
    }

    cal(t: number): [number, number] {
        return [this.fx + (this.tx - this.fx) * t, this.fy + (this.ty - this.fy) * t];
    }
}

class ArcPath extends Path {
    cx: number;
    cy: number;
    fromx: number;
    fromy: number;
    tox: number;
    toy: number;

    constructor(_spd: number, _cx: number, _cy: number, _fx: number, _fy: number, _tx = 1600, _ty = 900) {
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

    cal(t: number): [number, number] {
        if (t < 0) {
            return [this.fromx, this.fromy];
        }
        if (t > 1) {
            return [this.tox, this.toy];
        }
        let ba = calculateAngle(this.cx, this.cy, this.fromx, this.fromy);
        let ea = calculateAngle(this.cx, this.cy, this.tox, this.toy);
        let ca = ba + (ea - ba) * t;
        let r = Math.sqrt((this.tox - this.cx) ** 2 + (this.toy - this.cy) ** 2);
        return [Math.cos(ca) * r + this.cx, Math.sin(ca) * r + this.cy];
    }
}

class SubscriberPath extends Path {
    p: Path;

    constructor(_p: Path) {
        super(_p.spd);
        this.p = _p;
    }
}

class Pow2SPath extends SubscriberPath {
    f: number;
    t: number

    constructor(_p: Path, f: number = 0, t: number = 1) {
        super(_p);
        this.f = f;
        this.t = t;
    }

    cal(t: number): [number, number] {
        return this.p.cal((this.f + (this.t - this.f) * t) ** 2);
    }
}

class MultiPath implements Path {
    ps: Array<Path>;

    constructor(_ps: Array<Path>) {
        this.ps = _ps;
    }

    cal(t: number): [number, number] {
        for (let i = 1; i < this.ssp.length; i++) {
            if (t < this.ssp[i]) {
                let nt = (t - this.ssp[i - 1]) / (this.ssp[i] - this.ssp[i - 1]);
                return this.ps[i - 1].cal(nt);
            }
        }
        return this.ps[this.ps.length - 1].cal(1);
    }

    get ssp(): Array<number> {
        let sp = [];
        let nss = 0;
        sp.push(0);
        this.ps.forEach(element => {
            nss += element.spd;
            sp.push(nss / this.spd);
        });
        return sp;
    }

    get spd(): number {
        let spdsum = 0;
        this.ps.forEach(element => {
            spdsum += element.spd;
        });
        return spdsum;
    }
}

class Note {
    p: Path;
    h: number;
    a: number;
    aa: number;
    ho: number | undefined;
    hi: number | undefined;
    t: "A" | "B" | "M";
    y: "I" | "A";
    al?: number;
    private _f: [number, number, number];

    constructor(_p: Path, _h: number, _t: "A" | "B" | "M", _y: "I" | "A", _al?: number, _f?: [number, number, number]) {
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
        this._f = _f ? _f : [64, 64, 64];
    }

    get f() {
        return this.t == "A" ? [0, 220, 240] : this.t == "B" ? [220, 70, 20] : this._f;
    }

    set f(n: [number, number, number]) {
        this._f = n;
    }
}

type JChart = {
    notes: JNote[];
    animationNotes: JAnimationNote[];
    length: number;
}
type JNote = JClickNote | JClackNote;
type JClickNote = {
    track: "A" | "B";
    type: "I";
    paths: JPath[];
    h: number;
}
type JClackNote = {
    track: "A" | "B";
    type: "A";
    paths: JPath[];
    h: number;
    al: number;
}
type JAnimationNote = JClickAnimationNote | JClackAnimationNote;
type JClickAnimationNote = {
    type: "I";
    paths: JPath[];
    h: number;
    hi?: number;
    ho?: number;
    fill?: [number, number, number];
}
type JClackAnimationNote = {
    type: "A";
    paths: JPath[];
    h: number;
    al: number;
    hi?: number;
    ho?: number;
    fill?: [number, number, number];
}
type JPath = JStaticPath | JLinePath | JArcPath | JPow2Path;
type JStaticPath = {
    type: "static";
    pos: [number, number];
    spd: number;
}
type JLinePath = {
    type: "line";
    f: [number, number];
    t: [number, number];
    spd: number;
}
type JArcPath = {
    type: "arc";
    c: [number, number];
    f: [number, number];
    t: [number, number];
    spd: number;
}
type JPow2Path = {
    type: "pow2";
    p: JPath;
    f: number;
    t: number;
}
export {Chart, Path, Note, MultiPath, StaticPath, LinePath, ArcPath, Pow2SPath, SubscriberPath};
export type {JChart, JPath, JNote, JAnimationNote};