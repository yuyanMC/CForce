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
var animationNotes:Array<Note>=new Array();
var tick:number=0;
var tps:number=144;
var song:{notes:Array<{type:"I"|"A",track:"A"|"B",paths:Array<IPath>,h:number}>,animationNotes:Array<{type:"I"|"A",paths:Array<IPath>,h:number,ho:number|undefined,hi:number|undefined}>,bgsound:string,length:number,script:string|undefined}|null=null;
var autoPlay:boolean=false;
var combo:number=0;
var sound_hit:Array<HTMLAudioElement>|null=null;
var sound_hit_manager:Array<number>=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var sound_bg:HTMLAudioElement|null=null;
var base_volume=0.2;
var points_got=0;
var points_total=0;
var notes_total=0;
var max_combo=0;
var perfect=0;
var good=0;
const bus = new EventBus<{
    hit: number,
    miss: null,
    tick: number,
}>();
interface IPath{
    type:string;
    spd:number;
    //Arc
    c?:[number,number];
    f?:[number,number];
    t?:[number,number];
    //Static
    pos?:[number,number];
    //Subscriber
    p?:IPath;
}
class Path{
    spd:number;
    constructor(_spd: number) {
        this.spd=_spd;
    }
    cal(t: number){
        return [0,0];
    }
}
class StaticPath extends Path{
    x:number;
    y:number;
    constructor(_spd: number,_x: number,_y: number){
        super(_spd);
        this.x=_x;
        this.y=_y;
    }
    cal(t: number){
        return [this.x,this.y];
    }
}
class LinePath extends Path{
    fx:number;
    fy:number;
    tx:number;
    ty:number;
    constructor(_spd: number,_fx: number,_fy: number,_tx:number,_ty:number){
        super(_spd);
        this.fx=_fx;
        this.fy=_fy;
        this.tx=_tx;
        this.ty=_ty;
    }
    cal(t: number){
        return [this.fx+(this.tx-this.fx)*t,this.fy+(this.ty-this.fy)*t];
    }
}
class ArcPath extends Path{
    cx:number;
    cy:number;
    fromx:number;
    fromy:number;
    tox:number;
    toy:number;
    constructor(_spd: number,_cx: number,_cy: number,_fx: number,_fy: number,_tx=1600,_ty=900){
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
    constructor(_p: Path){
        super(_p.spd);
        this.p=_p;
    }
}
class Pow2SPath extends SubscriberPath{
    constructor(_p: Path){
        super(_p);
    }
    cal(t: number): number[] {
        return this.p.cal(t**2)
    }
}
class ReversePow2SPath extends SubscriberPath{
    constructor(_p: Path){
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
    a:number;
    aa:number;
    ho:number|undefined;
    hi:number|undefined;
    t:"A"|"B"|"M";
    y:"I"|"A";

    constructor(_p: Path,_h: number,_t: "A"|"B"|"M",_y:"I"|"A"){
        this.p=_p;
        this.h=_h;
        this.t=_t;
        this.y=_y;
        this.a=0;
        this.aa=0;
    }
}
function getQueryString(name: string) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURIComponent(r[2]);
    };
    return null;
}
function angcalc(cx: number,cy: number,ax: number,ay: number){
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
    if(note.t=="A"){
        ctx.fillStyle="rgb(0,220,240)";
    }else if(note.t=="B"){
        ctx.fillStyle="rgb(220,70,20)";
    }else{
        ctx.fillStyle="rgb(64,64,64)";
    }
    ctx.beginPath();
    ctx.arc(np[0],np[1],88,0, Math.PI * 2, true);
    ctx.fill();
    ctx.strokeStyle="rgb(255,255,255)"
    ctx.beginPath();
    ctx.arc(np[0],np[1],80,0, Math.PI * 2, true);
    ctx.stroke();
}
function drawA(note:Note){
    if(note.a==12&&note.aa<note.ho!*tps){
        let np=note.p.cal(0);
        let rc=note.aa/note.hi!/tps+1;
        ctx.fillStyle=`rgba(64,64,64,${rc-1}`;
        ctx.beginPath();
        ctx.arc(np[0],np[1],88,0, Math.PI * 2, true);
        ctx.fill();
        ctx.strokeStyle=`rgba(255,255,255,${rc-1})`;
        ctx.beginPath();
        ctx.arc(np[0],np[1],80,0, Math.PI * 2, true);
        ctx.stroke();
    }else if(note.a==11&&note.aa<note.ho!*tps){
        let np=note.p.cal(1);
        let rc=note.aa/note.ho!/tps+1;
        ctx.fillStyle=`rgba(64,64,64,${2-rc}`;
        ctx.beginPath();
        ctx.arc(np[0],np[1],88,0, Math.PI * 2, true);
        ctx.fill();
        ctx.strokeStyle=`rgba(255,255,255,${2-rc})`;
        ctx.beginPath();
        ctx.arc(np[0],np[1],80,0, Math.PI * 2, true);
        ctx.stroke();
    }else if(note.a>0&&note.aa*4<tps){
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
        ctx.strokeStyle=`rgba(255,255,255,${2-rc})`;
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
    ctx.textAlign="right";
    ctx.fillText(`Point: ${(points_got/points_total*100000).toFixed(0)}`,3150,60);
    ctx.fillText(`Music: ${(tick/tps/song!.length*100).toFixed(2)}%`,3150,120);
}
function parsePath(n:IPath){
    let ep=n;
    let p:Path=new Path(0);
    switch(ep.type){
        case "arc":
            p=new ArcPath(ep.spd,ep.c![0],ep.c![1],ep.f![0],ep.f![1],ep.t![0],ep.t![1]);
            break;
        case "line":
            p=new LinePath(ep.spd,ep.f![0],ep.f![1],ep.t![0],ep.t![1]);
            break;
        case "static":
            p=new StaticPath(ep.spd,ep.pos![0],ep.pos![1]);
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
        notes.push(new Note(p,element.h,element.track,element.type));
    });
    song.animationNotes.forEach(element => {
        let ps:Array<Path>=[];
        element.paths.forEach(pe => {
            ps.push(parsePath(pe));
        });
        let p:Path=new MultiPath(ps);
        let n:Note=new Note(p,element.h,"M",element.type);
        n.ho=element.ho;
        n.hi=element.hi;
        animationNotes.push(n);
    });
    points_total=song.notes.length*100;
    notes_total=song.notes.length;
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
    ctx.font="200px 'Courier New'";
    ctx.textAlign="center";
    ctx.fillText("游戏正在加载",1600,900);
    bus.on("hit",function(e) {
        combo++;
        max_combo=Math.max(combo,max_combo);
        if(e==1){
            points_got+=100;
            perfect+=1;
        }else if(e==2){
            points_got+=75;
            good+=1;
        }
    });
    bus.on("hit",function(e) {
        for(let i=0;i<16;i++){
            if(Date.now()>sound_hit_manager[i]){
                sound_hit![i].play();
                sound_hit_manager[i]=Date.now()+200;
                console.log(`Playing hit ${i}`);
                break;
            }
        }
    });
    bus.on("miss",function(e){
        combo=0;
    })
    document.addEventListener("keydown",(e)=>{
        let fetched=false;
        if(e.keyCode==65){
            notes.forEach((element)=>{
                if(element.a||element.t!="A"){
                    return;
                }
                if(Math.abs(element.h*tps-tick)<=0.08*tps){
                    fetched=true;
                    element.a=1;
                    element.aa=1;
                    bus.emit("hit",1);
                }else if(Math.abs(element.h*tps-tick)<=0.15*tps){
                    fetched=true;
                    element.a=2;
                    element.aa=1;
                    bus.emit("hit",2);
                }
            });
            if(!fetched){
                bus.emit("miss",null);
            }
        }
        if(e.keyCode==76){
            notes.forEach((element)=>{
                if(element.a||element.t!="B"){
                    return;
                }
                if(Math.abs(element.h*tps-tick)<=0.04*tps){
                    fetched=true;
                    element.a=1;
                    element.aa=1;
                    bus.emit("hit",1);
                }else if(Math.abs(element.h*tps-tick)<=0.08*tps){
                    fetched=true;
                    element.a=2;
                    element.aa=1;
                    bus.emit("hit",2);
                }
            });
            if(!fetched){
                bus.emit("miss",null);
            }
        }
    });
    let id=getQueryString("id");
    if(id==null){
        ctx.fillStyle="rgb(0,0,0)";
        ctx.fillRect(0,0,3200,1800);
        ctx.fillStyle="rgb(200,200,200)";
        ctx.fillText("游戏加载错误，请尝试刷新",1600,900);
        throw new Error("No data file given.");
    }
    await fetch(`./${id}.json`).then(async (response) => song=await response.json());
    if(song==undefined){
        ctx.fillStyle="rgb(0,0,0)";
        ctx.fillRect(0,0,3200,1800);
        ctx.fillStyle="rgb(200,200,200)";
        ctx.fillText("游戏加载错误，请尝试刷新",1600,900);
        throw new Error("Data file has nothing or corrupted or not exist.");
    }
    if(song.script){
        await fetch(`./${song.script}`).then(async(response)=>eval(await response.text()));
    }
    sound_hit=[];
    for(let i=0;i<16;i++){
        sound_hit.push(new Audio("./hit.mp3"));
    }
    if(song!.bgsound){
        sound_bg=new Audio(song!.bgsound);
    }else{
        sound_bg=new Audio("./blank.mp3");
    }
    await new Promise((r)=>{let t=setInterval(()=>{if(sound_hit![0].readyState==HTMLMediaElement.HAVE_ENOUGH_DATA&&sound_bg!.readyState==HTMLMediaElement.HAVE_ENOUGH_DATA){clearInterval(t);r(null);}},100);});
    sound_bg.volume=0.5*base_volume;
    sound_hit.forEach(e=>{
        e.volume=1*base_volume;
    });
    sound_hit[0].currentTime
    parseSong();
    ctx.fillStyle="rgb(0,0,0)";
    ctx.fillRect(0,0,3200,1800);
    //let centerNote=new Note(new StaticPath(3600,1600,900),3600); 
    /*
    notes.push(new Note(new ArcPath(1,780,-200,-40,900),3));
    notes.push(new Note(new ArcPath(1,780,-200,-40,900),4));
    notes.push(new Note(new ArcPath(1,780,-200,-40,900),4.5));
    notes.push(new Note(new ArcPath(1,780,-200,-40,900),5));
    */
    //drawnote(new Note(new StaticPath(800,450),0,3600));
    try{
        sound_bg.play();
    }catch(de){
        alert("请打开“允许音频自动播放”，然后刷新");
    }
    while(true){
        //drawnote(centerNote);
        bus.emit("tick",tick/tps);
        animationNotes.forEach(element=>{
            if(element.a==12&&element.aa+1>element.hi!*tps){
                element.a=0;
                element.aa=0;
            }else if(element.a){
                element.aa++;
            }else if(Math.abs(element.h*tps-tick)<=1){
                if(element.ho){
                    element.a=11;
                    element.aa=1;
                }
            }else if(element.hi!=undefined&&Math.abs((element.h-element.p.spd-element.hi)*tps-tick)<=1){
                element.a=12;
                element.aa=1;
            }
            drawnote(element);
            drawA(element);
        });
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
        if(tick/tps>=song!.length){
            location.replace(`./finish.html?i=${id}&c=${max_combo}&t=${(points_got/points_total*100000).toFixed(0)}&p=${perfect}&g=${good}&m=${notes_total-perfect-good}`);
            await new Promise((r)=>{});
        }
    }
}