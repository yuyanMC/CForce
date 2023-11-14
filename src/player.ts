import "./style/player.css";
import hit from "./sounds/hit.mp3";
import blank from "./sounds/blank.mp3";

import {ClackLineCanvasObject, EnhancedContent, NoteCanvasObject, RGBAColor, TextCanvasObject} from './player/gui';
import {EventBus} from "./player/event";
import {Chart, JChart, Note} from "./player/chart";
import {getQueryString, setQueryString} from "./player/util";
import {DynamicJsonLoader, DynamicLoader, DynamicScriptLoader} from "./player/network";
import {EnhancedAudioContext, SoundManager} from "./player/sound";
import {KeyListener, registerKeyListener} from "./player/keyboard";
import {
    loadingStr,
    loadDownloadStr,
    loadErrorStr,
    loadWaitClickStr,
    blankImage,
    fadeInAnim,
    fadeOutAnim, perfectAnim, goodAnim, font, background
} from "./player/const";

// Resource loaders
let imageLoader: DynamicLoader = new DynamicLoader("images");
let soundLoader: DynamicLoader = new DynamicLoader("sounds");
let chartLoader: DynamicJsonLoader = new DynamicJsonLoader("charts");
let scriptLoader: DynamicScriptLoader = new DynamicScriptLoader("scripts");

// Render control
let ctx: CanvasRenderingContext2D;

// Game data
let chart: Chart;

// - Point
let pointsGot = 0;
let maxCombo = 0;
let perfect = 0;
let good = 0;
let bad = 0;

// Tick controllers
let paused = false;
let tickTimes: number[] = [];
let startTime: number;
let sec: number;
let pausedTime = 0;

// Configs
let tps: number = 60;
let autoPlay: boolean = false;
let combo: number = 0;
let hitVolume: number = 0.5;
let backgroundVolume: number = 0.5;
let debug = true;

// Sound Managers
let hitSoundManager: SoundManager;
let backgroundMusic: EnhancedAudioContext;
let ec: EnhancedContent;

// Event bus
let bus = new EventBus<{
    hit: number,
    miss: null,
    tick: number,
    start: null,
}>();

// Render functions

function renderText(text: string, x: number, y: number, align: CanvasTextAlign = "center", fontSize: number = 50, fill: RGBAColor | number = new RGBAColor(255, 255, 255)) {
    ec.render(new TextCanvasObject(text, x, y, align, fontSize, fill instanceof RGBAColor ? fill : new RGBAColor(255, 255, 255, fill)));
}

function drawNote(note: Note) {
    if (note.a) {
        return;
    }
    if ((sec - note.h + note.p.spd) / note.p.spd < 0 || (sec - note.h + note.p.spd) / note.p.spd > 1) {
        return;
    }
    let np = note.p.cal((sec - note.h + note.p.spd) / note.p.spd);
    let c: RGBAColor = new RGBAColor(note.f[0], note.f[1], note.f[2]);
    ec.render(new NoteCanvasObject(...np, c));
}

function drawClackLine(note: Note) {
    if (note.y != "A") {
        return;
    }
    if ((sec - note.h + note.p.spd) / note.p.spd < 0 || (sec - note.al! - note.h + note.p.spd) / note.p.spd > 1) {
        return;
    }
    ec.render(new ClackLineCanvasObject(note.p, (sec - note.al! - note.h + note.p.spd) / note.p.spd, (sec - note.h + note.p.spd) / note.p.spd))
}

function drawA(note: Note) {
    if (note.a <= 0) {
        return;
    }
    let ad = sec - note.aa;
    let np = note.p.cal((note.aa - note.h + note.p.spd) / note.p.spd);
    if (note.a == fadeInAnim && ad < note.hi!) {
        let rc = ad / note.hi! + 1;
        let c = new RGBAColor(note.f[0], note.f[1], note.f[2], rc - 1);
        ec.render(new NoteCanvasObject(...np, c));
    } else if (note.a == fadeOutAnim && ad < note.ho!) {
        let rc = ad / note.ho! + 1;
        let c = new RGBAColor(note.f[0], note.f[1], note.f[2], 2 - rc);
        ec.render(new NoteCanvasObject(...np, c));
    } else if (note.a > 0 && ad < 0.25) {
        let rc = ad / 0.25 + 1;
        let c: RGBAColor = new RGBAColor(0, 0, 0, 0);
        if (note.a == perfectAnim) {
            c = new RGBAColor(160, 144, 0, 2 - rc);
        } else if (note.a == goodAnim) {
            c = new RGBAColor(0, 167, 195, 2 - rc);
        }
        ec.render(new NoteCanvasObject(...np, c, rc * 88));
    }
}

// Main renderers

