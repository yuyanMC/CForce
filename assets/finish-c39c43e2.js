import{g as o,_,s as E}from"./util-720ff2c1.js";import{_ as y}from"./dynamic-import-helper-be004503.js";import{s as b,t,u as B,v as D,w as e,x as n,y as I,z as O,A as S,B as C,_ as x}from"./_plugin-vue_export-helper-79bc846b.js";const V={id:"innerBox"},R={id:"data"},P={id:"name"},k=S('<span id="mctag" data-v-d62f8653>MAX COMBO</span><span id="ptag" data-v-d62f8653>PERFECT</span><span id="gtag" data-v-d62f8653>GOOD</span><span id="btag" data-v-d62f8653>BAD</span><span id="mtag" data-v-d62f8653>MISS</span>',5),w={id:"mcnum"},L={id:"pnum"},Q={id:"gnum"},T={id:"bnum"},U={id:"mnum"},M={id:"lvl"},$={id:"point"},F={id:"operation"},N=b({__name:"finish",setup(z){const m=t(o("p")),v=t(o("g")),A=t(o("b")),f=t(o("m")),g=t(o("c")),l=t(o("t")),u=t("<Unknown>"),i=t(parseInt(l.value)),s=t("F"),r=t(o("i")),p=t("");i.value>=1e5?s.value="∀":i.value>=96e3?s.value="S":i.value>=9e4?s.value="A":i.value>=84e3?s.value="B":i.value>=8e4?s.value="C":i.value>=75e3?s.value="D":i.value>=7e4&&(s.value="E"),B(async()=>{let d=[];await _(()=>import("./data-c295b173.js"),[],import.meta.url).then(async a=>d=a.default);for(const a of d)a.id==r.value&&(u.value=a.name,p.value="url("+(await y(Object.assign({"./images/atthespeedoflight.png":()=>_(()=>import("./atthespeedoflight-d3f26589.js"),[],import.meta.url),"./images/introduction.png":()=>_(()=>import("./introduction-45cb3d30.js"),[],import.meta.url),"./images/otherside.png":()=>_(()=>import("./otherside-f2c500b1.js"),[],import.meta.url)}),`./images/${a.id}.png`).catch(()=>({default:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIW2P4DwQACfsD/Z8fLAAAAAAASUVORK5CYII="}))).default+")")});function c(d){location.replace(d)}return(d,a)=>(C(),D("div",{id:"gameBox",style:O("background-image:"+p.value)},[e("div",V,[e("div",R,[e("h1",P,n(u.value),1),k,e("span",w,n(g.value),1),e("span",L,n(m.value),1),e("span",Q,n(v.value),1),e("span",T,n(A.value),1),e("span",U,n(f.value),1),e("span",M,n(s.value),1),e("span",$,n(l.value),1)]),e("div",F,[e("button",{id:"again",onClick:a[0]||(a[0]=h=>c(`./player.html${I(E)({id:r.value})}`))},"重打"),e("button",{id:"next",onClick:a[1]||(a[1]=h=>c("./selector.html"))},"继续")])])],4))}});const j=x(N,[["__scopeId","data-v-d62f8653"]]);export{j as default};
