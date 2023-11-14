<script setup lang="ts">
import hit from "./sounds/hit.mp3";
import blank from "./sounds/blank.mp3";
import {ClackLineCanvasObject, EnhancedContent, NoteCanvasObject, RGBAColor, TextCanvasObject} from './maker/gui';
import {EventBus} from "./maker/event";
import {
  ArcPath,
  Chart, JAnimationNote,
  JChart,
  JNote,
  JPath,
  LinePath,
  MultiPath,
  Note,
  Path,
  Pow2SPath,
  StaticPath
} from "./maker/chart";
import {EnhancedAudioContext, SoundManager} from "./maker/sound";
import {computed, onMounted, Ref, ref} from "vue";
import {background, font} from "./player/const";
import Vuepath from "./maker/vuepath.vue";

const bar = ref("N");
let ctx: CanvasRenderingContext2D;
const chart = ref(new Chart({notes: [], animationNotes: [], length: 3600}));
let tps: number = 60;
let hitSoundManager: SoundManager;
let backgroundMusic: EnhancedAudioContext = new EnhancedAudioContext(new AudioContext());
let hitVolume: number = 0.5;
let backgroundVolume: number = 0.5;
let perfect = 0;
const _p = ref(false);
const paused = computed({
  get: () => {
    return _p.value;
  },
  set: (n) => {
    if (n == _p.value) {
      return;
    }
    if (n) {
      backgroundMusic.pause();
      _p.value = true;
    } else {
      backgroundMusic.play(sec.value);
      _p.value = false;
    }
  }
});
let tickTimes: number[] = [];
let debug = true;
const startTime = ref(0);
const sec = ref(0);
let pausedTime = 0;
let ec: EnhancedContent;
let sh = 100000;
let bus = new EventBus<{
  hit: number,
  miss: null,
  tick: number,
  start: null,
}>();
let song: Ref<JChart> = ref({notes: [], animationNotes: [], bgsound: "maker.mp3", length: 3600});
const music = ref(null);
const bg = ref(null);
const gamebox = ref(null);
const canvasbox = ref(null);
const sel = ref("none");

function renderText(text: string, x: number, y: number, align: CanvasTextAlign = "center", fontSize: number = 50, fill: RGBAColor | number = new RGBAColor(255, 255, 255)) {
  ec.render(new TextCanvasObject(text, x, y, align, fontSize, fill instanceof RGBAColor ? fill : new RGBAColor(255, 255, 255, fill)));
}

function drawNote(note: Note) {
  if (note.a) {
    return;
  }
  if ((sec.value - note.h + note.p.spd) / note.p.spd < 0 || (sec.value - note.h + note.p.spd) / note.p.spd > 1) {
    return;
  }
  let np = note.p.cal((sec.value - note.h + note.p.spd) / note.p.spd);
  let c: RGBAColor = new RGBAColor(note.f[0], note.f[1], note.f[2]);
  ec.render(new NoteCanvasObject(...np, c));
}

function drawClackLine(note: Note) {
  if (note.y != "A") {
    return;
  }
  if ((sec.value - note.h + note.p.spd) / note.p.spd < 0 || (sec.value - note.al! - note.h + note.p.spd) / note.p.spd > 1) {
    return;
  }
  ec.render(new ClackLineCanvasObject(note.p, (sec.value - note.al! - note.h + note.p.spd) / note.p.spd, (sec.value - note.h + note.p.spd) / note.p.spd))
}

function drawA(note: Note) {
  if (note.a <= 0) {
    return;
  }
  let ad = sec.value - note.aa;
  let np = note.p.cal((note.aa - note.h + note.p.spd) / note.p.spd);
  if (note.a == 12 && ad < note.hi!) {
    let rc = ad / note.hi! + 1;
    let c = new RGBAColor(note.f[0], note.f[1], note.f[2], rc - 1);
    ec.render(new NoteCanvasObject(...np, c));
  } else if (note.a == 11 && ad < note.ho!) {
    let rc = ad / note.ho! + 1;
    let c = new RGBAColor(note.f[0], note.f[1], note.f[2], 2 - rc);
    ec.render(new NoteCanvasObject(...np, c));
  } else if (note.a > 0 && ad < 0.25) {
    let rc = ad / 0.25 + 1;
    let c: RGBAColor = new RGBAColor(0, 0, 0, 0);
    if (note.a == 1) {
      c = new RGBAColor(160, 144, 0, 2 - rc);
    } else if (note.a == 2) {
      c = new RGBAColor(0, 167, 195, 2 - rc);
    }
    ec.render(new NoteCanvasObject(...np, c, rc * 88));
  }
}

