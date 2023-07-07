var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function fgetQueryString(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURIComponent(r[2]);
    }
    ;
    return null;
}
function fmain() {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        let songs = [];
        let id = fgetQueryString("i");
        let perfect = fgetQueryString("p");
        let good = fgetQueryString("g");
        let miss = fgetQueryString("m");
        let max_combo = fgetQueryString("c");
        let point = fgetQueryString("t");
        yield fetch("data.json").then((response) => __awaiter(this, void 0, void 0, function* () { return songs = yield response.json(); }));
        let song_name = "<Unknown>";
        songs.forEach(e => {
            if (e.id == id) {
                song_name = e.name;
            }
        });
        document.getElementById("name").innerText = song_name;
        document.getElementById("mcnum").innerText = max_combo;
        document.getElementById("pnum").innerText = perfect;
        document.getElementById("gnum").innerText = good;
        document.getElementById("mnum").innerText = miss;
        document.getElementById("point").innerText = point;
        let p = parseInt(point);
        let rating = "F";
        if (p >= 100000) {
            rating = "∀";
        }
        else if (p >= 96000) {
            rating = "S";
        }
        else if (p >= 90000) {
            rating = "A";
        }
        else if (p >= 84000) {
            rating = "B";
        }
        else if (p >= 80000) {
            rating = "C";
        }
        else if (p >= 75000) {
            rating = "D";
        }
        else if (p >= 70000) {
            rating = "E";
        }
        document.getElementById("lvl").innerText = rating;
        (_a = document.getElementById("again")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", e => {
            location.replace(`./player.html?id=${id}`);
        });
        (_b = document.getElementById("next")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", e => {
            location.replace(`./selector.html`);
        });
    });
}