function drawTexts() {
    ctx.fillStyle = background;
    ctx.font = font;
    renderText(`${combo}`, 1600, 60);
    renderText(`COMBO`, 1600, 120);
    renderText(`Point: ${(pointsGot / chart.notesTotal / 100 * 100000).toFixed(0)}`, 3150, 60, "right");
    renderText(`Music: ${(sec / chart.length * 100).toFixed(2)}%`, 3150, 120, "right");
    if (debug) {
        let trueTps = tickTimes.length;
        let c = new RGBAColor(255, 0, 255);
        if ((trueTps / tps) >= 0.00) {
            c = new RGBAColor(255, 0, 255);
        }
        if ((trueTps / tps) > 0.30) {
            c = new RGBAColor(255, 0, 63);
        }
        if ((trueTps / tps) > 0.60) {
            c = new RGBAColor(255, 0, 0);
        }
        if ((trueTps / tps) > 0.90) {
            c = new RGBAColor(255, 127, 0);
        }
        if ((trueTps / tps) > 0.95) {
            c = new RGBAColor(255, 255, 0);
        }
        if ((trueTps / tps) > 0.999) {
            c = new RGBAColor(0, 255, 0);
        }
        if ((trueTps / tps) > 0.99999) {
            c = new RGBAColor(0, 255, 255);
        }
        renderText(`TPS: ${trueTps.toFixed(0)}/${tps}`, 3150, 180, "right", 50, c);
        renderText(`Sec: ${sec.toFixed(3)} Paused: ${pausedTime.toFixed(3)} Total: ${((Date.now() - startTime) / 1000).toFixed(3)} Music: ${backgroundMusic.actx.currentTime.toFixed(3)}`, 3150, 240, "right");
    }
}

// Entry