function drawTexts() {
  ctx.fillStyle = background;
  ctx.font = font;
  ctx.textAlign = "center";
  renderText(`${perfect}`, 1600, 60);
  renderText(`COMBO`, 1600, 120);
  renderText(`Point: ${(perfect / chart.value.notes.length * 100000).toFixed(0)}`, 3150, 60, "right");
  renderText(`Music: ${(sec.value / chart.value.length * 100).toFixed(2)}%`, 3150, 120, "right");
  if (debug) {
    let trueTps = tickTimes.length;
    let c = new RGBAColor(255, 0, 255);
    if ((trueTps / tps) >= 0.00) {
      c = new RGBAColor(255, 0, 255);
    }
    if ((trueTps / tps) > 0.30) {
      c = new RGBAColor(255, 0, 63);
    }
    if ((trueTps / tps) > 0.60) {
      c = new RGBAColor(255, 0, 0);
    }
    if ((trueTps / tps) > 0.90) {
      c = new RGBAColor(255, 127, 0);
    }
    if ((trueTps / tps) > 0.95) {
      c = new RGBAColor(255, 255, 0);
    }
    if ((trueTps / tps) > 0.999) {
      c = new RGBAColor(0, 255, 0);
    }
    if ((trueTps / tps) > 0.99999) {
      c = new RGBAColor(0, 255, 255);
    }
    renderText(`TPS: ${trueTps.toFixed(0)}/${tps}`, 3150, 180, "right", 50, c);
    renderText(`Sec: ${sec.value.toFixed(3)} Paused: ${pausedTime.toFixed(3)} Total: ${((Date.now() - startTime.value) / 1000).toFixed(3)} Music: ${backgroundMusic.actx.currentTime.toFixed(3)}`, 3150, 240, "right");
  }
}

function nextFrame() {
  ec.clear();
}

