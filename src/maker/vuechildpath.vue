<script lang="ts" setup>

import {ArcPath, Chart, LinePath, Note, Path, Pow2SPath, StaticPath, SubscriberPath} from "./chart";

const props = defineProps({
  father: {
    type: SubscriberPath,
  },
  path: {
    type: Path,
  },
  chart: {
    type: Chart,
  },
  sel: {
    type: String,
  }
});

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

function changePathType(e: Event) {
  let type = (e.target as HTMLSelectElement).value;
  let spd = props.path.spd;
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
  props.father.p = path;
}
</script>

<template>
  <li>
    <span class="noteTag">Child Path</span>
    <span class="noteTrack">Type</span>
    <select :value="getType(path)" class="pathTrackInput" @change="e=>changePathType(e)">
      <option value="static">Static</option>
      <option value="line">Line</option>
      <option value="arc">Arc</option>
      <option value="pow2">^2</option>
    </select>
    <template v-if="path instanceof StaticPath">
      <div class="pathPosition">
        (
        <input v-model.number.lazy="path.x" class="pathPositionInput" type="text"/>
        ,
        <input v-model.number.lazy="path.y" class="pathPositionInput" type="text"/>
        )
      </div>
      <span class="noteHitTime">Length</span>
      <input v-model.number.lazy="path.spd" class="noteHitTimeInput" type="text"/>
    </template>
    <template v-if="path instanceof LinePath">
      <div class="pathPosition">
        (
        <input v-model.number.lazy="path.fx" class="pathPositionInput" type="text"/>
        ,
        <input v-model.number.lazy="path.fy" class="pathPositionInput" type="text"/>
        )->(
        <input v-model.number.lazy="path.tx" class="pathPositionInput" type="text"/>
        ,
        <input v-model.number.lazy="path.ty" class="pathPositionInput" type="text"/>
        )
      </div>
      <span class="noteHitTime">Length</span>
      <input v-model.number.lazy="path.spd" class="noteHitTimeInput" type="text"/>
    </template>
    <template v-if="path instanceof ArcPath">
      <div class="pathPosition arcEdit">
        (
        <input v-model.number.lazy="path.fromx" class="pathPositionInput" type="text"/>
        ,
        <input v-model.number.lazy="path.fromy" class="pathPositionInput" type="text"/>
        )-(
        <input v-model.number.lazy="path.cx" class="pathPositionInput" type="text"/>
        ,
        <input v-model.number.lazy="path.cy" class="pathPositionInput" type="text"/>
        )>(
        <input v-model.number.lazy="path.tox" class="pathPositionInput" type="text"/>
        ,
        <input v-model.number.lazy="path.toy" class="pathPositionInput" type="text"/>
        )
      </div>
      <span class="noteHitTime">Length</span>
      <input v-model.number.lazy="path.spd" class="noteHitTimeInput" type="text"/>
    </template>
    <template v-if="path instanceof Pow2SPath">
      <div class="pathPosition">
        <input v-model.number.lazy="path.f" class="pathPositionInput" type="text"/>
        ^2&nbsp;->&nbsp;
        <input v-model.number.lazy="path.t" class="pathPositionInput" type="text"/>
        ^2
      </div>
    </template>
  </li>
  <Vuechildpath v-if="path instanceof SubscriberPath" :chart="chart" :father="path" :path="path.p"
                :sel="sel"></Vuechildpath>
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

.pathPosition {
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

.arcEdit {
  top: 2.67em;
  font-size: 0.75em;
}

</style>