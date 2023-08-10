var x=Object.defineProperty;var d=(o,i,s)=>i in o?x(o,i,{enumerable:!0,configurable:!0,writable:!0,value:s}):o[i]=s;var h=(o,i,s)=>(d(o,typeof i!="symbol"?i+"":i,s),s);import{c as u}from"./util-720ff2c1.js";class e{constructor(i){h(this,"notes");h(this,"animationNotes");h(this,"notesTotal");h(this,"length");this.notes=[],this.animationNotes=[],i.notes.forEach(s=>{let t=[];s.paths.forEach(a=>{t.push(e.parsePath(a))});let r=new y(t);s.type!=="I"?this.notes.push(new n(r,s.h,s.track,s.type,s.al,s.track=="A"?[0,220,240]:[220,70,20])):this.notes.push(new n(r,s.h,s.track,s.type,0,s.track=="A"?[0,220,240]:[220,70,20]))}),i.animationNotes.forEach(s=>{let t=[];s.paths.forEach(c=>{t.push(e.parsePath(c))});let r=new y(t),a;s.type!=="I"?a=new n(r,s.h,"M",s.type,s.al,s.fill):a=new n(r,s.h,"M",s.type,void 0,s.fill),a.ho=s.ho,a.hi=s.hi,this.animationNotes.push(a)}),this.notesTotal=i.notes.length,this.length=i.length}static parsePath(i){let s=i,t=new p(0);switch(s.type){case"arc":t=new k(s.spd,s.c[0],s.c[1],s.f[0],s.f[1],s.t[0],s.t[1]);break;case"line":t=new P(s.spd,s.f[0],s.f[1],s.t[0],s.t[1]);break;case"static":t=new w(s.spd,s.pos[0],s.pos[1]);break;case"pow2":t=new b(e.parsePath(s.p),s.f,s.t);break;default:throw Error("Invalid path type")}return t}}class p{constructor(i){h(this,"spd");this.spd=i}cal(i){return[0,0]}}class w extends p{constructor(s,t,r){super(s);h(this,"x");h(this,"y");this.x=t,this.y=r}cal(s){return[this.x,this.y]}}class P extends p{constructor(s,t,r,a,c){super(s);h(this,"fx");h(this,"fy");h(this,"tx");h(this,"ty");this.fx=t,this.fy=r,this.tx=a,this.ty=c}cal(s){return[this.fx+(this.tx-this.fx)*s,this.fy+(this.ty-this.fy)*s]}}class k extends p{constructor(s,t,r,a,c,f=1600,l=900){super(s);h(this,"cx");h(this,"cy");h(this,"fromx");h(this,"fromy");h(this,"tox");h(this,"toy");if((a-t)**2+(c-r)**2-(f-t)**2-(l-r)**2>=.01)throw Error(`Invalid ArcPath for(${t} ${r} ${a} ${c} ${f} ${l})`);this.cx=t,this.cy=r,this.fromx=a,this.fromy=c,this.tox=f,this.toy=l}cal(s){if(s<0)return[this.fromx,this.fromy];if(s>1)return[this.tox,this.toy];let t=u(this.cx,this.cy,this.fromx,this.fromy),r=u(this.cx,this.cy,this.tox,this.toy),a=t+(r-t)*s,c=Math.sqrt((this.tox-this.cx)**2+(this.toy-this.cy)**2);return[Math.cos(a)*c+this.cx,Math.sin(a)*c+this.cy]}}class E extends p{constructor(s){super(s.spd);h(this,"p");this.p=s}}class b extends E{constructor(s,t=0,r=1){super(s);h(this,"f");h(this,"t");this.f=t,this.t=r}cal(s){return this.p.cal((this.f+(this.t-this.f)*s)**2)}}class y extends p{constructor(s){let t=0;s.forEach(a=>{t+=a.spd});super(t);h(this,"ps");h(this,"ssp");this.ps=s,this.ssp=[];let r=0;this.ssp.push(0),s.forEach(a=>{r+=a.spd,this.ssp.push(r/t)})}cal(s){for(let t=1;t<this.ssp.length;t++)if(s<this.ssp[t]){let r=(s-this.ssp[t-1])/(this.ssp[t]-this.ssp[t-1]);return this.ps[t-1].cal(r)}return this.ps[this.ps.length-1].cal(1)}}class n{constructor(i,s,t,r,a,c){h(this,"p");h(this,"h");h(this,"a");h(this,"aa");h(this,"ho");h(this,"hi");h(this,"t");h(this,"y");h(this,"al");h(this,"f");this.p=i,this.h=s,this.t=t,this.y=r,this.a=0,this.aa=0,this.y=="A"&&a==null&&(a=0),this.al=a,this.f=c||[64,64,64]}}export{e as Chart,n as Note,p as Path};