async function main() {
    // Load basic data
    let id = getQueryString("id");
    // Load background
    document.getElementById("canvas_box")!.style.backgroundImage = `url(${(await imageLoader.loadAsUrl(`${id}.png`).catch(() => {
        return blankImage
    }))})`;
    // Prepare canvas
    let canvas: HTMLCanvasElement = document.getElementById('main_canvas') as HTMLCanvasElement;
    ctx = canvas.getContext('2d')!;
    ec = new EnhancedContent(ctx);
    ec.setBackGroundColor("rgba(0,0,0,0.5)");
    ec.clear();
    renderText(loadingStr, 1600, 900, "center", 200, new RGBAColor(200, 200, 200));
    // Prepare point manager
    bus.on("hit", (e) => {
        combo++;
        maxCombo = Math.max(combo, maxCombo);
        if (e == 1) {
            pointsGot += 100;
            perfect += 1;
        } else if (e == 2) {
            pointsGot += 75;
            good += 1;
        }
    });
    bus.on("hit", () => {
        hitSoundManager.play();
    });
    bus.on("miss", () => {
        combo = 0;
    });
    // Debug: tps
    bus.on("tick", () => {
        let now = Date.now();
        tickTimes.push(now);
        while (now - tickTimes[0] >= 1000) {
            tickTimes.splice(0, 1);
        }
    });
    // Time control
    bus.on("start", () => {
        startTime = Date.now() - backgroundMusic.actx.currentTime * 1000;
    });
    // Key input handler
    // - A
    let trackAKeyListener = new KeyListener("a");
    trackAKeyListener.onPress = () => {
        let fetched = false;
        chart.notes.forEach((element) => {
            if (fetched) {
                return;
            }
            if (element.a || element.t != "A") {
                return;
            }
            if (Math.abs(element.h - sec) <= 0.08) {
                fetched = true;
                element.a = perfectAnim;
                element.aa = sec;
                bus.emit("hit", 1);
            } else if (Math.abs(element.h - sec) <= 0.16) {
                fetched = true;
                element.a = goodAnim;
                element.aa = sec;
                bus.emit("hit", 2);
            } else if (Math.abs(element.h - sec) <= 0.32) {
                element.a = fadeOutAnim;
                element.aa = sec;
                element.ho = 0.25;
                bad++;
                bus.emit("miss", null);
            }
        });
    };
    trackAKeyListener.onRelease = () => {
        chart.notes.forEach((element) => {
            if (element.a <= 0 || element.t != "A" || element.y != "A") {
                return;
            }
            if (element.h + element.al! - sec > 0 && element.h - sec < 0) {
                pointsGot -= element.a == perfect ? 100 : 75;
                if (element.a == perfect) {
                    perfect--;
                } else {
                    good--;
                }
                element.a = -1;
                element.aa = 0;
                bus.emit("miss", null);
            }
        });
    };
    registerKeyListener(trackAKeyListener);
    // - B
    let trackBKeyListener = new KeyListener("l");
    trackBKeyListener.onPress = () => {
        let fetched = false;
        chart.notes.forEach((element) => {
            if (fetched) {
                return;
            }
            if (element.a || element.t != "B") {
                return;
            }
            if (Math.abs(element.h - sec) <= 0.08) {
                fetched = true;
                element.a = perfectAnim;
                element.aa = sec;
                bus.emit("hit", 1);
            } else if (Math.abs(element.h - sec) <= 0.16) {
                fetched = true;
                element.a = goodAnim;
                element.aa = sec;
                bus.emit("hit", 2);
            } else if (Math.abs(element.h - sec) <= 0.32) {
                element.a = fadeOutAnim;
                element.aa = sec;
                element.ho = 0.25;
                bad++;
                bus.emit("miss", null);
            }
        });
    };
    trackAKeyListener.onRelease = () => {
        chart.notes.forEach((element) => {
            if (element.a <= 0 || element.t != "B" || element.y != "A") {
                return;
            }
            if (element.h + element.al! - sec > 0 && element.h - sec < 0) {
                pointsGot -= element.a == perfectAnim ? 100 : 75;
                if (element.a == perfectAnim) {
                    perfect--;
                } else {
                    good--;
                }
                element.a = -1;
                element.aa = 0;
                bus.emit("miss", null);
            }
        });
    };
    registerKeyListener(trackBKeyListener);
    // Error: ID is null
    if (id == null) {
        ec.clear();
        renderText(loadErrorStr, 1600, 900, "center", 200, new RGBAColor(200, 200, 200));
        throw new Error("No data file given.");
    }
    // Load web data
    // - chart
    let song: JChart;
    await chartLoader.loadAsJson(`${id}.json`).then(async (response) => song = response.default);
    // Error: Song is null
    if (song == undefined) {
        ec.clear();
        renderText(loadErrorStr, 1600, 900, "center", 200, new RGBAColor(200, 200, 200));
        throw new Error("Data file has nothing or corrupted or not exist.");
    }
    // - script
    if (song.script) {
        await scriptLoader.inject(song.script);
    }
    // Prepare to start
    ec.clear();
    renderText(loadWaitClickStr, 1600, 900, "center", 200, new RGBAColor(230, 230, 230));
    await new Promise((resolve) => {
        document.onclick = () => {
            document.onclick = null;
            resolve(null);
        }
    });
    ec.clear();
    renderText(loadDownloadStr, 1600, 900, "center", 200, new RGBAColor(250, 250, 250));
    // Load: sounds
    hitSoundManager = new SoundManager(hit);
    backgroundMusic = new EnhancedAudioContext(new AudioContext());
    await backgroundMusic.actx.suspend();
    await hitSoundManager.load();
    if (song.bgsound) {
        await backgroundMusic.load(await soundLoader.loadAsUrl(song.bgsound));
    } else {
        await backgroundMusic.load(blank);
    }
    backgroundMusic.setVolume(backgroundVolume);
    hitSoundManager.setVolume(hitVolume);
    // Final chart parse
    chart = new Chart(song);
    // Main loop register
    bus.on("start", () => {
        let mainTimer = setInterval(async function () {
            // Pause handler
            if (paused) {
                pausedTime = (Date.now() - startTime) / 1000 - sec;
                return;
            }
            ec.clear();
            // Calculate time
            sec = (Date.now() - startTime) / 1000 - pausedTime;
            // Emit tick event
            bus.emit("tick", sec);
            // Render all notes
            // - Animation Notes
            chart.animationNotes.forEach(element => {
                // Proceed animation of each note
                if (element.a == fadeInAnim && sec - element.aa > element.hi!) {
                    element.a = 0;
                    element.aa = 0;
                } else if (Math.abs(element.h - sec) <= 1.5 / tps) {
                    if (element.ho) {
                        element.a = fadeOutAnim;
                        element.aa = sec;
                    }
                } else if (element.hi != undefined && Math.abs((element.h - element.p.spd - element.hi) - sec) <= 1.5 / tps) {
                    element.a = fadeInAnim;
                    element.aa = sec;
                }
                drawNote(element);
                drawA(element);
            });
            // - Clack Lines
            chart.notes.forEach(element => {
                drawClackLine(element);
            });
            // - Notes
            chart.notes.forEach(element => {
                // Autoplay handler
                if (autoPlay && !element.a && (Math.abs(element.h - sec) < 1.01 / tps)) {
                    element.a = perfect;
                    element.aa = element.h;
                    bus.emit("hit", 1);
                } else if ((sec - element.h) > 0.16 && !element.a) { // Miss handler
                    element.a = -1;
                    bus.emit("miss", null);
                }
                drawNote(element);
            });
            // - Notes' animation
            chart.notes.forEach(element => {
                drawA(element);
            });
            // - Texts
            drawTexts();
            // - Finish handler
            if (sec >= song!.length) {
                clearInterval(mainTimer);
                paused = true;
                location.replace(`./finish.html${setQueryString({i: id, c: maxCombo, t: (pointsGot / chart.notesTotal / 100 * 100000).toFixed(0), p: perfect, g: good, b: bad, m: chart.notesTotal - perfect - good})}`);
            }
        }, 1000 / tps);
    });
    // Start
    ec.clear();
    await backgroundMusic.actx.resume();
    backgroundMusic.play();
    bus.emit("start", null);
}

// Debug content inject

if (debug) {
    globalThis.cinject = (k: string) => {
        return eval(k);
    }
}

// Onload inject

window.onload = main;


export {bus, renderText, drawNote, ctx, drawA, drawClackLine, tps, paused, sec};