import {bus,renderText} from "../player";
let startTick = Date.now();
bus.on("start", t => {
    startTick = Date.now();
});
bus.on("tick", t => {
    if (t >= 0 && t <= 5) {
        renderText("这个谱子长度为1小时，没有音符，不要尝试通关，会导致游戏崩溃", 1600, 900, "center", 50, (t < 1 ? t : t > 4 ? 5 - t : 1));
        renderText("该铺子唯一用途为测试设备性能", 1600, 950, "center", 50, (t < 1 ? t : t > 4 ? 5 - t : 1));
    }
    renderText(`实际运行时长：${((Date.now() - startTick) / 1000).toFixed(3)}秒`, 1600, 1000, "center", 50, 1);
    renderText(`程序运行时长：${t.toFixed(3)}秒`, 1600, 1050, "center", 50, 1);
});
