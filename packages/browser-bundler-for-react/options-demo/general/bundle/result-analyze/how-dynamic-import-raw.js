/*

var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/utils.js
var utils_exports = {};
__export(utils_exports, {
  default: () => utils_default,
  logB: () => logB,
  logC: () => logC
});
var logA, logB, logC, utils_default;
var init_utils = __esm({
  "src/utils.js"() {
    "use strict";
    console.warn("run smt");
    logA = () => {
      console.warn("this is the A");
    };
    logB = () => {
      console.warn("this is the B");
    };
    logC = () => {
      console.warn("this is the C");
    };
    utils_default = logA;
  }
});

// src/app.js
console.warn("Hello World!");
Promise.resolve().then(() => (init_utils(), utils_exports)).then((res) => {
  console.warn(res.default());
  console.warn(res.logB());
  console.warn(res.logC());
});
Promise.resolve().then(() => (init_utils(), utils_exports)).then((res) => {
  console.warn(res.logC());
});
var a = "an A";
export {
  a
};

*/
