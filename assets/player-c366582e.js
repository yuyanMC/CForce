var W=Object.defineProperty;var q=(t,i,r)=>i in t?W(t,i,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[i]=r;var e=(t,i,r)=>(q(t,typeof i!="symbol"?i+"":i,r),r);import{_ as $,a as Q}from"./dynamic-import-helper-6cac4324.js";import J from"./hit-c1377711.js";import K from"./blank-8d2f1394.js";class X{constructor(i){e(this,"ctx");e(this,"backGroundColor","rgba(0,0,0,0)");e(this,"size",[300,150]);this.ctx=i,this.size=[parseInt(this.ctx.canvas.getAttribute("width")||"300"),parseInt(this.ctx.canvas.getAttribute("height")||"150")]}setBackGroundColor(i){this.backGroundColor=i}clear(){this.ctx.fillStyle=this.backGroundColor,this.ctx.clearRect(0,0,...this.size),this.ctx.fillRect(0,0,...this.size)}render(i){i.drawOnCtx(this.ctx)}}class k{constructor(i=-100,r=-100,a=new n(64,64,64),s=88){e(this,"x",-100);e(this,"y",-100);e(this,"f",new n(64,64,64));e(this,"r",88);this.x=i,this.y=r,this.f=a,this.r=s}drawOnCtx(i){i.fillStyle=`rgba(${this.f.getColor()[0]},${this.f.getColor()[1]},${this.f.getColor()[2]},${this.f.getColor()[3]})`,i.beginPath(),i.arc(this.x,this.y,this.r,0,Math.PI*2,!0),i.fill(),i.lineWidth=2,i.strokeStyle=`rgba(255,255,255,${this.f.getColor()[3]})`,i.beginPath(),i.arc(this.x,this.y,this.r/1.1,0,Math.PI*2,!0),i.stroke()}}class Y{constructor(i,r,a){e(this,"p");e(this,"fp");e(this,"tp");this.p=i,this.fp=r,this.tp=a}drawOnCtx(i){if(this.tp<0||this.fp>1)return;this.tp>1&&(this.tp=1),this.fp<0&&(this.fp=0);let r=this.p.cal(this.tp);i.lineWidth=5,i.beginPath(),i.moveTo(...r);for(let a=this.tp;a>=this.fp&&a<=this.tp;a+=(this.fp-this.tp)/u)r=this.p.cal(a),i.strokeStyle="rgb(255,255,255)",i.lineTo(...r);i.stroke()}}class Z{constructor(i,r,a,s="left",h=50,c=new n(255,255,255)){e(this,"text");e(this,"x");e(this,"y");e(this,"align");e(this,"fontSize");e(this,"fill");this.text=i,this.x=r,this.y=a,this.align=s,this.fontSize=h,this.fill=c}drawOnCtx(i){i.fillStyle=`rgba(${this.fill.getColor()[0]},${this.fill.getColor()[1]},${this.fill.getColor()[2]},${this.fill.getColor()[3]})`,i.font=`${this.fontSize}px 'Courier New'`,i.textAlign=this.align,i.fillText(this.text,this.x,this.y)}}class n{constructor(i,r,a,s=1){e(this,"c",[0,0,0,1]);this.c=[i,r,a,s]}getColor(){return this.c}}class tt{constructor(){e(this,"map",new Map)}on(i,r){let a=this.map.get(i);a||(a=new Set,this.map.set(i,a)),a.add(r)}emit(i,r){const a=this.map.get(i);if(!a)return;[...a].forEach(h=>h(r))}}let C,y=[],V=[],u=144,f=null,A=0,x=null,L=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],d=null,R=.2,b=0,O=0,j=0,S=0,v=0,P=0,B=!1,M=[],w=0,I=Date.now(),o=0,D=0,p;const l=new tt;class E{constructor(i){e(this,"spd");this.spd=i}cal(i){return[0,0]}}class it extends E{constructor(r,a,s){super(r);e(this,"x");e(this,"y");this.x=a,this.y=s}cal(r){return[this.x,this.y]}}class st extends E{constructor(r,a,s,h,c){super(r);e(this,"fx");e(this,"fy");e(this,"tx");e(this,"ty");this.fx=a,this.fy=s,this.tx=h,this.ty=c}cal(r){return[this.fx+(this.tx-this.fx)*r,this.fy+(this.ty-this.fy)*r]}}class at extends E{constructor(r,a,s,h,c,m=1600,T=900){super(r);e(this,"cx");e(this,"cy");e(this,"fromx");e(this,"fromy");e(this,"tox");e(this,"toy");if((h-a)**2+(c-s)**2-(m-a)**2-(T-s)**2>=.01)throw Error(`Invalid ArcPath for(${a} ${s} ${h} ${c} ${m} ${T})`);this.cx=a,this.cy=s,this.fromx=h,this.fromy=c,this.tox=m,this.toy=T}cal(r){if(r<0)return[this.fromx,this.fromy];if(r>1)return[this.tox,this.toy];let a=G(this.cx,this.cy,this.fromx,this.fromy),s=G(this.cx,this.cy,this.tox,this.toy),h=a+(s-a)*r,c=Math.sqrt((this.tox-this.cx)**2+(this.toy-this.cy)**2);return[Math.cos(h)*c+this.cx,Math.sin(h)*c+this.cy]}}class U extends E{constructor(r){super(r.spd);e(this,"p");this.p=r}}class rt extends U{constructor(i){super(i)}cal(i){return this.p.cal(i**2)}}class et extends U{constructor(i){super(i)}cal(i){return this.p.cal((1-i)**2)}}class N extends E{constructor(r){let a=0;r.forEach(h=>{a+=h.spd});super(a);e(this,"ps");e(this,"ssp");this.ps=r,this.ssp=[];let s=0;this.ssp.push(0),r.forEach(h=>{s+=h.spd,this.ssp.push(s/a)})}cal(r){for(let a=1;a<this.ssp.length;a++)if(r<this.ssp[a]){let s=(r-this.ssp[a-1])/(this.ssp[a]-this.ssp[a-1]);return this.ps[a-1].cal(s)}return this.ps[this.ps.length-1].cal(1)}}class F{constructor(i,r,a,s,h,c){e(this,"p");e(this,"h");e(this,"a");e(this,"aa");e(this,"ho");e(this,"hi");e(this,"t");e(this,"y");e(this,"al");e(this,"f");this.p=i,this.h=r,this.t=a,this.y=s,this.a=0,this.aa=0,this.y=="A"&&h==null&&(h=0),this.al=h,this.f=c||[64,64,64]}}function g(t,i,r,a="left",s=50,h=new n(255,255,255)){p.render(new Z(t,i,r,a,s,h instanceof n?h:new n(255,255,255,h)))}function ht(t){let i=new RegExp("(^|&)"+t+"=([^&]*)(&|$)","i"),r=window.location.search.substr(1).match(i);return r!=null?decodeURIComponent(r[2]):null}function G(t,i,r,a){return a==i?Math.PI:a<i?Math.PI/2-Math.atan((r-t)/(a-i))+Math.PI:Math.PI/2-Math.atan((r-t)/(a-i))}function z(t){if((o-t.h+t.p.spd)/t.p.spd<0||(o-t.h+t.p.spd)/t.p.spd>1)return;let i=t.p.cal((o-t.h+t.p.spd)/t.p.spd),r;t.t=="A"?r=new n(0,220,240):t.t=="B"?r=new n(220,70,20):r=new n(t.f[0],t.f[1],t.f[2]),p.render(new k(...i,r))}function ot(t){t.y=="A"&&((o-t.h+t.p.spd)/t.p.spd<0||(o-t.al-t.h+t.p.spd)/t.p.spd>1||p.render(new Y(t.p,(o-t.al-t.h+t.p.spd)/t.p.spd,(o-t.h+t.p.spd)/t.p.spd)))}function H(t){let i=o-t.aa;if(t.a==12&&i<t.hi){let r=t.p.cal(0),a=i/t.hi+1,s=new n(t.f[0],t.f[1],t.f[2],a-1);p.render(new k(...r,s))}else if(t.a==11&&i<t.ho){let r=t.p.cal(1),a=i/t.ho+1,s=new n(t.f[0],t.f[1],t.f[2],2-a);p.render(new k(...r,s))}else if(t.a>0&&i<.25){let r=i/.25+1,a=t.p.cal(1),s=new n(0,0,0,0);t.a==1?s=new n(160,144,0,2-r):t.a==2&&(s=new n(0,167,195,2-r)),p.render(new k(...a,s,r*88))}}function nt(){C.fillStyle="rgb(255,255,255)",C.font="50px 'Courier New'",C.textAlign="center",g(`${A}`,1600,60,"center"),g("COMBO",1600,120,"center"),g(`Point: ${(b/O*1e5).toFixed(0)}`,3150,60,"right"),g(`Music: ${(o/f.length*100).toFixed(2)}%`,3150,120,"right");{w=M.length;let t=new n(255,0,255);w/u>=0&&(t=new n(255,0,255)),w/u>.3&&(t=new n(255,0,63)),w/u>.6&&(t=new n(255,0,0)),w/u>.9&&(t=new n(255,127,0)),w/u>.95&&(t=new n(255,255,0)),w/u>.999&&(t=new n(0,255,0)),w/u>.99999&&(t=new n(0,255,255)),g(`TPS: ${w.toFixed(2)}/${u}`,3150,180,"right",50,t),g(`Sec: ${o.toFixed(3)} Paused: ${D.toFixed(3)} Total: ${((Date.now()-I)/1e3).toFixed(3)} Music: ${d.currentTime.toFixed(3)}`,3150,240,"right")}}function _(t){let i=t,r=new E(0);switch(i.type){case"arc":r=new at(i.spd,i.c[0],i.c[1],i.f[0],i.f[1],i.t[0],i.t[1]);break;case"line":r=new st(i.spd,i.f[0],i.f[1],i.t[0],i.t[1]);break;case"static":r=new it(i.spd,i.pos[0],i.pos[1]);break;case"pow2":r=new rt(_(i.p));break;case"rpow2":r=new et(_(i.p));break;default:throw Error("Invalid path type")}return r}function lt(){if(f===null)throw Error("Song not loaded");f.notes.forEach(t=>{let i=[];t.paths.forEach(a=>{i.push(_(a))});let r=new N(i);y.push(new F(r,t.h,t.track,t.type,t.al))}),f.animationNotes.forEach(t=>{let i=[];t.paths.forEach(s=>{i.push(_(s))});let r=new N(i),a=new F(r,t.h,"M",t.type,t.al,t.fill);a.ho=t.ho,a.hi=t.hi,V.push(a)}),O=f.notes.length*100,j=f.notes.length}function ct(){p.clear()}async function ft(){let t=ht("id");if(document.getElementById("canvas_box").style.backgroundImage=`url(${(await $(()=>import(`/images/${t}.png`),[])).default})`,C=document.getElementById("main_canvas").getContext("2d"),p=new X(C),p.setBackGroundColor("rgba(0,0,0,0.5)"),p.clear(),g("游戏正在加载",1600,900,"center",200,new n(200,200,200)),l.on("hit",function(a){A++,S=Math.max(A,S),a==1?(b+=100,v+=1):a==2&&(b+=75,P+=1)}),l.on("hit",function(a){for(let s=0;s<16;s++)if(Date.now()>L[s]){x[s].play(),L[s]=Date.now()+200,console.log(`Playing hit ${s}`);break}}),l.on("miss",function(a){A=0}),l.on("tick",function(a){let s=Date.now();for(M.push(s);s-M[0]>=1e3;)M.splice(0,1)}),l.on("start",function(a){I=Date.now()-d.currentTime*1e3}),document.addEventListener("keydown",a=>{let s=!1;a.keyCode==65&&(y.forEach(h=>{s||h.a||h.t!="A"||(Math.abs(h.h-o)<=.08?(s=!0,h.a=1,h.aa=o,l.emit("hit",1)):Math.abs(h.h-o)<=.16&&(s=!0,h.a=2,h.aa=o,l.emit("hit",2)))}),s||l.emit("miss",null)),a.keyCode==76&&(y.forEach(h=>{s||h.a||h.t!="B"||(Math.abs(h.h-o)<=.08?(s=!0,h.a=1,h.aa=o,l.emit("hit",1)):Math.abs(h.h-o)<=.16&&(s=!0,h.a=2,h.aa=o,l.emit("hit",2)))}),s||l.emit("miss",null))}),document.addEventListener("keyup",a=>{a.keyCode==65&&y.forEach(s=>{s.a<=0||s.t!="A"||s.y!="A"||s.h+s.al-o>0&&s.h-o<0&&(b-=s.a==1?100:75,s.a==1?v--:P--,s.a=-1,s.aa=0,l.emit("miss",null))}),a.keyCode==76&&y.forEach(s=>{s.a<=0||s.t!="B"||s.y!="A"||s.h+s.al-o>0&&s.h-o<0&&(b-=s.a==1?100:75,s.a==1?v--:P--,s.a=-1,s.aa=0,l.emit("miss",null))})}),t==null)throw p.clear(),g("游戏加载错误，请尝试刷新",1600,900,"center",200,new n(200,200,200)),new Error("No data file given.");if(await $(()=>import(`/charts/${t}.json`),[]).then(async a=>f=a.default),f==null)throw p.clear(),g("游戏加载错误，请尝试刷新",1600,900,"center",200,new n(200,200,200)),new Error("Data file has nothing or corrupted or not exist.");f.script&&await Q(Object.assign({"./scripts/introduction.ts":()=>$(()=>import("./introduction-f64e75bf.js"),["assets/introduction-f64e75bf.js","assets/dynamic-import-helper-6cac4324.js","assets/hit-c1377711.js","assets/blank-8d2f1394.js"]),"./scripts/timer.ts":()=>$(()=>import("./timer-238ffce4.js"),["assets/timer-238ffce4.js","assets/dynamic-import-helper-6cac4324.js","assets/hit-c1377711.js","assets/blank-8d2f1394.js"])}),`./scripts/${f.script}.ts`),x=[];for(let a=0;a<16;a++)x.push(new Audio(J));if(f.bgsound?d=new Audio((await $(()=>import(`./sounds/${f.bgsound}`),[])).default):d=new Audio(K),/[\s\S]*(iPhone|iPad|iPod)[\s\S]*/.test(navigator.userAgent)){d.load();for(let a=0;a<16;a++)x[a].load()}await new Promise(a=>{let s=setInterval(()=>{x[0].readyState==HTMLMediaElement.HAVE_ENOUGH_DATA&&d.readyState==HTMLMediaElement.HAVE_ENOUGH_DATA&&(clearInterval(s),a(null))},10)}),d.volume=.5*R,x.forEach(a=>{a.volume=1*R}),lt(),p.clear();let r=setInterval(()=>{d.currentTime>0&&(clearInterval(r),l.emit("start",null))},1);d.play().catch(async a=>{alert("您未开启音频自动播放，请关闭弹窗后点击屏幕开始游戏。"),await new Promise(s=>{document.onclick=h=>{s(null),document.onclick=null}}),d.play()}),l.on("start",()=>{let a=setInterval(async function(){if(B){D=(Date.now()-I)/1e3-o;return}ct(),o=(Date.now()-I)/1e3-D,l.emit("tick",o),V.forEach(s=>{s.a==12&&o-s.aa>s.hi?(s.a=0,s.aa=0):Math.abs(s.h-o)<=1.5/u?s.ho&&(s.a=11,s.aa=o):s.hi!=null&&Math.abs(s.h-s.p.spd-s.hi-o)<=1.5/u&&(s.a=12,s.aa=o),z(s),H(s)}),y.forEach(s=>{ot(s)}),y.forEach(s=>{o-s.h>.16&&!s.a&&(s.a=-1,l.emit("miss",null)),z(s)}),y.forEach(s=>{H(s)}),nt(),o>=f.length&&(clearInterval(a),B=!0,location.replace(`./finish.html?i=${t}&c=${S}&t=${(b/O*1e5).toFixed(0)}&p=${v}&g=${P}&m=${j-v-P}`))},1e3/u)})}window.onload=ft;export{l as b,g as r};
