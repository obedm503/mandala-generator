// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"index.js":[function(require,module,exports) {
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// @ts-check
function graphBounds(n) {
  var abs = Math.abs(n);
  return "\\left\\{ ".concat(-1 * abs * 1.618, " < x < ").concat(abs * 1.618, " \\right\\}");
}

function randomColor() {
  return '#' + Math.random().toString(16).slice(2, 8).toUpperCase();
}

function randomNumbers(range, amount) {
  return Array(amount).fill('').map(function () {
    return range * (Math.random() * 2 - 1);
  }).filter(function (num) {
    return num !== 0 && !Number.isNaN(num);
  }).map(function (num) {
    return Number(num.toFixed(4));
  });
}

function lines(numbers, max) {
  return numbers.map(function (num) {
    var bounds = graphBounds(max);
    return "y=".concat(num, "(x+").concat(num).concat(bounds.replace('x', 'y')).concat(bounds, ")");
  });
}

function curves(numbers, max) {
  return numbers.reduce(function (arr, n) {
    var oppositeN = n * -1;
    var abs = Math.abs(n);
    var bounds = graphBounds(max);
    var yBounds = bounds.replace('x', 'y');
    arr.push("f_{".concat(Math.floor(abs), "}=-\\left(\\frac{x^2}{").concat(n, "}+").concat(n * -1, "\\right)").concat(bounds.replace('x', "f_".concat(Math.floor(abs)))).concat(bounds));
    arr.push("y=\\frac{x^2}{".concat(n, "}+").concat(oppositeN).concat(yBounds).concat(bounds));
    arr.push("x=-\\left(\\frac{y^2}{".concat(n, "}+").concat(oppositeN, "\\right)").concat(yBounds).concat(bounds));
    arr.push("x=\\frac{y^2}{".concat(n, "}+").concat(oppositeN).concat(yBounds).concat(bounds));
    return arr;
  }, []);
}

function derivative(numbers, max) {
  return numbers.reduce(function (arr, n) {
    var bounds = graphBounds(max);
    var yBounds = bounds.replace('x', 'y');
    arr.push("y=x^{".concat(n, "}").concat(yBounds).concat(bounds));
    arr.push("y=".concat(n, "x^{").concat(n - 1, "}").concat(yBounds).concat(bounds));
    return arr;
  }, []);
}

function circles(numbers) {
  return numbers.map(function (n) {
    return "r=".concat(n);
  });
}

function flowers(numbers) {
  return numbers.reduce(function (arr, n) {
    arr.push("r=".concat(n, "\\cos").concat(n, "\\theta"));
    arr.push("r=".concat(n * -1, "\\cos").concat(n, "\\theta"));
    arr.push("r=".concat(n, "\\cos").concat(n / 10, "\\pi\\theta"));
    return arr;
  }, []);
}

function integrals(numbers) {
  return numbers.map(function (n) {
    var abs = Math.abs(n);
    return "y=\\int_{".concat(abs * -1, "}^{").concat(abs, "}f_{").concat(Math.floor(abs), "}dx");
  });
}

