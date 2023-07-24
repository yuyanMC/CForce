/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/css-loader/dist/cjs.js!./src/player.css":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/player.css ***!
  \**************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, `#main_canvas{\n    width: 100%;\n    height: 100%;\n    position: absolute;\n    top:0;bottom:0; /* vertical center */\n    left:0;right:0; /* horizontal center */\n    backdrop-filter: blur(10vw);\n}\n#canvas_box{\n    width: 100vw;\n    height: 56.25vw; /* height:width ratio = 9/16 = .5625  */\n    max-height: 100vh;\n    max-width: 177.78vh; /* 16/9 = 1.778 */\n    margin: auto;\n    position: absolute;\n    top:0;bottom:0; /* vertical center */\n    left:0;right:0; /* horizontal center */\n    background-repeat: no-repeat;\n    background-size: contain;\n    background-origin: content-box;\n}\nhtml,body{\n    overflow:hidden;\n}\n*{\n    margin: 0;\n    padding: 0;\n}`, \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://cforce/./src/player.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = [];\n\n  // return the list of modules as css string\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n      content += cssWithMappingToString(item);\n      if (needLayer) {\n        content += \"}\";\n      }\n      if (item[2]) {\n        content += \"}\";\n      }\n      if (item[4]) {\n        content += \"}\";\n      }\n      return content;\n    }).join(\"\");\n  };\n\n  // import a list of modules into the list\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n    var alreadyImportedModules = {};\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n      list.push(item);\n    }\n  };\n  return list;\n};\n\n//# sourceURL=webpack://cforce/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://cforce/./node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ }),

/***/ "./src/player.css":
/*!************************!*\
  !*** ./src/player.css ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_player_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./player.css */ \"./node_modules/css-loader/dist/cjs.js!./src/player.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_player_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_player_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_player_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_player_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://cforce/./src/player.css?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nvar stylesInDOM = [];\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n  return result;\n}\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n    identifiers.push(identifier);\n  }\n  return identifiers;\n}\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n  return updater;\n}\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n    var newLastIdentifiers = modulesToDom(newList, options);\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n      var _index = getIndexByIdentifier(_identifier);\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://cforce/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nvar memo = {};\n\n/* istanbul ignore next  */\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target);\n\n    // Special case to return head of iframe instead of iframe itself\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n    memo[target] = styleTarget;\n  }\n  return memo[target];\n}\n\n/* istanbul ignore next  */\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n  target.appendChild(style);\n}\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://cforce/./node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://cforce/./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://cforce/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n  var needLayer = typeof obj.layer !== \"undefined\";\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n  css += obj.css;\n  if (needLayer) {\n    css += \"}\";\n  }\n  if (obj.media) {\n    css += \"}\";\n  }\n  if (obj.supports) {\n    css += \"}\";\n  }\n  var sourceMap = obj.sourceMap;\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  }\n\n  // For old IE\n  /* istanbul ignore if  */\n  options.styleTagTransform(css, styleElement, options.options);\n}\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n  styleElement.parentNode.removeChild(styleElement);\n}\n\n/* istanbul ignore next  */\nfunction domAPI(options) {\n  if (typeof document === \"undefined\") {\n    return {\n      update: function update() {},\n      remove: function remove() {}\n    };\n  }\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://cforce/./node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://cforce/./node_modules/style-loader/dist/runtime/styleTagTransform.js?");

/***/ }),

