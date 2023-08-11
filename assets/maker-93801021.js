import{v as I,a as Ae,b as Y}from"./runtime-dom.esm-bundler-8b9251e4.js";import Ce from"./hit-556a07c1.js";import{EnhancedContent as ye,TextCanvasObject as Ne,RGBAColor as c,NoteCanvasObject as V,ClackLineCanvasObject as xe}from"./gui-d002ad5e.js";import{EventBus as Te}from"./event-4329e05e.js";import{Chart as K,Note as Z,MultiPath as q,StaticPath as b,LinePath as ee,ArcPath as te,Pow2SPath as ae}from"./chart-aa21f35c.js";import{DynamicLoader as ne}from"./network-25d75818.js";import{EnhancedAudioContext as $e,SoundManager as Ie}from"./sound-37c3646d.js";import{s as Ee,t as f,C as O,u as Ue,v as p,w as a,F as H,D as R,E as M,G as g,x as D,B as h,H as se,I as Se,J as Be,_ as Pe}from"./_plugin-vue_export-helper-1dca6b40.js";import"./util-720ff2c1.js";const l=E=>(Se("data-v-b61b8939"),E=E(),Be(),E),Ve={id:"innerBox"},Me=l(()=>a("canvas",{id:"main_canvas",width:"3200",height:"1800"},null,-1)),De=[Me],Le={key:0,id:"notes"},Fe=["onClick"],Oe={class:"showNote"},He=["fill"],Re=l(()=>a("circle",{r:"2em",cx:"2.5em",cy:"2.5em",fill:"#00000000",stroke:"white","stroke-width":"0.05em"},null,-1)),je={class:"noteTag"},We=l(()=>a("span",{class:"noteTrack"},"Track",-1)),ze=["onUpdate:modelValue"],Ge=l(()=>a("option",{value:"A"},"A",-1)),Je=l(()=>a("option",{value:"B"},"B",-1)),Qe=[Ge,Je],Xe=l(()=>a("span",{class:"noteHitTime"},"Hit Time",-1)),Ye=["onUpdate:modelValue"],Ke=["onClick"],Ze={key:1,id:"notes"},qe=["onClick"],et={class:"showNote"},tt=["fill"],at=l(()=>a("circle",{r:"2em",cx:"2.5em",cy:"2.5em",fill:"#00000000",stroke:"white","stroke-width":"0.05em"},null,-1)),nt={class:"noteTag"},st=l(()=>a("span",{class:"noteTrack"},"Fill",-1)),lt=["value","onChange"],ot=l(()=>a("span",{class:"noteHitTime"},"Hit Time",-1)),it=["onUpdate:modelValue"],ut=["onClick"],ct={key:2,id:"notes"},rt={class:"noteTag"},dt=l(()=>a("span",{class:"noteTrack"},"Type",-1)),pt=["value","onChange"],ht=l(()=>a("option",{value:"static"},"Static",-1)),vt=l(()=>a("option",{value:"line"},"Line",-1)),_t=l(()=>a("option",{value:"arc"},"Arc",-1)),ft=l(()=>a("option",{value:"pow2"},"^2",-1)),mt=[ht,vt,_t,ft],wt=l(()=>a("span",{class:"noteHitTime"},"Length",-1)),gt=["onUpdate:modelValue"],kt=["onClick"],bt={id:"dataBox"},At=l(()=>a("span",null,"Sec: ",-1)),Ct=l(()=>a("br",null,null,-1)),yt=l(()=>a("span",null,"Paused: ",-1)),Nt=l(()=>a("br",null,null,-1)),xt=l(()=>a("span",null,"Chart: ",-1)),Tt=l(()=>a("br",null,null,-1)),$t=l(()=>a("span",null,"Upload Music: ",-1)),It=l(()=>a("br",null,null,-1)),Et=l(()=>a("span",null,"Upload Background: ",-1)),Ut=l(()=>a("br",null,null,-1)),St=l(()=>a("span",null,"Bar: ",-1)),Bt=l(()=>a("option",{value:"N"},"Notes",-1)),Pt=l(()=>a("option",{value:"AN"},"Animation Notes",-1)),Vt=l(()=>a("option",{value:"PE"},"Path Editor",-1)),Mt=[Bt,Pt,Vt],Dt=l(()=>a("br",null,null,-1)),Lt=l(()=>a("br",null,null,-1)),Ft=l(()=>a("br",null,null,-1)),Ot=Ee({__name:"maker",setup(E){const A=f("N");let le=new ne("images"),j=new ne("sounds"),N;const u=f(new K({notes:[],animationNotes:[],bgsound:"maker.mp3",length:3600}));let v=60,U,r=new $e(new AudioContext),oe=.5,ie=.5,k=0;const S=f(!1),C=O({get:()=>S.value,set:e=>{e!=S.value&&(e?(r.pause(),S.value=!0):(r.play(i.value),S.value=!1))}});let B=[];const x=f(0),i=f(0);let P=0,d,L=1e5,m=new Te,T=f({notes:[],animationNotes:[],bgsound:"maker.mp3",length:3600});const W=f(null),z=f(null),ue=f(null),G=f(null),_=f("none");function w(e,t,n,o="left",s=50,F=new c(255,255,255)){d.render(new Ne(e,t,n,o,s,F instanceof c?F:new c(255,255,255,F)))}function J(e){if(e.a||(i.value-e.h+e.p.spd)/e.p.spd<0||(i.value-e.h+e.p.spd)/e.p.spd>1)return;let t=e.p.cal((i.value-e.h+e.p.spd)/e.p.spd),n=new c(e.f[0],e.f[1],e.f[2]);d.render(new V(...t,n))}function ce(e){e.y=="A"&&((i.value-e.h+e.p.spd)/e.p.spd<0||(i.value-e.al-e.h+e.p.spd)/e.p.spd>1||d.render(new xe(e.p,(i.value-e.al-e.h+e.p.spd)/e.p.spd,(i.value-e.h+e.p.spd)/e.p.spd)))}function Q(e){if(e.a<=0)return;let t=i.value-e.aa,n=e.p.cal((e.aa-e.h+e.p.spd)/e.p.spd);if(e.a==12&&t<e.hi){let o=t/e.hi+1,s=new c(e.f[0],e.f[1],e.f[2],o-1);d.render(new V(...n,s))}else if(e.a==11&&t<e.ho){let o=t/e.ho+1,s=new c(e.f[0],e.f[1],e.f[2],2-o);d.render(new V(...n,s))}else if(e.a>0&&t<.25){let o=t/.25+1,s=new c(0,0,0,0);e.a==1?s=new c(160,144,0,2-o):e.a==2&&(s=new c(0,167,195,2-o)),d.render(new V(...n,s,o*88))}}function re(){N.fillStyle="rgb(255,255,255)",N.font="50px 'Courier New'",N.textAlign="center",w(`${k}`,1600,60,"center"),w("COMBO",1600,120,"center"),w(`Point: ${(k/u.value.notes.length*1e5).toFixed(0)}`,3150,60,"right"),w(`Music: ${(i.value/u.value.length*100).toFixed(2)}%`,3150,120,"right");{let e=B.length,t=new c(255,0,255);e/v>=0&&(t=new c(255,0,255)),e/v>.3&&(t=new c(255,0,63)),e/v>.6&&(t=new c(255,0,0)),e/v>.9&&(t=new c(255,127,0)),e/v>.95&&(t=new c(255,255,0)),e/v>.999&&(t=new c(0,255,0)),e/v>.99999&&(t=new c(0,255,255)),w(`TPS: ${e.toFixed(0)}/${v}`,3150,180,"right",50,t),w(`Sec: ${i.value.toFixed(3)} Paused: ${P.toFixed(3)} Total: ${((Date.now()-x.value)/1e3).toFixed(3)} Music: ${r.actx.currentTime.toFixed(3)}`,3150,240,"right")}}function de(){d.clear()}Ue(async()=>{document.getElementById("canvas_box").style.backgroundImage=`url(${await le.loadAsUrl("maker.png").catch(()=>"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIW2P4DwQACfsD/Z8fLAAAAAAASUVORK5CYII=")})`,N=document.getElementById("main_canvas").getContext("2d"),d=new ye(N),d.setBackGroundColor("rgba(0,0,0,0.5)"),d.clear(),w("游戏正在加载",1600,900,"center",200,new c(200,200,200)),m.on("hit",()=>{k++}),m.on("hit",()=>{U.play()}),m.on("tick",()=>{let t=Date.now();for(B.push(t);t-B[0]>=1e3;)B.splice(0,1)}),m.on("start",()=>{x.value=Date.now()-r.actx.currentTime*1e3}),d.clear(),w("加载中",1600,900,"center",200,new c(250,250,250)),U=new Ie(Ce),await r.actx.suspend(),await U.load(),await r.load(await j.loadAsUrl(T.value.bgsound)),r.setVolume(ie),U.setVolume(oe),m.on("start",()=>{setInterval(async function(){if(C.value){P=(Date.now()-x.value)/1e3-i.value;return}de(),i.value=(Date.now()-x.value)/1e3-P,m.emit("tick",i.value),u.value.animationNotes.forEach(t=>{t.a==12&&i.value-t.aa>t.hi?(t.a=0,t.aa=0):Math.abs(t.h-i.value)<=1.5/v?t.ho&&(t.a=11,t.aa=i.value):t.hi!=null&&Math.abs(t.h-t.p.spd-t.hi-i.value)<=1.5/v&&(t.a=12,t.aa=i.value),J(t),Q(t)}),u.value.notes.forEach(t=>{ce(t)}),u.value.notes.forEach(t=>{!t.a&&Math.abs(t.h-i.value)<1.5/v?(t.a=1,t.aa=t.h,m.emit("hit",1)):i.value-t.h>.16&&!t.a&&(t.a=-1,m.emit("miss",null)),J(t)}),u.value.notes.forEach(t=>{Q(t)}),re(),i.value>=T.value.length&&($.value=0)},1e3/v)}),d.clear(),await r.actx.resume(),r.play(0),m.emit("start",null)});const $=O({get:()=>i.value,set:e=>{u.value.notes.forEach(t=>{t.a=0,t.aa=0}),u.value.animationNotes.forEach(t=>{t.a=0,t.aa=0}),k=0,u.value.notes.forEach(t=>{t.h<e&&k++}),r.pause(),x.value=Date.now()-e*1e3,P=0,r.play(e)}}),X=O({get:()=>JSON.stringify(T.value),set:async e=>{let t;try{t=JSON.parse(e)}catch(n){console.error(n);return}u.value=new K(t),k=0,u.value.notes.forEach(n=>{n.h<i.value&&k++});try{r.pause()}catch(n){console.error(n)}t.bgsound!=T.value.bgsound&&(C.value=!0,d.clear(),w("加载中",1600,900,"center",200,new c(250,250,250)),await r.load(await j.loadAsUrl(t.bgsound)),d.clear()),T.value=t,$.value=0}});function pe(){let e=URL.createObjectURL(z.value.files[0]);console.log(e),G.value.style.backgroundImage=`url(${e})`}function he(){let e=URL.createObjectURL(W.value.files[0]);console.log(e),r.load(e)}function ve(e,t){let n=e.target.value;t.f=[parseInt(n.slice(1,3),16),parseInt(n.slice(3,5),16),parseInt(n.slice(5,7),16)]}function _e(e){if(e=="none")return"<<CURRENTLY NONE>>";if(e.startsWith("N"))return`Note ${parseInt(e.slice(1))+1}`;if(e.startsWith("AN"))return`Animation Note ${parseInt(e.slice(2))+1}`}function y(e){if(e=="none")return null;if(e.startsWith("N"))return u.value.notes[parseInt(e.slice(1))];if(e.startsWith("AN"))return u.value.animationNotes[parseInt(e.slice(2))]}function fe(e){if(e instanceof b)return"static";if(e instanceof ee)return"line";if(e instanceof te)return"arc";if(e instanceof ae)return"pow2";throw new Error("Invalid Path")}function me(e,t){let n=t.target.value,o=y(_.value).p.ps[e].spd,s=new b(o,1600,900);n=="static"&&(s=new b(o,1600,900)),n=="line"&&(s=new ee(o,0,0,1600,900)),n=="arc"&&(s=new te(o,0,0,-1600,900,1600,900)),n=="pow2"&&(s=new ae(new b(o,1600,900))),y(_.value).p.ps[e]=s}function we(){L=y(_.value).h;let e=y(_.value).p.spd;C.value=!1,$.value=e}m.on("tick",e=>{e>L&&(C.value=!0,L=1e5)});function ge(){u.value.notes.push(new Z(new q([new b(1e-4,1600,900)]),0,"A","I",0))}function ke(){u.value.animationNotes.push(new Z(new q([new b(1e-4,1600,900)]),0,"M","I",0,[64,64,64]))}function be(){y(_.value).p.ps.push(new b(1e-4,1600,900))}return(e,t)=>(h(),p("div",{id:"gameBox",ref_key:"gamebox",ref:ue},[a("div",Ve,[a("div",{id:"canvas_box",ref_key:"canvasbox",ref:G},De,512),A.value=="N"?(h(),p("ul",Le,[(h(!0),p(H,null,R(u.value.notes,(n,o)=>(h(),p("li",{class:se({selected:_.value==`N${o}`}),onClick:s=>_.value=`N${o}`},[(h(),p("svg",Oe,[a("circle",{r:"2.2em",cx:"2.5em",cy:"2.5em",fill:`rgb(${n.f[0]},${n.f[1]},${n.f[2]})`,"stroke-width":"0"},null,8,He),Re])),a("span",je,"Note #"+D(o+1),1),We,g(a("select",{class:"noteTrackInput","onUpdate:modelValue":s=>n.t=s},Qe,8,ze),[[Y,n.t]]),Xe,g(a("input",{class:"noteHitTimeInput","onUpdate:modelValue":s=>n.h=s,type:"text"},null,8,Ye),[[I,n.h,void 0,{number:!0}]]),a("span",{class:"noteDelete",onClick:s=>u.value.notes.splice(o,1)},"X",8,Ke)],10,Fe))),256)),a("li",{id:"add",onClick:ge}," + ")])):M("",!0),A.value=="AN"?(h(),p("ul",Ze,[(h(!0),p(H,null,R(u.value.animationNotes,(n,o)=>(h(),p("li",{class:se({selected:_.value==`AN${o}`}),onClick:s=>_.value=`AN${o}`},[(h(),p("svg",et,[a("circle",{r:"2.2em",cx:"2.5em",cy:"2.5em",fill:`rgb(${n.f[0]},${n.f[1]},${n.f[2]})`,"stroke-width":"0"},null,8,tt),at])),a("span",nt,"Animation Note #"+D(o+1),1),st,a("input",{class:"noteFillInput",type:"color",value:`#${n.f[0].toString(16)}${n.f[1].toString(16)}${n.f[2].toString(16)}`,onChange:s=>{ve(s,n)}},null,40,lt),ot,g(a("input",{class:"noteHitTimeInput","onUpdate:modelValue":s=>n.h=s,type:"text"},null,8,it),[[I,n.h,void 0,{number:!0}]]),a("span",{class:"noteDelete",onClick:s=>u.value.animationNotes.splice(o,1)},"X",8,ut)],10,qe))),256)),a("li",{id:"add",onClick:ke}," + ")])):M("",!0),A.value=="PE"?(h(),p("ul",ct,[(h(!0),p(H,null,R(y(_.value).p.ps,(n,o)=>(h(),p("li",null,[a("span",rt,"Path #"+D(o+1),1),dt,a("select",{class:"pathTrackInput",value:fe(n),onChange:s=>me(o,s)},mt,40,pt),wt,g(a("input",{class:"noteHitTimeInput","onUpdate:modelValue":s=>n.spd=s,type:"text"},null,8,gt),[[I,n.spd,void 0,{number:!0,lazy:!0}]]),a("span",{class:"noteDelete",onClick:s=>u.value.animationNotes.splice(o,1)},"X",8,kt)]))),256)),a("li",{id:"add",onClick:be}," + ")])):M("",!0),a("div",bt,[At,g(a("input",{"onUpdate:modelValue":t[0]||(t[0]=n=>$.value=n)},null,512),[[I,$.value,void 0,{lazy:!0}]]),Ct,yt,g(a("input",{id:"pause",type:"checkbox","onUpdate:modelValue":t[1]||(t[1]=n=>C.value=n)},null,512),[[Ae,C.value]]),Nt,xt,g(a("input",{"onUpdate:modelValue":t[2]||(t[2]=n=>X.value=n)},null,512),[[I,X.value]]),Tt,$t,a("input",{type:"file",accept:"audio/*",ref_key:"music",ref:W,onChange:he},null,544),It,Et,a("input",{type:"file",accept:"image/*",ref_key:"bg",ref:z,onChange:pe},null,544),Ut,St,g(a("select",{"onUpdate:modelValue":t[3]||(t[3]=n=>A.value=n)},Mt,512),[[Y,A.value,void 0,{lazy:!0}]]),Dt,a("span",null,"Current: "+D(_e(_.value)),1),Lt,A.value=="PE"?(h(),p("button",{key:0,onClick:we},"Preview")):M("",!0),Ft])])],512))}});const Yt=Pe(Ot,[["__scopeId","data-v-b61b8939"]]);export{Yt as default};
