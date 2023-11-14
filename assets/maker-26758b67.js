import{v as I,a as me,b as Y}from"./runtime-dom.esm-bundler-6cb5672f.js";import{h as ge,b as we,a as ke,f as ye}from"./const-81308dad.js";import{EnhancedContent as Ae,TextCanvasObject as Ce,RGBAColor as c,NoteCanvasObject as M,ClackLineCanvasObject as Ne}from"./gui-d002ad5e.js";import{EventBus as xe}from"./event-4329e05e.js";import{Chart as X,Note as Z,MultiPath as q,StaticPath as D,LinePath as be,ArcPath as Ie,Pow2SPath as Ee}from"./chart-27dff426.js";import{EnhancedAudioContext as $e,SoundManager as Te}from"./sound-37c3646d.js";import Be from"./vuepath-066fe26b.js";import{s as Pe,t as v,C as F,u as Se,v as d,w as s,F as L,D as R,E as A,G as w,x as H,B as r,H as ee,I as Ue,J as Ve,K as Me,_ as De}from"./_plugin-vue_export-helper-8166945e.js";import"./util-dc03d8d1.js";const l=E=>(Ve("data-v-1c61967c"),E=E(),Me(),E),Fe={id:"innerBox"},Oe=l(()=>s("canvas",{id:"main_canvas",width:"3200",height:"1800"},null,-1)),Le=[Oe],Re={key:0,id:"notes"},He=["onClick"],je={class:"showNote"},We=["fill"],ze=l(()=>s("circle",{r:"2em",cx:"2.5em",cy:"2.5em",fill:"#00000000",stroke:"white","stroke-width":"0.05em"},null,-1)),Ge={class:"noteTag"},Je=l(()=>s("span",{class:"noteTrack"},"Track",-1)),Ke=["onUpdate:modelValue"],Qe=l(()=>s("option",{value:"A"},"A",-1)),Ye=l(()=>s("option",{value:"B"},"B",-1)),Xe=[Qe,Ye],Ze=l(()=>s("span",{class:"noteHitTime"},"Hit Time",-1)),qe=l(()=>s("span",{class:"noteClack"},"Clack Note",-1)),et=["checked","onChange"],tt={key:0,class:"noteClackTime"},at=["onUpdate:modelValue"],st=["onUpdate:modelValue"],lt=["onClick"],nt={key:1,id:"notes"},ot=["onClick"],it={class:"showNote"},ut=["fill"],ct=l(()=>s("circle",{r:"2em",cx:"2.5em",cy:"2.5em",fill:"#00000000",stroke:"white","stroke-width":"0.05em"},null,-1)),rt={class:"noteTag"},dt=l(()=>s("span",{class:"noteTrack"},"Fill",-1)),ht=["value","onChange"],pt=l(()=>s("span",{class:"noteHitTime"},"Hit Time",-1)),ft=["onUpdate:modelValue"],vt=["onClick"],_t={key:2,id:"notes"},mt={id:"dataBox"},gt=l(()=>s("span",null,"Sec: ",-1)),wt=l(()=>s("br",null,null,-1)),kt=l(()=>s("span",null,"Paused: ",-1)),yt=l(()=>s("br",null,null,-1)),At=l(()=>s("span",null,"Chart: ",-1)),Ct=l(()=>s("br",null,null,-1)),Nt=l(()=>s("span",null,"Upload Music: ",-1)),xt=l(()=>s("br",null,null,-1)),bt=l(()=>s("span",null,"Upload Background: ",-1)),It=l(()=>s("br",null,null,-1)),Et=l(()=>s("span",null,"Bar: ",-1)),$t=l(()=>s("option",{value:"N"},"Notes",-1)),Tt=l(()=>s("option",{value:"AN"},"Animation Notes",-1)),Bt=l(()=>s("option",{value:"PE"},"Path Editor",-1)),Pt=[$t,Tt,Bt],St=l(()=>s("br",null,null,-1)),Ut=l(()=>s("br",null,null,-1)),Vt=l(()=>s("br",null,null,-1)),Mt=Pe({__name:"maker",setup(E){const k=v("N");let C;const i=v(new X({notes:[],animationNotes:[],length:3600}));let h=60,$,p=new $e(new AudioContext),te=.5,ae=.5,N=0;const T=v(!1),y=F({get:()=>T.value,set:e=>{e!=T.value&&(e?(p.pause(),T.value=!0):(p.play(o.value),T.value=!1))}});let B=[];const x=v(0),o=v(0);let P=0,f,S=1e5,_=new xe;v({notes:[],animationNotes:[],bgsound:"maker.mp3",length:3600});const j=v(null),W=v(null),se=v(null),z=v(null),m=v("none");function g(e,t,a,u="center",n=50,O=new c(255,255,255)){f.render(new Ce(e,t,a,u,n,O instanceof c?O:new c(255,255,255,O)))}function G(e){if(e.a||(o.value-e.h+e.p.spd)/e.p.spd<0||(o.value-e.h+e.p.spd)/e.p.spd>1)return;let t=e.p.cal((o.value-e.h+e.p.spd)/e.p.spd),a=new c(e.f[0],e.f[1],e.f[2]);f.render(new M(...t,a))}function le(e){e.y=="A"&&((o.value-e.h+e.p.spd)/e.p.spd<0||(o.value-e.al-e.h+e.p.spd)/e.p.spd>1||f.render(new Ne(e.p,(o.value-e.al-e.h+e.p.spd)/e.p.spd,(o.value-e.h+e.p.spd)/e.p.spd)))}function J(e){if(e.a<=0)return;let t=o.value-e.aa,a=e.p.cal((e.aa-e.h+e.p.spd)/e.p.spd);if(e.a==12&&t<e.hi){let u=t/e.hi+1,n=new c(e.f[0],e.f[1],e.f[2],u-1);f.render(new M(...a,n))}else if(e.a==11&&t<e.ho){let u=t/e.ho+1,n=new c(e.f[0],e.f[1],e.f[2],2-u);f.render(new M(...a,n))}else if(e.a>0&&t<.25){let u=t/.25+1,n=new c(0,0,0,0);e.a==1?n=new c(160,144,0,2-u):e.a==2&&(n=new c(0,167,195,2-u)),f.render(new M(...a,n,u*88))}}function ne(){C.fillStyle=ke,C.font=ye,C.textAlign="center",g(`${N}`,1600,60),g("COMBO",1600,120),g(`Point: ${(N/i.value.notes.length*1e5).toFixed(0)}`,3150,60,"right"),g(`Music: ${(o.value/i.value.length*100).toFixed(2)}%`,3150,120,"right");{let e=B.length,t=new c(255,0,255);e/h>=0&&(t=new c(255,0,255)),e/h>.3&&(t=new c(255,0,63)),e/h>.6&&(t=new c(255,0,0)),e/h>.9&&(t=new c(255,127,0)),e/h>.95&&(t=new c(255,255,0)),e/h>.999&&(t=new c(0,255,0)),e/h>.99999&&(t=new c(0,255,255)),g(`TPS: ${e.toFixed(0)}/${h}`,3150,180,"right",50,t),g(`Sec: ${o.value.toFixed(3)} Paused: ${P.toFixed(3)} Total: ${((Date.now()-x.value)/1e3).toFixed(3)} Music: ${p.actx.currentTime.toFixed(3)}`,3150,240,"right")}}function oe(){f.clear()}Se(async()=>{document.getElementById("canvas_box").style.backgroundImage="url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIW2P4DwQACfsD/Z8fLAAAAAAASUVORK5CYII=)",C=document.getElementById("main_canvas").getContext("2d"),f=new Ae(C),f.setBackGroundColor("rgba(0,0,0,0.5)"),f.clear(),g("游戏正在加载",1600,900,"center",200,new c(200,200,200)),_.on("hit",()=>{N++}),_.on("hit",()=>{$.play()}),_.on("tick",()=>{let t=Date.now();for(B.push(t);t-B[0]>=1e3;)B.splice(0,1)}),_.on("start",()=>{x.value=Date.now()-p.actx.currentTime*1e3}),f.clear(),g("加载中",1600,900,"center",200,new c(250,250,250)),$=new Te(ge),await p.actx.suspend(),await $.load(),await p.load(we),p.setVolume(ae),$.setVolume(te),_.on("start",()=>{setInterval(function(){if(y.value){P=(Date.now()-x.value)/1e3-o.value;return}oe(),o.value=(Date.now()-x.value)/1e3-P,_.emit("tick",o.value),i.value.animationNotes.forEach(t=>{t.a==12&&o.value-t.aa>t.hi?(t.a=0,t.aa=0):Math.abs(t.h-o.value)<=1.5/h?t.ho&&(t.a=11,t.aa=o.value):t.hi!=null&&Math.abs(t.h-t.p.spd-t.hi-o.value)<=1.5/h&&(t.a=12,t.aa=o.value),G(t),J(t)}),i.value.notes.forEach(t=>{le(t)}),i.value.notes.forEach(t=>{!t.a&&Math.abs(t.h-o.value)<1.5/h?(t.a=1,t.aa=t.h,_.emit("hit",1)):o.value-t.h>.16&&!t.a&&(t.a=-1,_.emit("miss",null)),G(t)}),i.value.notes.forEach(t=>{J(t)}),ne(),o.value>=i.value.length&&(U.value=0)},1e3/h)}),f.clear(),await p.actx.resume(),p.play(0),_.emit("start",null)});const U=F({get:()=>o.value,set:e=>{i.value.notes.forEach(t=>{t.a=0,t.aa=0}),i.value.animationNotes.forEach(t=>{t.a=0,t.aa=0}),N=0,i.value.notes.forEach(t=>{t.h<e&&N++}),p.pause(),x.value=Date.now()-e*1e3,P=0,o.value=e,y||p.play(e)}});function b(e){if(e instanceof D)return{type:"static",pos:[e.x,e.y],spd:e.spd};if(e instanceof be)return{type:"line",f:[e.fx,e.fy],t:[e.tx,e.ty],spd:e.spd};if(e instanceof Ie)return{type:"arc",c:[e.cx,e.cy],f:[e.fromx,e.fromy],t:[e.tox,e.toy],spd:e.spd};if(e instanceof Ee)return{type:"pow2",p:b(e.p),f:e.f,t:e.t}}function ie(e){if(e.y=="I"){let t={h:0,paths:[],track:void 0,type:"I"};return t.h=e.h,e.p.ps.forEach(a=>{t.paths.push(b(a))}),t.track=e.t,t}else{let t={h:0,paths:[],track:void 0,type:"A",al:void 0};return t.h=e.h,e.p.ps.forEach(a=>{t.paths.push(b(a))}),t.track=e.t,t.al=e.al,t}}function ue(e){if(e.y=="I"){let t={h:0,paths:[],type:"I"};return t.h=e.h,e.p.ps.forEach(a=>{t.paths.push(b(a))}),t}else{let t={h:0,paths:[],type:"A",al:void 0};return t.h=e.h,e.p.ps.forEach(a=>{t.paths.push(b(a))}),t.al=e.al,t}}const K=F({get:()=>{let e={animationNotes:[],length:0,notes:[]};return i.value.notes.forEach(t=>{e.notes.push(ie(t))}),i.value.animationNotes.forEach(t=>{e.animationNotes.push(ue(t))}),e.length=i.value.length,e},set:e=>{i.value=new X(e)}}),Q=F({get:()=>JSON.stringify(K.value),set:e=>{K.value=JSON.parse(e)}});function ce(){let e=URL.createObjectURL(W.value.files[0]);console.log(e),z.value.style.backgroundImage=`url(${e})`}function re(){let e=URL.createObjectURL(j.value.files[0]);console.log(e),p.load(e)}function de(e,t){let a=e.target.value;t.f=[parseInt(a.slice(1,3),16),parseInt(a.slice(3,5),16),parseInt(a.slice(5,7),16)]}function he(e){if(e=="none")return"<<CURRENTLY NONE>>";if(e.startsWith("N"))return`Note ${parseInt(e.slice(1))+1}`;if(e.startsWith("AN"))return`Animation Note ${parseInt(e.slice(2))+1}`}function V(e){if(e=="none")return null;if(e.startsWith("N"))return i.value.notes[parseInt(e.slice(1))];if(e.startsWith("AN"))return i.value.animationNotes[parseInt(e.slice(2))]}function pe(){S=V(m.value).h;let e=V(m.value).p.spd;y.value=!1,U.value=S-e}_.on("tick",e=>{e>S&&(y.value=!0,S=1e5)});function fe(){i.value.notes.push(new Z(new q([new D(1e-4,1600,900)]),0,"A","I",0))}function ve(){i.value.animationNotes.push(new Z(new q([new D(1e-4,1600,900)]),0,"M","I",0,[64,64,64]))}function _e(){V(m.value).p.ps.push(new D(1e-4,1600,900))}return(e,t)=>(r(),d("div",{id:"gameBox",ref_key:"gamebox",ref:se},[s("div",Fe,[s("div",{id:"canvas_box",ref_key:"canvasbox",ref:z},Le,512),k.value=="N"?(r(),d("ul",Re,[(r(!0),d(L,null,R(i.value.notes,(a,u)=>(r(),d("li",{class:ee({selected:m.value==`N${u}`}),onClick:n=>m.value=`N${u}`},[(r(),d("svg",je,[s("circle",{r:"2.2em",cx:"2.5em",cy:"2.5em",fill:`rgb(${a.f[0]},${a.f[1]},${a.f[2]})`,"stroke-width":"0"},null,8,We),ze])),s("span",Ge,"Note #"+H(u+1),1),Je,w(s("select",{class:"noteTrackInput","onUpdate:modelValue":n=>a.t=n},Xe,8,Ke),[[Y,a.t]]),Ze,qe,s("input",{type:"checkbox",class:"noteIfClack",checked:a.y=="A",onChange:n=>{a.y=n.target.checked?"A":"I"}},null,40,et),a.y=="A"?(r(),d("span",tt,"Clack Length")):A("",!0),a.y=="A"?w((r(),d("input",{key:1,class:"noteClackTimeInput","onUpdate:modelValue":n=>a.al=n,type:"text"},null,8,at)),[[I,a.al,void 0,{number:!0}]]):A("",!0),w(s("input",{class:"noteHitTimeInput","onUpdate:modelValue":n=>a.h=n,type:"text"},null,8,st),[[I,a.h,void 0,{number:!0}]]),s("span",{class:"noteDelete",onClick:n=>i.value.notes.splice(u,1)},"X",8,lt)],10,He))),256)),s("li",{id:"add",onClick:fe}," + ")])):A("",!0),k.value=="AN"?(r(),d("ul",nt,[(r(!0),d(L,null,R(i.value.animationNotes,(a,u)=>(r(),d("li",{class:ee({selected:m.value==`AN${u}`}),onClick:n=>m.value=`AN${u}`},[(r(),d("svg",it,[s("circle",{r:"2.2em",cx:"2.5em",cy:"2.5em",fill:`rgb(${a.f[0]},${a.f[1]},${a.f[2]})`,"stroke-width":"0"},null,8,ut),ct])),s("span",rt,"Animation Note #"+H(u+1),1),dt,s("input",{class:"noteFillInput",type:"color",value:`#${a.f[0].toString(16)}${a.f[1].toString(16)}${a.f[2].toString(16)}`,onChange:n=>{de(n,a)}},null,40,ht),pt,w(s("input",{class:"noteHitTimeInput","onUpdate:modelValue":n=>a.h=n,type:"text"},null,8,ft),[[I,a.h,void 0,{number:!0}]]),s("span",{class:"noteDelete",onClick:n=>i.value.animationNotes.splice(u,1)},"X",8,vt)],10,ot))),256)),s("li",{id:"add",onClick:ve}," + ")])):A("",!0),k.value=="PE"?(r(),d("ul",_t,[(r(!0),d(L,null,R(V(m.value).p.ps,(a,u)=>(r(),Ue(Be,{path:a,index:u,chart:i.value,sel:m.value},null,8,["path","index","chart","sel"]))),256)),s("li",{id:"add",onClick:_e}," + ")])):A("",!0),s("div",mt,[gt,w(s("input",{"onUpdate:modelValue":t[0]||(t[0]=a=>U.value=a)},null,512),[[I,U.value,void 0,{lazy:!0}]]),wt,kt,w(s("input",{id:"pause",type:"checkbox","onUpdate:modelValue":t[1]||(t[1]=a=>y.value=a)},null,512),[[me,y.value]]),yt,At,w(s("textarea",{id:"chartArea","onUpdate:modelValue":t[2]||(t[2]=a=>Q.value=a)},null,512),[[I,Q.value,void 0,{lazy:!0}]]),Ct,Nt,s("input",{type:"file",accept:"audio/*",ref_key:"music",ref:j,onChange:re},null,544),xt,bt,s("input",{type:"file",accept:"image/*",ref_key:"bg",ref:W,onChange:ce},null,544),It,Et,w(s("select",{"onUpdate:modelValue":t[3]||(t[3]=a=>k.value=a)},Pt,512),[[Y,k.value,void 0,{lazy:!0}]]),St,s("span",null,"Current: "+H(he(m.value)),1),Ut,k.value=="PE"?(r(),d("button",{key:0,onClick:pe},"Preview")):A("",!0),Vt])])],512))}});const Gt=De(Mt,[["__scopeId","data-v-1c61967c"]]);export{Gt as default};