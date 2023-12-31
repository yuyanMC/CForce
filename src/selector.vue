<script setup lang="ts">
import {setQueryString, sleep} from "./player/util";
import {computed, getCurrentInstance, nextTick, onMounted, Ref, ref} from "vue";
import {getStorage, setStorage} from "./player/storage";

interface Song {
  id: string;
  name: string;
  difficulty: number;
}

var songs: Song[] = [];
const startTime = ref(0);
const chosen: Ref<Song> = ref({id: "", name: "", difficulty: 0});
const clsList = computed(() => ({
  change: Date.now() - startTime.value <= 1000
}));
var instance = getCurrentInstance();
const imgUrl = ref("");

const alerting = ref(false);
const alertContent = ref("");

var meta: { CVer: number, CVerStr: string, CChangeLog: { ver: number, str: string, log: string }[] };

onMounted(async () => {
  await import("./data/data.json").then(async (response) => songs = response.default);
  await import("./data/meta.json").then(async (response) => meta = response.default);
  let ver: number = getStorage("ver") || 2;
  if (ver != meta["CVer"]) {
    setStorage("ver", meta["CVer"]);
    let tc = `CForce ${meta["CVerStr"]} 更新日志\n\n`;
    meta.CChangeLog.forEach(e => {
      if (e.ver > ver) {
        tc += e.str;
        tc += "\n";
        tc += e.log;
        tc += "\n\n";
      }
    });
    alerting.value = true;
    alertContent.value = tc;
  }
  nextTick(() => {
    instance.proxy.$forceUpdate()
  });
  chosen.value = songs[0];
  imgUrl.value = "url(" + ((await import(`./images/${chosen.value.id}.png`).catch(() => {
    return {"default": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIW2P4DwQACfsD/Z8fLAAAAAAASUVORK5CYII="}
  })) as { default: string }).default + ")";
});

function rd() {
  console.log("Redirecting...");
  location.replace(`./player.html${setQueryString({id: chosen.value.id})}`);
}

async function uc() {
  startTime.value = Date.now();
  await sleep(500);
  imgUrl.value = "url(" + ((await import(`./images/${chosen.value.id}.png`).catch(() => {
    return {"default": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIW2P4DwQACfsD/Z8fLAAAAAAASUVORK5CYII="}
  })) as { default: string }).default + ")";
  await sleep(500);
  startTime.value = 0;
}
</script>

<template>
  <div id="gameBox" :style="'background-image:'+imgUrl">
    <div id="innerBox" :class="clsList">
      <div id="song_list">
        <p v-for="song in songs" @click="chosen=song;uc()">
          {{ song.name }}
        </p>
      </div>
      <div id="operation">
        <h1>
          {{ chosen.name }}
        </h1>
        <h3>
          难度：{{ chosen.difficulty }}
        </h3>
        <button @click="rd">
          开始
        </button>
      </div>
      <div id="alertBox" v-if="alerting" @click.self="alerting=false">
        <div id="alert">
          {{ alertContent }}
        </div>
        <div id="alertClose" @click.self="alerting=false">
          X
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes change {
  0% {
    background-color: #00000077;
  }
  50% {
    background-color: #777777ff;
  }
  100% {
    background-color: #00000077;
  }
}

.change {
  animation: change 1s ease-in-out;
}

#gameBox {
  color: white;
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
}

#innerBox {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0; /* vertical center */
  left: 0;
  right: 0; /* horizontal center */
  background-color: #00000077;
  backdrop-filter: blur(5em);
}

#song_list, #operation {
  position: absolute;
  width: 46%;
  height: 92%;
  margin: 2%;
  background-color: rgba(0, 0, 0, 0.5);
  border: white 0.133em solid;
  border-radius: 1em;
}

#operation {
  left: 50%;
}

#song_list {
  overflow: scroll;
}

#song_list > p {
  position: relative;
  top: 0;
  left: 0;
  border: white 0.067em solid;
  padding: 1.747%;
  margin: 1.747%;
  height: 7.292%;
  border-radius: 0.5em;
}

#song_list > p:hover {
  background-color: #404040;
  transform: scale(1.2, 1.2);
  transform-origin: left;
  width: calc(100% / 1.2 - 2.848%);
}

#operation > h1 {
  margin: 3.494%;
  height: 1.5em;
}

#operation > h3 {
  margin: 3.494%;
  height: 1.5em;
}

#operation > button {
  position: absolute;
  bottom: 3.103%;
  right: 3.494%;
  background-color: black;
  color: white;
  outline: 0;
  border: white 0.067em solid;
  font-size: 1em;
  padding: 1.747%;
  border-radius: 0.5em;
}

#operation > button:hover {
  transform: scale(1.2);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

#alertBox {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #00000077;
}

#alert {
  position: absolute;
  width: 50%;
  height: 50%;
  left: 25%;
  top: 25%;
  padding: 2.5%;
  border: white 0.067em solid;
  border-radius: 0.5em;
  background-color: #000000bb;
  font-size: 1.5em;
  text-align: center;
  overflow-y: scroll;
  white-space: pre-wrap;
  word-wrap: break-word;
}

#alertClose {
  position: sticky;
  top: 26%;
  left: 36.7%;
  width: 1em;
  font-size: 1.333em;
  font-weight: bold;
  z-index: 1;
  font-family: Arial, serif;
}
</style>