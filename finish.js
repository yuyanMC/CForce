var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
function fgetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURIComponent(r[2]);
    }
    ;
    return null;
}
function fmain() {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var songs, id, perfect, good, miss, max_combo, point, song_name, p, rating;
        var _this = this;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    songs = [];
                    id = fgetQueryString("i");
                    perfect = fgetQueryString("p");
                    good = fgetQueryString("g");
                    miss = fgetQueryString("m");
                    max_combo = fgetQueryString("c");
                    point = fgetQueryString("t");
                    return [4 /*yield*/, fetch("data.json").then(function (response) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, response.json()];
                                case 1: return [2 /*return*/, songs = _a.sent()];
                            }
                        }); }); })];
                case 1:
                    _c.sent();
                    song_name = "<Unknown>";
                    songs.forEach(function (e) {
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
                    p = parseInt(point);
                    rating = "F";
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
                    (_a = document.getElementById("again")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function (e) {
                        location.replace("./player.html?id=".concat(id));
                    });
                    (_b = document.getElementById("next")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function (e) {
                        location.replace("./selector.html");
                    });
                    return [2 /*return*/];
            }
        });
    });
}
