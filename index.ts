// libEvent
type Handler<T = any> = (val: T) => void;

class EventBus<Events extends Record<string, any>> {
  /** 保存 key => set 映射 */
  private map: Map<string, Set<Handler>> = new Map();
  
  on<EventName extends keyof Events>(
    name: EventName,
    handler: Handler<Events[EventName]>
  ) {
    let set: Set<Handler<Events[EventName]>> | undefined = this.map.get(
      name as string
    );
    if (!set) {
      set = new Set();
      this.map.set(name as string, set);
    }
    set.add(handler);
  }
  emit<EventName extends keyof Events>(
    name: EventName,
    value: Events[EventName]
  ) {
    const set: Set<Handler<Events[EventName]>> | undefined = this.map.get(
      name as string
    );
    if (!set) return;
    const copied = [...set];
    copied.forEach((fn) => fn(value)); 
  }
}
// libEnd

var ctx:CanvasRenderingContext2D;
var notes:Array<Note>=new Array();
var tick:number=0;
var tps:number=100;
var song:{notes:Array<{paths:Array<IPath>,h:number}>,bgsound:string}|null=null;
var autoPlay:boolean=false;
var combo:number=0;
var sound_hit:HTMLAudioElement|null=null;
var sound_bg:HTMLAudioElement|null=null;
var base_volume=0.2;
const bus = new EventBus<{
    hit: number,
    miss: null,
}>();
interface IPath{
    type:string;
    spd:number;
    //Arc
    c?:[number,number];
    f?:[number,number];
    t?:[number,number];
    //Static
    x?:number;
    y?:number;
    //Subscriber
    p?:IPath;
}
class Path{
    spd:number;
    constructor(_spd) {
        this.spd=_spd;
    }
    cal(t: number){
        return [0,0];
    }
}
class StaticPath extends Path{
    x:number;
    y:number;
    constructor(_spd,_x: number,_y: number){
        super(_spd);
        this.x=_x;
        this.y=_y;
    }
    cal(t: number){
        return [this.x,this.y];
    }
}
class ArcPath extends Path{
    cx:number;
    cy:number;
    fromx:number;
    fromy:number;
    tox:number;
    toy:number;
    constructor(_spd,_cx: number,_cy: number,_fx: number,_fy: number,_tx=1600,_ty=900){
        super(_spd);
        if((_fx-_cx)**2+(_fy-_cy)**2-(_tx-_cx)**2-(_ty-_cy)**2>=0.01){
            throw Error(`Invalid ArcPath for(${_cx} ${_cy} ${_fx} ${_fy} ${_tx} ${_ty})`);
        }
        this.cx=_cx;
        this.cy=_cy;
        this.fromx=_fx;
        this.fromy=_fy;
        this.tox=_tx;
        this.toy=_ty;
    }
    cal(t: number){
        if(t<0){
            return [this.fromx,this.fromy];
        }
        if(t>1){
            return [this.tox,this.toy];
        }
        let ba=angcalc(this.cx,this.cy,this.fromx,this.fromy);
        let ea=angcalc(this.cx,this.cy,this.tox,this.toy);
        let ca=ba+(ea-ba)*t;
        let r=Math.sqrt((this.tox-this.cx)**2+(this.toy-this.cy)**2);
        return [Math.cos(ca)*r+this.cx,Math.sin(ca)*r+this.cy];
    }
}
class SubscriberPath extends Path{
    p:Path;
    constructor(_p){
        super(_p.spd);
        this.p=_p;
    }
}
class Pow2SPath extends SubscriberPath{
    constructor(_p){
        super(_p);
    }
    cal(t: number): number[] {
        return this.p.cal(t**2)
    }
}
class ReversePow2SPath extends SubscriberPath{
    constructor(_p){
        super(_p);
    }
    cal(t: number): number[] {
        return this.p.cal((1-t)**2)
    }
}
class MultiPath extends Path{
    ps:Array<Path>;
    ssp:Array<number>;
    constructor(_ps:Array<Path>){
        let spdsum=0;
        _ps.forEach(element => {
            spdsum+=element.spd;
        });
        super(spdsum);
        this.ps=_ps;
        this.ssp=[];
        let nss=0;
        this.ssp.push(0);
        _ps.forEach(element => {
            nss+=element.spd;
            this.ssp.push(nss/spdsum);
        });
    }
    cal(t: number): number[] {
        for(let i=1;i<this.ssp.length;i++){
            if(t<this.ssp[i]){
                let nt=(t-this.ssp[i-1])/(this.ssp[i]-this.ssp[i-1]);
                return this.ps[i-1].cal(nt);
            }
        }
        return this.ps[this.ps.length-1].cal(1);
    }
}
class Note{
    p:Path;
    h:number;
    spd:number;
    a:number;
    aa:number;