onMounted(async () => {
  //let id = getQueryString("id");
  document.getElementById("canvas_box")!.style.backgroundImage = `url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIW2P4DwQACfsD/Z8fLAAAAAAASUVORK5CYII=)`;
  let canvas: HTMLCanvasElement = document.getElementById('main_canvas') as HTMLCanvasElement;
  ctx = canvas.getContext('2d')!;
  ec = new EnhancedContent(ctx);
  ec.setBackGroundColor("rgba(0,0,0,0.5)");
  ec.clear();
  renderText("游戏正在加载", 1600, 900, "center", 200, new RGBAColor(200, 200, 200));
  bus.on("hit", () => {
    perfect++;
  });
  bus.on("hit", () => {
    hitSoundManager.play();
  });
  bus.on("tick", () => {
    let now = Date.now();
    tickTimes.push(now);
    while (now - tickTimes[0] >= 1000) {
      tickTimes.splice(0, 1);
    }
  });
  bus.on("start", () => {
    startTime.value = Date.now() - backgroundMusic.actx.currentTime * 1000;
  });
  ec.clear();
  renderText("加载中", 1600, 900, "center", 200, new RGBAColor(250, 250, 250));
  hitSoundManager = new SoundManager(hit);
  await backgroundMusic.actx.suspend();
  await hitSoundManager.load();
  await backgroundMusic.load(blank);
  backgroundMusic.setVolume(backgroundVolume);
  hitSoundManager.setVolume(hitVolume);
  bus.on("start", () => {
    setInterval(function () {
      if (paused.value) {
        pausedTime = (Date.now() - startTime.value) / 1000 - sec.value;
        return;
      }
      nextFrame();
      sec.value = (Date.now() - startTime.value) / 1000 - pausedTime;
      bus.emit("tick", sec.value);
      (chart.value.animationNotes as Note[]).forEach(element => {
        if (element.a == 12 && sec.value - element.aa > element.hi!) {
          element.a = 0;
          element.aa = 0;
        } else if (Math.abs(element.h - sec.value) <= 1.5 / tps) {
          if (element.ho) {
            element.a = 11;
            element.aa = sec.value;
          }
        } else if (element.hi != undefined && Math.abs((element.h - element.p.spd - element.hi) - sec.value) <= 1.5 / tps) {
          element.a = 12;
          element.aa = sec.value;
        }
        drawNote(element);
        drawA(element);
      });
      (chart.value.notes as Note[]).forEach(element => {
        drawClackLine(element);
      });
      (chart.value.notes as Note[]).forEach(element => {
        if (!element.a && (Math.abs(element.h - sec.value) < 1.5 / tps)) {
          element.a = 1;
          element.aa = element.h;
          bus.emit("hit", 1);
        } else if ((sec.value - element.h) > 0.16 && !element.a) {
          element.a = -1;
          bus.emit("miss", null);
        }
        drawNote(element);
      });
      (chart.value.notes as Note[]).forEach(element => {
        drawA(element);
      });
      drawTexts();
      if (sec.value >= chart.value.length) {
        csec.value = 0;
      }
    }, 1000 / tps);
  });
  ec.clear();
  await backgroundMusic.actx.resume();
  backgroundMusic.play(0);
  bus.emit("start", null);
});
const csec = computed({
  get: () => sec.value,
  set: (n) => {
    chart.value.notes.forEach(e => {
      e.a = 0;
      e.aa = 0;
    });
    chart.value.animationNotes.forEach(e => {
      e.a = 0;
      e.aa = 0;
    });
    perfect = 0;
    chart.value.notes.forEach(e => {
      if (e.h < n) {
        perfect++;
      }
    });
    backgroundMusic.pause();
    startTime.value = Date.now() - n * 1000;
    pausedTime = 0;
    sec.value = n;
    if (!paused) {
      backgroundMusic.play(n);
    }
  }
});
function reParsePath(p:Path):JPath{
  if (p instanceof StaticPath) {
    return {
      type:"static",
      pos:[p.x,p.y],
      spd:p.spd
    };
  }
  if (p instanceof LinePath) {
    return {
      type:"line",
      f:[p.fx,p.fy],
      t:[p.tx,p.ty],
      spd:p.spd
    };
  }
  if (p instanceof ArcPath) {
    return {
      type:"arc",
      c:[p.cx,p.cy],
      f:[p.fromx,p.fromy],
      t:[p.tox,p.toy],
      spd:p.spd
    };
  }
  if (p instanceof Pow2SPath) {
    return {
      type:"pow2",
      p:reParsePath(p.p),
      f:p.f,
      t:p.t
    };
  }
}
function reParseNote(n:Note){
  if(n.y=="I") {
    let r: JNote = {h: 0, paths: [], track: undefined, type: "I"};
    r.h = n.h;
    (n.p as MultiPath).ps.forEach(e => {
      r.paths.push(reParsePath(e));
    });
    r.track = (n.t as "A" | "B");
    return r;
  }else{
    let r: JNote = {h: 0, paths: [], track: undefined, type: "A", al:undefined};
    r.h = n.h;
    (n.p as MultiPath).ps.forEach(e => {
      r.paths.push(reParsePath(e));
    });
    r.track = (n.t as "A" | "B");
    r.al=n.al;
    return r;
  }
}
function reParseAnimationNote(n:Note){
  if(n.y=="I") {
    let r: JAnimationNote = {h: 0, paths: [], type: "I"};
    r.h = n.h;
    (n.p as MultiPath).ps.forEach(e => {
      r.paths.push(reParsePath(e));
    });
    return r;
  }else{
    let r: JAnimationNote = {h: 0, paths: [], type: "A", al:undefined};
    r.h = n.h;
    (n.p as MultiPath).ps.forEach(e => {
      r.paths.push(reParsePath(e));
    });
    r.al=n.al;
    return r;
  }
}
const csong = computed({
  get: ()=>{
    let r:JChart={animationNotes: [], length: 0, notes: []};
    chart.value.notes.forEach(e=>{
      r.notes.push(reParseNote(e as Note));
    });
    chart.value.animationNotes.forEach(e=>{
      r.animationNotes.push(reParseAnimationNote(e as Note));
    });
    r.length=chart.value.length;
    return r;
  },
  set: (n)=>{
    chart.value=new Chart(n);
  }
});
const cpsong=computed({
  get:()=>{
    return JSON.stringify(csong.value);
  },
  set:(n)=>{
    csong.value=JSON.parse(n);
  }
});
function changeBackground() {
  let url = URL.createObjectURL(bg.value.files[0]);
  console.log(url);
  canvasbox.value.style.backgroundImage = `url(${url})`;
}

