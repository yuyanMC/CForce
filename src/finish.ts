import { createApp } from 'vue';
import App from './finish.vue';

const app = createApp(App);
app.mount("#app");
/*
import "./style/finish.css";
import {getQueryString, setQueryString} from "./player/util";
// 定义歌曲接口
interface Song {
    id: string;
    name: string;
    difficulty: number;
}


async function main() {
    let id = getQueryString("i")!;
    document.getElementById("gameBox")!.style.backgroundImage = `url("${(await import(`./images/${id}.png`).catch(() => {return {default:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIW2P4DwQACfsD/Z8fLAAAAAAASUVORK5CYII="}})).default}")`;
    let songs: Song[] = [];
    let perfect = getQueryString("p")!;
    let good = getQueryString("g")!;
    let bad = getQueryString("b")!;
    let miss = getQueryString("m")!;
    let max_combo = getQueryString("c")!;
    let point = getQueryString("t")!;
    await import("./data/data.json").then(async (response) => songs = response.default);
    let song_name = "<Unknown>";
    songs.forEach(e => {
        if (e.id == id) {
            song_name = e.name;
        }
    });
    document.getElementById("name")!.innerText = song_name;
    document.getElementById("mcnum")!.innerText = max_combo;
    document.getElementById("pnum")!.innerText = perfect;
    document.getElementById("gnum")!.innerText = good;
    document.getElementById("bnum")!.innerText = bad;
    document.getElementById("mnum")!.innerText = miss;
    document.getElementById("point")!.innerText = point;
    let p = parseInt(point);
    let rating = "F";
    if (p >= 100000) {
        rating = "∀";
    } else if (p >= 96000) {
        rating = "S";
    } else if (p >= 90000) {
        rating = "A";
    } else if (p >= 84000) {
        rating = "B";
    } else if (p >= 80000) {
        rating = "C";
    } else if (p >= 75000) {
        rating = "D";
    } else if (p >= 70000) {
        rating = "E";
    }
    document.getElementById("lvl")!.innerText = rating;
    document.getElementById("again")?.addEventListener("click", () => {
        location.replace(`./player.html${setQueryString({id:id})}`);
    });
    document.getElementById("next")?.addEventListener("click", () => {
        location.replace(`./selector.html`);
    });
}
window.onload=main;
*/