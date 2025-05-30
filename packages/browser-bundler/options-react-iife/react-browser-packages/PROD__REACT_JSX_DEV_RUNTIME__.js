"use strict";
var PROD__REACT_JSX_DEV_RUNTIME__ = (() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // ../../../node_modules/.pnpm/react@19.1.0/node_modules/react/cjs/react-jsx-runtime.production.js
  var require_react_jsx_runtime_production = __commonJS({
    "../../../node_modules/.pnpm/react@19.1.0/node_modules/react/cjs/react-jsx-runtime.production.js"(exports) {
      "use strict";
      var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element");
      var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
      function jsxProd(type, config, maybeKey) {
        var key = null;
        void 0 !== maybeKey && (key = "" + maybeKey);
        void 0 !== config.key && (key = "" + config.key);
        if ("key" in config) {
          maybeKey = {};
          for (var propName in config)
            "key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        config = maybeKey.ref;
        return {
          $$typeof: REACT_ELEMENT_TYPE,
          type,
          key,
          ref: void 0 !== config ? config : null,
          props: maybeKey
        };
      }
      exports.Fragment = REACT_FRAGMENT_TYPE;
      exports.jsx = jsxProd;
      exports.jsxs = jsxProd;
    }
  });

  // ../../../node_modules/.pnpm/react@19.1.0/node_modules/react/jsx-runtime.js
  var require_jsx_runtime = __commonJS({
    "../../../node_modules/.pnpm/react@19.1.0/node_modules/react/jsx-runtime.js"(exports, module) {
      if (true) {
        module.exports = require_react_jsx_runtime_production();
      } else {
        module.exports = null;
      }
    }
  });
  return require_jsx_runtime();
})();
/*! Bundled license information:

react/cjs/react-jsx-runtime.production.js:
  (**
   * @license React
   * react-jsx-runtime.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
