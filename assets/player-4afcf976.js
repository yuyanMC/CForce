var n=Object.defineProperty;var l=(t,e,s)=>e in t?n(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s;var c=(t,e,s)=>(l(t,typeof e!="symbol"?e+"":e,s),s);import hit from"./hit-556a07c1.js";import blank from"./blank-e5af5943.js";import{EventBus}from"./event-ad197de7.js";import{Chart}from"./chart-531f1ca2.js";import{g as getQueryString,s as setQueryString}from"./util-720ff2c1.js";import{DynamicLoader,DynamicJsonLoader,DynamicScriptLoader}from"./network-1f4774b3.js";import{SoundManager,EnhancedAudioContext}from"./sound-7abd0f62.js";import{KeyListener,registerKeyListener}from"./keyboard-4d71829d.js";const player$1="";class EnhancedContent{constructor(e){c(this,"ctx");c(this,"backGroundColor","rgba(0,0,0,0)");c(this,"size",[300,150]);this.ctx=e,this.size=[parseInt(this.ctx.canvas.getAttribute("width")||"300"),parseInt(this.ctx.canvas.getAttribute("height")||"150")]}setBackGroundColor(e){this.backGroundColor=e}clear(){this.ctx.fillStyle=this.backGroundColor,this.ctx.clearRect(0,0,...this.size),this.ctx.fillRect(0,0,...this.size)}render(e){e.drawOnCtx(this.ctx)}}class CanvasObject{}class NoteCanvasObject{constructor(e=-100,s=-100,i=new RGBAColor(64,64,64),o=88){c(this,"x",-100);c(this,"y",-100);c(this,"f",new RGBAColor(64,64,64));c(this,"r",88);this.x=e,this.y=s,this.f=i,this.r=o}drawOnCtx(e){e.fillStyle=`rgba(${this.f.getColor()[0]},${this.f.getColor()[1]},${this.f.getColor()[2]},${this.f.getColor()[3]})`,e.beginPath(),e.arc(this.x,this.y,this.r,0,Math.PI*2,!0),e.fill(),e.lineWidth=2,e.strokeStyle=`rgba(255,255,255,${this.f.getColor()[3]})`,e.beginPath(),e.arc(this.x,this.y,this.r/1.1,0,Math.PI*2,!0),e.stroke()}}class ClackLineCanvasObject{constructor(e,s,i){c(this,"p");c(this,"fp");c(this,"tp");this.p=e,this.fp=s,this.tp=i}drawOnCtx(e){if(this.fp==this.tp||this.tp<0||this.fp>1)return;this.tp>1&&(this.tp=1),this.fp<0&&(this.fp=0);let s=this.p.cal(this.tp);e.lineWidth=5,e.beginPath(),e.moveTo(...s);for(let i=this.tp;i>=this.fp&&i<=this.tp;i+=(this.fp-this.tp)/tps)s=this.p.cal(i),e.strokeStyle="rgb(255,255,255)",e.lineTo(...s);e.stroke()}}class TextCanvasObject{constructor(e,s,i,o="left",r=50,a=new RGBAColor(255,255,255)){c(this,"text");c(this,"x");c(this,"y");c(this,"align");c(this,"fontSize");c(this,"fill");this.text=e,this.x=s,this.y=i,this.align=o,this.fontSize=r,this.fill=a}drawOnCtx(e){e.fillStyle=`rgba(${this.fill.getColor()[0]},${this.fill.getColor()[1]},${this.fill.getColor()[2]},${this.fill.getColor()[3]})`,e.font=`${this.fontSize}px 'Courier New'`,e.textAlign=this.align,e.fillText(this.text,this.x,this.y)}}class RGBAColor{constructor(e,s,i,o=1){c(this,"c",[0,0,0,1]);this.c=[e,s,i,o]}getColor(){return this.c}}const gui=Object.freeze(Object.defineProperty({__proto__:null,CanvasObject,ClackLineCanvasObject,EnhancedContent,NoteCanvasObject,RGBAColor,TextCanvasObject},Symbol.toStringTag,{value:"Module"}));let imageLoader=new DynamicLoader("images"),soundLoader=new DynamicLoader("sounds"),chartLoader=new DynamicJsonLoader("charts"),scriptLoader=new DynamicScriptLoader("scripts"),ctx,chart,tps=60,combo=0,hitSoundManager,backgroundMusic,hitVolume=.5,backgroundVolume=.5,pointsGot=0,maxCombo=0,perfect=0,good=0,bad=0,paused=!1,tickTimes=[],startTime,sec,pausedTime=0,ec,bus=new EventBus;function renderText(t,e,s,i="left",o=50,r=new RGBAColor(255,255,255)){ec.render(new TextCanvasObject(t,e,s,i,o,r instanceof RGBAColor?r:new RGBAColor(255,255,255,r)))}function drawNote(t){if(t.a||(sec-t.h+t.p.spd)/t.p.spd<0||(sec-t.h+t.p.spd)/t.p.spd>1)return;let e=t.p.cal((sec-t.h+t.p.spd)/t.p.spd),s=new RGBAColor(t.f[0],t.f[1],t.f[2]);ec.render(new NoteCanvasObject(...e,s))}function drawClackLine(t){t.y=="A"&&((sec-t.h+t.p.spd)/t.p.spd<0||(sec-t.al-t.h+t.p.spd)/t.p.spd>1||ec.render(new ClackLineCanvasObject(t.p,(sec-t.al-t.h+t.p.spd)/t.p.spd,(sec-t.h+t.p.spd)/t.p.spd)))}function drawA(t){if(t.a<=0)return;let e=sec-t.aa,s=t.p.cal((t.aa-t.h+t.p.spd)/t.p.spd);if(t.a==12&&e<t.hi){let i=e/t.hi+1,o=new RGBAColor(t.f[0],t.f[1],t.f[2],i-1);ec.render(new NoteCanvasObject(...s,o))}else if(t.a==11&&e<t.ho){let i=e/t.ho+1,o=new RGBAColor(t.f[0],t.f[1],t.f[2],2-i);ec.render(new NoteCanvasObject(...s,o))}else if(t.a>0&&e<.25){let i=e/.25+1,o=new RGBAColor(0,0,0,0);t.a==1?o=new RGBAColor(160,144,0,2-i):t.a==2&&(o=new RGBAColor(0,167,195,2-i)),ec.render(new NoteCanvasObject(...s,o,i*88))}}function drawTexts(){ctx.fillStyle="rgb(255,255,255)",ctx.font="50px 'Courier New'",ctx.textAlign="center",renderText(`${combo}`,1600,60,"center"),renderText("COMBO",1600,120,"center"),renderText(`Point: ${(pointsGot/chart.notesTotal/100*1e5).toFixed(0)}`,3150,60,"right"),renderText(`Music: ${(sec/chart.length*100).toFixed(2)}%`,3150,120,"right");{let t=tickTimes.length,e=new RGBAColor(255,0,255);t/tps>=0&&(e=new RGBAColor(255,0,255)),t/tps>.3&&(e=new RGBAColor(255,0,63)),t/tps>.6&&(e=new RGBAColor(255,0,0)),t/tps>.9&&(e=new RGBAColor(255,127,0)),t/tps>.95&&(e=new RGBAColor(255,255,0)),t/tps>.999&&(e=new RGBAColor(0,255,0)),t/tps>.99999&&(e=new RGBAColor(0,255,255)),renderText(`TPS: ${t.toFixed(0)}/${tps}`,3150,180,"right",50,e),renderText(`Sec: ${sec.toFixed(3)} Paused: ${pausedTime.toFixed(3)} Total: ${((Date.now()-startTime)/1e3).toFixed(3)} Music: ${backgroundMusic.actx.currentTime.toFixed(3)}`,3150,240,"right")}}function nextFrame(){ec.clear()}async function main(){let t=getQueryString("id");document.getElementById("canvas_box").style.backgroundImage=`url(${await imageLoader.loadAsUrl(`${t}.png`).catch(()=>"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIW2P4DwQACfsD/Z8fLAAAAAAASUVORK5CYII=")})`,ctx=document.getElementById("main_canvas").getContext("2d"),ec=new EnhancedContent(ctx),ec.setBackGroundColor("rgba(0,0,0,0.5)"),ec.clear(),renderText("游戏正在加载",1600,900,"center",200,new RGBAColor(200,200,200)),bus.on("hit",r=>{combo++,maxCombo=Math.max(combo,maxCombo),r==1?(pointsGot+=100,perfect+=1):r==2&&(pointsGot+=75,good+=1)}),bus.on("hit",()=>{hitSoundManager.play()}),bus.on("miss",()=>{combo=0}),bus.on("tick",()=>{let r=Date.now();for(tickTimes.push(r);r-tickTimes[0]>=1e3;)tickTimes.splice(0,1)}),bus.on("start",()=>{startTime=Date.now()-backgroundMusic.actx.currentTime*1e3});let s=new KeyListener("a");s.onPress=()=>{let r=!1;chart.notes.forEach(a=>{r||a.a||a.t!="A"||(Math.abs(a.h-sec)<=.08?(r=!0,a.a=1,a.aa=sec,bus.emit("hit",1)):Math.abs(a.h-sec)<=.16?(r=!0,a.a=2,a.aa=sec,bus.emit("hit",2)):Math.abs(a.h-sec)<=.32&&(a.a=11,a.aa=sec,a.ho=.25,bad++,bus.emit("miss",null)))})},s.onRelease=()=>{chart.notes.forEach(r=>{r.a<=0||r.t!="A"||r.y!="A"||r.h+r.al-sec>0&&r.h-sec<0&&(pointsGot-=r.a==1?100:75,r.a==1?perfect--:good--,r.a=-1,r.aa=0,bus.emit("miss",null))})},registerKeyListener(s);let i=new KeyListener("l");if(i.onPress=()=>{let r=!1;chart.notes.forEach(a=>{r||a.a||a.t!="B"||(Math.abs(a.h-sec)<=.08?(r=!0,a.a=1,a.aa=sec,bus.emit("hit",1)):Math.abs(a.h-sec)<=.16?(r=!0,a.a=2,a.aa=sec,bus.emit("hit",2)):Math.abs(a.h-sec)<=.32&&(a.a=11,a.aa=sec,a.ho=.25,bad++,bus.emit("miss",null)))})},s.onRelease=()=>{chart.notes.forEach(r=>{r.a<=0||r.t!="B"||r.y!="A"||r.h+r.al-sec>0&&r.h-sec<0&&(pointsGot-=r.a==1?100:75,r.a==1?perfect--:good--,r.a=-1,r.aa=0,bus.emit("miss",null))})},registerKeyListener(i),t==null)throw ec.clear(),renderText("游戏加载错误，请尝试刷新",1600,900,"center",200,new RGBAColor(200,200,200)),new Error("No data file given.");let o;if(await chartLoader.loadAsJson(`${t}.json`).then(async r=>o=r.default),o==null)throw ec.clear(),renderText("游戏加载错误，请尝试刷新",1600,900,"center",200,new RGBAColor(200,200,200)),new Error("Data file has nothing or corrupted or not exist.");o.script&&await scriptLoader.inject(o.script),ec.clear(),renderText("点击屏幕开始",1600,900,"center",200,new RGBAColor(230,230,230)),await new Promise(r=>{document.onclick=()=>{document.onclick=null,r(null)}}),ec.clear(),renderText("加载中",1600,900,"center",200,new RGBAColor(250,250,250)),hitSoundManager=new SoundManager(hit),backgroundMusic=new EnhancedAudioContext(new AudioContext),await backgroundMusic.actx.suspend(),await hitSoundManager.load(),o.bgsound?await backgroundMusic.load(await soundLoader.loadAsUrl(o.bgsound)):await backgroundMusic.load(blank),backgroundMusic.setVolume(backgroundVolume),hitSoundManager.setVolume(hitVolume),chart=new Chart(o),bus.on("start",()=>{let r=setInterval(async function(){if(paused){pausedTime=(Date.now()-startTime)/1e3-sec;return}nextFrame(),sec=(Date.now()-startTime)/1e3-pausedTime,bus.emit("tick",sec),chart.animationNotes.forEach(a=>{a.a==12&&sec-a.aa>a.hi?(a.a=0,a.aa=0):Math.abs(a.h-sec)<=1.5/tps?a.ho&&(a.a=11,a.aa=sec):a.hi!=null&&Math.abs(a.h-a.p.spd-a.hi-sec)<=1.5/tps&&(a.a=12,a.aa=sec),drawNote(a),drawA(a)}),chart.notes.forEach(a=>{drawClackLine(a)}),chart.notes.forEach(a=>{sec-a.h>.16&&!a.a&&(a.a=-1,bus.emit("miss",null)),drawNote(a)}),chart.notes.forEach(a=>{drawA(a)}),drawTexts(),sec>=o.length&&(clearInterval(r),paused=!0,location.replace(`./finish.html${setQueryString({i:t,c:maxCombo,t:(pointsGot/chart.notesTotal/100*1e5).toFixed(0),p:perfect,g:good,b:bad,m:chart.notesTotal-perfect-good})}`))},1e3/tps)}),ec.clear(),await backgroundMusic.actx.resume(),backgroundMusic.play(),bus.emit("start",null)}globalThis.cinject=k=>eval(k);window.onload=main;const player=Object.freeze(Object.defineProperty({__proto__:null,bus,get ctx(){return ctx},drawA,drawClackLine,drawNote,get paused(){return paused},renderText,get sec(){return sec},tps},Symbol.toStringTag,{value:"Module"}));export{bus as b,gui as g,player as p,renderText as r};