var calculator;
document.addEventListener('DOMContentLoaded', function () {
  // @ts-ignore
  calculator = Desmos.GraphingCalculator(document.getElementById('calculator'), {
    keypad: false,
    expressionsCollapsed: true // polarMode: true

  }); // calculator.setState({"version":3,"graph":{"showGrid":true,"showXAxis":false,"showYAxis":false,"xAxisStep":0,"yAxisStep":0,"xAxisMinorSubdivisions":0,"yAxisMinorSubdivisions":0,"xAxisArrowMode":"NONE","yAxisArrowMode":"NONE","xAxisLabel":"","yAxisLabel":"","xAxisNumbers":false,"yAxisNumbers":false,"polarMode":true,"polarNumbers":false,"degreeMode":true,"projectorMode":false,"squareAxes":true,"viewport":{"xmin":-10,"ymin":-8.527027027027028,"xmax":10,"ymax":8.527027027027028}},"expressions":{"list":[{"id":"47","type":"expression","latex":"t=-0.0333","domain":{"min":"0","max":"1"},"label":"","hidden":true,"secret":false,"color":"#6042a6","style":"normal","dragMode":"AUTO","residualVariable":"","regressionParameters":{},"isLogModeRegression":false,"sliderMin":"-.5","sliderMax":"0.5","sliderHardMin":true,"sliderHardMax":true,"sliderInterval":"","sliderAnimationPeriod":8000,"sliderLoopMode":"LOOP_FORWARD_REVERSE","sliderPlayDirection":1,"sliderIsPlaying":false},{"id":"20","type":"expression","latex":"y=t^{\\pi^2}x^{-2}","domain":{"min":"0","max":"1"},"label":"","hidden":false,"secret":false,"color":"#2d70b3","style":"normal","dragMode":"AUTO","residualVariable":"","regressionParameters":{},"isLogModeRegression":false},{"id":"22","type":"expression","latex":"y=-t^{\\pi^2}x^{-2}","domain":{"min":"0","max":"1"},"label":"","hidden":false,"secret":false,"color":"#6042a6","style":"normal","dragMode":"AUTO","residualVariable":"","regressionParameters":{},"isLogModeRegression":false},{"id":"27","type":"expression","latex":"x=t^{\\pi^2}y^{-2}","domain":{"min":"0","max":"1"},"label":"","hidden":false,"secret":false,"color":"#388c46","style":"normal","dragMode":"AUTO","residualVariable":"","regressionParameters":{},"isLogModeRegression":false},{"id":"28","type":"expression","latex":"x=-t^{\\pi^2}y^{-2}","domain":{"min":"0","max":"1"},"label":"","hidden":false,"secret":false,"color":"#fa7e19","style":"normal","dragMode":"AUTO","residualVariable":"","regressionParameters":{},"isLogModeRegression":false},{"id":"19","type":"expression","latex":"r=t\\frac{\\theta}{\\pi}\\cos5\\theta","domain":{"min":"0","max":"1"},"label":"","hidden":false,"secret":false,"color":"#fa7e19","style":"normal","dragMode":"AUTO","residualVariable":"","regressionParameters":{},"isLogModeRegression":false},{"id":"30","type":"expression","latex":"r=-t\\frac{\\theta}{\\pi}\\cos5\\theta","domain":{"min":"0","max":"1"},"label":"","hidden":false,"secret":false,"color":"#6042a6","style":"normal","dragMode":"NONE","residualVariable":"","regressionParameters":{},"isLogModeRegression":false},{"id":"32","type":"expression","latex":"r=20t\\frac{\\theta}{\\sqrt{\\left|t\\right|}}","domain":{"min":"0","max":"1"},"label":"","hidden":false,"secret":false,"color":"#000000","style":"dashed","dragMode":"NONE","residualVariable":"","regressionParameters":{},"isLogModeRegression":false},{"id":"33","type":"expression","latex":"r=-20t\\frac{\\theta}{\\sqrt{\\left|t\\right|}}","domain":{"min":"0","max":"1"},"label":"","hidden":false,"secret":false,"color":"#c74440","style":"dashed","dragMode":"NONE","residualVariable":"","regressionParameters":{},"isLogModeRegression":false},{"id":"34","type":"expression","latex":"r=-\\theta t\\cos\\theta","domain":{"min":"0","max":"1"},"label":"","hidden":false,"secret":false,"color":"#2d70b3","style":"dashed","dragMode":"NONE","residualVariable":"","regressionParameters":{},"isLogModeRegression":false},{"id":"39","type":"expression","latex":"r=\\theta t\\cos\\theta","domain":{"min":"0","max":"1"},"label":"","hidden":false,"secret":false,"color":"#388c46","style":"dotted","dragMode":"NONE","residualVariable":"","regressionParameters":{},"isLogModeRegression":false},{"id":"42","type":"expression","latex":"r=t\\theta","domain":{"min":"0","max":"1"},"label":"","hidden":false,"secret":false,"color":"#6042a6","style":"normal","dragMode":"NONE","residualVariable":"","regressionParameters":{},"isLogModeRegression":false},{"id":"43","type":"expression","latex":"r=-t\\theta","domain":{"min":"0","max":"1"},"label":"","hidden":false,"secret":false,"color":"#c74440","style":"normal","dragMode":"NONE","residualVariable":"","regressionParameters":{},"isLogModeRegression":false}]}})
});
window['mandala'] = {
  graph: function graph() {
    // @ts-ignore
    var range = parseFloat(document.getElementById('range').value); // @ts-ignore

    var amount = parseInt(document.getElementById('amount').value, 10);
    calculator.setBlank(); // range + 1 to alevitate Math.random's inability to produce 1
    // Math.random has a range of [0,1)

    var numbers = randomNumbers(range + 1, amount);
    var largest = Math.max.apply(Math, _toConsumableArray(numbers)); // numbers = [3];

    var expressions = [].concat(_toConsumableArray(lines(numbers, largest)), _toConsumableArray(curves(numbers, largest)), _toConsumableArray(derivative(numbers, largest)), _toConsumableArray(circles(numbers)), _toConsumableArray(flowers(numbers)), _toConsumableArray(integrals(numbers)));
    expressions.filter(function (ex, i, arr) {
      return arr.indexOf(ex) === i;
    }).forEach(function (exp) {
      return calculator.setExpression({
        latex: exp,
        color: randomColor()
      });
    }); // interesting relationship between circle radius and spike tips
    // multiplying the radius by  809/500 or 1.618 gives the coordinates
    // for the intersection point between the curves that form the spikes
    // + 0.5 adds some padding so that the intersection is not at the edge
    // of the graph
    // phi = 1.618

    var max = (largest + 0.5) * 1.618;
    var min = max * -1; // graph's height and width

    var _document$getElementB = document.getElementById('calculator'),
        clientHeight = _document$getElementB.clientHeight,
        clientWidth = _document$getElementB.clientWidth;

    var ratio = clientWidth / clientHeight; // multiplying the domain by the ratio prevents the circles from appearing
    // as ovals, essentially makes the graph's "aspect ratio" 1:1

    min = min > 0 ? min * -1 : min;
    max = max < 0 ? max * -1 : max;
    calculator.setMathBounds({
      left: min * ratio,
      right: max * ratio,
      bottom: min,
      top: max
    });
  },
  screenshot: function screenshot() {
    var screenshot = calculator.screenshot();
    var a = document.createElement('a');
    a.href = screenshot;
    a.download = 'random-mandala';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
};
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "37735" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.js.map