/***/ "./src/player.ts":
/*!***********************!*\
  !*** ./src/player.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   EventBus: () => (/* binding */ EventBus),\n/* harmony export */   Note: () => (/* binding */ Note),\n/* harmony export */   Path: () => (/* binding */ Path),\n/* harmony export */   bus: () => (/* binding */ bus),\n/* harmony export */   ctx: () => (/* binding */ ctx),\n/* harmony export */   drawA: () => (/* binding */ drawA),\n/* harmony export */   drawClackLine: () => (/* binding */ drawClackLine),\n/* harmony export */   drawNote: () => (/* binding */ drawNote),\n/* harmony export */   paused: () => (/* binding */ paused),\n/* harmony export */   renderText: () => (/* binding */ renderText),\n/* harmony export */   sec: () => (/* binding */ sec),\n/* harmony export */   tps: () => (/* binding */ tps)\n/* harmony export */ });\n/* harmony import */ var _player_gui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player/gui */ \"./src/player/gui.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        if (typeof b !== \"function\" && b !== null)\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (undefined && undefined.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (g && (g = 0, op[0] && (_ = 0)), _) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nvar __read = (undefined && undefined.__read) || function (o, n) {\n    var m = typeof Symbol === \"function\" && o[Symbol.iterator];\n    if (!m) return o;\n    var i = m.call(o), r, ar = [], e;\n    try {\n        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);\n    }\n    catch (error) { e = { error: error }; }\n    finally {\n        try {\n            if (r && !r.done && (m = i[\"return\"])) m.call(i);\n        }\n        finally { if (e) throw e.error; }\n    }\n    return ar;\n};\nvar __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {\n    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {\n        if (ar || !(i in from)) {\n            if (!ar) ar = Array.prototype.slice.call(from, 0, i);\n            ar[i] = from[i];\n        }\n    }\n    return to.concat(ar || Array.prototype.slice.call(from));\n};\n__webpack_require__(/*! ./player.css */ \"./src/player.css\");\n\nvar EventBus = /** @class */ (function () {\n    function EventBus() {\n        /** 保存 key => set 映射 */\n        this.map = new Map();\n    }\n    EventBus.prototype.on = function (name, handler) {\n        var set = this.map.get(name);\n        if (!set) {\n            set = new Set();\n            this.map.set(name, set);\n        }\n        set.add(handler);\n    };\n    EventBus.prototype.emit = function (name, value) {\n        var set = this.map.get(name);\n        if (!set)\n            return;\n        var copied = __spreadArray([], __read(set), false);\n        copied.forEach(function (fn) { return fn(value); });\n    };\n    return EventBus;\n}());\n// libEnd\nvar ctx;\nvar notes = [];\nvar animationNotes = [];\n//let tick:number=0; // @deprecated @unused\nvar tps = 144;\nvar song = null;\nvar autoPlay = false;\nvar combo = 0;\nvar sound_hit = null;\nvar sound_hit_manager = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];\nvar sound_bg = null;\nvar base_volume = 0.2;\nvar points_got = 0;\nvar points_total = 0;\nvar notes_total = 0;\nvar max_combo = 0;\nvar perfect = 0;\nvar good = 0;\nvar paused = false;\nvar tickTimes = [];\nvar trueTps = 0;\nvar debug = true;\nvar startTime = Date.now();\nvar sec = 0;\nvar paused_time = 0;\nvar ec;\nvar bus = new EventBus();\nvar Path = /** @class */ (function () {\n    function Path(_spd) {\n        this.spd = _spd;\n    }\n    Path.prototype.cal = function (t) {\n        return [0, 0];\n    };\n    return Path;\n}());\nvar StaticPath = /** @class */ (function (_super) {\n    __extends(StaticPath, _super);\n    function StaticPath(_spd, _x, _y) {\n        var _this = _super.call(this, _spd) || this;\n        _this.x = _x;\n        _this.y = _y;\n        return _this;\n    }\n    StaticPath.prototype.cal = function (t) {\n        return [this.x, this.y];\n    };\n    return StaticPath;\n}(Path));\nvar LinePath = /** @class */ (function (_super) {\n    __extends(LinePath, _super);\n    function LinePath(_spd, _fx, _fy, _tx, _ty) {\n        var _this = _super.call(this, _spd) || this;\n        _this.fx = _fx;\n        _this.fy = _fy;\n        _this.tx = _tx;\n        _this.ty = _ty;\n        return _this;\n    }\n    LinePath.prototype.cal = function (t) {\n        return [this.fx + (this.tx - this.fx) * t, this.fy + (this.ty - this.fy) * t];\n    };\n    return LinePath;\n}(Path));\nvar ArcPath = /** @class */ (function (_super) {\n    __extends(ArcPath, _super);\n    function ArcPath(_spd, _cx, _cy, _fx, _fy, _tx, _ty) {\n        if (_tx === void 0) { _tx = 1600; }\n        if (_ty === void 0) { _ty = 900; }\n        var _this = _super.call(this, _spd) || this;\n        if (Math.pow((_fx - _cx), 2) + Math.pow((_fy - _cy), 2) - Math.pow((_tx - _cx), 2) - Math.pow((_ty - _cy), 2) >= 0.01) {\n            throw Error(\"Invalid ArcPath for(\".concat(_cx, \" \").concat(_cy, \" \").concat(_fx, \" \").concat(_fy, \" \").concat(_tx, \" \").concat(_ty, \")\"));\n        }\n        _this.cx = _cx;\n        _this.cy = _cy;\n        _this.fromx = _fx;\n        _this.fromy = _fy;\n        _this.tox = _tx;\n        _this.toy = _ty;\n        return _this;\n    }\n    ArcPath.prototype.cal = function (t) {\n        if (t < 0) {\n            return [this.fromx, this.fromy];\n        }\n        if (t > 1) {\n            return [this.tox, this.toy];\n        }\n        var ba = angcalc(this.cx, this.cy, this.fromx, this.fromy);\n        var ea = angcalc(this.cx, this.cy, this.tox, this.toy);\n        var ca = ba + (ea - ba) * t;\n        var r = Math.sqrt(Math.pow((this.tox - this.cx), 2) + Math.pow((this.toy - this.cy), 2));\n        return [Math.cos(ca) * r + this.cx, Math.sin(ca) * r + this.cy];\n    };\n    return ArcPath;\n}(Path));\nvar SubscriberPath = /** @class */ (function (_super) {\n    __extends(SubscriberPath, _super);\n    function SubscriberPath(_p) {\n        var _this = _super.call(this, _p.spd) || this;\n        _this.p = _p;\n        return _this;\n    }\n    return SubscriberPath;\n}(Path));\nvar Pow2SPath = /** @class */ (function (_super) {\n    __extends(Pow2SPath, _super);\n    function Pow2SPath(_p) {\n        return _super.call(this, _p) || this;\n    }\n    Pow2SPath.prototype.cal = function (t) {\n        return this.p.cal(Math.pow(t, 2));\n    };\n    return Pow2SPath;\n}(SubscriberPath));\nvar ReversePow2SPath = /** @class */ (function (_super) {\n    __extends(ReversePow2SPath, _super);\n    function ReversePow2SPath(_p) {\n        return _super.call(this, _p) || this;\n    }\n    ReversePow2SPath.prototype.cal = function (t) {\n        return this.p.cal(Math.pow((1 - t), 2));\n    };\n    return ReversePow2SPath;\n}(SubscriberPath));\nvar MultiPath = /** @class */ (function (_super) {\n    __extends(MultiPath, _super);\n    function MultiPath(_ps) {\n        var _this = this;\n        var spdsum = 0;\n        _ps.forEach(function (element) {\n            spdsum += element.spd;\n        });\n        _this = _super.call(this, spdsum) || this;\n        _this.ps = _ps;\n        _this.ssp = [];\n        var nss = 0;\n        _this.ssp.push(0);\n        _ps.forEach(function (element) {\n            nss += element.spd;\n            _this.ssp.push(nss / spdsum);\n        });\n        return _this;\n    }\n    MultiPath.prototype.cal = function (t) {\n        for (var i = 1; i < this.ssp.length; i++) {\n            if (t < this.ssp[i]) {\n                var nt = (t - this.ssp[i - 1]) / (this.ssp[i] - this.ssp[i - 1]);\n                return this.ps[i - 1].cal(nt);\n            }\n        }\n        return this.ps[this.ps.length - 1].cal(1);\n    };\n    return MultiPath;\n}(Path));\nvar Note = /** @class */ (function () {\n    function Note(_p, _h, _t, _y, _al, _f) {\n        this.p = _p;\n        this.h = _h;\n        this.t = _t;\n        this.y = _y;\n        this.a = 0;\n        this.aa = 0;\n        if (this.y == \"A\" && _al == undefined) {\n            _al = 0;\n        }\n        this.al = _al;\n        this.f = _f ? _f : [64, 64, 64];\n    }\n    return Note;\n}());\nfunction renderText(text, x, y, align, fontSize, fill) {\n    if (align === void 0) { align = \"left\"; }\n    if (fontSize === void 0) { fontSize = 50; }\n    if (fill === void 0) { fill = new _player_gui__WEBPACK_IMPORTED_MODULE_0__.RGBAColor(255, 255, 255); }\n    ec.render(new _player_gui__WEBPACK_IMPORTED_MODULE_0__.TextCanvasObject(text, x, y, align, fontSize, fill instanceof _player_gui__WEBPACK_IMPORTED_MODULE_0__.RGBAColor ? fill : new _player_gui__WEBPACK_IMPORTED_MODULE_0__.RGBAColor(255, 255, 255, fill)));\n}\nfunction getQueryString(name) {\n    var reg = new RegExp(\"(^|&)\" + name + \"=([^&]*)(&|$)\", \"i\");\n    var r = window.location.search.substr(1).match(reg);\n    if (r != null) {\n        return decodeURIComponent(r[2]);\n    }\n    return null;\n}\nfunction angcalc(cx, cy, ax, ay) {\n    if (ay == cy) {\n        return Math.PI;\n    }\n    if (ay < cy) {\n        return Math.PI / 2 - Math.atan((ax - cx) / (ay - cy)) + Math.PI;\n    }\n    return Math.PI / 2 - Math.atan((ax - cx) / (ay - cy));\n}\nfunction drawNote(note) {\n    if ((sec - note.h + note.p.spd) / note.p.spd < 0 || (sec - note.h + note.p.spd) / note.p.spd > 1) {\n        return;\n    }\n    var np = note.p.cal((sec - note.h + note.p.spd) / note.p.spd);\n    var c;\n    if (note.t == \"A\") {\n        c = new _player_gui__WEBPACK_IMPORTED_MODULE_0__.RGBAColor(0, 220, 240);\n    }\n    else if (note.t == \"B\") {\n        c = new _player_gui__WEBPACK_IMPORTED_MODULE_0__.RGBAColor(220, 70, 20);\n    }\n    else {\n        c = new _player_gui__WEBPACK_IMPORTED_MODULE_0__.RGBAColor(note.f[0], note.f[1], note.f[2]);\n    }\n    ec.render(new (_player_gui__WEBPACK_IMPORTED_MODULE_0__.NoteCanvasObject.bind.apply(_player_gui__WEBPACK_IMPORTED_MODULE_0__.NoteCanvasObject, __spreadArray(__spreadArray([void 0], __read(np), false), [c], false)))());\n}\nfunction drawClackLine(note) {\n    if (note.y != \"A\") {\n        return;\n    }\n    if ((sec - note.h + note.p.spd) / note.p.spd < 0 || (sec - note.al - note.h + note.p.spd) / note.p.spd > 1) {\n        return;\n    }\n    ec.render(new _player_gui__WEBPACK_IMPORTED_MODULE_0__.ClackLineCanvasObject(note.p, (sec - note.al - note.h + note.p.spd) / note.p.spd, (sec - note.h + note.p.spd) / note.p.spd));\n}\nfunction drawA(note) {\n    var ad = sec - note.aa;\n    if (note.a == 12 && ad < note.hi) {\n        var np = note.p.cal(0);\n        var rc = ad / note.hi + 1;\n        var c = new _player_gui__WEBPACK_IMPORTED_MODULE_0__.RGBAColor(note.f[0], note.f[1], note.f[2], rc - 1);\n        ec.render(new (_player_gui__WEBPACK_IMPORTED_MODULE_0__.NoteCanvasObject.bind.apply(_player_gui__WEBPACK_IMPORTED_MODULE_0__.NoteCanvasObject, __spreadArray(__spreadArray([void 0], __read(np), false), [c], false)))());\n    }\n    else if (note.a == 11 && ad < note.ho) {\n        var np = note.p.cal(1);\n        var rc = ad / note.ho + 1;\n        var c = new _player_gui__WEBPACK_IMPORTED_MODULE_0__.RGBAColor(note.f[0], note.f[1], note.f[2], 2 - rc);\n        ec.render(new (_player_gui__WEBPACK_IMPORTED_MODULE_0__.NoteCanvasObject.bind.apply(_player_gui__WEBPACK_IMPORTED_MODULE_0__.NoteCanvasObject, __spreadArray(__spreadArray([void 0], __read(np), false), [c], false)))());\n    }\n    else if (note.a > 0 && ad < 0.25) {\n        var rc = ad / 0.25 + 1;\n        var np = note.p.cal(1);\n        var c = new _player_gui__WEBPACK_IMPORTED_MODULE_0__.RGBAColor(0, 0, 0, 0);\n        if (note.a == 1) {\n            c = new _player_gui__WEBPACK_IMPORTED_MODULE_0__.RGBAColor(160, 144, 0, 2 - rc);\n        }\n        else if (note.a == 2) {\n            c = new _player_gui__WEBPACK_IMPORTED_MODULE_0__.RGBAColor(0, 167, 195, 2 - rc);\n        }\n        ec.render(new (_player_gui__WEBPACK_IMPORTED_MODULE_0__.NoteCanvasObject.bind.apply(_player_gui__WEBPACK_IMPORTED_MODULE_0__.NoteCanvasObject, __spreadArray(__spreadArray([void 0], __read(np), false), [c, rc * 88], false)))());\n    }\n}\nfunction drawTexts() {\n    ctx.fillStyle = \"rgb(255,255,255)\";\n    ctx.font = \"50px 'Courier New'\";\n    ctx.textAlign = \"center\";\n    renderText(\"\".concat(combo), 1600, 60, \"center\");\n    renderText(\"COMBO\", 1600, 120, \"center\");\n    renderText(\"Point: \".concat((points_got / points_total * 100000).toFixed(0)), 3150, 60, \"right\");\n    renderText(\"Music: \".concat((sec / song.length * 100).toFixed(2), \"%\"), 3150, 120, \"right\");\n    if (debug) {\n        trueTps = tickTimes.length;\n        var c = new _player_gui__WEBPACK_IMPORTED_MODULE_0__.RGBAColor(255, 0, 255);\n        if ((trueTps / tps) >= 0.00) {\n            c = new _player_gui__WEBPACK_IMPORTED_MODULE_0__.RGBAColor(255, 0, 255);\n        }\n        if ((trueTps / tps) > 0.30) {\n            c = new _player_gui__WEBPACK_IMPORTED_MODULE_0__.RGBAColor(255, 0, 63);\n        }\n        if ((trueTps / tps) > 0.60) {\n            c = new _player_gui__WEBPACK_IMPORTED_MODULE_0__.RGBAColor(255, 0, 0);\n        }\n        if ((trueTps / tps) > 0.90) {\n            c = new _player_gui__WEBPACK_IMPORTED_MODULE_0__.RGBAColor(255, 127, 0);\n        }\n        if ((trueTps / tps) > 0.95) {\n            c = new _player_gui__WEBPACK_IMPORTED_MODULE_0__.RGBAColor(255, 255, 0);\n        }\n        if ((trueTps / tps) > 0.999) {\n            c = new _player_gui__WEBPACK_IMPORTED_MODULE_0__.RGBAColor(0, 255, 0);\n        }\n        if ((trueTps / tps) > 0.99999) {\n            c = new _player_gui__WEBPACK_IMPORTED_MODULE_0__.RGBAColor(0, 255, 255);\n        }\n        renderText(\"TPS: \".concat(trueTps.toFixed(2), \"/\").concat(tps), 3150, 180, \"right\", 50, c);\n        renderText(\"Sec: \".concat(sec.toFixed(3), \" Paused: \").concat(paused_time.toFixed(3), \" Total: \").concat(((Date.now() - startTime) / 1000).toFixed(3), \" Music: \").concat(sound_bg.currentTime.toFixed(3)), 3150, 240, \"right\");\n    }\n}\nfunction parsePath(n) {\n    var ep = n;\n    var p = new Path(0);\n    switch (ep.type) {\n        case \"arc\":\n            p = new ArcPath(ep.spd, ep.c[0], ep.c[1], ep.f[0], ep.f[1], ep.t[0], ep.t[1]);\n            break;\n        case \"line\":\n            p = new LinePath(ep.spd, ep.f[0], ep.f[1], ep.t[0], ep.t[1]);\n            break;\n        case \"static\":\n            p = new StaticPath(ep.spd, ep.pos[0], ep.pos[1]);\n            break;\n        case \"pow2\":\n            p = new Pow2SPath(parsePath(ep.p));\n            break;\n        case \"rpow2\":\n            p = new ReversePow2SPath(parsePath(ep.p));\n            break;\n        default:\n            throw Error(\"Invalid path type\");\n    }\n    return p;\n}\nfunction parseSong() {\n    if (song === null) {\n        throw Error(\"Song not loaded\");\n    }\n    song.notes.forEach(function (element) {\n        var ps = [];\n        element.paths.forEach(function (pe) {\n            ps.push(parsePath(pe));\n        });\n        var p = new MultiPath(ps);\n        notes.push(new Note(p, element.h, element.track, element.type, element.al));\n    });\n    song.animationNotes.forEach(function (element) {\n        var ps = [];\n        element.paths.forEach(function (pe) {\n            ps.push(parsePath(pe));\n        });\n        var p = new MultiPath(ps);\n        var n = new Note(p, element.h, \"M\", element.type, element.al, element.fill);\n        n.ho = element.ho;\n        n.hi = element.hi;\n        animationNotes.push(n);\n    });\n    points_total = song.notes.length * 100;\n    notes_total = song.notes.length;\n}\nfunction nextFrame() {\n    ec.clear();\n}\nfunction main() {\n    return __awaiter(this, void 0, void 0, function () {\n        var id, canvas, i, i, timer;\n        var _this = this;\n        return __generator(this, function (_a) {\n            switch (_a.label) {\n                case 0:\n                    id = getQueryString(\"id\");\n                    document.getElementById(\"canvas_box\").style.backgroundImage = \"url(\".concat(__webpack_require__(\"./src/images sync recursive ^\\\\.\\\\/.*\\\\.png$\")(\"./\" + id + \".png\"), \")\");\n                    canvas = document.getElementById('main_canvas');\n                    ctx = canvas.getContext('2d');\n                    ec = new _player_gui__WEBPACK_IMPORTED_MODULE_0__.EnhancedContent(ctx);\n                    ec.setBackGroundColor(\"rgba(0,0,0,0.5)\");\n                    ec.clear();\n                    renderText(\"游戏正在加载\", 1600, 900, \"center\", 200, new _player_gui__WEBPACK_IMPORTED_MODULE_0__.RGBAColor(200, 200, 200));\n                    bus.on(\"hit\", function (e) {\n                        combo++;\n                        max_combo = Math.max(combo, max_combo);\n                        if (e == 1) {\n                            points_got += 100;\n                            perfect += 1;\n                        }\n                        else if (e == 2) {\n                            points_got += 75;\n                            good += 1;\n                        }\n                    });\n                    bus.on(\"hit\", function (e) {\n                        for (var i = 0; i < 16; i++) {\n                            if (Date.now() > sound_hit_manager[i]) {\n                                sound_hit[i].play();\n                                sound_hit_manager[i] = Date.now() + 200;\n                                console.log(\"Playing hit \".concat(i));\n                                break;\n                            }\n                        }\n                    });\n                    bus.on(\"miss\", function (e) {\n                        combo = 0;\n                    });\n                    bus.on(\"tick\", function (e) {\n                        var now = Date.now();\n                        tickTimes.push(now);\n                        while (now - tickTimes[0] >= 1000) {\n                            tickTimes.splice(0, 1);\n                        }\n                    });\n                    bus.on(\"start\", function (e) {\n                        startTime = Date.now() - sound_bg.currentTime * 1000;\n                    });\n                    document.addEventListener(\"keydown\", function (e) {\n                        var fetched = false;\n                        if (e.keyCode == 65) {\n                            notes.forEach(function (element) {\n                                if (fetched) {\n                                    return;\n                                }\n                                if (element.a || element.t != \"A\") {\n                                    return;\n                                }\n                                if (Math.abs(element.h - sec) <= 0.08) {\n                                    fetched = true;\n                                    element.a = 1;\n                                    element.aa = sec;\n                                    bus.emit(\"hit\", 1);\n                                }\n                                else if (Math.abs(element.h - sec) <= 0.16) {\n                                    fetched = true;\n                                    element.a = 2;\n                                    element.aa = sec;\n                                    bus.emit(\"hit\", 2);\n                                }\n                            });\n                            if (!fetched) {\n                                bus.emit(\"miss\", null);\n                            }\n                        }\n                        if (e.keyCode == 76) {\n                            notes.forEach(function (element) {\n                                if (fetched) {\n                                    return;\n                                }\n                                if (element.a || element.t != \"B\") {\n                                    return;\n                                }\n                                if (Math.abs(element.h - sec) <= 0.08) {\n                                    fetched = true;\n                                    element.a = 1;\n                                    element.aa = sec;\n                                    bus.emit(\"hit\", 1);\n                                }\n                                else if (Math.abs(element.h - sec) <= 0.16) {\n                                    fetched = true;\n                                    element.a = 2;\n                                    element.aa = sec;\n                                    bus.emit(\"hit\", 2);\n                                }\n                            });\n                            if (!fetched) {\n                                bus.emit(\"miss\", null);\n                            }\n                        }\n                    });\n                    document.addEventListener(\"keyup\", function (e) {\n                        if (e.keyCode == 65) {\n                            notes.forEach(function (element) {\n                                if (element.a <= 0 || element.t != \"A\" || element.y != \"A\") {\n                                    return;\n                                }\n                                if (element.h + element.al - sec > 0 && element.h - sec < 0) {\n                                    points_got -= element.a == 1 ? 100 : 75;\n                                    if (element.a == 1) {\n                                        perfect--;\n                                    }\n                                    else {\n                                        good--;\n                                    }\n                                    element.a = -1;\n                                    element.aa = 0;\n                                    bus.emit(\"miss\", null);\n                                }\n                            });\n                        }\n                        if (e.keyCode == 76) {\n                            notes.forEach(function (element) {\n                                if (element.a <= 0 || element.t != \"B\" || element.y != \"A\") {\n                                    return;\n                                }\n                                if (element.h + element.al - sec > 0 && element.h - sec < 0) {\n                                    points_got -= element.a == 1 ? 100 : 75;\n                                    if (element.a == 1) {\n                                        perfect--;\n                                    }\n                                    else {\n                                        good--;\n                                    }\n                                    element.a = -1;\n                                    element.aa = 0;\n                                    bus.emit(\"miss\", null);\n                                }\n                            });\n                        }\n                    });\n                    if (id == null) {\n                        ec.clear();\n                        renderText(\"游戏加载错误，请尝试刷新\", 1600, 900, \"center\", 200, new _player_gui__WEBPACK_IMPORTED_MODULE_0__.RGBAColor(200, 200, 200));\n                        throw new Error(\"No data file given.\");\n                    }\n                    return [4 /*yield*/, fetch(__webpack_require__(\"./src/charts sync recursive ^\\\\.\\\\/.*\\\\.json$\")(\"./\".concat(id, \".json\"))).then(function (response) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {\n                            switch (_a.label) {\n                                case 0: return [4 /*yield*/, response.json()];\n                                case 1: return [2 /*return*/, song = _a.sent()];\n                            }\n                        }); }); })];\n                case 1:\n                    _a.sent();\n                    if (song == undefined) {\n                        ec.clear();\n                        renderText(\"游戏加载错误，请尝试刷新\", 1600, 900, \"center\", 200, new _player_gui__WEBPACK_IMPORTED_MODULE_0__.RGBAColor(200, 200, 200));\n                        throw new Error(\"Data file has nothing or corrupted or not exist.\");\n                    }\n                    if (!song.script) return [3 /*break*/, 3];\n                    return [4 /*yield*/, __webpack_require__(\"./src/scripts lazy recursive ^\\\\.\\\\/.*$\")(\"./\".concat(song.script))];\n                case 2:\n                    _a.sent();\n                    _a.label = 3;\n                case 3:\n                    sound_hit = [];\n                    for (i = 0; i < 16; i++) {\n                        sound_hit.push(new Audio(__webpack_require__(/*! ./sounds/hit.mp3 */ \"./src/sounds/hit.mp3\")));\n                    }\n                    if (song.bgsound) {\n                        sound_bg = new Audio(__webpack_require__(\"./src/sounds sync recursive ^\\\\.\\\\/.*$\")(\"./\" + song.bgsound));\n                    }\n                    else {\n                        sound_bg = new Audio(__webpack_require__(/*! ./sounds/blank.mp3 */ \"./src/sounds/blank.mp3\"));\n                    }\n                    if (/[\\s\\S]*(iPhone|iPad|iPod)[\\s\\S]*/.test(navigator.userAgent)) {\n                        sound_bg.load();\n                        for (i = 0; i < 16; i++) {\n                            sound_hit[i].load();\n                        }\n                    }\n                    return [4 /*yield*/, new Promise(function (r) {\n                            var t = setInterval(function () {\n                                if (sound_hit[0].readyState == HTMLMediaElement.HAVE_ENOUGH_DATA && sound_bg.readyState == HTMLMediaElement.HAVE_ENOUGH_DATA) {\n                                    clearInterval(t);\n                                    r(null);\n                                }\n                            }, 10);\n                        })];\n                case 4:\n                    _a.sent();\n                    sound_bg.volume = 0.5 * base_volume;\n                    sound_hit.forEach(function (e) {\n                        e.volume = 1 * base_volume;\n                    });\n                    parseSong();\n                    ec.clear();\n                    timer = setInterval(function () {\n                        if (sound_bg.currentTime > 0) {\n                            clearInterval(timer);\n                            bus.emit(\"start\", null);\n                        }\n                    }, 1);\n                    sound_bg.play().catch(function (e) { return __awaiter(_this, void 0, void 0, function () {\n                        return __generator(this, function (_a) {\n                            switch (_a.label) {\n                                case 0:\n                                    alert(\"您未开启音频自动播放，请关闭弹窗后点击屏幕开始游戏。\");\n                                    return [4 /*yield*/, new Promise(function (resolve) {\n                                            document.onclick = function (e) {\n                                                resolve(null);\n                                                document.onclick = null;\n                                            };\n                                        })];\n                                case 1:\n                                    _a.sent();\n                                    sound_bg.play();\n                                    return [2 /*return*/];\n                            }\n                        });\n                    }); });\n                    bus.on(\"start\", function () {\n                        var mainTimer = setInterval(function () {\n                            return __awaiter(this, void 0, void 0, function () {\n                                return __generator(this, function (_a) {\n                                    if (paused) {\n                                        paused_time = (Date.now() - startTime) / 1000 - sec;\n                                        return [2 /*return*/];\n                                    }\n                                    nextFrame();\n                                    sec = (Date.now() - startTime) / 1000 - paused_time;\n                                    bus.emit(\"tick\", sec);\n                                    animationNotes.forEach(function (element) {\n                                        if (element.a == 12 && sec - element.aa > element.hi) {\n                                            element.a = 0;\n                                            element.aa = 0;\n                                        }\n                                        else if (Math.abs(element.h - sec) <= 1.5 / tps) {\n                                            if (element.ho) {\n                                                element.a = 11;\n                                                element.aa = sec;\n                                            }\n                                        }\n                                        else if (element.hi != undefined && Math.abs((element.h - element.p.spd - element.hi) - sec) <= 1.5 / tps) {\n                                            element.a = 12;\n                                            element.aa = sec;\n                                        }\n                                        drawNote(element);\n                                        drawA(element);\n                                    });\n                                    notes.forEach(function (element) {\n                                        drawClackLine(element);\n                                    });\n                                    notes.forEach(function (element) {\n                                        if (autoPlay && !element.a && (Math.abs(element.h - sec) < 1.5 / tps)) {\n                                            element.a = 1;\n                                            element.aa = sec;\n                                            bus.emit(\"hit\", 1);\n                                        }\n                                        else if ((sec - element.h) > 0.16 && !element.a) {\n                                            element.a = -1;\n                                            bus.emit(\"miss\", null);\n                                        }\n                                        drawNote(element);\n                                    });\n                                    notes.forEach(function (element) {\n                                        drawA(element);\n                                    });\n                                    drawTexts();\n                                    if (sec >= song.length) {\n                                        clearInterval(mainTimer);\n                                        paused = true;\n                                        location.replace(\"./finish.html?i=\".concat(id, \"&c=\").concat(max_combo, \"&t=\").concat((points_got / points_total * 100000).toFixed(0), \"&p=\").concat(perfect, \"&g=\").concat(good, \"&m=\").concat(notes_total - perfect - good));\n                                    }\n                                    return [2 /*return*/];\n                                });\n                            });\n                        }, 1000 / tps);\n                    });\n                    return [2 /*return*/];\n            }\n        });\n    });\n}\nwindow.onload = main;\n\n\n\n//# sourceURL=webpack://cforce/./src/player.ts?");

