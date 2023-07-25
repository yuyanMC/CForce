import "./selector.css";
interface Song {
    id: string;
    name: string;
    difficulty: number;
}

// 示例歌曲列表
async function smain() {
    let songs: Song[] = [];
    await import("./data/data.json").then(async (response) => songs = response.default);
    // 获取歌曲列表容器
    const songList = document.getElementById('song_list') as HTMLUListElement;
    let chosen = 0;
    // 创建歌曲列表项并添加到容器中
    for (let i = 0; i < songs.length; i++) {
        const li = document.createElement('p');
        li.classList.add("li");
        li.dataset.n = i.toString();
        li.innerText = `${songs[i].name}`;
        li.onclick = async function (e) {
            e.preventDefault();
            chosen = parseInt((e.target as HTMLParagraphElement).dataset["n"]!);
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
            document.getElementById("operation")!.innerHTML = div.innerHTML;
            document.getElementById("gameBox")!.style.backgroundImage = "url("+(await import(`./images/${songs[chosen].id}.png`).catch(reason => {return {default:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIW2P4DwQACfsD/Z8fLAAAAAAASUVORK5CYII="}})).default+")";
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
}
window.onload=smain;