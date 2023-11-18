var d=Object.defineProperty;var u=(r,t,e)=>t in r?d(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var a=(r,t,e)=>(u(r,typeof t!="symbol"?t+"":t,e),e);import{c as calculateAngle,g as getQueryString,s as setQueryString}from"./util-1764465e.js";import{c as fadeInAnim,d as fadeOutAnim,p as perfectAnim,g as goodAnim,e as blankImage,l as loadingStr,i as loadErrorStr,j as loadWaitClickStr,k as loadDownloadStr,h as hit,b as blank,a as background,f as font}from"./const-81308dad.js";import{_ as __vitePreload}from"./preload-helper-a4192956.js";const player$1="";class EnhancedContent{constructor(t){a(this,"ctx");a(this,"backGroundColor","rgba(0,0,0,0)");a(this,"size",[300,150]);this.ctx=t,this.size=[parseInt(this.ctx.canvas.getAttribute("width")||"300"),parseInt(this.ctx.canvas.getAttribute("height")||"150")]}setBackGroundColor(t){this.backGroundColor=t}clear(){this.ctx.fillStyle=this.backGroundColor,this.ctx.clearRect(0,0,...this.size),this.ctx.fillRect(0,0,...this.size)}render(t){t.drawOnCtx(this.ctx)}}class CanvasObject{}class NoteCanvasObject{constructor(t=-100,e=-100,s=new RGBAColor(64,64,64),n=88){a(this,"x",-100);a(this,"y",-100);a(this,"f",new RGBAColor(64,64,64));a(this,"r",88);this.x=t,this.y=e,this.f=s,this.r=n}drawOnCtx(t){t.fillStyle=`rgba(${this.f.getColor()[0]},${this.f.getColor()[1]},${this.f.getColor()[2]},${this.f.getColor()[3]})`,t.beginPath(),t.arc(this.x,this.y,this.r,0,Math.PI*2,!0),t.fill(),t.lineWidth=2,t.strokeStyle=`rgba(255,255,255,${this.f.getColor()[3]})`,t.beginPath(),t.arc(this.x,this.y,this.r/1.1,0,Math.PI*2,!0),t.stroke()}}class ClackLineCanvasObject{constructor(t,e,s){a(this,"p");a(this,"fp");a(this,"tp");this.p=t,this.fp=e,this.tp=s}drawOnCtx(t){if(this.fp==this.tp||this.tp<0||this.fp>1)return;this.tp>1&&(this.tp=1),this.fp<0&&(this.fp=0);let e=this.p.cal(this.tp);t.lineWidth=5,t.beginPath(),t.moveTo(...e);for(let s=this.tp;s>=this.fp&&s<=this.tp;s+=(this.fp-this.tp)/tps)e=this.p.cal(s),t.strokeStyle="rgb(255,255,255)",t.lineTo(...e);t.stroke()}}class TextCanvasObject{constructor(t,e,s,n="center",i=50,o=new RGBAColor(255,255,255)){a(this,"text");a(this,"x");a(this,"y");a(this,"align");a(this,"fontSize");a(this,"fill");this.text=t,this.x=e,this.y=s,this.align=n,this.fontSize=i,this.fill=o}drawOnCtx(t){t.fillStyle=`rgba(${this.fill.getColor()[0]},${this.fill.getColor()[1]},${this.fill.getColor()[2]},${this.fill.getColor()[3]})`,t.font=`${this.fontSize}px 'Courier New'`,t.textAlign=this.align,t.fillText(this.text,this.x,this.y)}}class RGBAColor{constructor(t,e,s,n=1){a(this,"c",[0,0,0,1]);this.c=[t,e,s,n]}getColor(){return this.c}}const gui=Object.freeze(Object.defineProperty({__proto__:null,CanvasObject,ClackLineCanvasObject,EnhancedContent,NoteCanvasObject,RGBAColor,TextCanvasObject},Symbol.toStringTag,{value:"Module"}));class EventBus{constructor(){a(this,"map",new Map)}on(t,e){let s=this.map.get(t);s||(s=new Set,this.map.set(t,s)),s.add(e)}emit(t,e){const s=this.map.get(t);if(!s)return;[...s].forEach(i=>i(e))}}const event=Object.freeze(Object.defineProperty({__proto__:null,EventBus},Symbol.toStringTag,{value:"Module"}));class Chart{constructor(t){a(this,"notes");a(this,"animationNotes");a(this,"notesTotal");a(this,"length");this.notes=[],this.animationNotes=[],t.notes.forEach(e=>{let s=[];e.paths.forEach(i=>{s.push(Chart.parsePath(i))});let n=new MultiPath(s);e.type!=="I"?this.notes.push(new Note(n,e.h,e.track,e.type,e.al,e.track=="A"?[0,220,240]:[220,70,20])):this.notes.push(new Note(n,e.h,e.track,e.type,0,e.track=="A"?[0,220,240]:[220,70,20]))}),t.animationNotes.forEach(e=>{let s=[];e.paths.forEach(o=>{s.push(Chart.parsePath(o))});let n=new MultiPath(s),i;e.type!=="I"?i=new Note(n,e.h,"M",e.type,e.al,e.fill):i=new Note(n,e.h,"M",e.type,void 0,e.fill),i.ho=e.ho,i.hi=e.hi,this.animationNotes.push(i)}),this.notesTotal=t.notes.length,this.length=t.length}static parsePath(t){let e=t,s=new Path(0);switch(e.type){case"arc":s=new ArcPath(e.spd,e.c[0],e.c[1],e.f[0],e.f[1],e.t[0],e.t[1]);break;case"line":s=new LinePath(e.spd,e.f[0],e.f[1],e.t[0],e.t[1]);break;case"static":s=new StaticPath(e.spd,e.pos[0],e.pos[1]);break;case"pow2":s=new Pow2SPath(Chart.parsePath(e.p),e.f,e.t);break;default:throw Error("Invalid path type")}return s}}class Path{constructor(t){a(this,"spd");this.spd=t}cal(t){return[0,0]}}class StaticPath extends Path{constructor(e,s,n){super(e);a(this,"x");a(this,"y");this.x=s,this.y=n}cal(e){return[this.x,this.y]}}class LinePath extends Path{constructor(e,s,n,i,o){super(e);a(this,"fx");a(this,"fy");a(this,"tx");a(this,"ty");this.fx=s,this.fy=n,this.tx=i,this.ty=o}cal(e){return[this.fx+(this.tx-this.fx)*e,this.fy+(this.ty-this.fy)*e]}}class ArcPath extends Path{constructor(e,s,n,i,o,c=1600,l=900){super(e);a(this,"cx");a(this,"cy");a(this,"fromx");a(this,"fromy");a(this,"tox");a(this,"toy");if((i-s)**2+(o-n)**2-(c-s)**2-(l-n)**2>=.01)throw Error(`Invalid ArcPath for(${s} ${n} ${i} ${o} ${c} ${l})`);this.cx=s,this.cy=n,this.fromx=i,this.fromy=o,this.tox=c,this.toy=l}cal(e){if(e<0)return[this.fromx,this.fromy];if(e>1)return[this.tox,this.toy];let s=calculateAngle(this.cx,this.cy,this.fromx,this.fromy),n=calculateAngle(this.cx,this.cy,this.tox,this.toy),i=s+(n-s)*e,o=Math.sqrt((this.tox-this.cx)**2+(this.toy-this.cy)**2);return[Math.cos(i)*o+this.cx,Math.sin(i)*o+this.cy]}}class SubscriberPath extends Path{constructor(e){super(e.spd);a(this,"p");this.p=e}}class Pow2SPath extends SubscriberPath{constructor(e,s=0,n=1){super(e);a(this,"f");a(this,"t");this.f=s,this.t=n}cal(e){return this.p.cal((this.f+(this.t-this.f)*e)**2)}}class MultiPath extends Path{constructor(e){let s=0;e.forEach(i=>{s+=i.spd});super(s);a(this,"ps");a(this,"ssp");this.ps=e,this.ssp=[];let n=0;this.ssp.push(0),e.forEach(i=>{n+=i.spd,this.ssp.push(n/s)})}cal(e){for(let s=1;s<this.ssp.length;s++)if(e<this.ssp[s]){let n=(e-this.ssp[s-1])/(this.ssp[s]-this.ssp[s-1]);return this.ps[s-1].cal(n)}return this.ps[this.ps.length-1].cal(1)}}class Note{constructor(t,e,s,n,i,o){a(this,"p");a(this,"h");a(this,"a");a(this,"aa");a(this,"ho");a(this,"hi");a(this,"t");a(this,"y");a(this,"al");a(this,"f");this.p=t,this.h=e,this.t=s,this.y=n,this.a=0,this.aa=0,this.y=="A"&&i==null&&(i=0),this.al=i,this.f=o||[64,64,64]}}const chart$1=Object.freeze(Object.defineProperty({__proto__:null,Chart,Note,Path},Symbol.toStringTag,{value:"Module"})),modules=Object.assign({"/src/charts/atthespeedoflight.json":()=>__vitePreload(()=>import("./atthespeedoflight-15398c93.js"),[],import.meta.url),"/src/charts/beeper.json":()=>__vitePreload(()=>import("./beeper-a0223045.js"),[],import.meta.url),"/src/charts/demo.json":()=>__vitePreload(()=>import("./demo-4074207b.js"),[],import.meta.url),"/src/charts/introduction.json":()=>__vitePreload(()=>import("./introduction-8f231dd3.js"),[],import.meta.url),"/src/charts/otherside.json":()=>__vitePreload(()=>import("./otherside-bf6c9189.js"),[],import.meta.url),"/src/charts/test.json":()=>__vitePreload(()=>import("./test-2e501a08.js"),[],import.meta.url),"/src/charts/timer.json":()=>__vitePreload(()=>import("./timer-fbc7f604.js"),[],import.meta.url),"/src/charts/阴游.json":()=>__vitePreload(()=>import("./阴游-7f321caa.js"),[],import.meta.url),"/src/data/data.json":()=>__vitePreload(()=>import("./data-c295b173.js"),[],import.meta.url),"/src/data/meta.json":()=>__vitePreload(()=>import("./meta-513bffc7.js"),[],import.meta.url),"/src/elecbuild.ts":()=>__vitePreload(()=>import("./elecbuild-6a70d6a0.js"),[],import.meta.url),"/src/finish.ts":()=>__vitePreload(()=>import("./finish-da558a0a.js"),["./finish-da558a0a.js","./runtime-dom.esm-bundler-49120a1b.js","./_plugin-vue_export-helper-d2fbe755.js","./finish-d62574ea.js","./preload-helper-a4192956.js","./dynamic-import-helper-be004503.js","./util-1764465e.js","./finish-6d16cec9.css"],import.meta.url),"/src/finish.vue":()=>__vitePreload(()=>import("./finish-d62574ea.js"),["./finish-d62574ea.js","./preload-helper-a4192956.js","./dynamic-import-helper-be004503.js","./util-1764465e.js","./_plugin-vue_export-helper-d2fbe755.js","./finish-6d16cec9.css"],import.meta.url),"/src/globals.d.ts":()=>__vitePreload(()=>import("./config-8f3e6e49.js").then(r=>r.g),[],import.meta.url),"/src/images/atthespeedoflight.png":()=>__vitePreload(()=>import("./atthespeedoflight-d3f26589.js"),[],import.meta.url),"/src/images/introduction.png":()=>__vitePreload(()=>import("./introduction-45cb3d30.js"),[],import.meta.url),"/src/images/otherside.png":()=>__vitePreload(()=>import("./otherside-f2c500b1.js"),[],import.meta.url),"/src/maker.ts":()=>__vitePreload(()=>import("./maker-ed85805d.js"),["./maker-ed85805d.js","./runtime-dom.esm-bundler-49120a1b.js","./_plugin-vue_export-helper-d2fbe755.js","./maker-a17832f6.js","./const-81308dad.js","./gui-d002ad5e.js","./event-4329e05e.js","./chart-9486b373.js","./util-1764465e.js","./sound-37c3646d.js","./vuepath-c5e3d203.js","./vuechildpath-8868b3e0.js","./vuechildpath-6de57686.css","./vuepath-5b94c02e.css","./maker-1c870c18.css"],import.meta.url),"/src/maker.vue":()=>__vitePreload(()=>import("./maker-a17832f6.js"),["./maker-a17832f6.js","./runtime-dom.esm-bundler-49120a1b.js","./_plugin-vue_export-helper-d2fbe755.js","./const-81308dad.js","./gui-d002ad5e.js","./event-4329e05e.js","./chart-9486b373.js","./util-1764465e.js","./sound-37c3646d.js","./vuepath-c5e3d203.js","./vuechildpath-8868b3e0.js","./vuechildpath-6de57686.css","./vuepath-5b94c02e.css","./maker-1c870c18.css"],import.meta.url),"/src/maker/chart.ts":()=>__vitePreload(()=>import("./chart-9486b373.js"),["./chart-9486b373.js","./util-1764465e.js"],import.meta.url),"/src/maker/event.ts":()=>__vitePreload(()=>import("./event-4329e05e.js"),[],import.meta.url),"/src/maker/gui.ts":()=>__vitePreload(()=>import("./gui-d002ad5e.js"),[],import.meta.url),"/src/maker/network.ts":()=>__vitePreload(()=>import("./network-01ecdea7.js"),["./network-01ecdea7.js","./preload-helper-a4192956.js"],import.meta.url),"/src/maker/sound.ts":()=>__vitePreload(()=>import("./sound-37c3646d.js"),[],import.meta.url),"/src/maker/vuechildpath.vue":()=>__vitePreload(()=>import("./vuechildpath-8868b3e0.js"),["./vuechildpath-8868b3e0.js","./runtime-dom.esm-bundler-49120a1b.js","./_plugin-vue_export-helper-d2fbe755.js","./chart-9486b373.js","./util-1764465e.js","./vuechildpath-6de57686.css"],import.meta.url),"/src/maker/vuepath.vue":()=>__vitePreload(()=>import("./vuepath-c5e3d203.js"),["./vuepath-c5e3d203.js","./runtime-dom.esm-bundler-49120a1b.js","./_plugin-vue_export-helper-d2fbe755.js","./chart-9486b373.js","./util-1764465e.js","./vuechildpath-8868b3e0.js","./vuechildpath-6de57686.css","./vuepath-5b94c02e.css"],import.meta.url),"/src/player.ts":()=>__vitePreload(()=>Promise.resolve().then(()=>player),void 0,import.meta.url),"/src/player/chart.ts":()=>__vitePreload(()=>Promise.resolve().then(()=>chart$1),void 0,import.meta.url),"/src/player/config.ts":()=>__vitePreload(()=>import("./config-8f3e6e49.js").then(r=>r.c),[],import.meta.url),"/src/player/const.ts":()=>__vitePreload(()=>import("./const-81308dad.js").then(r=>r._),[],import.meta.url),"/src/player/event.ts":()=>__vitePreload(()=>Promise.resolve().then(()=>event),void 0,import.meta.url),"/src/player/gui.ts":()=>__vitePreload(()=>Promise.resolve().then(()=>gui),void 0,import.meta.url),"/src/player/keyboard.ts":()=>__vitePreload(()=>Promise.resolve().then(()=>keyboard),void 0,import.meta.url),"/src/player/sound.ts":()=>__vitePreload(()=>Promise.resolve().then(()=>sound),void 0,import.meta.url),"/src/player/storage.ts":()=>__vitePreload(()=>import("./storage-912b53e7.js"),["./storage-912b53e7.js","./util-1764465e.js"],import.meta.url),"/src/player/util.ts":()=>__vitePreload(()=>import("./util-1764465e.js").then(r=>r.u),[],import.meta.url),"/src/scripts/introduction.ts":()=>__vitePreload(()=>import("./introduction-37655690.js"),["./introduction-37655690.js","./util-1764465e.js","./const-81308dad.js","./preload-helper-a4192956.js"],import.meta.url),"/src/scripts/timer.ts":()=>__vitePreload(()=>import("./timer-fb6bf099.js"),["./timer-fb6bf099.js","./util-1764465e.js","./const-81308dad.js","./preload-helper-a4192956.js"],import.meta.url),"/src/selector.ts":()=>__vitePreload(()=>import("./selector-166c8a42.js"),["./selector-166c8a42.js","./runtime-dom.esm-bundler-49120a1b.js","./_plugin-vue_export-helper-d2fbe755.js","./selector-c37cd95e.js","./preload-helper-a4192956.js","./dynamic-import-helper-be004503.js","./util-1764465e.js","./storage-912b53e7.js","./selector-b73a059d.css"],import.meta.url),"/src/selector.vue":()=>__vitePreload(()=>import("./selector-c37cd95e.js"),["./selector-c37cd95e.js","./preload-helper-a4192956.js","./dynamic-import-helper-be004503.js","./runtime-dom.esm-bundler-49120a1b.js","./_plugin-vue_export-helper-d2fbe755.js","./util-1764465e.js","./storage-912b53e7.js","./selector-b73a059d.css"],import.meta.url),"/src/sounds/atthespeedoflight.mp3":()=>__vitePreload(()=>import("./atthespeedoflight-8ad1fbb7.js"),[],import.meta.url),"/src/sounds/beeper.mp3":()=>__vitePreload(()=>import("./beeper-69aea9d0.js"),[],import.meta.url),"/src/sounds/blank.mp3":()=>__vitePreload(()=>import("./const-81308dad.js").then(r=>r.n),[],import.meta.url),"/src/sounds/hit.mp3":()=>__vitePreload(()=>import("./const-81308dad.js").then(r=>r.m),[],import.meta.url),"/src/sounds/introduction.mp3":()=>__vitePreload(()=>import("./introduction-16a7a304.js"),[],import.meta.url),"/src/sounds/maker.mp3":()=>__vitePreload(()=>import("./maker-8462ab61.js"),[],import.meta.url),"/src/sounds/otherside.mp3":()=>__vitePreload(()=>import("./otherside-8462ab61.js"),[],import.meta.url),"/src/style/player.css":()=>__vitePreload(()=>Promise.resolve({}),["./player-e852206a.css"],import.meta.url)});console.log(modules);class DynamicLoader{constructor(t){a(this,"dir");this.dir=t}async loadAsUrl(t){let e=modules[`/src/${this.dir}/${t}`];return e?(await e()).default:""}async loadAsBase64(t){return toDataUrl(await this.loadAsUrl(t))}}class DynamicScriptLoader extends DynamicLoader{async loadAsUrl(t){return new Promise(e=>{e(`/src/${this.dir}/${t}`)})}async inject(t){let e=modules[`/src/${this.dir}/${t}`];if(e)return e()}}class DynamicJsonLoader extends DynamicLoader{async loadAsUrl(t){return new Promise(e=>{e(`/src/${this.dir}/${t}`)})}async loadAsJson(t){let e=modules[`/src/${this.dir}/${t}`];return e?e():""}}async function toDataUrl(r){let t=new XMLHttpRequest,e=new Promise(s=>{t.onload=()=>{let n=new FileReader;n.onloadend=function(){s(n.result)},n.readAsDataURL(t.response)}});return t.open("GET",r),t.responseType="blob",t.send(),e}const network=Object.freeze(Object.defineProperty({__proto__:null,DynamicJsonLoader,DynamicLoader,DynamicScriptLoader},Symbol.toStringTag,{value:"Module"}));class EnhancedAudioContext{constructor(t){a(this,"actx");a(this,"audioBuffer");a(this,"volume");a(this,"url","about:blank");a(this,"startTime",0);this.actx=t}play(){this.startTime=Date.now();let t=this.actx.createBufferSource(),e=this.actx.createGain();t.buffer=this.audioBuffer,t.loop=!1,t.connect(e),t.start(0),e.gain.value=this.volume,e.connect(this.actx.destination)}async init(t){let e=this;return this.actx.decodeAudioData(t,function(s){e.audioBuffer=s})}async load(t){return this.url=t,fetch(t).then(e=>e.arrayBuffer()).then(e=>this.init(e))}setVolume(t){this.volume=t}}class SoundManager{constructor(t,e=16){a(this,"enhancedAudioContexts",[]);a(this,"url");a(this,"num");a(this,"loaded",!1);this.url=t,this.num=e}async load(){if(this.loaded)throw Error("Already loaded.");this.loaded=!0;for(let t=0;t<this.num;t++)this.enhancedAudioContexts.push(new EnhancedAudioContext(new AudioContext)),await this.enhancedAudioContexts[t].load(this.url)}play(){for(let t=0;t<this.num;t++)if(Date.now()-this.enhancedAudioContexts[t].startTime>this.enhancedAudioContexts[t].audioBuffer.length/this.enhancedAudioContexts[t].audioBuffer.sampleRate){this.enhancedAudioContexts[t].play();return}}setVolume(t){for(let e=0;e<this.num;e++)this.enhancedAudioContexts[e].setVolume(t)}}const sound=Object.freeze(Object.defineProperty({__proto__:null,EnhancedAudioContext,SoundManager},Symbol.toStringTag,{value:"Module"}));let keyListeners=[];class KeyListener{constructor(t){a(this,"k");a(this,"_op",[]);a(this,"_or",[]);a(this,"holding",!1);this.k=t.toLowerCase()}set onPress(t){this._op.push(t)}get onPress(){return this._op}set onRelease(t){this._or.push(t)}get onRelease(){return this._or}}function registerKeyListener(r){keyListeners.push(r)}document.addEventListener("keydown",r=>{keyListeners.forEach(t=>{r.key.toLowerCase()==t.k&&(t.holding||(t.holding=!0,t.onPress.forEach(e=>e(r))))})});document.addEventListener("keyup",r=>{keyListeners.forEach(t=>{r.key.toLowerCase()==t.k&&t.holding&&(t.holding=!1,t.onRelease.forEach(e=>e(r)))})});const keyboard=Object.freeze(Object.defineProperty({__proto__:null,KeyListener,registerKeyListener},Symbol.toStringTag,{value:"Module"}));let imageLoader=new DynamicLoader("images"),soundLoader=new DynamicLoader("sounds"),chartLoader=new DynamicJsonLoader("charts"),scriptLoader=new DynamicScriptLoader("scripts"),ctx,chart,pointsGot=0,maxCombo=0,perfect=0,good=0,bad=0,paused=!1,tickTimes=[],startTime,sec,pausedTime=0,lock=!1,tps=60,combo=0,hitVolume=.5,backgroundVolume=.5,hitSoundManager,backgroundMusic,ec,bus=new EventBus;function renderText(r,t,e,s="center",n=50,i=new RGBAColor(255,255,255)){ec.render(new TextCanvasObject(r,t,e,s,n,i instanceof RGBAColor?i:new RGBAColor(255,255,255,i)))}function drawNote(r){if(r.a||(sec-r.h+r.p.spd)/r.p.spd<0||(sec-r.h+r.p.spd)/r.p.spd>1)return;let t=r.p.cal((sec-r.h+r.p.spd)/r.p.spd),e=new RGBAColor(r.f[0],r.f[1],r.f[2]);ec.render(new NoteCanvasObject(...t,e))}function drawClackLine(r){r.y=="A"&&((sec-r.h+r.p.spd)/r.p.spd<0||(sec-r.al-r.h+r.p.spd)/r.p.spd>1||ec.render(new ClackLineCanvasObject(r.p,(sec-r.al-r.h+r.p.spd)/r.p.spd,(sec-r.h+r.p.spd)/r.p.spd)))}function drawA(r){if(r.a<=0)return;let t=sec-r.aa,e=r.p.cal((r.aa-r.h+r.p.spd)/r.p.spd);if(r.a==fadeInAnim&&t<r.hi){let s=t/r.hi+1,n=new RGBAColor(r.f[0],r.f[1],r.f[2],s-1);ec.render(new NoteCanvasObject(...e,n))}else if(r.a==fadeOutAnim&&t<r.ho){let s=t/r.ho+1,n=new RGBAColor(r.f[0],r.f[1],r.f[2],2-s);ec.render(new NoteCanvasObject(...e,n))}else if(r.a>0&&t<.25){let s=t/.25+1,n=new RGBAColor(0,0,0,0);r.a==perfectAnim?n=new RGBAColor(160,144,0,2-s):r.a==goodAnim&&(n=new RGBAColor(0,167,195,2-s)),ec.render(new NoteCanvasObject(...e,n,s*88))}}function drawTexts(){ctx.fillStyle=background,ctx.font=font,renderText(`${combo}`,1600,60),renderText("COMBO",1600,120),renderText(`Point: ${(pointsGot/chart.notesTotal/100*1e5).toFixed(0)}`,3150,60,"right"),renderText(`Music: ${(sec/chart.length*100).toFixed(2)}%`,3150,120,"right");{let r=tickTimes.length,t=new RGBAColor(255,0,255);r/tps>=0&&(t=new RGBAColor(255,0,255)),r/tps>.3&&(t=new RGBAColor(255,0,63)),r/tps>.6&&(t=new RGBAColor(255,0,0)),r/tps>.9&&(t=new RGBAColor(255,127,0)),r/tps>.95&&(t=new RGBAColor(255,255,0)),r/tps>.999&&(t=new RGBAColor(0,255,0)),r/tps>.99999&&(t=new RGBAColor(0,255,255)),renderText(`TPS: ${r.toFixed(0)}/${tps}`,3150,180,"right",50,t),renderText(`Sec: ${sec.toFixed(3)} Paused: ${pausedTime.toFixed(3)} Total: ${((Date.now()-startTime)/1e3).toFixed(3)} Music: ${backgroundMusic.actx.currentTime.toFixed(3)}`,3150,240,"right")}}async function main(){let r=getQueryString("id");document.getElementById("canvas_box").style.backgroundImage=`url(${await imageLoader.loadAsUrl(`${r}.png`).catch(()=>blankImage)})`,ctx=document.getElementById("main_canvas").getContext("2d"),ec=new EnhancedContent(ctx),ec.setBackGroundColor("rgba(0,0,0,0.5)"),ec.clear(),renderText(loadingStr,1600,900,"center",200,new RGBAColor(200,200,200)),bus.on("hit",i=>{combo++,maxCombo=Math.max(combo,maxCombo),i==1?(pointsGot+=100,perfect+=1):i==2&&(pointsGot+=75,good+=1)}),bus.on("hit",()=>{hitSoundManager.play()}),bus.on("miss",()=>{combo=0}),bus.on("tick",()=>{let i=Date.now();for(tickTimes.push(i);i-tickTimes[0]>=1e3;)tickTimes.splice(0,1)}),bus.on("start",()=>{startTime=Date.now()-backgroundMusic.actx.currentTime*1e3});let e=new KeyListener("a");e.onPress=()=>{let i=!1;chart.notes.forEach(o=>{i||o.a||o.t!="A"||(Math.abs(o.h-sec)<=.08?(i=!0,o.a=perfectAnim,o.aa=sec,bus.emit("hit",1)):Math.abs(o.h-sec)<=.16?(i=!0,o.a=goodAnim,o.aa=sec,bus.emit("hit",2)):Math.abs(o.h-sec)<=.32&&(o.a=fadeOutAnim,o.aa=sec,o.ho=.25,bad++,bus.emit("miss",null)))})},e.onRelease=()=>{chart.notes.forEach(i=>{i.a<=0||i.t!="A"||i.y!="A"||i.h+i.al-sec>0&&i.h-sec<0&&(pointsGot-=i.a==perfect?100:75,i.a==perfect?perfect--:good--,i.a=-1,i.aa=0,bus.emit("miss",null))})},registerKeyListener(e);let s=new KeyListener("l");if(s.onPress=()=>{let i=!1;chart.notes.forEach(o=>{i||o.a||o.t!="B"||(Math.abs(o.h-sec)<=.08?(i=!0,o.a=perfectAnim,o.aa=sec,bus.emit("hit",1)):Math.abs(o.h-sec)<=.16?(i=!0,o.a=goodAnim,o.aa=sec,bus.emit("hit",2)):Math.abs(o.h-sec)<=.32&&(o.a=fadeOutAnim,o.aa=sec,o.ho=.25,bad++,bus.emit("miss",null)))})},e.onRelease=()=>{chart.notes.forEach(i=>{i.a<=0||i.t!="B"||i.y!="A"||i.h+i.al-sec>0&&i.h-sec<0&&(pointsGot-=i.a==perfectAnim?100:75,i.a==perfectAnim?perfect--:good--,i.a=-1,i.aa=0,bus.emit("miss",null))})},registerKeyListener(s),r==null)throw ec.clear(),renderText(loadErrorStr,1600,900,"center",200,new RGBAColor(200,200,200)),new Error("No data file given.");let n;if(await chartLoader.loadAsJson(`${r}.json`).then(async i=>n=i.default),n==null)throw ec.clear(),renderText(loadErrorStr,1600,900,"center",200,new RGBAColor(200,200,200)),new Error("Data file has nothing or corrupted or not exist.");n.script&&await scriptLoader.inject(n.script),ec.clear(),renderText(loadWaitClickStr,1600,900,"center",200,new RGBAColor(230,230,230)),await new Promise(i=>{document.onclick=()=>{document.onclick=null,i(null)}}),ec.clear(),renderText(loadDownloadStr,1600,900,"center",200,new RGBAColor(250,250,250)),hitSoundManager=new SoundManager(hit),backgroundMusic=new EnhancedAudioContext(new AudioContext),await backgroundMusic.actx.suspend(),await hitSoundManager.load(),n.bgsound?await backgroundMusic.load(await soundLoader.loadAsUrl(n.bgsound)):await backgroundMusic.load(blank),backgroundMusic.setVolume(backgroundVolume),hitSoundManager.setVolume(hitVolume),chart=new Chart(n),bus.on("start",()=>{let i=setInterval(async function(){if(paused){pausedTime=(Date.now()-startTime)/1e3-sec;return}if(lock){console.log("Dropping tick! Try reducing tps");return}lock=!0,ec.clear(),sec=(Date.now()-startTime)/1e3-pausedTime,bus.emit("tick",sec),chart.animationNotes.forEach(o=>{o.a==fadeInAnim&&sec-o.aa>o.hi?(o.a=0,o.aa=0):Math.abs(o.h-sec)<=1.5/tps?o.ho&&(o.a=fadeOutAnim,o.aa=sec):o.hi!=null&&Math.abs(o.h-o.p.spd-o.hi-sec)<=1.5/tps&&(o.a=fadeInAnim,o.aa=sec),drawNote(o),drawA(o)}),chart.notes.forEach(o=>{drawClackLine(o)}),chart.notes.forEach(o=>{sec-o.h>.16&&!o.a&&(o.a=-1,bus.emit("miss",null)),drawNote(o)}),chart.notes.forEach(o=>{drawA(o)}),drawTexts(),sec>=n.length&&(clearInterval(i),paused=!0,location.replace(`./finish.html${setQueryString({i:r,c:maxCombo,t:(pointsGot/chart.notesTotal/100*1e5).toFixed(0),p:perfect,g:good,b:bad,m:chart.notesTotal-perfect-good})}`)),lock=!1},1e3/tps)}),ec.clear(),await backgroundMusic.actx.resume(),backgroundMusic.play(),bus.emit("start",null)}globalThis.cinject=k=>eval(k);window.onload=main;const player=Object.freeze(Object.defineProperty({__proto__:null,bus,get ctx(){return ctx},drawA,drawClackLine,drawNote,get paused(){return paused},renderText,get sec(){return sec},tps},Symbol.toStringTag,{value:"Module"}));export{bus as b,chart$1 as c,event as e,gui as g,keyboard as k,network as n,player as p,renderText as r,sound as s};