/***/ }),

/***/ "./src/player/gui.ts":
/*!***************************!*\
  !*** ./src/player/gui.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   CanvasObject: () => (/* binding */ CanvasObject),\n/* harmony export */   ClackLineCanvasObject: () => (/* binding */ ClackLineCanvasObject),\n/* harmony export */   EnhancedContent: () => (/* binding */ EnhancedContent),\n/* harmony export */   NoteCanvasObject: () => (/* binding */ NoteCanvasObject),\n/* harmony export */   RGBAColor: () => (/* binding */ RGBAColor),\n/* harmony export */   TextCanvasObject: () => (/* binding */ TextCanvasObject)\n/* harmony export */ });\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../player */ \"./src/player.ts\");\nvar __read = (undefined && undefined.__read) || function (o, n) {\n    var m = typeof Symbol === \"function\" && o[Symbol.iterator];\n    if (!m) return o;\n    var i = m.call(o), r, ar = [], e;\n    try {\n        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);\n    }\n    catch (error) { e = { error: error }; }\n    finally {\n        try {\n            if (r && !r.done && (m = i[\"return\"])) m.call(i);\n        }\n        finally { if (e) throw e.error; }\n    }\n    return ar;\n};\nvar __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {\n    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {\n        if (ar || !(i in from)) {\n            if (!ar) ar = Array.prototype.slice.call(from, 0, i);\n            ar[i] = from[i];\n        }\n    }\n    return to.concat(ar || Array.prototype.slice.call(from));\n};\n\nvar EnhancedContent = /** @class */ (function () {\n    function EnhancedContent(ctx) {\n        this.backGroundColor = \"rgba(0,0,0,0)\";\n        this.size = [300, 150];\n        this.ctx = ctx;\n        this.size = [parseInt(this.ctx.canvas.getAttribute(\"width\") || \"300\"), parseInt(this.ctx.canvas.getAttribute(\"height\") || \"150\")];\n    }\n    EnhancedContent.prototype.setBackGroundColor = function (color) {\n        this.backGroundColor = color;\n    };\n    EnhancedContent.prototype.clear = function () {\n        var _a, _b;\n        this.ctx.fillStyle = this.backGroundColor;\n        (_a = this.ctx).clearRect.apply(_a, __spreadArray([0, 0], __read(this.size), false));\n        (_b = this.ctx).fillRect.apply(_b, __spreadArray([0, 0], __read(this.size), false));\n    };\n    EnhancedContent.prototype.render = function (obj) {\n        obj.drawOnCtx(this.ctx);\n    };\n    return EnhancedContent;\n}());\nvar CanvasObject = /** @class */ (function () {\n    function CanvasObject() {\n    }\n    return CanvasObject;\n}());\nvar NoteCanvasObject = /** @class */ (function () {\n    function NoteCanvasObject(x, y, f, r) {\n        if (x === void 0) { x = -100; }\n        if (y === void 0) { y = -100; }\n        if (f === void 0) { f = new RGBAColor(64, 64, 64); }\n        if (r === void 0) { r = 88; }\n        this.x = -100;\n        this.y = -100;\n        this.f = new RGBAColor(64, 64, 64);\n        this.r = 88;\n        this.x = x;\n        this.y = y;\n        this.f = f;\n        this.r = r;\n    }\n    NoteCanvasObject.prototype.drawOnCtx = function (ctx) {\n        ctx.fillStyle = \"rgba(\".concat(this.f.getColor()[0], \",\").concat(this.f.getColor()[1], \",\").concat(this.f.getColor()[2], \",\").concat(this.f.getColor()[3], \")\");\n        ctx.beginPath();\n        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);\n        ctx.fill();\n        ctx.lineWidth = 2;\n        ctx.strokeStyle = \"rgba(255,255,255,\".concat(this.f.getColor()[3], \")\");\n        ctx.beginPath();\n        ctx.arc(this.x, this.y, this.r / 1.1, 0, Math.PI * 2, true);\n        ctx.stroke();\n    };\n    return NoteCanvasObject;\n}());\nvar ClackLineCanvasObject = /** @class */ (function () {\n    function ClackLineCanvasObject(p, fp, tp) {\n        this.p = p;\n        this.fp = fp;\n        this.tp = tp;\n    }\n    ClackLineCanvasObject.prototype.drawOnCtx = function (ctx) {\n        if (this.tp < 0 || this.fp > 1) {\n            return;\n        }\n        if (this.tp > 1) {\n            this.tp = 1;\n        }\n        if (this.fp < 0) {\n            this.fp = 0;\n        }\n        var np = this.p.cal(this.tp);\n        ctx.lineWidth = 5;\n        ctx.beginPath();\n        ctx.moveTo.apply(ctx, __spreadArray([], __read(np), false));\n        for (var i = this.tp; i >= this.fp && i <= this.tp; i += (this.fp - this.tp) / _player__WEBPACK_IMPORTED_MODULE_0__.tps) {\n            np = this.p.cal(i);\n            ctx.strokeStyle = \"rgb(255,255,255)\";\n            ctx.lineTo.apply(ctx, __spreadArray([], __read(np), false));\n        }\n        ctx.stroke();\n    };\n    return ClackLineCanvasObject;\n}());\nvar TextCanvasObject = /** @class */ (function () {\n    function TextCanvasObject(text, x, y, align, fontSize, fill) {\n        if (align === void 0) { align = \"left\"; }\n        if (fontSize === void 0) { fontSize = 50; }\n        if (fill === void 0) { fill = new RGBAColor(255, 255, 255); }\n        this.text = text;\n        this.x = x;\n        this.y = y;\n        this.align = align;\n        this.fontSize = fontSize;\n        this.fill = fill;\n    }\n    TextCanvasObject.prototype.drawOnCtx = function (ctx) {\n        ctx.fillStyle = \"rgba(\".concat(this.fill.getColor()[0], \",\").concat(this.fill.getColor()[1], \",\").concat(this.fill.getColor()[2], \",\").concat(this.fill.getColor()[3], \")\");\n        ctx.font = \"\".concat((this.fontSize), \"px 'Courier New'\");\n        ctx.textAlign = this.align;\n        ctx.fillText(this.text, this.x, this.y);\n    };\n    return TextCanvasObject;\n}());\nvar RGBAColor = /** @class */ (function () {\n    function RGBAColor(r, g, b, a) {\n        if (a === void 0) { a = 1; }\n        this.c = [0, 0, 0, 1];\n        this.c = [r, g, b, a];\n    }\n    RGBAColor.prototype.getColor = function () {\n        return this.c;\n    };\n    return RGBAColor;\n}());\n\n\n\n//# sourceURL=webpack://cforce/./src/player/gui.ts?");

