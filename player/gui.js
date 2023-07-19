import { tps } from "../player.js";
class EnhancedContent {
    constructor(ctx) {
        this.backGroundColor = "rgba(0,0,0,0)";
        this.size = [300, 150];
        this.ctx = ctx;
        this.size = [parseInt(this.ctx.canvas.getAttribute("width") || "300"), parseInt(this.ctx.canvas.getAttribute("height") || "150")];
    }
    setBackGroundColor(color) {
        this.backGroundColor = color;
    }
    clear() {
        this.ctx.fillStyle = this.backGroundColor;
        this.ctx.clearRect(0, 0, ...this.size);
        this.ctx.fillRect(0, 0, ...this.size);
    }
    render(obj) {
        obj.drawOnCtx(this.ctx);
    }
}
class CanvasObject {
}
class NoteCanvasObject {
    constructor(x = -100, y = -100, f = new RGBAColor(64, 64, 64), r = 88) {
        this.x = -100;
        this.y = -100;
        this.f = new RGBAColor(64, 64, 64);
        this.r = 88;
        this.x = x;
        this.y = y;
        this.f = f;
        this.r = r;
    }
    drawOnCtx(ctx) {
        ctx.fillStyle = `rgba(${this.f.getColor()[0]},${this.f.getColor()[1]},${this.f.getColor()[2]},${this.f.getColor()[3]})`;
        ctx.beginPath();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.strokeStyle = `rgba(255,255,255,${this.f.getColor()[3]})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r / 1.1, 0, Math.PI * 2, true);
        ctx.stroke();
    }
}
class ClackLineCanvasObject {
    constructor(p, fp, tp) {
        this.p = p;
        this.fp = fp;
        this.tp = tp;
    }
    drawOnCtx(ctx) {
        if (this.tp < 0 || this.fp > 1) {
            return;
        }
        if (this.tp > 1) {
            this.tp = 1;
        }
        if (this.fp < 0) {
            this.fp = 0;
        }
        let np = this.p.cal(this.tp);
        ctx.moveTo(...np);
        for (let i = this.tp; i >= this.fp; i += (this.fp - this.tp) / tps) {
            np = this.p.cal(i);
            ctx.strokeStyle = "rgb(255,255,255)";
            ctx.lineTo(...np);
        }
        ctx.stroke();
    }
}
class TextCanvasObject {
    constructor(text, x, y, align = "left", fontSize = 50, fill = new RGBAColor(255, 255, 255)) {
        this.text = text;
        this.x = x;
        this.y = y;
        this.align = align;
        this.fontSize = fontSize;
        this.fill = fill;
    }
    drawOnCtx(ctx) {
        ctx.fillStyle = `rgba(${this.fill.getColor()[0]},${this.fill.getColor()[1]},${this.fill.getColor()[2]},${this.fill.getColor()[3]})`;
        ctx.font = `${(this.fontSize)}px 'Courier New'`;
        ctx.textAlign = this.align;
        ctx.fillText(this.text, this.x, this.y);
    }
}
class RGBAColor {
    constructor(r, g, b, a = 1) {
        this.c = [0, 0, 0, 1];
        this.c = [r, g, b, a];
    }
    getColor() {
        return this.c;
    }
}
export { EnhancedContent, CanvasObject, NoteCanvasObject, ClackLineCanvasObject, TextCanvasObject, RGBAColor };
