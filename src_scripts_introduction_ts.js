"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkcforce"] = self["webpackChunkcforce"] || []).push([["src_scripts_introduction_ts"],{

/***/ "./src/scripts/introduction.ts":
/*!*************************************!*\
  !*** ./src/scripts/introduction.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../player */ \"./src/player.ts\");\n\n_player__WEBPACK_IMPORTED_MODULE_0__.bus.on(\"tick\", function (t) {\n    if (t >= 0 && t <= 5) {\n        (0,_player__WEBPACK_IMPORTED_MODULE_0__.renderText)(\"欢迎来到CForce的新手教程！\", 1600, 900, \"center\", 50, (t < 1 ? t : t > 4 ? 5 - t : 1));\n    }\n    if (t >= 6 && t <= 10) {\n        (0,_player__WEBPACK_IMPORTED_MODULE_0__.renderText)(\"<-这是判定球\", (t < 8 ? 1300 + t * 100 : 2100), 900, \"center\", 50, (t < 7 ? t - 6 : t > 9 ? 10 - t : 1));\n    }\n    if (t >= 10 && t <= 15) {\n        (0,_player__WEBPACK_IMPORTED_MODULE_0__.renderText)(\"CForce的音符分为Click和Clack\", 1600, 1100, \"center\", 50, (t < 11 ? t - 10 : t > 14 ? 15 - t : 1));\n    }\n    if (t >= 15 && t <= 20) {\n        (0,_player__WEBPACK_IMPORTED_MODULE_0__.renderText)(\"每个音符可以出现在Track A或者Track B上\", 1600, 1100, \"center\", 50, (t < 16 ? t - 15 : t > 19 ? 20 - t : 1));\n    }\n    if (t >= 20 && t <= 25) {\n        (0,_player__WEBPACK_IMPORTED_MODULE_0__.renderText)(\"这是一个出现在Track A上的Click音符，在它落到判定球上时按下[A]\", 1600, 1100, \"center\", 50, (t < 21 ? t - 20 : t > 24 ? 25 - t : 1));\n    }\n    if (t >= 25 && t <= 30) {\n        (0,_player__WEBPACK_IMPORTED_MODULE_0__.renderText)(\"这是一个出现在Track B上的Click音符，在它落到判定球上时按下[L]\", 1600, 1100, \"center\", 50, (t < 26 ? t - 25 : t > 29 ? 30 - t : 1));\n    }\n    if (t >= 30 && t <= 35) {\n        (0,_player__WEBPACK_IMPORTED_MODULE_0__.renderText)(\"这是一个出现在Track A上的Clack音符，按住[A]直到音符结束\", 1600, 1100, \"center\", 50, (t < 31 ? t - 30 : t > 34 ? 35 - t : 1));\n    }\n    if (t >= 35 && t <= 40) {\n        (0,_player__WEBPACK_IMPORTED_MODULE_0__.renderText)(\"判定球可以移动，也可以变成多个\", 1600, 1100, \"center\", 50, (t < 36 ? t - 35 : t > 39 ? 40 - t : 1));\n    }\n    if (t >= 40 && t <= 45) {\n        (0,_player__WEBPACK_IMPORTED_MODULE_0__.renderText)(\"CForce的新手教程至此结束\", 1600, 900, \"center\", 50, (t < 41 ? t - 40 : t > 44 ? 45 - t : 1));\n    }\n});\n\n\n//# sourceURL=webpack://cforce/./src/scripts/introduction.ts?");

/***/ })

}]);