/***/ }),

/***/ "./src/charts sync recursive ^\\.\\/.*\\.json$":
/*!*****************************************!*\
  !*** ./src/charts/ sync ^\.\/.*\.json$ ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var map = {\n\t\"./atthespeedoflight.json\": \"./src/charts/atthespeedoflight.json\",\n\t\"./beeper.json\": \"./src/charts/beeper.json\",\n\t\"./demo.json\": \"./src/charts/demo.json\",\n\t\"./introduction.json\": \"./src/charts/introduction.json\",\n\t\"./test.json\": \"./src/charts/test.json\",\n\t\"./timer.json\": \"./src/charts/timer.json\",\n\t\"./阴游.json\": \"./src/charts/阴游.json\"\n};\n\n\nfunction webpackContext(req) {\n\tvar id = webpackContextResolve(req);\n\treturn __webpack_require__(id);\n}\nfunction webpackContextResolve(req) {\n\tif(!__webpack_require__.o(map, req)) {\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t}\n\treturn map[req];\n}\nwebpackContext.keys = function webpackContextKeys() {\n\treturn Object.keys(map);\n};\nwebpackContext.resolve = webpackContextResolve;\nmodule.exports = webpackContext;\nwebpackContext.id = \"./src/charts sync recursive ^\\\\.\\\\/.*\\\\.json$\";\n\n//# sourceURL=webpack://cforce/./src/charts/_sync_^\\.\\/.*\\.json$?");

/***/ }),

