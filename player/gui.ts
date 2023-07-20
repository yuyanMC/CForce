import {Path, tps} from "../player.js";

class EnhancedContent{
    private ctx: CanvasRenderingContext2D;
    private backGroundColor: string | CanvasGradient | CanvasPattern = "rgba(0,0,0,0)";
    private size: [number,number]=[300,150];
    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
        this.size=[parseInt(this.ctx.canvas.getAttribute("width")||"300"),parseInt(this.ctx.canvas.getAttribute("height")||"150")];
    }

    public setBackGroundColor(color: string | CanvasGradient | CanvasPattern){
        this.backGroundColor=color;
    }

    public clear(){
        this.ctx.fillStyle=this.backGroundColor;
        this.ctx.clearRect(0,0,...this.size);
        this.ctx.fillRect(0,0,...this.size);
    }

    public render(obj:CanvasObject){
        obj.drawOnCtx(this.ctx);
    }
}
abstract class CanvasObject{
    public abstract drawOnCtx(ctx:CanvasRenderingContext2D):void;
}
class NoteCanvasObject implements CanvasObject{
    private x:number=-100;
    private y:number=-100;
    private f:RGBAColor=new RGBAColor(64,64,64);
    private r:number=88;
    public constructor(x=-100,y=-100,f=new RGBAColor(64,64,64),r=88) {
        this.x=x;
        this.y=y;
        this.f=f;
        this.r=r;
    }

    drawOnCtx(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle=`rgba(${this.f.getColor()[0]},${this.f.getColor()[1]},${this.f.getColor()[2]},${this.f.getColor()[3]})`;
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.r,0, Math.PI * 2, true);
        ctx.fill();
        ctx.lineWidth=2;
        ctx.strokeStyle=`rgba(255,255,255,${this.f.getColor()[3]})`;
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.r/1.1,0, Math.PI * 2, true);
        ctx.stroke();
    }

}

class ClackLineCanvasObject implements CanvasObject{
    private p: Path;
    private fp: number;
    private tp: number;
    constructor(p:Path,fp:number,tp:number) {
        this.p=p;
        this.fp=fp;
        this.tp=tp;
    }

    drawOnCtx(ctx: CanvasRenderingContext2D): void {
        if(this.tp<0||this.fp>1){
            return;
        }
        if(this.tp>1){
            this.tp=1;
        }
        if(this.fp<0){
            this.fp=0;
        }
        let np=this.p.cal(this.tp);
        ctx.lineWidth=5;
        ctx.beginPath();
        ctx.moveTo(...np);
        for(let i=this.tp;i>=this.fp&&i<=this.tp;i+=(this.fp-this.tp)/tps){
            np=this.p.cal(i);
            ctx.strokeStyle="rgb(255,255,255)"
            ctx.lineTo(...np);
        }
        ctx.stroke();
    }
}

class TextCanvasObject implements CanvasObject{
    private text: string;
    private x: number;
    private y: number;
    private align: CanvasTextAlign;
    private fontSize: number;
    private fill: RGBAColor;
    public constructor(text:string,x:number,y:number,align:CanvasTextAlign="left",fontSize:number=50,fill:RGBAColor=new RGBAColor(255,255,255)) {
        this.text=text;
        this.x=x;
        this.y=y;
        this.align=align;
        this.fontSize=fontSize;
        this.fill=fill;
    }
    drawOnCtx(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle=`rgba(${this.fill.getColor()[0]},${this.fill.getColor()[1]},${this.fill.getColor()[2]},${this.fill.getColor()[3]})`;
        ctx.font=`${(this.fontSize)}px 'Courier New'`;
        ctx.textAlign=this.align;
        ctx.fillText(this.text,this.x,this.y);
    }

}

class RGBAColor{
    private c:[number,number,number,number]=[0,0,0,1];
    public constructor(r: number, g: number, b: number, a:number=1) {
        this.c=[r,g,b,a];
    }
    public getColor(){
        return this.c;
    }
}

export {EnhancedContent,CanvasObject,NoteCanvasObject,ClackLineCanvasObject,TextCanvasObject,RGBAColor};