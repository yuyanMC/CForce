require("./finish.css");
// 定义歌曲接口
interface Song {
    id: string;
    name: string;
    difficulty: number;
}

function fgetQueryString(name: string) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURIComponent(r[2]);
    }
    return null;
}

async function fmain() {
    let id = fgetQueryString("i")!;
    document.getElementById("gameBox")!.style.backgroundImage = `url("${require("./images/"+id+".png")}")`;
    let songs: Song[] = [];
    let perfect = fgetQueryString("p")!;
    let good = fgetQueryString("g")!;
    let miss = fgetQueryString("m")!;
    let max_combo = fgetQueryString("c")!;
    let point = fgetQueryString("t")!;
    await fetch(require("./data/data.json")).then(async (response) => songs = await response.json());
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
    document.getElementById("again")?.addEventListener("click", e => {
        location.replace(`./player.html?id=${id}`);
    });
    document.getElementById("next")?.addEventListener("click", e => {
        location.replace(`./selector.html`);
    });
}
window.onload=fmain;