/***/ "./src/images sync recursive ^\\.\\/.*\\.png$":
/*!****************************************!*\
  !*** ./src/images/ sync ^\.\/.*\.png$ ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var map = {\n\t\"./atthespeedoflight.png\": \"./src/images/atthespeedoflight.png\",\n\t\"./introduction.png\": \"./src/images/introduction.png\"\n};\n\n\nfunction webpackContext(req) {\n\tvar id = webpackContextResolve(req);\n\treturn __webpack_require__(id);\n}\nfunction webpackContextResolve(req) {\n\tif(!__webpack_require__.o(map, req)) {\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t}\n\treturn map[req];\n}\nwebpackContext.keys = function webpackContextKeys() {\n\treturn Object.keys(map);\n};\nwebpackContext.resolve = webpackContextResolve;\nmodule.exports = webpackContext;\nwebpackContext.id = \"./src/images sync recursive ^\\\\.\\\\/.*\\\\.png$\";\n\n//# sourceURL=webpack://cforce/./src/images/_sync_^\\.\\/.*\\.png$?");

/***/ }),

/***/ "./src/scripts lazy recursive ^\\.\\/.*$":
/*!*****************************************************!*\
  !*** ./src/scripts/ lazy ^\.\/.*$ namespace object ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var map = {\n\t\"./introduction\": [\n\t\t\"./src/scripts/introduction.ts\",\n\t\t\"src_scripts_introduction_ts\"\n\t],\n\t\"./introduction.ts\": [\n\t\t\"./src/scripts/introduction.ts\",\n\t\t\"src_scripts_introduction_ts\"\n\t],\n\t\"./timer\": [\n\t\t\"./src/scripts/timer.ts\",\n\t\t\"src_scripts_timer_ts\"\n\t],\n\t\"./timer.ts\": [\n\t\t\"./src/scripts/timer.ts\",\n\t\t\"src_scripts_timer_ts\"\n\t]\n};\nfunction webpackAsyncContext(req) {\n\tif(!__webpack_require__.o(map, req)) {\n\t\treturn Promise.resolve().then(() => {\n\t\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\t\te.code = 'MODULE_NOT_FOUND';\n\t\t\tthrow e;\n\t\t});\n\t}\n\n\tvar ids = map[req], id = ids[0];\n\treturn __webpack_require__.e(ids[1]).then(() => {\n\t\treturn __webpack_require__(id);\n\t});\n}\nwebpackAsyncContext.keys = () => (Object.keys(map));\nwebpackAsyncContext.id = \"./src/scripts lazy recursive ^\\\\.\\\\/.*$\";\nmodule.exports = webpackAsyncContext;\n\n//# sourceURL=webpack://cforce/./src/scripts/_lazy_^\\.\\/.*$_namespace_object?");

/***/ }),

