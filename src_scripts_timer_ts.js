"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkcforce"] = self["webpackChunkcforce"] || []).push([["src_scripts_timer_ts"],{

/***/ "./src/scripts/timer.ts":
/*!******************************!*\
  !*** ./src/scripts/timer.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../player */ \"./src/player.ts\");\n\nvar start_tick = Date.now();\n_player__WEBPACK_IMPORTED_MODULE_0__.bus.on(\"start\", function (t) {\n    start_tick = Date.now();\n});\n_player__WEBPACK_IMPORTED_MODULE_0__.bus.on(\"tick\", function (t) {\n    if (t >= 0 && t <= 5) {\n        (0,_player__WEBPACK_IMPORTED_MODULE_0__.renderText)(\"这个谱子长度为1小时，没有音符，不要尝试通关，会导致游戏崩溃\", 1600, 900, \"center\", 50, (t < 1 ? t : t > 4 ? 5 - t : 1));\n        (0,_player__WEBPACK_IMPORTED_MODULE_0__.renderText)(\"该铺子唯一用途为测试设备性能\", 1600, 950, \"center\", 50, (t < 1 ? t : t > 4 ? 5 - t : 1));\n    }\n    (0,_player__WEBPACK_IMPORTED_MODULE_0__.renderText)(\"\\u5B9E\\u9645\\u8FD0\\u884C\\u65F6\\u957F\\uFF1A\".concat(((Date.now() - start_tick) / 1000).toFixed(3), \"\\u79D2\"), 1600, 1000, \"center\", 50, 1);\n    (0,_player__WEBPACK_IMPORTED_MODULE_0__.renderText)(\"\\u7A0B\\u5E8F\\u8FD0\\u884C\\u65F6\\u957F\\uFF1A\".concat(t.toFixed(3), \"\\u79D2\"), 1600, 1050, \"center\", 50, 1);\n});\n\n\n//# sourceURL=webpack://cforce/./src/scripts/timer.ts?");

/***/ })

}]);