function changeBackgroundMusic() {
  let url = URL.createObjectURL(music.value.files[0]);
  console.log(url);
  backgroundMusic.load(url);
}

function cColor(e: Event, n: Note) {
  let c = (e.target as HTMLInputElement).value;
  n.f = [parseInt(c.slice(1, 3), 16), parseInt(c.slice(3, 5), 16), parseInt(c.slice(5, 7), 16)];
}

function showSel(s: string) {
  if (s == "none") {
    return "<<CURRENTLY NONE>>";
  }
  if (s.startsWith("N")) {
    return `Note ${parseInt(s.slice(1)) + 1}`;
  }
  if (s.startsWith("AN")) {
    return `Animation Note ${parseInt(s.slice(2)) + 1}`;
  }
}

function getNote(s: string): Note {
  if (s == "none") {
    return null;
  }
  if (s.startsWith("N")) {
    return chart.value.notes[parseInt(s.slice(1))] as Note;
  }
  if (s.startsWith("AN")) {
    return chart.value.animationNotes[parseInt(s.slice(2))] as Note;
  }
}

function getType(p: Path) {
  if (p instanceof StaticPath) {
    return "static";
  }
  if (p instanceof LinePath) {
    return "line";
  }
  if (p instanceof ArcPath) {
    return "arc";
  }
  if (p instanceof Pow2SPath) {
    return "pow2";
  }
  throw new Error("Invalid Path");
}

function changePathType(p: number, e: Event) {
  let type = (e.target as HTMLSelectElement).value;
  let spd = (getNote(sel.value).p as MultiPath).ps[p].spd;
  let path: Path = new StaticPath(spd, 1600, 900);
  if (type == "static") {
    path = new StaticPath(spd, 1600, 900);
  }
  if (type == "line") {
    path = new LinePath(spd, 0, 0, 1600, 900);
  }
  if (type == "arc") {
    path = new ArcPath(spd, 0, 0, -1600, 900, 1600, 900);
  }
  if (type == "pow2") {
    path = new Pow2SPath(new StaticPath(spd, 1600, 900));
  }
  (getNote(sel.value).p as MultiPath).ps[p] = path;
}

function previewPath() {
  sh = getNote(sel.value).h;
  let s = getNote(sel.value).p.spd;
  paused.value = false;
  csec.value = sh-s;
}

bus.on("tick", (e) => {
  if (e > sh) {
    paused.value = true;
    sh = 100000;
  }
});

function pushNote() {
  chart.value.notes.push(new Note(new MultiPath([new StaticPath(0.0001, 1600, 900)]), 0, 'A', 'I', 0));
}

function pushANote() {
  chart.value.animationNotes.push(new Note(new MultiPath([new StaticPath(0.0001, 1600, 900)]), 0, 'M', 'I', 0, [64, 64, 64]));
}

function pushPath() {
  (getNote(sel.value).p as MultiPath).ps.push(new StaticPath(0.0001, 1600, 900));
}


</script>