    constructor(_p: Path,_h: number){
        this.p=_p;
        this.h=_h;
    }
}
function angcalc(cx,cy,ax,ay){
    if(ay==cy){
        return Math.PI;
    }
    if(ay<cy){
        return Math.PI/2-Math.atan((ax-cx)/(ay-cy))+Math.PI;
    }
    return Math.PI/2-Math.atan((ax-cx)/(ay-cy));
}
function drawnote(note:Note){
    let sec=tick/tps;
    if((sec-note.h+note.p.spd)/note.p.spd<0||(sec-note.h+note.p.spd)/note.p.spd>1){
        return;
    }
    let np=note.p.cal((sec-note.h+note.p.spd)/note.p.spd);
    ctx.fillStyle="#404040";
    ctx.beginPath();
    ctx.arc(np[0],np[1],88,0, Math.PI * 2, true);
    ctx.fill();
    ctx.strokeStyle="rgb(255,255,255)"
    ctx.beginPath();
    ctx.arc(np[0],np[1],80,0, Math.PI * 2, true);
    ctx.stroke();
}
function drawA(note:Note){
    if(note.a>0&&note.aa*4<tps){
        let rc=note.aa*4/tps+1;
        let np=note.p.cal(1);
        if(note.a==1){
            ctx.fillStyle=`rgba(160,144,0,${2-rc})`;
        }else if(note.a==2){
            ctx.fillStyle=`rgba(0,167,195,${2-rc})`;
        }
        ctx.beginPath();
        ctx.arc(np[0],np[1],88*rc,0, Math.PI * 2, true);
        ctx.fill();
        ctx.strokeStyle="rgb(255,255,255)"
        ctx.beginPath();
        ctx.arc(np[0],np[1],80*rc,0, Math.PI * 2, true);
        ctx.stroke();
    }
}
function drawTexts(){
    ctx.fillStyle="rgb(255,255,255)"
    ctx.font="50px 'Courier New'";
    ctx.textAlign="center";
    ctx.fillText(`${combo}`,1600,60);
    ctx.fillText(`COMBO`,1600,120);
}
function parsePath(n:IPath){
    let ep=n;
    let p:Path=new Path(0);
    switch(ep.type){
        case "arc":
            p=new ArcPath(ep.spd,ep.c![0],ep.c![1],ep.f![0],ep.f![1],ep.t![0],ep.t![1]);
            break;
        case "static":
            p=new StaticPath(ep.spd,ep.x!,ep.y!);
            break;
        case "pow2":
            p=new Pow2SPath(parsePath(ep.p!));
            break;
        case "rpow2":
            p=new ReversePow2SPath(parsePath(ep.p!));
            break;
        default:
            throw Error("Invalid path type");
    }
    return p;
}
function parseSong(){
    if(song===null){
        throw Error("Song not loaded");
    }
    song.notes.forEach(element => {
        let ps:Array<Path>=[];
        element.paths.forEach(pe => {
            ps.push(parsePath(pe));
        });
        let p:Path=new MultiPath(ps);
        notes.push(new Note(p,element.h));
    });
}
async function nextFrame(){
    await new Promise(function(f){setTimeout(function(){f(0)},1000/tps)});
    ctx.fillStyle="rgb(0,0,0)";
    ctx.fillRect(0,0,3200,1800);
    tick++;
}
async function main(){
    var canvas:HTMLCanvasElement = document.getElementById('main_canvas') as HTMLCanvasElement;
    ctx = canvas.getContext('2d')!;
    ctx.fillStyle="rgb(0,0,0)";
    ctx.fillRect(0,0,3200,1800);
    ctx.fillStyle="rgb(200,200,200)";
    ctx.font="200px";
    ctx.fillText("游戏正在加载",1200,1700);
    bus.on("hit",function(e) {
        combo++;
    });
    bus.on("hit",function(e) {
        sound_hit!.pause();
        sound_hit!.fastSeek(0);
        sound_hit!.play();
    });
    bus.on("miss",function(e){
        combo=0;
    })
    document.addEventListener("keydown",(e)=>{
        console.log(e);
        if(e.keyCode==65){
            notes.forEach((element)=>{
                if(element.a){
                    return;
                }
                if(Math.abs(element.h*tps-tick)<=0.04*tps){
                    element.a=1;
                    element.aa=1;
                    bus.emit("hit",1);
                }else if(Math.abs(element.h*tps-tick)<=0.08*tps){
                    element.a=2;
                    element.aa=1;
                    bus.emit("hit",2);
                }
            });
        }
    });
    await fetch('./demo.json').then(async (response) => song=await response.json());
    sound_hit=new Audio("./hit.mp3");
    sound_bg=new Audio(song!.bgsound);
    await new Promise((r)=>{let t=setInterval(()=>{if(sound_hit!.readyState==HTMLMediaElement.HAVE_ENOUGH_DATA&&sound_bg!.readyState==HTMLMediaElement.HAVE_ENOUGH_DATA){clearInterval(t);r(null);}},100);});
    sound_bg.volume=0.5*base_volume;
    sound_hit.volume=1*base_volume;
    parseSong();
    ctx.fillStyle="rgb(0,0,0)";
    ctx.fillRect(0,0,3200,1800);
    let centerNote=new Note(new StaticPath(3600,1600,900),3600); 
    /*
    notes.push(new Note(new ArcPath(1,780,-200,-40,900),3));
    notes.push(new Note(new ArcPath(1,780,-200,-40,900),4));
    notes.push(new Note(new ArcPath(1,780,-200,-40,900),4.5));
    notes.push(new Note(new ArcPath(1,780,-200,-40,900),5));
    */
    //drawnote(new Note(new StaticPath(800,450),0,3600));
    sound_bg.play();
    while(true){
        drawnote(centerNote);
        notes.forEach(element => {
            if(element.a){
                element.aa++;
            }else if(autoPlay&&(Math.abs(element.h*tps-tick)<0.04*tps)){
                element.a=1;
                element.aa=1;
                bus.emit("hit",1);
            }else if((tick-element.h*tps)>0.08*tps){
                element.a=-1;
                bus.emit("miss",null);
            }
            drawnote(element);
        });
        notes.forEach(element => {
            drawA(element);
        });
        drawTexts();
        await nextFrame();
    }
}