/***/ "./src/sounds sync recursive ^\\.\\/.*$":
/*!***********************************!*\
  !*** ./src/sounds/ sync ^\.\/.*$ ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var map = {\n\t\"./atthespeedoflight.mp3\": \"./src/sounds/atthespeedoflight.mp3\",\n\t\"./beeper.mp3\": \"./src/sounds/beeper.mp3\",\n\t\"./blank.mp3\": \"./src/sounds/blank.mp3\",\n\t\"./hit.mp3\": \"./src/sounds/hit.mp3\",\n\t\"./introduction.wav\": \"./src/sounds/introduction.wav\"\n};\n\n\nfunction webpackContext(req) {\n\tvar id = webpackContextResolve(req);\n\treturn __webpack_require__(id);\n}\nfunction webpackContextResolve(req) {\n\tif(!__webpack_require__.o(map, req)) {\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t}\n\treturn map[req];\n}\nwebpackContext.keys = function webpackContextKeys() {\n\treturn Object.keys(map);\n};\nwebpackContext.resolve = webpackContextResolve;\nmodule.exports = webpackContext;\nwebpackContext.id = \"./src/sounds sync recursive ^\\\\.\\\\/.*$\";\n\n//# sourceURL=webpack://cforce/./src/sounds/_sync_^\\.\\/.*$?");

/***/ }),