<template>
  <div id="gameBox" ref="gamebox">
    <div id="innerBox">
      <div id="canvas_box" ref="canvasbox">
        <canvas id="main_canvas" width="3200" height="1800"></canvas>
      </div>
      <ul id="notes" v-if="bar=='N'">
        <li v-for="(note,index) of chart.notes" :class="{selected:sel==`N${index}`}" @click="sel=`N${index}`">
          <svg class="showNote">
            <circle r="2.2em" cx="2.5em" cy="2.5em" :fill="`rgb(${note.f[0]},${note.f[1]},${note.f[2]})`"
                    stroke-width="0"></circle>
            <circle r="2em" cx="2.5em" cy="2.5em" fill="#00000000" stroke="white" stroke-width="0.05em"></circle>
          </svg>
          <span class="noteTag">Note #{{ index + 1 }}</span>
          <span class="noteTrack">Track</span>
          <select class="noteTrackInput" v-model="note.t">
            <option value="A">A</option>
            <option value="B">B</option>
          </select>
          <span class="noteHitTime">Hit Time</span>
          <span class="noteClack">Clack Note</span>
          <input type="checkbox" class="noteIfClack" :checked="note.y=='A'" @change="e=>{note.y=(e.target as HTMLInputElement).checked?'A':'I'}">
          <span class="noteClackTime" v-if="note.y=='A'">Clack Length</span>
          <input class="noteClackTimeInput" v-if="note.y=='A'" v-model.number="note.al" type="text"/>
          <input class="noteHitTimeInput" v-model.number="note.h" type="text"/>
          <span class="noteDelete" @click="chart.notes.splice(index,1)">X</span>
        </li>
        <li id="add" @click="pushNote">
          +
        </li>
      </ul>
      <ul id="notes" v-if="bar=='AN'">
        <li v-for="(note,index) of chart.animationNotes" :class="{selected:sel==`AN${index}`}"
            @click="sel=`AN${index}`">
          <svg class="showNote">
            <circle r="2.2em" cx="2.5em" cy="2.5em" :fill="`rgb(${note.f[0]},${note.f[1]},${note.f[2]})`"
                    stroke-width="0"></circle>
            <circle r="2em" cx="2.5em" cy="2.5em" fill="#00000000" stroke="white" stroke-width="0.05em"></circle>
          </svg>
          <span class="noteTag">Animation Note #{{ index + 1 }}</span>
          <span class="noteTrack">Fill</span>
          <input class="noteFillInput" type="color"
                 :value="`#${note.f[0].toString(16)}${note.f[1].toString(16)}${note.f[2].toString(16)}`"
                 @change="e=>{cColor(e,note as Note)}"/>
          <span class="noteHitTime">Hit Time</span>
          <input class="noteHitTimeInput" v-model.number="note.h" type="text"/>
          <span class="noteDelete" @click="chart.animationNotes.splice(index,1)">X</span>
        </li>
        <li id="add" @click="pushANote">
          +
        </li>
      </ul>
      <ul id="notes" v-if="bar=='PE'">
        <template v-for="(path,index) in (getNote(sel).p as MultiPath).ps">
          <Vuepath :path="path" :index="index" :chart="chart" :sel="sel"></Vuepath>
          <!--
          <li>
            <span class="noteTag">Path #{{ index + 1 }}</span>
            <span class="noteTrack">Type</span>
            <select class="pathTrackInput" :value="getType(path)" @change="e=>changePathType(index,e)">
              <option value="static">Static</option>
              <option value="line">Line</option>
              <option value="arc">Arc</option>
              <option value="pow2">^2</option>
            </select>
            <template v-if="path instanceof StaticPath">
              <div class="pathPosition">
                (
                <input class="pathPositionInput" v-model.number.lazy="path.x" type="text"/>
                ,
                <input class="pathPositionInput" v-model.number.lazy="path.y" type="text"/>
                )
              </div>
              <span class="noteHitTime">Length</span>
              <input class="noteHitTimeInput" v-model.number.lazy="path.spd" type="text"/>
            </template>
            <template v-if="path instanceof LinePath">
              <div class="pathPosition">
                (
                <input class="pathPositionInput" v-model.number.lazy="path.fx" type="text"/>
                ,
                <input class="pathPositionInput" v-model.number.lazy="path.fy" type="text"/>
                )->(
                <input class="pathPositionInput" v-model.number.lazy="path.tx" type="text"/>
                ,
                <input class="pathPositionInput" v-model.number.lazy="path.ty" type="text"/>
                )
              </div>
              <span class="noteHitTime">Length</span>
              <input class="noteHitTimeInput" v-model.number.lazy="path.spd" type="text"/>
            </template>
            <template v-if="path instanceof ArcPath">
              <div class="pathPosition arcEdit">
                (
                <input class="pathPositionInput" v-model.number.lazy="path.fromx" type="text"/>
                ,
                <input class="pathPositionInput" v-model.number.lazy="path.fromy" type="text"/>
                )-(
                <input class="pathPositionInput" v-model.number.lazy="path.cx" type="text"/>
                ,
                <input class="pathPositionInput" v-model.number.lazy="path.cy" type="text"/>
                )>(
                <input class="pathPositionInput" v-model.number.lazy="path.tox" type="text"/>
                ,
                <input class="pathPositionInput" v-model.number.lazy="path.toy" type="text"/>
                )
              </div>
              <span class="noteHitTime">Length</span>
              <input class="noteHitTimeInput" v-model.number.lazy="path.spd" type="text"/>
            </template>
            <span class="noteDelete" @click="(getNote(sel).p as MultiPath).ps.splice(index,1)">X</span>
          </li>
          -->
        </template>
        <!--<li v-for="(path,index) in (getNote(sel).p as MultiPath).ps">
          <span class="noteTag">Path #{{ index + 1 }}</span>
          <span class="noteTrack">Type</span>
          <select class="pathTrackInput" :value="getType(path)" @change="e=>changePathType(index,e)">
            <option value="static">Static</option>
            <option value="line">Line</option>
            <option value="arc">Arc</option>
            <option value="pow2">^2</option>
          </select>
          <template v-if="path instanceof StaticPath">
            <div class="pathPosition">
              (
              <input class="pathPositionInput" v-model.number.lazy="path.x" type="text"/>
              ,
              <input class="pathPositionInput" v-model.number.lazy="path.y" type="text"/>
              )
            </div>
            <span class="noteHitTime">Length</span>
            <input class="noteHitTimeInput" v-model.number.lazy="path.spd" type="text"/>
          </template>
          <template v-if="path instanceof LinePath">
            <div class="pathPosition">
              (
              <input class="pathPositionInput" v-model.number.lazy="path.fx" type="text"/>
              ,
              <input class="pathPositionInput" v-model.number.lazy="path.fy" type="text"/>
              )->(
              <input class="pathPositionInput" v-model.number.lazy="path.tx" type="text"/>
              ,
              <input class="pathPositionInput" v-model.number.lazy="path.ty" type="text"/>
              )
            </div>
            <span class="noteHitTime">Length</span>
            <input class="noteHitTimeInput" v-model.number.lazy="path.spd" type="text"/>
          </template>
          <template v-if="path instanceof ArcPath">
            <div class="pathPosition arcEdit">
              (
              <input class="pathPositionInput" v-model.number.lazy="path.fromx" type="text"/>
              ,
              <input class="pathPositionInput" v-model.number.lazy="path.fromy" type="text"/>
              )-(
              <input class="pathPositionInput" v-model.number.lazy="path.cx" type="text"/>
              ,
              <input class="pathPositionInput" v-model.number.lazy="path.cy" type="text"/>
              )>(
              <input class="pathPositionInput" v-model.number.lazy="path.tox" type="text"/>
              ,
              <input class="pathPositionInput" v-model.number.lazy="path.toy" type="text"/>
              )
            </div>
            <span class="noteHitTime">Length</span>
            <input class="noteHitTimeInput" v-model.number.lazy="path.spd" type="text"/>
          </template>
          <span class="noteDelete" @click="(getNote(sel).p as MultiPath).ps.splice(index,1)">X</span>
        </li>-->
        <li id="add" @click="pushPath">
          +
        </li>
      </ul>
      <div id="dataBox">
        <span>Sec: </span><input v-model.lazy="csec"/><br/>
        <span>Paused: </span><input id="pause" type="checkbox" v-model="paused"/><br/>
        <span>Chart: </span><textarea id="chartArea" v-model.lazy="cpsong"/><br/>
        <span>Upload Music: </span><input type="file" accept="audio/*" ref="music"
                                          @change="changeBackgroundMusic"/><br/>
        <span>Upload Background: </span><input type="file" accept="image/*" ref="bg" @change="changeBackground"/><br/>
        <span>Bar: </span>
        <select v-model.lazy="bar">
          <option value="N">Notes</option>
          <option value="AN">Animation Notes</option>
          <option value="PE">Path Editor</option>
        </select>
        <br/>
        <span>Current: {{ showSel(sel) }}</span><br/>
        <button v-if="bar=='PE'" @click="previewPath">Preview</button>
        <br/>
      </div>
    </div>
  </div>
