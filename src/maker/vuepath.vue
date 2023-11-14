<script setup lang="ts">

import {ArcPath, Chart, LinePath, MultiPath, Note, Path, Pow2SPath, StaticPath} from "./chart";

const props=defineProps({
  index:{
    type:Number,
  },
  path:{
    type:Path,
  },
  chart:{
    type:Chart,
  },
  sel:{
    type:String,
  }});

function getNote(s: string): Note {
  if (s == "none") {
    return null;
  }
  if (s.startsWith("N")) {
    return props.chart.notes[parseInt(s.slice(1))] as Note;
  }
  if (s.startsWith("AN")) {
    return props.chart.animationNotes[parseInt(s.slice(2))] as Note;
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
  let spd = (getNote(props.sel).p as MultiPath).ps[p].spd;
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
  (getNote(props.sel).p as MultiPath).ps[p] = path;
}
</script>

<template>
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
</template>

<style scoped>

input {
  font-size: 1em;
  width: 20em;
}

select {
  font-size: 1em;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

li {
  position: relative;
  width: 100%;
  height: 5em;
  border: white 0.1em solid;
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

.noteHitTime {
  position: absolute;
  left: 5em;
  top: 3em;
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

.arcEdit{
  top: 2.67em;
  font-size: 0.75em;
}

</style>