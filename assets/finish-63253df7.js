import{_ as f}from"./preload-helper-8235fac6.js";import{_ as p}from"./dynamic-import-helper-be004503.js";function i(l){let m=new RegExp("(^|&)"+l+"=([^&]*)(&|$)","i"),o=window.location.search.substr(1).match(m);return o!=null?decodeURIComponent(o[2]):null}async function E(){var d,c;let l=i("i");document.getElementById("gameBox").style.backgroundImage=`url("${(await p(Object.assign({}),`./images/${l}.png`)).default}")`;let m=[],o=i("p"),s=i("g"),u=i("m"),g=i("c"),a=i("t");await f(()=>import("./data-3e9ffc66.js"),[]).then(async n=>m=n.default);let r="<Unknown>";m.forEach(n=>{n.id==l&&(r=n.name)}),document.getElementById("name").innerText=r,document.getElementById("mcnum").innerText=g,document.getElementById("pnum").innerText=o,document.getElementById("gnum").innerText=s,document.getElementById("mnum").innerText=u,document.getElementById("point").innerText=a;let t=parseInt(a),e="F";t>=1e5?e="∀":t>=96e3?e="S":t>=9e4?e="A":t>=84e3?e="B":t>=8e4?e="C":t>=75e3?e="D":t>=7e4&&(e="E"),document.getElementById("lvl").innerText=e,(d=document.getElementById("again"))==null||d.addEventListener("click",n=>{location.replace(`./player.html?id=${l}`)}),(c=document.getElementById("next"))==null||c.addEventListener("click",n=>{location.replace("./selector.html")})}window.onload=E;