</template>

<style scoped>
#gameBox {
  color: black;
  font-family: 'Courier New', Courier, monospace;
  font-size: calc(0.025 * min(100vw, 56.25vw, 100vh, 177.78vh));
}

#gameBox {
  width: 100vw;
  height: 56.25vw; /* height:width ratio = 9/16 = .5625  */
  max-height: 100vh;
  max-width: 177.78vh; /* 16/9 = 1.778 */
  margin: auto;
  position: absolute;
  top: 0;
  bottom: 0; /* vertical center */
  left: 0;
  right: 0; /* horizontal center */
  background-repeat: no-repeat;
  background-size: contain;
  background-origin: content-box;
  overflow: hidden;
}

#innerBox {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0; /* vertical center */
  left: 0;
  right: 0; /* horizontal center */
}

#main_canvas {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0; /* vertical center */
  left: 0;
  right: 0; /* horizontal center */
  backdrop-filter: blur(5em);
}

#canvas_box {
  position: absolute;
  top: 0;
  left: 0;
  width: 60%;
  height: 60%;
  background-repeat: no-repeat;
  background-size: contain;
  background-origin: content-box;
}

#notes {
  background-color: #00000077;
  position: absolute;
  left: 60%;
  top: 0;
  width: 40%;
  height: 100%;
}

