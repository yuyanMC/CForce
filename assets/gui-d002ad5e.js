var n=Object.defineProperty;var f=(h,t,s)=>t in h?n(h,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):h[t]=s;var i=(h,t,s)=>(f(h,typeof t!="symbol"?t+"":t,s),s);class C{constructor(t){i(this,"ctx");i(this,"backGroundColor","rgba(0,0,0,0)");i(this,"size",[300,150]);this.ctx=t,this.size=[parseInt(this.ctx.canvas.getAttribute("width")||"300"),parseInt(this.ctx.canvas.getAttribute("height")||"150")]}setBackGroundColor(t){this.backGroundColor=t}clear(){this.ctx.fillStyle=this.backGroundColor,this.ctx.clearRect(0,0,...this.size),this.ctx.fillRect(0,0,...this.size)}render(t){t.drawOnCtx(this.ctx)}}class g{}class p{constructor(t=-100,s=-100,e=new l(64,64,64),r=88){i(this,"x",-100);i(this,"y",-100);i(this,"f",new l(64,64,64));i(this,"r",88);this.x=t,this.y=s,this.f=e,this.r=r}drawOnCtx(t){t.fillStyle=`rgba(${this.f.getColor()[0]},${this.f.getColor()[1]},${this.f.getColor()[2]},${this.f.getColor()[3]})`,t.beginPath(),t.arc(this.x,this.y,this.r,0,Math.PI*2,!0),t.fill(),t.lineWidth=2,t.strokeStyle=`rgba(255,255,255,${this.f.getColor()[3]})`,t.beginPath(),t.arc(this.x,this.y,this.r/1.1,0,Math.PI*2,!0),t.stroke()}}class b{constructor(t,s,e){i(this,"p");i(this,"fp");i(this,"tp");this.p=t,this.fp=s,this.tp=e}drawOnCtx(t){if(this.tp<0||this.fp>1)return;this.tp>1&&(this.tp=1),this.fp<0&&(this.fp=0);let s=this.p.cal(this.tp);t.lineWidth=5,t.beginPath(),t.moveTo(...s);for(let e=this.tp;e>=this.fp&&e<=this.tp;e+=(this.fp-this.tp)/60)s=this.p.cal(e),t.strokeStyle="rgb(255,255,255)",t.lineTo(...s);t.stroke()}}class u{constructor(t,s,e,r="left",o=50,a=new l(255,255,255)){i(this,"text");i(this,"x");i(this,"y");i(this,"align");i(this,"fontSize");i(this,"fill");this.text=t,this.x=s,this.y=e,this.align=r,this.fontSize=o,this.fill=a}drawOnCtx(t){t.fillStyle=`rgba(${this.fill.getColor()[0]},${this.fill.getColor()[1]},${this.fill.getColor()[2]},${this.fill.getColor()[3]})`,t.font=`${this.fontSize}px 'Courier New'`,t.textAlign=this.align,t.fillText(this.text,this.x,this.y)}}class l{constructor(t,s,e,r=1){i(this,"c",[0,0,0,1]);this.c=[t,s,e,r]}getColor(){return this.c}}export{g as CanvasObject,b as ClackLineCanvasObject,C as EnhancedContent,p as NoteCanvasObject,l as RGBAColor,u as TextCanvasObject};
