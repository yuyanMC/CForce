<link rel="stylesheet" href="style/player.css">
<script setup lang="ts">
import {getQueryString, setQueryString} from "./player/util";
import {onMounted, ref} from "vue";
interface Song {
  id: string;
  name: string;
  difficulty: number;
}
const perfect = ref(getQueryString("p")!);
const good = ref(getQueryString("g")!);
const bad = ref(getQueryString("b")!);
const miss = ref(getQueryString("m")!);
const max_combo = ref(getQueryString("c")!);
const point = ref(getQueryString("t")!);
const song_name=ref("<Unknown>");
const p = ref(parseInt(point.value));
const rating = ref("F");
const id = ref(getQueryString("i")!);
const imgUrl=ref("");
if (p.value >= 100000) {
  rating.value = "∀";
} else if (p.value >= 96000) {
  rating.value = "S";
} else if (p.value >= 90000) {
  rating.value = "A";
} else if (p.value >= 84000) {
  rating.value = "B";
} else if (p.value >= 80000) {
  rating.value = "C";
} else if (p.value >= 75000) {
  rating.value = "D";
} else if (p.value >= 70000) {
  rating.value = "E";
}

onMounted(async ()=>{
  let songs: Song[] = [];
  await import("./data/data.json").then(async (response) => songs = response.default);
  for (const e of songs) {
    if (e.id == id.value) {
      song_name.value = e.name;
      imgUrl.value="url("+((await import(`./images/${e.id}.png`).catch(()=> {
        return {"default": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIW2P4DwQACfsD/Z8fLAAAAAAASUVORK5CYII="}
      })) as {default:string}).default+")";
    }
  }
});
function redirect(url:string){
  location.replace(url);
}
</script>

<template>
  <div id="gameBox" :style="'background-image:'+imgUrl">
    <div id="innerBox">
      <div id="data">
        <h1 id="name">{{song_name}}</h1>
        <span id="mctag">MAX COMBO</span>
        <span id="ptag">PERFECT</span>
        <span id="gtag">GOOD</span>
        <span id="btag">BAD</span>
        <span id="mtag">MISS</span>
        <span id="mcnum">{{max_combo}}</span>
        <span id="pnum">{{perfect}}</span>
        <span id="gnum">{{good}}</span>
        <span id="bnum">{{bad}}</span>
        <span id="mnum">{{miss}}</span>
        <span id="lvl">{{rating}}</span>
        <span id="point">{{point}}</span>
      </div>
      <div id="operation">
        <button id="again" @click="redirect(`./player.html${setQueryString({id:id})}`)">重打</button>
        <button id="next" @click="redirect(`./selector.html`)">继续</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes slideX {
  from{
    transform: translateX(200%);
  }
  to{
    transform: translateX(0px);
  }
}
#gameBox{
  color: white;
  font-family: 'Courier New', Courier, monospace;
  font-size: calc(0.025 * min(100vw, 56.25vw, 100vh, 177.78vh));
}
#gameBox{
  width: 100vw;
  height: 56.25vw; /* height:width ratio = 9/16 = .5625  */
  max-height: 100vh;
  max-width: 177.78vh; /* 16/9 = 1.778 */
  margin: auto;
  position: absolute;
  top:0;bottom:0; /* vertical center */
  left:0;right:0; /* horizontal center */
  background-repeat: no-repeat;
  background-size: contain;
  background-origin: content-box;
  overflow: hidden;
}
#innerBox{
  width: 100%;
  height: 100%;
  position: absolute;
  top:0;bottom:0; /* vertical center */
  left:0;right:0; /* horizontal center */
  background-color: rgba(0,0,0,0.5);
  backdrop-filter: blur(5em);
}
#data{
  animation: slideX 2s alternate;
  position: relative;
  top:17%;
  width: 56%;
  height: 46%;
  margin-left: 22%;
  margin-right: 22%;
  border: white 0.133em solid;
  background-color: rgba(0,0,0,0.5);
  border-radius: 1em;
}
#name{
  position: absolute;
  top:10%;
  left:10%;
  font-size: 2em;
}
#mctag,#ptag,#gtag,#btag,#mtag{
  position:absolute;
  top:70%;
  width: 20%;
  text-align: center;
}
#mcnum,#pnum,#gnum,#bnum,#mnum{
  position:absolute;
  top:80%;
  width: 20%;
  text-align: center;
}
#mctag,#mcnum{
  left:15%;
}
#ptag,#pnum{
  left:30%;
}
#gtag,#gnum{
  left:45%;
}
#btag,#bnum{
  left:60%;
}
#mtag,#mnum{
  left:75%;
}
#lvl{
  position: absolute;
  top:40%;
  left:10%;
  font-size: 6em;
  text-shadow: -0.067em 0.067em 0.022em #808080;
}
#point{
  position: absolute;
  top:40%;
  left:30%;
  font-size: 3em;
}
#operation{
  animation: slideX 2s alternate;
  position: relative;
  top: 22%;
  width: 56%;
  height: 10%;
  margin-left: 22%;
  margin-right: 22%;
  border: white 0.133em solid;
  background-color: #00000077;
  border-radius: 1em;
}
#operation>button{
  position: absolute;
  background-color: black;
  color: white;
  outline: 0;
  border: white 0.067em solid;
  font-size: 1em;
  padding: 1.435%;
}
#operation>button:hover{
  transform: scale(1.2);
}
#again{
  left:1.435%;
  top:15.04%;
  height:69.92%;
  border-radius: 0.5em;
}
#next{
  right:1.435%;
  top:15.04%;
  height:69.92%;
  border-radius: 0.5em;
}
*{
  box-sizing: border-box;
  margin: 0;
  padding:0;
  font-family: 'Courier New', Courier, monospace;
}
</style>