/***/ "./src/charts/atthespeedoflight.json":
/*!*******************************************!*\
  !*** ./src/charts/atthespeedoflight.json ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"ac8907907fde0ba00b5e.json\";\n\n//# sourceURL=webpack://cforce/./src/charts/atthespeedoflight.json?");

/***/ }),

/***/ "./src/charts/beeper.json":
/*!********************************!*\
  !*** ./src/charts/beeper.json ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"2890888e014318d6c55a.json\";\n\n//# sourceURL=webpack://cforce/./src/charts/beeper.json?");

/***/ }),

/***/ "./src/charts/demo.json":
/*!******************************!*\
  !*** ./src/charts/demo.json ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"aacac19f4e4289876b20.json\";\n\n//# sourceURL=webpack://cforce/./src/charts/demo.json?");

/***/ }),

/***/ "./src/charts/introduction.json":
/*!**************************************!*\
  !*** ./src/charts/introduction.json ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"0383d6da81c3666fdc46.json\";\n\n//# sourceURL=webpack://cforce/./src/charts/introduction.json?");

/***/ }),

/***/ "./src/charts/test.json":
/*!******************************!*\
  !*** ./src/charts/test.json ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"f1d14e90486aed5bce09.json\";\n\n//# sourceURL=webpack://cforce/./src/charts/test.json?");

/***/ }),