#dataBox {
  position: absolute;
  top: 60%;
  left: 0;
  width: 60%;
  height: 40%;
}

input {
  font-size: 1em;
  width: 20em;
}

select {
  font-size: 1em;
}

#pause {
  width: 1em;
  height: 1em;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#notes {
  color: white;
  overflow-y: scroll;
  overflow-x: hidden;
}

#notes > li {
  position: relative;
  width: 100%;
  height: 5em;
  border: white 0.1em solid;
}

#add {
  background-color: #808080;
  font-size: 5em;
  height: 1em !important;
  border: white 0.02em solid !important;
  text-align: center;
}

.showNote {
  position: absolute;
  width: 5em;
  height: 5em;
  top: 0;
  left: 0;
}

.noteTag {
  position: absolute;
  left: 5em;
  top: 0;
}

.noteTrack {
  position: absolute;
  left: 5em;
  top: 1em;
}

.noteTrackInput {
  position: absolute;
  font-size: 1em;
  left: 9em;
  top: 1em;
  height: 1.25em;
  width: 2em;
}

.noteFillInput {
  position: absolute;
  left: 9em;
  top: 1em;
  height: 1em;
  width: 2em;
}

.noteHitTime {
  position: absolute;
  left: 5em;
  top: 3em;
}

.noteClack{
  position: absolute;
  left: 12em;
  top: 1em;
}

.noteIfClack{
  position: absolute;
  left: 19em;
  top: 1em;
  margin: 0;
  width:1em;
  height:1em;
}

.noteClackTime{
  position: absolute;
  left: 12em;
  top: 2em;
}

.noteClackTimeInput {
  position: absolute;
  font-size: 1em;
  left: 20em;
  top: 2em;
  height: 1.25em;
  width: 5em;
}

.pathPosition{
  position: absolute;
  left: 5em;
  top: 2em;
}

.noteHitTimeInput {
  position: absolute;
  font-size: 1em;
  left: 10em;
  top: 3em;
  height: 1.25em;
  width: 10em;
}

.noteDelete {
  position: absolute;
  right: 1em;
  top: 0;
}

.pathTrackInput {
  position: absolute;
  font-size: 1em;
  left: 9em;
  top: 1em;
  height: 1.25em;
  width: 10em;
}

.pathPositionInput {
  font-size: 1em;
  height: 1.25em;
  width: 3em;
}

ul {
  list-style-type: none;
}

.selected {
  background-color: #404040;
}

#chartArea{
  width: 40em;
  height: 3em;
  resize: none;
}

button{
  font-size: 1em;
}

textarea{
  font-size: 1em;
}

.arcEdit{
  top: 2.67em;
  font-size: 0.75em;
}
</style>