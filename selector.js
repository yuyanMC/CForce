"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// 示例歌曲列表
function smain() {
    return __awaiter(this, void 0, void 0, function* () {
        let songs = [];
        yield fetch("data.json").then((response) => __awaiter(this, void 0, void 0, function* () { return songs = yield response.json(); }));
        // 获取歌曲列表容器
        const songList = document.getElementById('song_list');
        let chosen = 0;
        // 创建歌曲列表项并添加到容器中
        for (let i = 0; i < songs.length; i++) {
            const li = document.createElement('p');
            li.classList.add("li");
            li.dataset.n = i.toString();
            li.innerText = `${songs[i].name}`;
            li.onclick = function (e) {
                e.preventDefault();
                chosen = parseInt(e.target.dataset["n"]);
                const div = document.createElement("div");
                const h1 = document.createElement("h1");
                h1.innerText = songs[chosen].name;
                div.appendChild(h1);
                const h3 = document.createElement("h3");
                h3.innerText = `难度：${songs[chosen].difficulty}`;
                div.appendChild(h3);
                const button = document.createElement("button");
                button.innerText = "开始";
                div.appendChild(button);
                document.getElementById("operation").innerHTML = div.innerHTML;
                document.getElementById("gameBox").style.backgroundImage = `url("${songs[chosen].id}.png")`;
            };
            songList.appendChild(li);
            //songList.appendChild(document.createElement("br"))
        }
        document.addEventListener("click", function (e) {
            if (e.target instanceof HTMLButtonElement) {
                console.log("Redirecting...");
                window.location.replace(`./player.html?id=${songs[chosen].id}`);
            }
        });
        /*
        // 获取选择按钮
        const selectButton = document.getElementById('select_button') as HTMLButtonElement;
        
        // 添加点击事件监听器
        selectButton.addEventListener('click', () => {
            // 在这里执行选歌后的操作
            console.log('Song selected!');
        });
      */
    });
}