/***/ "./src/charts/timer.json":
/*!*******************************!*\
  !*** ./src/charts/timer.json ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"f9b78b3eff8caaa3a282.json\";\n\n//# sourceURL=webpack://cforce/./src/charts/timer.json?");

/***/ }),

/***/ "./src/charts/阴游.json":
/*!****************************!*\
  !*** ./src/charts/阴游.json ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"8910c4765dd5d7b2b2ce.json\";\n\n//# sourceURL=webpack://cforce/./src/charts/%E9%98%B4%E6%B8%B8.json?");

/***/ }),

/***/ "./src/images/atthespeedoflight.png":
/*!******************************************!*\
  !*** ./src/images/atthespeedoflight.png ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"be87afed93fed9040c3b.png\";\n\n//# sourceURL=webpack://cforce/./src/images/atthespeedoflight.png?");

/***/ }),

/***/ "./src/images/introduction.png":
/*!*************************************!*\
  !*** ./src/images/introduction.png ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"52574e19b0d1a39caf8c.png\";\n\n//# sourceURL=webpack://cforce/./src/images/introduction.png?");

/***/ }),

/***/ "./src/sounds/atthespeedoflight.mp3":
/*!******************************************!*\
  !*** ./src/sounds/atthespeedoflight.mp3 ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"ef30f6c7f64e3953a2b2.mp3\";\n\n//# sourceURL=webpack://cforce/./src/sounds/atthespeedoflight.mp3?");

/***/ }),

/***/ "./src/sounds/beeper.mp3":
/*!*******************************!*\
  !*** ./src/sounds/beeper.mp3 ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"6b7bcbd418e5ef9dcebc.mp3\";\n\n//# sourceURL=webpack://cforce/./src/sounds/beeper.mp3?");

/***/ }),

/***/ "./src/sounds/blank.mp3":
/*!******************************!*\
  !*** ./src/sounds/blank.mp3 ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"630c76711127d96bec07.mp3\";\n\n//# sourceURL=webpack://cforce/./src/sounds/blank.mp3?");

/***/ }),

/***/ "./src/sounds/hit.mp3":
/*!****************************!*\
  !*** ./src/sounds/hit.mp3 ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"b5421378fb7517a67f8b.mp3\";\n\n//# sourceURL=webpack://cforce/./src/sounds/hit.mp3?");

/***/ }),

/***/ "./src/sounds/introduction.wav":
/*!*************************************!*\
  !*** ./src/sounds/introduction.wav ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"626ee0666d3d33635e0d.wav\";\n\n//# sourceURL=webpack://cforce/./src/sounds/introduction.wav?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "cforce:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"player": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 		
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkcforce"] = self["webpackChunkcforce"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/player.ts");
/******/ 	
/******/ })()
;