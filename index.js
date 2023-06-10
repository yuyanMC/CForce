var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var EventBus = /** @class */ (function () {
    function EventBus() {
        /** 保存 key => set 映射 */
        this.map = new Map();
    }
    EventBus.prototype.on = function (name, handler) {
        var set = this.map.get(name);
        if (!set) {
            set = new Set();
            this.map.set(name, set);
        }
        set.add(handler);
    };
    EventBus.prototype.emit = function (name, value) {
        var set = this.map.get(name);
        if (!set)
            return;
        var copied = __spreadArray([], __read(set), false);
        copied.forEach(function (fn) { return fn(value); });
    };
    return EventBus;
}());
// libEnd
var ctx;
var notes = new Array();
var tick = 0;
var tps = 100;
var song = null;
var autoPlay = false;
var combo = 0;
var bus = new EventBus();
var Path = /** @class */ (function () {
    function Path(_spd) {
        this.spd = _spd;
    }
    Path.prototype.cal = function (t) {
        return [0, 0];
    };
    return Path;
}());
var StaticPath = /** @class */ (function (_super) {
    __extends(StaticPath, _super);
    function StaticPath(_spd, _x, _y) {
        var _this = _super.call(this, _spd) || this;
        _this.x = _x;
        _this.y = _y;
        return _this;
    }
    StaticPath.prototype.cal = function (t) {
        return [this.x, this.y];
    };
    return StaticPath;
}(Path));
var ArcPath = /** @class */ (function (_super) {
    __extends(ArcPath, _super);
    function ArcPath(_spd, _cx, _cy, _fx, _fy, _tx, _ty) {
        if (_tx === void 0) { _tx = 1600; }
        if (_ty === void 0) { _ty = 900; }
        var _this = _super.call(this, _spd) || this;
        if (Math.pow((_fx - _cx), 2) + Math.pow((_fy - _cy), 2) - Math.pow((_tx - _cx), 2) - Math.pow((_ty - _cy), 2) >= 0.01) {
            throw Error("Invalid ArcPath for(".concat(_cx, " ").concat(_cy, " ").concat(_fx, " ").concat(_fy, " ").concat(_tx, " ").concat(_ty, ")"));
        }
        _this.cx = _cx;
        _this.cy = _cy;
        _this.fromx = _fx;
        _this.fromy = _fy;
        _this.tox = _tx;
        _this.toy = _ty;
        return _this;
    }
    ArcPath.prototype.cal = function (t) {
        if (t < 0) {
            return [this.fromx, this.fromy];
        }
        if (t > 1) {
            return [this.tox, this.toy];
        }
        var ba = angcalc(this.cx, this.cy, this.fromx, this.fromy);
        var ea = angcalc(this.cx, this.cy, this.tox, this.toy);
        var ca = ba + (ea - ba) * t;
        var r = Math.sqrt(Math.pow((this.tox - this.cx), 2) + Math.pow((this.toy - this.cy), 2));
        return [Math.cos(ca) * r + this.cx, Math.sin(ca) * r + this.cy];
    };
    return ArcPath;
}(Path));
var SubscriberPath = /** @class */ (function (_super) {
    __extends(SubscriberPath, _super);
    function SubscriberPath(_p) {
        var _this = _super.call(this, _p.spd) || this;
        _this.p = _p;
        return _this;
    }
    return SubscriberPath;
}(Path));
var Pow2SPath = /** @class */ (function (_super) {
    __extends(Pow2SPath, _super);
    function Pow2SPath(_p) {
        return _super.call(this, _p) || this;
    }
    Pow2SPath.prototype.cal = function (t) {
        return this.p.cal(Math.pow(t, 2));
    };
    return Pow2SPath;
}(SubscriberPath));
var ReversePow2SPath = /** @class */ (function (_super) {
    __extends(ReversePow2SPath, _super);
    function ReversePow2SPath(_p) {
        return _super.call(this, _p) || this;
    }
    ReversePow2SPath.prototype.cal = function (t) {
        return this.p.cal(Math.pow((1 - t), 2));
    };
    return ReversePow2SPath;
}(SubscriberPath));
var MultiPath = /** @class */ (function (_super) {
    __extends(MultiPath, _super);
    function MultiPath(_ps) {
        var _this = this;
        var spdsum = 0;
        _ps.forEach(function (element) {
            spdsum += element.spd;
        });
        _this = _super.call(this, spdsum) || this;
        _this.ps = _ps;
        _this.ssp = [];
        var nss = 0;
        _this.ssp.push(0);
        _ps.forEach(function (element) {
            nss += element.spd;
            _this.ssp.push(nss / spdsum);
        });
        return _this;
    }
    MultiPath.prototype.cal = function (t) {
        for (var i = 1; i < this.ssp.length; i++) {
            if (t < this.ssp[i]) {
                var nt = (t - this.ssp[i - 1]) / (this.ssp[i] - this.ssp[i - 1]);
                return this.ps[i - 1].cal(nt);
            }
        }
        return this.ps[this.ps.length - 1].cal(1);
    };
    return MultiPath;
}(Path));
var Note = /** @class */ (function () {
    function Note(_p, _h) {
        this.p = _p;
        this.h = _h;
    }
    return Note;
}());
function angcalc(cx, cy, ax, ay) {
    if (ay == cy) {
        return Math.PI;
    }
    if (ay < cy) {
        return Math.PI / 2 - Math.atan((ax - cx) / (ay - cy)) + Math.PI;
    }
    return Math.PI / 2 - Math.atan((ax - cx) / (ay - cy));
}
function drawnote(note) {
    var sec = tick / tps;
    if ((sec - note.h + note.p.spd) / note.p.spd < 0 || (sec - note.h + note.p.spd) / note.p.spd > 1) {
        return;
    }
    var np = note.p.cal((sec - note.h + note.p.spd) / note.p.spd);
    ctx.fillStyle = "#404040";
    ctx.beginPath();
    ctx.arc(np[0], np[1], 88, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.strokeStyle = "rgb(255,255,255)";
    ctx.beginPath();
    ctx.arc(np[0], np[1], 80, 0, Math.PI * 2, true);
    ctx.stroke();
}
function drawA(note) {
    if (note.a > 0 && note.aa * 4 < tps) {
        var rc = note.aa * 4 / tps + 1;
        var np = note.p.cal(1);
        if (note.a == 1) {
            ctx.fillStyle = "rgba(160,144,0,".concat(2 - rc, ")");
        }
        else if (note.a == 2) {
            ctx.fillStyle = "rgba(0,167,195,".concat(2 - rc, ")");
        }
        ctx.beginPath();
        ctx.arc(np[0], np[1], 88 * rc, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.strokeStyle = "rgb(255,255,255)";
        ctx.beginPath();
        ctx.arc(np[0], np[1], 80 * rc, 0, Math.PI * 2, true);
        ctx.stroke();
    }
}
function drawTexts() {
    ctx.fillStyle = "rgb(255,255,255)";
    ctx.font = "50px 'Courier New'";
    ctx.textAlign = "center";
    ctx.fillText("".concat(combo), 1600, 60);
    ctx.fillText("COMBO", 1600, 120);
}
function parsePath(n) {
    var ep = n;
    var p = new Path(0);
    switch (ep.type) {
        case "arc":
            p = new ArcPath(ep.spd, ep.c[0], ep.c[1], ep.f[0], ep.f[1], ep.t[0], ep.t[1]);
            break;
        case "static":
            p = new StaticPath(ep.spd, ep.x, ep.y);
            break;
        case "pow2":
            p = new Pow2SPath(parsePath(ep.p));
            break;
        case "rpow2":
            p = new ReversePow2SPath(parsePath(ep.p));
            break;
        default:
            throw Error("Invalid path type");
    }
    return p;
}
function parseSong() {
    if (song === null) {
        throw Error("Song not loaded");
    }
    song.forEach(function (element) {
        var ps = [];
        element.paths.forEach(function (pe) {
            ps.push(parsePath(pe));
        });
        var p = new MultiPath(ps);
        notes.push(new Note(p, element.h));
    });
}
function nextFrame() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new Promise(function (f) { setTimeout(function () { f(0); }, 1000 / tps); })];
                case 1:
                    _a.sent();
                    ctx.fillStyle = "rgb(0,0,0)";
                    ctx.fillRect(0, 0, 3200, 1800);
                    tick++;
                    return [2 /*return*/];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var canvas, centerNote;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    canvas = document.getElementById('main_canvas');
                    ctx = canvas.getContext('2d');
                    ctx.fillStyle = "rgb(0,0,0)";
                    ctx.fillRect(0, 0, 3200, 1800);
                    ctx.fillStyle = "rgb(200,200,200)";
                    ctx.font = "200px";
                    ctx.fillText("游戏正在加载", 1200, 1700);
                    bus.on("hit", function (e) {
                        combo++;
                    });
                    bus.on("miss", function (e) {
                        combo = 0;
                    });
                    document.addEventListener("keydown", function (e) {
                        console.log(e);
                        if (e.keyCode == 65) {
                            notes.forEach(function (element) {
                                if (element.a) {
                                    return;
                                }
                                if (Math.abs(element.h * tps - tick) <= 0.04 * tps) {
                                    element.a = 1;
                                    element.aa = 1;
                                    bus.emit("hit", 1);
                                }
                                else if (Math.abs(element.h * tps - tick) <= 0.08 * tps) {
                                    element.a = 2;
                                    element.aa = 1;
                                    bus.emit("hit", 2);
                                }
                            });
                        }
                    });
                    return [4 /*yield*/, fetch('./demo.json').then(function (response) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, response.json()];
                                case 1: return [2 /*return*/, song = _a.sent()];
                            }
                        }); }); })];
                case 1:
                    _a.sent();
                    parseSong();
                    ctx.fillStyle = "rgb(0,0,0)";
                    ctx.fillRect(0, 0, 3200, 1800);
                    centerNote = new Note(new StaticPath(3600, 1600, 900), 3600);
                    _a.label = 2;
                case 2:
                    if (!true) return [3 /*break*/, 4];
                    drawnote(centerNote);
                    notes.forEach(function (element) {
                        if (element.a) {
                            element.aa++;
                        }
                        else if (autoPlay && (Math.abs(element.h * tps - tick) < 0.04 * tps)) {
                            element.a = 1;
                            element.aa = 1;
                            bus.emit("hit", 1);
                        }
                        else if ((tick - element.h * tps) > 0.08 * tps) {
                            element.a = -1;
                            bus.emit("miss", null);
                        }
                        drawnote(element);
                    });
                    notes.forEach(function (element) {
                        drawA(element);
                    });
                    drawTexts();
                    return [4 /*yield*/, nextFrame()];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 2];
                case 4: return [2 /*return*/];
            }
        });
    });
}
