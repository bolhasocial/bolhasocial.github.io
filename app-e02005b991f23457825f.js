webpackJsonp([231608221292675],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _apiRunnerBrowser = __webpack_require__(140);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(269);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _reactRouterDom = __webpack_require__(120);
	
	var _gatsbyReactRouterScroll = __webpack_require__(542);
	
	var _domready = __webpack_require__(487);
	
	var _domready2 = _interopRequireDefault(_domready);
	
	var _history = __webpack_require__(184);
	
	var _history2 = __webpack_require__(360);
	
	var _history3 = _interopRequireDefault(_history2);
	
	var _emitter = __webpack_require__(110);
	
	var _emitter2 = _interopRequireDefault(_emitter);
	
	var _pages = __webpack_require__(575);
	
	var _pages2 = _interopRequireDefault(_pages);
	
	var _redirects = __webpack_require__(576);
	
	var _redirects2 = _interopRequireDefault(_redirects);
	
	var _componentRenderer = __webpack_require__(358);
	
	var _componentRenderer2 = _interopRequireDefault(_componentRenderer);
	
	var _asyncRequires = __webpack_require__(357);
	
	var _asyncRequires2 = _interopRequireDefault(_asyncRequires);
	
	var _loader = __webpack_require__(279);
	
	var _loader2 = _interopRequireDefault(_loader);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	if (true) {
	  __webpack_require__(396);
	}
	
	window.___history = _history3.default;
	
	window.___emitter = _emitter2.default;
	
	_loader2.default.addPagesArray(_pages2.default);
	_loader2.default.addProdRequires(_asyncRequires2.default);
	window.asyncRequires = _asyncRequires2.default;
	window.___loader = _loader2.default;
	window.matchPath = _reactRouterDom.matchPath;
	
	// Convert to a map for faster lookup in maybeRedirect()
	var redirectMap = _redirects2.default.reduce(function (map, redirect) {
	  map[redirect.fromPath] = redirect;
	  return map;
	}, {});
	
	var maybeRedirect = function maybeRedirect(pathname) {
	  var redirect = redirectMap[pathname];
	
	  if (redirect != null) {
	    _history3.default.replace(redirect.toPath);
	    return true;
	  } else {
	    return false;
	  }
	};
	
	// Check for initial page-load redirect
	maybeRedirect(window.location.pathname);
	
	// Let the site/plugins run code very early.
	(0, _apiRunnerBrowser.apiRunnerAsync)("onClientEntry").then(function () {
	  // Let plugins register a service worker. The plugin just needs
	  // to return true.
	  if ((0, _apiRunnerBrowser.apiRunner)("registerServiceWorker").length > 0) {
	    __webpack_require__(363);
	  }
	
	  var navigate = function navigate(to, replace) {
	    var location = (0, _history.createLocation)(to, null, null, _history3.default.location);
	    var pathname = location.pathname;
	
	    var redirect = redirectMap[pathname];
	
	    // If we're redirecting, just replace the passed in pathname
	    // to the one we want to redirect to.
	    if (redirect) {
	      pathname = redirect.toPath;
	    }
	    var wl = window.location;
	
	    // If we're already at this location, do nothing.
	    if (wl.pathname === location.pathname && wl.search === location.search && wl.hash === location.hash) {
	      return;
	    }
	
	    var historyNavigateFunc = replace ? window.___history.replace : window.___history.push;
	
	    // Listen to loading events. If page resources load before
	    // a second, navigate immediately.
	    function eventHandler(e) {
	      if (e.page.path === _loader2.default.getPage(pathname).path) {
	        _emitter2.default.off("onPostLoadPageResources", eventHandler);
	        clearTimeout(timeoutId);
	        historyNavigateFunc(location);
	      }
	    }
	
	    // Start a timer to wait for a second before transitioning and showing a
	    // loader in case resources aren't around yet.
	    var timeoutId = setTimeout(function () {
	      _emitter2.default.off("onPostLoadPageResources", eventHandler);
	      _emitter2.default.emit("onDelayedLoadPageResources", { pathname: pathname });
	      historyNavigateFunc(location);
	    }, 1000);
	
	    if (_loader2.default.getResourcesForPathname(pathname)) {
	      // The resources are already loaded so off we go.
	      clearTimeout(timeoutId);
	      historyNavigateFunc(location);
	    } else {
	      // They're not loaded yet so let's add a listener for when
	      // they finish loading.
	      _emitter2.default.on("onPostLoadPageResources", eventHandler);
	    }
	  };
	
	  // window.___loadScriptsForPath = loadScriptsForPath
	  window.___push = function (to) {
	    return navigate(to, false);
	  };
	  window.___replace = function (to) {
	    return navigate(to, true);
	  };
	  window.___navigateTo = window.___push;
	
	  // Call onRouteUpdate on the initial page load.
	  (0, _apiRunnerBrowser.apiRunner)("onRouteUpdate", {
	    location: _history3.default.location,
	    action: _history3.default.action
	  });
	
	  var initialAttachDone = false;
	  function attachToHistory(history) {
	    if (!window.___history || initialAttachDone === false) {
	      window.___history = history;
	      initialAttachDone = true;
	
	      history.listen(function (location, action) {
	        if (!maybeRedirect(location.pathname)) {
	          // Make sure React has had a chance to flush to DOM first.
	          setTimeout(function () {
	            (0, _apiRunnerBrowser.apiRunner)("onRouteUpdate", { location: location, action: action });
	          }, 0);
	        }
	      });
	    }
	  }
	
	  function shouldUpdateScroll(prevRouterProps, _ref) {
	    var pathname = _ref.location.pathname;
	
	    var results = (0, _apiRunnerBrowser.apiRunner)("shouldUpdateScroll", {
	      prevRouterProps: prevRouterProps,
	      pathname: pathname
	    });
	    if (results.length > 0) {
	      return results[0];
	    }
	
	    if (prevRouterProps) {
	      var oldPathname = prevRouterProps.location.pathname;
	
	      if (oldPathname === pathname) {
	        return false;
	      }
	    }
	    return true;
	  }
	
	  var AltRouter = (0, _apiRunnerBrowser.apiRunner)("replaceRouterComponent", { history: _history3.default })[0];
	  var DefaultRouter = function DefaultRouter(_ref2) {
	    var children = _ref2.children;
	    return _react2.default.createElement(
	      _reactRouterDom.Router,
	      { history: _history3.default },
	      children
	    );
	  };
	
	  var ComponentRendererWithRouter = (0, _reactRouterDom.withRouter)(_componentRenderer2.default);
	
	  _loader2.default.getResourcesForPathname(window.location.pathname, function () {
	    var Root = function Root() {
	      return (0, _react.createElement)(AltRouter ? AltRouter : DefaultRouter, null, (0, _react.createElement)(_gatsbyReactRouterScroll.ScrollContext, { shouldUpdateScroll: shouldUpdateScroll }, (0, _react.createElement)(ComponentRendererWithRouter, {
	        layout: true,
	        children: function children(layoutProps) {
	          return (0, _react.createElement)(_reactRouterDom.Route, {
	            render: function render(routeProps) {
	              attachToHistory(routeProps.history);
	              var props = layoutProps ? layoutProps : routeProps;
	
	              if (_loader2.default.getPage(props.location.pathname)) {
	                return (0, _react.createElement)(_componentRenderer2.default, _extends({
	                  page: true
	                }, props));
	              } else {
	                return (0, _react.createElement)(_componentRenderer2.default, {
	                  page: true,
	                  location: { pathname: "/404.html" }
	                });
	              }
	            }
	          });
	        }
	      })));
	    };
	
	    var NewRoot = (0, _apiRunnerBrowser.apiRunner)("wrapRootComponent", { Root: Root }, Root)[0];
	
	    var renderer = (0, _apiRunnerBrowser.apiRunner)("replaceHydrateFunction", undefined, _reactDom2.default.render)[0];
	
	    (0, _domready2.default)(function () {
	      return renderer(_react2.default.createElement(NewRoot, null), typeof window !== "undefined" ? document.getElementById("___gatsby") : void 0, function () {
	        (0, _apiRunnerBrowser.apiRunner)("onInitialClientRender");
	      });
	    });
	  });
	});

/***/ }),
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	/* global document: false, __webpack_require__: false */
	patch();
	
	function patch() {
	  var head = document.querySelector("head");
	  var ensure = __webpack_require__.e;
	  var chunks = __webpack_require__.s;
	  var failures;
	
	  __webpack_require__.e = function (chunkId, callback) {
	    var loaded = false;
	    var immediate = true;
	
	    var handler = function handler(error) {
	      if (!callback) return;
	
	      callback(__webpack_require__, error);
	      callback = null;
	    };
	
	    if (!chunks && failures && failures[chunkId]) {
	      handler(true);
	      return;
	    }
	
	    ensure(chunkId, function () {
	      if (loaded) return;
	      loaded = true;
	
	      if (immediate) {
	        // webpack fires callback immediately if chunk was already loaded
	        // IE also fires callback immediately if script was already
	        // in a cache (AppCache counts too)
	        setTimeout(function () {
	          handler();
	        });
	      } else {
	        handler();
	      }
	    });
	
	    // This is |true| if chunk is already loaded and does not need onError call.
	    // This happens because in such case ensure() is performed in sync way
	    if (loaded) {
	      return;
	    }
	
	    immediate = false;
	
	    onError(function () {
	      if (loaded) return;
	      loaded = true;
	
	      if (chunks) {
	        chunks[chunkId] = void 0;
	      } else {
	        failures || (failures = {});
	        failures[chunkId] = true;
	      }
	
	      handler(true);
	    });
	  };
	
	  function onError(callback) {
	    var script = head.lastChild;
	
	    if (script.tagName !== "SCRIPT") {
	      if (typeof console !== "undefined" && console.warn) {
	        console.warn("Script is not a script", script);
	      }
	
	      return;
	    }
	
	    script.onload = script.onerror = function () {
	      script.onload = script.onerror = null;
	      setTimeout(callback, 0);
	    };
	  }
	}

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;
	
	module.exports = isArray;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	var freeGlobal = __webpack_require__(95);
	
	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
	
	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();
	
	module.exports = root;


/***/ }),
/* 6 */
/***/ (function(module, exports) {

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return value != null && (type == 'object' || type == 'function');
	}
	
	module.exports = isObject;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return value != null && typeof value == 'object';
	}
	
	module.exports = isObjectLike;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(19),
	    getRawTag = __webpack_require__(219),
	    objectToString = __webpack_require__(248);
	
	/** `Object#toString` result references. */
	var nullTag = '[object Null]',
	    undefinedTag = '[object Undefined]';
	
	/** Built-in value references. */
	var symToStringTag = Symbol ? Symbol.toStringTag : undefined;
	
	/**
	 * The base implementation of `getTag` without fallbacks for buggy environments.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function baseGetTag(value) {
	  if (value == null) {
	    return value === undefined ? undefinedTag : nullTag;
	  }
	  return (symToStringTag && symToStringTag in Object(value))
	    ? getRawTag(value)
	    : objectToString(value);
	}
	
	module.exports = baseGetTag;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	var baseIsNative = __webpack_require__(198),
	    getValue = __webpack_require__(222);
	
	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = getValue(object, key);
	  return baseIsNative(value) ? value : undefined;
	}
	
	module.exports = getNative;


/***/ }),
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */
/***/ (function(module, exports) {

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}
	
	module.exports = eq;


/***/ }),
/* 17 */,
/* 18 */,
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	var root = __webpack_require__(5);
	
	/** Built-in value references. */
	var Symbol = root.Symbol;
	
	module.exports = Symbol;


/***/ }),
/* 20 */
/***/ (function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;
	
	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  var type = typeof value;
	  length = length == null ? MAX_SAFE_INTEGER : length;
	
	  return !!length &&
	    (type == 'number' ||
	      (type != 'symbol' && reIsUint.test(value))) &&
	        (value > -1 && value % 1 == 0 && value < length);
	}
	
	module.exports = isIndex;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(28),
	    isLength = __webpack_require__(50);
	
	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(value.length) && !isFunction(value);
	}
	
	module.exports = isArrayLike;


/***/ }),
/* 22 */,
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	var listCacheClear = __webpack_require__(233),
	    listCacheDelete = __webpack_require__(234),
	    listCacheGet = __webpack_require__(235),
	    listCacheHas = __webpack_require__(236),
	    listCacheSet = __webpack_require__(237);
	
	/**
	 * Creates an list cache object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function ListCache(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;
	
	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}
	
	// Add methods to `ListCache`.
	ListCache.prototype.clear = listCacheClear;
	ListCache.prototype['delete'] = listCacheDelete;
	ListCache.prototype.get = listCacheGet;
	ListCache.prototype.has = listCacheHas;
	ListCache.prototype.set = listCacheSet;
	
	module.exports = ListCache;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(16);
	
	/**
	 * Gets the index at which the `key` is found in `array` of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} key The key to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function assocIndexOf(array, key) {
	  var length = array.length;
	  while (length--) {
	    if (eq(array[length][0], key)) {
	      return length;
	    }
	  }
	  return -1;
	}
	
	module.exports = assocIndexOf;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	var isKeyable = __webpack_require__(231);
	
	/**
	 * Gets the data for `map`.
	 *
	 * @private
	 * @param {Object} map The map to query.
	 * @param {string} key The reference key.
	 * @returns {*} Returns the map data.
	 */
	function getMapData(map, key) {
	  var data = map.__data__;
	  return isKeyable(key)
	    ? data[typeof key == 'string' ? 'string' : 'hash']
	    : data.map;
	}
	
	module.exports = getMapData;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(9);
	
	/* Built-in method references that are verified to be native. */
	var nativeCreate = getNative(Object, 'create');
	
	module.exports = nativeCreate;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	var isSymbol = __webpack_require__(34);
	
	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;
	
	/**
	 * Converts `value` to a string key if it's not a string or symbol.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {string|symbol} Returns the key.
	 */
	function toKey(value) {
	  if (typeof value == 'string' || isSymbol(value)) {
	    return value;
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}
	
	module.exports = toKey;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(8),
	    isObject = __webpack_require__(6);
	
	/** `Object#toString` result references. */
	var asyncTag = '[object AsyncFunction]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    proxyTag = '[object Proxy]';
	
	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  if (!isObject(value)) {
	    return false;
	  }
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 9 which returns 'object' for typed arrays and other constructors.
	  var tag = baseGetTag(value);
	  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
	}
	
	module.exports = isFunction;


/***/ }),
/* 29 */,
/* 30 */,
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(4),
	    isKey = __webpack_require__(97),
	    stringToPath = __webpack_require__(257),
	    toString = __webpack_require__(268);
	
	/**
	 * Casts `value` to a path array if it's not one.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @param {Object} [object] The object to query keys on.
	 * @returns {Array} Returns the cast property path array.
	 */
	function castPath(value, object) {
	  if (isArray(value)) {
	    return value;
	  }
	  return isKey(value, object) ? [value] : stringToPath(toString(value));
	}
	
	module.exports = castPath;


/***/ }),
/* 32 */
/***/ (function(module, exports) {

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}
	
	module.exports = identity;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	var baseIsArguments = __webpack_require__(196),
	    isObjectLike = __webpack_require__(7);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;
	
	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
	  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
	    !propertyIsEnumerable.call(value, 'callee');
	};
	
	module.exports = isArguments;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(8),
	    isObjectLike = __webpack_require__(7);
	
	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';
	
	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && baseGetTag(value) == symbolTag);
	}
	
	module.exports = isSymbol;


/***/ }),
/* 35 */
/***/ (function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.prependListener = noop;
	process.prependOnceListener = noop;
	
	process.listeners = function (name) { return [] }
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ }),
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(9),
	    root = __webpack_require__(5);
	
	/* Built-in method references that are verified to be native. */
	var Map = getNative(root, 'Map');
	
	module.exports = Map;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

	var mapCacheClear = __webpack_require__(238),
	    mapCacheDelete = __webpack_require__(239),
	    mapCacheGet = __webpack_require__(240),
	    mapCacheHas = __webpack_require__(241),
	    mapCacheSet = __webpack_require__(242);
	
	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function MapCache(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;
	
	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}
	
	// Add methods to `MapCache`.
	MapCache.prototype.clear = mapCacheClear;
	MapCache.prototype['delete'] = mapCacheDelete;
	MapCache.prototype.get = mapCacheGet;
	MapCache.prototype.has = mapCacheHas;
	MapCache.prototype.set = mapCacheSet;
	
	module.exports = MapCache;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

	var defineProperty = __webpack_require__(93);
	
	/**
	 * The base implementation of `assignValue` and `assignMergeValue` without
	 * value checks.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function baseAssignValue(object, key, value) {
	  if (key == '__proto__' && defineProperty) {
	    defineProperty(object, key, {
	      'configurable': true,
	      'enumerable': true,
	      'value': value,
	      'writable': true
	    });
	  } else {
	    object[key] = value;
	  }
	}
	
	module.exports = baseAssignValue;


/***/ }),
/* 48 */
/***/ (function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;
	
	  return value === proto;
	}
	
	module.exports = isPrototype;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(5),
	    stubFalse = __webpack_require__(266);
	
	/** Detect free variable `exports`. */
	var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;
	
	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;
	
	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;
	
	/** Built-in value references. */
	var Buffer = moduleExports ? root.Buffer : undefined;
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;
	
	/**
	 * Checks if `value` is a buffer.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.3.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
	 * @example
	 *
	 * _.isBuffer(new Buffer(2));
	 * // => true
	 *
	 * _.isBuffer(new Uint8Array(2));
	 * // => false
	 */
	var isBuffer = nativeIsBuffer || stubFalse;
	
	module.exports = isBuffer;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(54)(module)))

/***/ }),
/* 50 */
/***/ (function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}
	
	module.exports = isLength;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

	var baseIsTypedArray = __webpack_require__(199),
	    baseUnary = __webpack_require__(129),
	    nodeUtil = __webpack_require__(247);
	
	/* Node.js helper references. */
	var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
	
	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
	
	module.exports = isTypedArray;


/***/ }),
/* 52 */,
/* 53 */,
/* 54 */
/***/ (function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ }),
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(23),
	    stackClear = __webpack_require__(252),
	    stackDelete = __webpack_require__(253),
	    stackGet = __webpack_require__(254),
	    stackHas = __webpack_require__(255),
	    stackSet = __webpack_require__(256);
	
	/**
	 * Creates a stack cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Stack(entries) {
	  var data = this.__data__ = new ListCache(entries);
	  this.size = data.size;
	}
	
	// Add methods to `Stack`.
	Stack.prototype.clear = stackClear;
	Stack.prototype['delete'] = stackDelete;
	Stack.prototype.get = stackGet;
	Stack.prototype.has = stackHas;
	Stack.prototype.set = stackSet;
	
	module.exports = Stack;


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(6);
	
	/** Built-in value references. */
	var objectCreate = Object.create;
	
	/**
	 * The base implementation of `_.create` without support for assigning
	 * properties to the created object.
	 *
	 * @private
	 * @param {Object} proto The object to inherit from.
	 * @returns {Object} Returns the new object.
	 */
	var baseCreate = (function() {
	  function object() {}
	  return function(proto) {
	    if (!isObject(proto)) {
	      return {};
	    }
	    if (objectCreate) {
	      return objectCreate(proto);
	    }
	    object.prototype = proto;
	    var result = new object;
	    object.prototype = undefined;
	    return result;
	  };
	}());
	
	module.exports = baseCreate;


/***/ }),
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

	var root = __webpack_require__(5);
	
	/** Built-in value references. */
	var Uint8Array = root.Uint8Array;
	
	module.exports = Uint8Array;


/***/ }),
/* 86 */
/***/ (function(module, exports) {

	/**
	 * A faster alternative to `Function#apply`, this function invokes `func`
	 * with the `this` binding of `thisArg` and the arguments of `args`.
	 *
	 * @private
	 * @param {Function} func The function to invoke.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {Array} args The arguments to invoke `func` with.
	 * @returns {*} Returns the result of `func`.
	 */
	function apply(func, thisArg, args) {
	  switch (args.length) {
	    case 0: return func.call(thisArg);
	    case 1: return func.call(thisArg, args[0]);
	    case 2: return func.call(thisArg, args[0], args[1]);
	    case 3: return func.call(thisArg, args[0], args[1], args[2]);
	  }
	  return func.apply(thisArg, args);
	}
	
	module.exports = apply;


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

	var baseTimes = __webpack_require__(206),
	    isArguments = __webpack_require__(33),
	    isArray = __webpack_require__(4),
	    isBuffer = __webpack_require__(49),
	    isIndex = __webpack_require__(20),
	    isTypedArray = __webpack_require__(51);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Creates an array of the enumerable property names of the array-like `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @param {boolean} inherited Specify returning inherited property names.
	 * @returns {Array} Returns the array of property names.
	 */
	function arrayLikeKeys(value, inherited) {
	  var isArr = isArray(value),
	      isArg = !isArr && isArguments(value),
	      isBuff = !isArr && !isArg && isBuffer(value),
	      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
	      skipIndexes = isArr || isArg || isBuff || isType,
	      result = skipIndexes ? baseTimes(value.length, String) : [],
	      length = result.length;
	
	  for (var key in value) {
	    if ((inherited || hasOwnProperty.call(value, key)) &&
	        !(skipIndexes && (
	           // Safari 9 has enumerable `arguments.length` in strict mode.
	           key == 'length' ||
	           // Node.js 0.10 has enumerable non-index properties on buffers.
	           (isBuff && (key == 'offset' || key == 'parent')) ||
	           // PhantomJS 2 has enumerable non-index properties on typed arrays.
	           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
	           // Skip index properties.
	           isIndex(key, length)
	        ))) {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	module.exports = arrayLikeKeys;


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

	var baseAssignValue = __webpack_require__(47),
	    eq = __webpack_require__(16);
	
	/**
	 * This function is like `assignValue` except that it doesn't assign
	 * `undefined` values.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function assignMergeValue(object, key, value) {
	  if ((value !== undefined && !eq(object[key], value)) ||
	      (value === undefined && !(key in object))) {
	    baseAssignValue(object, key, value);
	  }
	}
	
	module.exports = assignMergeValue;


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

	var baseAssignValue = __webpack_require__(47),
	    eq = __webpack_require__(16);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Assigns `value` to `key` of `object` if the existing value is not equivalent
	 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * for equality comparisons.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function assignValue(object, key, value) {
	  var objValue = object[key];
	  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
	      (value === undefined && !(key in object))) {
	    baseAssignValue(object, key, value);
	  }
	}
	
	module.exports = assignValue;


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

	var castPath = __webpack_require__(31),
	    toKey = __webpack_require__(27);
	
	/**
	 * The base implementation of `_.get` without support for default values.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @returns {*} Returns the resolved value.
	 */
	function baseGet(object, path) {
	  path = castPath(path, object);
	
	  var index = 0,
	      length = path.length;
	
	  while (object != null && index < length) {
	    object = object[toKey(path[index++])];
	  }
	  return (index && index == length) ? object : undefined;
	}
	
	module.exports = baseGet;


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

	var identity = __webpack_require__(32),
	    overRest = __webpack_require__(132),
	    setToString = __webpack_require__(100);
	
	/**
	 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 */
	function baseRest(func, start) {
	  return setToString(overRest(func, start, identity), func + '');
	}
	
	module.exports = baseRest;


/***/ }),
/* 92 */
/***/ (function(module, exports) {

	/**
	 * Copies the values of `source` to `array`.
	 *
	 * @private
	 * @param {Array} source The array to copy values from.
	 * @param {Array} [array=[]] The array to copy values to.
	 * @returns {Array} Returns `array`.
	 */
	function copyArray(source, array) {
	  var index = -1,
	      length = source.length;
	
	  array || (array = Array(length));
	  while (++index < length) {
	    array[index] = source[index];
	  }
	  return array;
	}
	
	module.exports = copyArray;


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(9);
	
	var defineProperty = (function() {
	  try {
	    var func = getNative(Object, 'defineProperty');
	    func({}, '', {});
	    return func;
	  } catch (e) {}
	}());
	
	module.exports = defineProperty;


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

	var SetCache = __webpack_require__(122),
	    arraySome = __webpack_require__(193),
	    cacheHas = __webpack_require__(130);
	
	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1,
	    COMPARE_UNORDERED_FLAG = 2;
	
	/**
	 * A specialized version of `baseIsEqualDeep` for arrays with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Array} array The array to compare.
	 * @param {Array} other The other array to compare.
	 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Object} stack Tracks traversed `array` and `other` objects.
	 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	 */
	function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
	  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
	      arrLength = array.length,
	      othLength = other.length;
	
	  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
	    return false;
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(array);
	  if (stacked && stack.get(other)) {
	    return stacked == other;
	  }
	  var index = -1,
	      result = true,
	      seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;
	
	  stack.set(array, other);
	  stack.set(other, array);
	
	  // Ignore non-index properties.
	  while (++index < arrLength) {
	    var arrValue = array[index],
	        othValue = other[index];
	
	    if (customizer) {
	      var compared = isPartial
	        ? customizer(othValue, arrValue, index, other, array, stack)
	        : customizer(arrValue, othValue, index, array, other, stack);
	    }
	    if (compared !== undefined) {
	      if (compared) {
	        continue;
	      }
	      result = false;
	      break;
	    }
	    // Recursively compare arrays (susceptible to call stack limits).
	    if (seen) {
	      if (!arraySome(other, function(othValue, othIndex) {
	            if (!cacheHas(seen, othIndex) &&
	                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
	              return seen.push(othIndex);
	            }
	          })) {
	        result = false;
	        break;
	      }
	    } else if (!(
	          arrValue === othValue ||
	            equalFunc(arrValue, othValue, bitmask, customizer, stack)
	        )) {
	      result = false;
	      break;
	    }
	  }
	  stack['delete'](array);
	  stack['delete'](other);
	  return result;
	}
	
	module.exports = equalArrays;


/***/ }),
/* 95 */
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;
	
	module.exports = freeGlobal;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(98);
	
	/** Built-in value references. */
	var getPrototype = overArg(Object.getPrototypeOf, Object);
	
	module.exports = getPrototype;


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(4),
	    isSymbol = __webpack_require__(34);
	
	/** Used to match property names within property paths. */
	var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
	    reIsPlainProp = /^\w*$/;
	
	/**
	 * Checks if `value` is a property name and not a property path.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {Object} [object] The object to query keys on.
	 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
	 */
	function isKey(value, object) {
	  if (isArray(value)) {
	    return false;
	  }
	  var type = typeof value;
	  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
	      value == null || isSymbol(value)) {
	    return true;
	  }
	  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
	    (object != null && value in Object(object));
	}
	
	module.exports = isKey;


/***/ }),
/* 98 */
/***/ (function(module, exports) {

	/**
	 * Creates a unary function that invokes `func` with its argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */
	function overArg(func, transform) {
	  return function(arg) {
	    return func(transform(arg));
	  };
	}
	
	module.exports = overArg;


/***/ }),
/* 99 */
/***/ (function(module, exports) {

	/**
	 * Gets the value at `key`, unless `key` is "__proto__".
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the property to get.
	 * @returns {*} Returns the property value.
	 */
	function safeGet(object, key) {
	  return key == '__proto__'
	    ? undefined
	    : object[key];
	}
	
	module.exports = safeGet;


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

	var baseSetToString = __webpack_require__(205),
	    shortOut = __webpack_require__(134);
	
	/**
	 * Sets the `toString` method of `func` to return `string`.
	 *
	 * @private
	 * @param {Function} func The function to modify.
	 * @param {Function} string The `toString` result.
	 * @returns {Function} Returns `func`.
	 */
	var setToString = shortOut(baseSetToString);
	
	module.exports = setToString;


/***/ }),
/* 101 */
/***/ (function(module, exports) {

	/** Used for built-in method references. */
	var funcProto = Function.prototype;
	
	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;
	
	/**
	 * Converts `func` to its source code.
	 *
	 * @private
	 * @param {Function} func The function to convert.
	 * @returns {string} Returns the source code.
	 */
	function toSource(func) {
	  if (func != null) {
	    try {
	      return funcToString.call(func);
	    } catch (e) {}
	    try {
	      return (func + '');
	    } catch (e) {}
	  }
	  return '';
	}
	
	module.exports = toSource;


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

	var arrayLikeKeys = __webpack_require__(87),
	    baseKeys = __webpack_require__(200),
	    isArrayLike = __webpack_require__(21);
	
	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	function keys(object) {
	  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
	}
	
	module.exports = keys;


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

	var arrayLikeKeys = __webpack_require__(87),
	    baseKeysIn = __webpack_require__(201),
	    isArrayLike = __webpack_require__(21);
	
	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn(object) {
	  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
	}
	
	module.exports = keysIn;


/***/ }),
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _mitt = __webpack_require__(632);
	
	var _mitt2 = _interopRequireDefault(_mitt);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var emitter = (0, _mitt2.default)();
	module.exports = emitter;

/***/ }),
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(46),
	    setCacheAdd = __webpack_require__(249),
	    setCacheHas = __webpack_require__(250);
	
	/**
	 *
	 * Creates an array cache object to store unique values.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [values] The values to cache.
	 */
	function SetCache(values) {
	  var index = -1,
	      length = values == null ? 0 : values.length;
	
	  this.__data__ = new MapCache;
	  while (++index < length) {
	    this.add(values[index]);
	  }
	}
	
	// Add methods to `SetCache`.
	SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
	SetCache.prototype.has = setCacheHas;
	
	module.exports = SetCache;


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(9),
	    root = __webpack_require__(5);
	
	/* Built-in method references that are verified to be native. */
	var WeakMap = getNative(root, 'WeakMap');
	
	module.exports = WeakMap;


/***/ }),
/* 124 */
/***/ (function(module, exports) {

	/**
	 * A specialized version of `_.map` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function arrayMap(array, iteratee) {
	  var index = -1,
	      length = array == null ? 0 : array.length,
	      result = Array(length);
	
	  while (++index < length) {
	    result[index] = iteratee(array[index], index, array);
	  }
	  return result;
	}
	
	module.exports = arrayMap;


/***/ }),
/* 125 */
/***/ (function(module, exports) {

	/**
	 * Appends the elements of `values` to `array`.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {Array} values The values to append.
	 * @returns {Array} Returns `array`.
	 */
	function arrayPush(array, values) {
	  var index = -1,
	      length = values.length,
	      offset = array.length;
	
	  while (++index < length) {
	    array[offset + index] = values[index];
	  }
	  return array;
	}
	
	module.exports = arrayPush;


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

	var createBaseFor = __webpack_require__(214);
	
	/**
	 * The base implementation of `baseForOwn` which iterates over `object`
	 * properties returned by `keysFunc` and invokes `iteratee` for each property.
	 * Iteratee functions may exit iteration early by explicitly returning `false`.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @returns {Object} Returns `object`.
	 */
	var baseFor = createBaseFor();
	
	module.exports = baseFor;


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

	var baseIsEqualDeep = __webpack_require__(197),
	    isObjectLike = __webpack_require__(7);
	
	/**
	 * The base implementation of `_.isEqual` which supports partial comparisons
	 * and tracks traversed objects.
	 *
	 * @private
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @param {boolean} bitmask The bitmask flags.
	 *  1 - Unordered comparison
	 *  2 - Partial comparison
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 */
	function baseIsEqual(value, other, bitmask, customizer, stack) {
	  if (value === other) {
	    return true;
	  }
	  if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
	    return value !== value && other !== other;
	  }
	  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
	}
	
	module.exports = baseIsEqual;


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

	var assignValue = __webpack_require__(89),
	    castPath = __webpack_require__(31),
	    isIndex = __webpack_require__(20),
	    isObject = __webpack_require__(6),
	    toKey = __webpack_require__(27);
	
	/**
	 * The base implementation of `_.set`.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {Array|string} path The path of the property to set.
	 * @param {*} value The value to set.
	 * @param {Function} [customizer] The function to customize path creation.
	 * @returns {Object} Returns `object`.
	 */
	function baseSet(object, path, value, customizer) {
	  if (!isObject(object)) {
	    return object;
	  }
	  path = castPath(path, object);
	
	  var index = -1,
	      length = path.length,
	      lastIndex = length - 1,
	      nested = object;
	
	  while (nested != null && ++index < length) {
	    var key = toKey(path[index]),
	        newValue = value;
	
	    if (index != lastIndex) {
	      var objValue = nested[key];
	      newValue = customizer ? customizer(objValue, key, nested) : undefined;
	      if (newValue === undefined) {
	        newValue = isObject(objValue)
	          ? objValue
	          : (isIndex(path[index + 1]) ? [] : {});
	      }
	    }
	    assignValue(nested, key, newValue);
	    nested = nested[key];
	  }
	  return object;
	}
	
	module.exports = baseSet;


/***/ }),
/* 129 */
/***/ (function(module, exports) {

	/**
	 * The base implementation of `_.unary` without support for storing metadata.
	 *
	 * @private
	 * @param {Function} func The function to cap arguments for.
	 * @returns {Function} Returns the new capped function.
	 */
	function baseUnary(func) {
	  return function(value) {
	    return func(value);
	  };
	}
	
	module.exports = baseUnary;


/***/ }),
/* 130 */
/***/ (function(module, exports) {

	/**
	 * Checks if a `cache` value for `key` exists.
	 *
	 * @private
	 * @param {Object} cache The cache to query.
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function cacheHas(cache, key) {
	  return cache.has(key);
	}
	
	module.exports = cacheHas;


/***/ }),
/* 131 */,
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(86);
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;
	
	/**
	 * A specialized version of `baseRest` which transforms the rest array.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @param {Function} transform The rest array transform.
	 * @returns {Function} Returns the new function.
	 */
	function overRest(func, start, transform) {
	  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
	  return function() {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        array = Array(length);
	
	    while (++index < length) {
	      array[index] = args[start + index];
	    }
	    index = -1;
	    var otherArgs = Array(start + 1);
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = transform(array);
	    return apply(func, this, otherArgs);
	  };
	}
	
	module.exports = overRest;


/***/ }),
/* 133 */,
/* 134 */
/***/ (function(module, exports) {

	/** Used to detect hot functions by number of calls within a span of milliseconds. */
	var HOT_COUNT = 800,
	    HOT_SPAN = 16;
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeNow = Date.now;
	
	/**
	 * Creates a function that'll short out and invoke `identity` instead
	 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
	 * milliseconds.
	 *
	 * @private
	 * @param {Function} func The function to restrict.
	 * @returns {Function} Returns the new shortable function.
	 */
	function shortOut(func) {
	  var count = 0,
	      lastCalled = 0;
	
	  return function() {
	    var stamp = nativeNow(),
	        remaining = HOT_SPAN - (stamp - lastCalled);
	
	    lastCalled = stamp;
	    if (remaining > 0) {
	      if (++count >= HOT_COUNT) {
	        return arguments[0];
	      }
	    } else {
	      count = 0;
	    }
	    return func.apply(undefined, arguments);
	  };
	}
	
	module.exports = shortOut;


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(21),
	    isObjectLike = __webpack_require__(7);
	
	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return isObjectLike(value) && isArrayLike(value);
	}
	
	module.exports = isArrayLikeObject;


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(8),
	    getPrototype = __webpack_require__(96),
	    isObjectLike = __webpack_require__(7);
	
	/** `Object#toString` result references. */
	var objectTag = '[object Object]';
	
	/** Used for built-in method references. */
	var funcProto = Function.prototype,
	    objectProto = Object.prototype;
	
	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/** Used to infer the `Object` constructor. */
	var objectCtorString = funcToString.call(Object);
	
	/**
	 * Checks if `value` is a plain object, that is, an object created by the
	 * `Object` constructor or one with a `[[Prototype]]` of `null`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.8.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * _.isPlainObject(new Foo);
	 * // => false
	 *
	 * _.isPlainObject([1, 2, 3]);
	 * // => false
	 *
	 * _.isPlainObject({ 'x': 0, 'y': 0 });
	 * // => true
	 *
	 * _.isPlainObject(Object.create(null));
	 * // => true
	 */
	function isPlainObject(value) {
	  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
	    return false;
	  }
	  var proto = getPrototype(value);
	  if (proto === null) {
	    return true;
	  }
	  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
	  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
	    funcToString.call(Ctor) == objectCtorString;
	}
	
	module.exports = isPlainObject;


/***/ }),
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	exports.apiRunner = apiRunner;
	exports.apiRunnerAsync = apiRunnerAsync;
	var plugins = [{
	  plugin: __webpack_require__(533),
	  options: { "plugins": [], "trackingId": "UA-124252195-1" }
	}, {
	  plugin: __webpack_require__(534),
	  options: { "plugins": [], "color": "#ffffff" }
	}, {
	  plugin: __webpack_require__(538),
	  options: { "plugins": [], "pathToConfigModule": "src/utils/typography.jsx" }
	}, {
	  plugin: __webpack_require__(532),
	  options: { "plugins": [] }
	}, {
	  plugin: __webpack_require__(536),
	  options: { "plugins": [] }
	}];
	// During bootstrap, we write requires at top of this file which looks
	// basically like:
	// var plugins = [
	//   {
	//     plugin: require("/path/to/plugin1/gatsby-browser.js"),
	//     options: { ... },
	//   },
	//   {
	//     plugin: require("/path/to/plugin2/gatsby-browser.js"),
	//     options: { ... },
	//   },
	// ]
	
	function apiRunner(api, args, defaultReturn) {
	  var results = plugins.map(function (plugin) {
	    if (plugin.plugin[api]) {
	      var result = plugin.plugin[api](args, plugin.options);
	      return result;
	    }
	  });
	
	  // Filter out undefined results.
	  results = results.filter(function (result) {
	    return typeof result !== "undefined";
	  });
	
	  if (results.length > 0) {
	    return results;
	  } else if (defaultReturn) {
	    return [defaultReturn];
	  } else {
	    return [];
	  }
	}
	
	function apiRunnerAsync(api, args, defaultReturn) {
	  return plugins.reduce(function (previous, next) {
	    return next.plugin[api] ? previous.then(function () {
	      return next.plugin[api](args, next.options);
	    }) : previous;
	  }, Promise.resolve());
	}

/***/ }),
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(9),
	    root = __webpack_require__(5);
	
	/* Built-in method references that are verified to be native. */
	var DataView = getNative(root, 'DataView');
	
	module.exports = DataView;


/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

	var hashClear = __webpack_require__(224),
	    hashDelete = __webpack_require__(225),
	    hashGet = __webpack_require__(226),
	    hashHas = __webpack_require__(227),
	    hashSet = __webpack_require__(228);
	
	/**
	 * Creates a hash object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Hash(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;
	
	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}
	
	// Add methods to `Hash`.
	Hash.prototype.clear = hashClear;
	Hash.prototype['delete'] = hashDelete;
	Hash.prototype.get = hashGet;
	Hash.prototype.has = hashHas;
	Hash.prototype.set = hashSet;
	
	module.exports = Hash;


/***/ }),
/* 188 */,
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(9),
	    root = __webpack_require__(5);
	
	/* Built-in method references that are verified to be native. */
	var Promise = getNative(root, 'Promise');
	
	module.exports = Promise;


/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(9),
	    root = __webpack_require__(5);
	
	/* Built-in method references that are verified to be native. */
	var Set = getNative(root, 'Set');
	
	module.exports = Set;


/***/ }),
/* 191 */
/***/ (function(module, exports) {

	/**
	 * A specialized version of `_.forEach` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns `array`.
	 */
	function arrayEach(array, iteratee) {
	  var index = -1,
	      length = array == null ? 0 : array.length;
	
	  while (++index < length) {
	    if (iteratee(array[index], index, array) === false) {
	      break;
	    }
	  }
	  return array;
	}
	
	module.exports = arrayEach;


/***/ }),
/* 192 */
/***/ (function(module, exports) {

	/**
	 * A specialized version of `_.filter` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {Array} Returns the new filtered array.
	 */
	function arrayFilter(array, predicate) {
	  var index = -1,
	      length = array == null ? 0 : array.length,
	      resIndex = 0,
	      result = [];
	
	  while (++index < length) {
	    var value = array[index];
	    if (predicate(value, index, array)) {
	      result[resIndex++] = value;
	    }
	  }
	  return result;
	}
	
	module.exports = arrayFilter;


/***/ }),
/* 193 */
/***/ (function(module, exports) {

	/**
	 * A specialized version of `_.some` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if any element passes the predicate check,
	 *  else `false`.
	 */
	function arraySome(array, predicate) {
	  var index = -1,
	      length = array == null ? 0 : array.length;
	
	  while (++index < length) {
	    if (predicate(array[index], index, array)) {
	      return true;
	    }
	  }
	  return false;
	}
	
	module.exports = arraySome;


/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

	var arrayPush = __webpack_require__(125),
	    isArray = __webpack_require__(4);
	
	/**
	 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
	 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
	 * symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @param {Function} symbolsFunc The function to get the symbols of `object`.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function baseGetAllKeys(object, keysFunc, symbolsFunc) {
	  var result = keysFunc(object);
	  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
	}
	
	module.exports = baseGetAllKeys;


/***/ }),
/* 195 */
/***/ (function(module, exports) {

	/**
	 * The base implementation of `_.hasIn` without support for deep paths.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {Array|string} key The key to check.
	 * @returns {boolean} Returns `true` if `key` exists, else `false`.
	 */
	function baseHasIn(object, key) {
	  return object != null && key in Object(object);
	}
	
	module.exports = baseHasIn;


/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(8),
	    isObjectLike = __webpack_require__(7);
	
	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]';
	
	/**
	 * The base implementation of `_.isArguments`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 */
	function baseIsArguments(value) {
	  return isObjectLike(value) && baseGetTag(value) == argsTag;
	}
	
	module.exports = baseIsArguments;


/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(64),
	    equalArrays = __webpack_require__(94),
	    equalByTag = __webpack_require__(215),
	    equalObjects = __webpack_require__(216),
	    getTag = __webpack_require__(221),
	    isArray = __webpack_require__(4),
	    isBuffer = __webpack_require__(49),
	    isTypedArray = __webpack_require__(51);
	
	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1;
	
	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    objectTag = '[object Object]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * A specialized version of `baseIsEqual` for arrays and objects which performs
	 * deep comparisons and tracks traversed objects enabling objects with circular
	 * references to be compared.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
	  var objIsArr = isArray(object),
	      othIsArr = isArray(other),
	      objTag = objIsArr ? arrayTag : getTag(object),
	      othTag = othIsArr ? arrayTag : getTag(other);
	
	  objTag = objTag == argsTag ? objectTag : objTag;
	  othTag = othTag == argsTag ? objectTag : othTag;
	
	  var objIsObj = objTag == objectTag,
	      othIsObj = othTag == objectTag,
	      isSameTag = objTag == othTag;
	
	  if (isSameTag && isBuffer(object)) {
	    if (!isBuffer(other)) {
	      return false;
	    }
	    objIsArr = true;
	    objIsObj = false;
	  }
	  if (isSameTag && !objIsObj) {
	    stack || (stack = new Stack);
	    return (objIsArr || isTypedArray(object))
	      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
	      : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
	  }
	  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
	    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
	        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');
	
	    if (objIsWrapped || othIsWrapped) {
	      var objUnwrapped = objIsWrapped ? object.value() : object,
	          othUnwrapped = othIsWrapped ? other.value() : other;
	
	      stack || (stack = new Stack);
	      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
	    }
	  }
	  if (!isSameTag) {
	    return false;
	  }
	  stack || (stack = new Stack);
	  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
	}
	
	module.exports = baseIsEqualDeep;


/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(28),
	    isMasked = __webpack_require__(232),
	    isObject = __webpack_require__(6),
	    toSource = __webpack_require__(101);
	
	/**
	 * Used to match `RegExp`
	 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
	 */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
	
	/** Used to detect host constructors (Safari). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;
	
	/** Used for built-in method references. */
	var funcProto = Function.prototype,
	    objectProto = Object.prototype;
	
	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);
	
	/**
	 * The base implementation of `_.isNative` without bad shim checks.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function,
	 *  else `false`.
	 */
	function baseIsNative(value) {
	  if (!isObject(value) || isMasked(value)) {
	    return false;
	  }
	  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
	  return pattern.test(toSource(value));
	}
	
	module.exports = baseIsNative;


/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(8),
	    isLength = __webpack_require__(50),
	    isObjectLike = __webpack_require__(7);
	
	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    weakMapTag = '[object WeakMap]';
	
	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';
	
	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
	typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
	typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
	typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
	typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
	typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
	typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
	typedArrayTags[errorTag] = typedArrayTags[funcTag] =
	typedArrayTags[mapTag] = typedArrayTags[numberTag] =
	typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
	typedArrayTags[setTag] = typedArrayTags[stringTag] =
	typedArrayTags[weakMapTag] = false;
	
	/**
	 * The base implementation of `_.isTypedArray` without Node.js optimizations.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 */
	function baseIsTypedArray(value) {
	  return isObjectLike(value) &&
	    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
	}
	
	module.exports = baseIsTypedArray;


/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

	var isPrototype = __webpack_require__(48),
	    nativeKeys = __webpack_require__(245);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  if (!isPrototype(object)) {
	    return nativeKeys(object);
	  }
	  var result = [];
	  for (var key in Object(object)) {
	    if (hasOwnProperty.call(object, key) && key != 'constructor') {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	module.exports = baseKeys;


/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(6),
	    isPrototype = __webpack_require__(48),
	    nativeKeysIn = __webpack_require__(246);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeysIn(object) {
	  if (!isObject(object)) {
	    return nativeKeysIn(object);
	  }
	  var isProto = isPrototype(object),
	      result = [];
	
	  for (var key in object) {
	    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	module.exports = baseKeysIn;


/***/ }),
/* 202 */,
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(64),
	    assignMergeValue = __webpack_require__(88),
	    baseFor = __webpack_require__(126),
	    baseMergeDeep = __webpack_require__(204),
	    isObject = __webpack_require__(6),
	    keysIn = __webpack_require__(103),
	    safeGet = __webpack_require__(99);
	
	/**
	 * The base implementation of `_.merge` without support for multiple sources.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {number} srcIndex The index of `source`.
	 * @param {Function} [customizer] The function to customize merged values.
	 * @param {Object} [stack] Tracks traversed source values and their merged
	 *  counterparts.
	 */
	function baseMerge(object, source, srcIndex, customizer, stack) {
	  if (object === source) {
	    return;
	  }
	  baseFor(source, function(srcValue, key) {
	    if (isObject(srcValue)) {
	      stack || (stack = new Stack);
	      baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
	    }
	    else {
	      var newValue = customizer
	        ? customizer(safeGet(object, key), srcValue, (key + ''), object, source, stack)
	        : undefined;
	
	      if (newValue === undefined) {
	        newValue = srcValue;
	      }
	      assignMergeValue(object, key, newValue);
	    }
	  }, keysIn);
	}
	
	module.exports = baseMerge;


/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

	var assignMergeValue = __webpack_require__(88),
	    cloneBuffer = __webpack_require__(209),
	    cloneTypedArray = __webpack_require__(210),
	    copyArray = __webpack_require__(92),
	    initCloneObject = __webpack_require__(229),
	    isArguments = __webpack_require__(33),
	    isArray = __webpack_require__(4),
	    isArrayLikeObject = __webpack_require__(135),
	    isBuffer = __webpack_require__(49),
	    isFunction = __webpack_require__(28),
	    isObject = __webpack_require__(6),
	    isPlainObject = __webpack_require__(136),
	    isTypedArray = __webpack_require__(51),
	    safeGet = __webpack_require__(99),
	    toPlainObject = __webpack_require__(267);
	
	/**
	 * A specialized version of `baseMerge` for arrays and objects which performs
	 * deep merges and tracks traversed objects enabling objects with circular
	 * references to be merged.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {string} key The key of the value to merge.
	 * @param {number} srcIndex The index of `source`.
	 * @param {Function} mergeFunc The function to merge values.
	 * @param {Function} [customizer] The function to customize assigned values.
	 * @param {Object} [stack] Tracks traversed source values and their merged
	 *  counterparts.
	 */
	function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
	  var objValue = safeGet(object, key),
	      srcValue = safeGet(source, key),
	      stacked = stack.get(srcValue);
	
	  if (stacked) {
	    assignMergeValue(object, key, stacked);
	    return;
	  }
	  var newValue = customizer
	    ? customizer(objValue, srcValue, (key + ''), object, source, stack)
	    : undefined;
	
	  var isCommon = newValue === undefined;
	
	  if (isCommon) {
	    var isArr = isArray(srcValue),
	        isBuff = !isArr && isBuffer(srcValue),
	        isTyped = !isArr && !isBuff && isTypedArray(srcValue);
	
	    newValue = srcValue;
	    if (isArr || isBuff || isTyped) {
	      if (isArray(objValue)) {
	        newValue = objValue;
	      }
	      else if (isArrayLikeObject(objValue)) {
	        newValue = copyArray(objValue);
	      }
	      else if (isBuff) {
	        isCommon = false;
	        newValue = cloneBuffer(srcValue, true);
	      }
	      else if (isTyped) {
	        isCommon = false;
	        newValue = cloneTypedArray(srcValue, true);
	      }
	      else {
	        newValue = [];
	      }
	    }
	    else if (isPlainObject(srcValue) || isArguments(srcValue)) {
	      newValue = objValue;
	      if (isArguments(objValue)) {
	        newValue = toPlainObject(objValue);
	      }
	      else if (!isObject(objValue) || (srcIndex && isFunction(objValue))) {
	        newValue = initCloneObject(srcValue);
	      }
	    }
	    else {
	      isCommon = false;
	    }
	  }
	  if (isCommon) {
	    // Recursively merge objects and arrays (susceptible to call stack limits).
	    stack.set(srcValue, newValue);
	    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
	    stack['delete'](srcValue);
	  }
	  assignMergeValue(object, key, newValue);
	}
	
	module.exports = baseMergeDeep;


/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

	var constant = __webpack_require__(258),
	    defineProperty = __webpack_require__(93),
	    identity = __webpack_require__(32);
	
	/**
	 * The base implementation of `setToString` without support for hot loop shorting.
	 *
	 * @private
	 * @param {Function} func The function to modify.
	 * @param {Function} string The `toString` result.
	 * @returns {Function} Returns `func`.
	 */
	var baseSetToString = !defineProperty ? identity : function(func, string) {
	  return defineProperty(func, 'toString', {
	    'configurable': true,
	    'enumerable': false,
	    'value': constant(string),
	    'writable': true
	  });
	};
	
	module.exports = baseSetToString;


/***/ }),
/* 206 */
/***/ (function(module, exports) {

	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);
	
	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}
	
	module.exports = baseTimes;


/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(19),
	    arrayMap = __webpack_require__(124),
	    isArray = __webpack_require__(4),
	    isSymbol = __webpack_require__(34);
	
	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;
	
	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolToString = symbolProto ? symbolProto.toString : undefined;
	
	/**
	 * The base implementation of `_.toString` which doesn't convert nullish
	 * values to empty strings.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */
	function baseToString(value) {
	  // Exit early for strings to avoid a performance hit in some environments.
	  if (typeof value == 'string') {
	    return value;
	  }
	  if (isArray(value)) {
	    // Recursively convert values (susceptible to call stack limits).
	    return arrayMap(value, baseToString) + '';
	  }
	  if (isSymbol(value)) {
	    return symbolToString ? symbolToString.call(value) : '';
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}
	
	module.exports = baseToString;


/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

	var Uint8Array = __webpack_require__(85);
	
	/**
	 * Creates a clone of `arrayBuffer`.
	 *
	 * @private
	 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
	 * @returns {ArrayBuffer} Returns the cloned array buffer.
	 */
	function cloneArrayBuffer(arrayBuffer) {
	  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
	  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
	  return result;
	}
	
	module.exports = cloneArrayBuffer;


/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(5);
	
	/** Detect free variable `exports`. */
	var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;
	
	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;
	
	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;
	
	/** Built-in value references. */
	var Buffer = moduleExports ? root.Buffer : undefined,
	    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;
	
	/**
	 * Creates a clone of  `buffer`.
	 *
	 * @private
	 * @param {Buffer} buffer The buffer to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Buffer} Returns the cloned buffer.
	 */
	function cloneBuffer(buffer, isDeep) {
	  if (isDeep) {
	    return buffer.slice();
	  }
	  var length = buffer.length,
	      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
	
	  buffer.copy(result);
	  return result;
	}
	
	module.exports = cloneBuffer;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(54)(module)))

/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

	var cloneArrayBuffer = __webpack_require__(208);
	
	/**
	 * Creates a clone of `typedArray`.
	 *
	 * @private
	 * @param {Object} typedArray The typed array to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned typed array.
	 */
	function cloneTypedArray(typedArray, isDeep) {
	  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
	  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
	}
	
	module.exports = cloneTypedArray;


/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

	var assignValue = __webpack_require__(89),
	    baseAssignValue = __webpack_require__(47);
	
	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property identifiers to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @param {Function} [customizer] The function to customize copied values.
	 * @returns {Object} Returns `object`.
	 */
	function copyObject(source, props, object, customizer) {
	  var isNew = !object;
	  object || (object = {});
	
	  var index = -1,
	      length = props.length;
	
	  while (++index < length) {
	    var key = props[index];
	
	    var newValue = customizer
	      ? customizer(object[key], source[key], key, object, source)
	      : undefined;
	
	    if (newValue === undefined) {
	      newValue = source[key];
	    }
	    if (isNew) {
	      baseAssignValue(object, key, newValue);
	    } else {
	      assignValue(object, key, newValue);
	    }
	  }
	  return object;
	}
	
	module.exports = copyObject;


/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

	var root = __webpack_require__(5);
	
	/** Used to detect overreaching core-js shims. */
	var coreJsData = root['__core-js_shared__'];
	
	module.exports = coreJsData;


/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

	var baseRest = __webpack_require__(91),
	    isIterateeCall = __webpack_require__(230);
	
	/**
	 * Creates a function like `_.assign`.
	 *
	 * @private
	 * @param {Function} assigner The function to assign values.
	 * @returns {Function} Returns the new assigner function.
	 */
	function createAssigner(assigner) {
	  return baseRest(function(object, sources) {
	    var index = -1,
	        length = sources.length,
	        customizer = length > 1 ? sources[length - 1] : undefined,
	        guard = length > 2 ? sources[2] : undefined;
	
	    customizer = (assigner.length > 3 && typeof customizer == 'function')
	      ? (length--, customizer)
	      : undefined;
	
	    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
	      customizer = length < 3 ? undefined : customizer;
	      length = 1;
	    }
	    object = Object(object);
	    while (++index < length) {
	      var source = sources[index];
	      if (source) {
	        assigner(object, source, index, customizer);
	      }
	    }
	    return object;
	  });
	}
	
	module.exports = createAssigner;


/***/ }),
/* 214 */
/***/ (function(module, exports) {

	/**
	 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseFor(fromRight) {
	  return function(object, iteratee, keysFunc) {
	    var index = -1,
	        iterable = Object(object),
	        props = keysFunc(object),
	        length = props.length;
	
	    while (length--) {
	      var key = props[fromRight ? length : ++index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  };
	}
	
	module.exports = createBaseFor;


/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(19),
	    Uint8Array = __webpack_require__(85),
	    eq = __webpack_require__(16),
	    equalArrays = __webpack_require__(94),
	    mapToArray = __webpack_require__(243),
	    setToArray = __webpack_require__(251);
	
	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1,
	    COMPARE_UNORDERED_FLAG = 2;
	
	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]';
	
	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]';
	
	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;
	
	/**
	 * A specialized version of `baseIsEqualDeep` for comparing objects of
	 * the same `toStringTag`.
	 *
	 * **Note:** This function only supports comparing values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {string} tag The `toStringTag` of the objects to compare.
	 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
	  switch (tag) {
	    case dataViewTag:
	      if ((object.byteLength != other.byteLength) ||
	          (object.byteOffset != other.byteOffset)) {
	        return false;
	      }
	      object = object.buffer;
	      other = other.buffer;
	
	    case arrayBufferTag:
	      if ((object.byteLength != other.byteLength) ||
	          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
	        return false;
	      }
	      return true;
	
	    case boolTag:
	    case dateTag:
	    case numberTag:
	      // Coerce booleans to `1` or `0` and dates to milliseconds.
	      // Invalid dates are coerced to `NaN`.
	      return eq(+object, +other);
	
	    case errorTag:
	      return object.name == other.name && object.message == other.message;
	
	    case regexpTag:
	    case stringTag:
	      // Coerce regexes to strings and treat strings, primitives and objects,
	      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
	      // for more details.
	      return object == (other + '');
	
	    case mapTag:
	      var convert = mapToArray;
	
	    case setTag:
	      var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
	      convert || (convert = setToArray);
	
	      if (object.size != other.size && !isPartial) {
	        return false;
	      }
	      // Assume cyclic values are equal.
	      var stacked = stack.get(object);
	      if (stacked) {
	        return stacked == other;
	      }
	      bitmask |= COMPARE_UNORDERED_FLAG;
	
	      // Recursively compare objects (susceptible to call stack limits).
	      stack.set(object, other);
	      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
	      stack['delete'](object);
	      return result;
	
	    case symbolTag:
	      if (symbolValueOf) {
	        return symbolValueOf.call(object) == symbolValueOf.call(other);
	      }
	  }
	  return false;
	}
	
	module.exports = equalByTag;


/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

	var getAllKeys = __webpack_require__(217);
	
	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1;
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * A specialized version of `baseIsEqualDeep` for objects with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
	  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
	      objProps = getAllKeys(object),
	      objLength = objProps.length,
	      othProps = getAllKeys(other),
	      othLength = othProps.length;
	
	  if (objLength != othLength && !isPartial) {
	    return false;
	  }
	  var index = objLength;
	  while (index--) {
	    var key = objProps[index];
	    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
	      return false;
	    }
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(object);
	  if (stacked && stack.get(other)) {
	    return stacked == other;
	  }
	  var result = true;
	  stack.set(object, other);
	  stack.set(other, object);
	
	  var skipCtor = isPartial;
	  while (++index < objLength) {
	    key = objProps[index];
	    var objValue = object[key],
	        othValue = other[key];
	
	    if (customizer) {
	      var compared = isPartial
	        ? customizer(othValue, objValue, key, other, object, stack)
	        : customizer(objValue, othValue, key, object, other, stack);
	    }
	    // Recursively compare objects (susceptible to call stack limits).
	    if (!(compared === undefined
	          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
	          : compared
	        )) {
	      result = false;
	      break;
	    }
	    skipCtor || (skipCtor = key == 'constructor');
	  }
	  if (result && !skipCtor) {
	    var objCtor = object.constructor,
	        othCtor = other.constructor;
	
	    // Non `Object` object instances with different constructors are not equal.
	    if (objCtor != othCtor &&
	        ('constructor' in object && 'constructor' in other) &&
	        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
	          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
	      result = false;
	    }
	  }
	  stack['delete'](object);
	  stack['delete'](other);
	  return result;
	}
	
	module.exports = equalObjects;


/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

	var baseGetAllKeys = __webpack_require__(194),
	    getSymbols = __webpack_require__(220),
	    keys = __webpack_require__(102);
	
	/**
	 * Creates an array of own enumerable property names and symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function getAllKeys(object) {
	  return baseGetAllKeys(object, keys, getSymbols);
	}
	
	module.exports = getAllKeys;


/***/ }),
/* 218 */,
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(19);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;
	
	/** Built-in value references. */
	var symToStringTag = Symbol ? Symbol.toStringTag : undefined;
	
	/**
	 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the raw `toStringTag`.
	 */
	function getRawTag(value) {
	  var isOwn = hasOwnProperty.call(value, symToStringTag),
	      tag = value[symToStringTag];
	
	  try {
	    value[symToStringTag] = undefined;
	    var unmasked = true;
	  } catch (e) {}
	
	  var result = nativeObjectToString.call(value);
	  if (unmasked) {
	    if (isOwn) {
	      value[symToStringTag] = tag;
	    } else {
	      delete value[symToStringTag];
	    }
	  }
	  return result;
	}
	
	module.exports = getRawTag;


/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

	var arrayFilter = __webpack_require__(192),
	    stubArray = __webpack_require__(265);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetSymbols = Object.getOwnPropertySymbols;
	
	/**
	 * Creates an array of the own enumerable symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of symbols.
	 */
	var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
	  if (object == null) {
	    return [];
	  }
	  object = Object(object);
	  return arrayFilter(nativeGetSymbols(object), function(symbol) {
	    return propertyIsEnumerable.call(object, symbol);
	  });
	};
	
	module.exports = getSymbols;


/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

	var DataView = __webpack_require__(186),
	    Map = __webpack_require__(45),
	    Promise = __webpack_require__(189),
	    Set = __webpack_require__(190),
	    WeakMap = __webpack_require__(123),
	    baseGetTag = __webpack_require__(8),
	    toSource = __webpack_require__(101);
	
	/** `Object#toString` result references. */
	var mapTag = '[object Map]',
	    objectTag = '[object Object]',
	    promiseTag = '[object Promise]',
	    setTag = '[object Set]',
	    weakMapTag = '[object WeakMap]';
	
	var dataViewTag = '[object DataView]';
	
	/** Used to detect maps, sets, and weakmaps. */
	var dataViewCtorString = toSource(DataView),
	    mapCtorString = toSource(Map),
	    promiseCtorString = toSource(Promise),
	    setCtorString = toSource(Set),
	    weakMapCtorString = toSource(WeakMap);
	
	/**
	 * Gets the `toStringTag` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	var getTag = baseGetTag;
	
	// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
	if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
	    (Map && getTag(new Map) != mapTag) ||
	    (Promise && getTag(Promise.resolve()) != promiseTag) ||
	    (Set && getTag(new Set) != setTag) ||
	    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
	  getTag = function(value) {
	    var result = baseGetTag(value),
	        Ctor = result == objectTag ? value.constructor : undefined,
	        ctorString = Ctor ? toSource(Ctor) : '';
	
	    if (ctorString) {
	      switch (ctorString) {
	        case dataViewCtorString: return dataViewTag;
	        case mapCtorString: return mapTag;
	        case promiseCtorString: return promiseTag;
	        case setCtorString: return setTag;
	        case weakMapCtorString: return weakMapTag;
	      }
	    }
	    return result;
	  };
	}
	
	module.exports = getTag;


/***/ }),
/* 222 */
/***/ (function(module, exports) {

	/**
	 * Gets the value at `key` of `object`.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {string} key The key of the property to get.
	 * @returns {*} Returns the property value.
	 */
	function getValue(object, key) {
	  return object == null ? undefined : object[key];
	}
	
	module.exports = getValue;


/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

	var castPath = __webpack_require__(31),
	    isArguments = __webpack_require__(33),
	    isArray = __webpack_require__(4),
	    isIndex = __webpack_require__(20),
	    isLength = __webpack_require__(50),
	    toKey = __webpack_require__(27);
	
	/**
	 * Checks if `path` exists on `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @param {Function} hasFunc The function to check properties.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 */
	function hasPath(object, path, hasFunc) {
	  path = castPath(path, object);
	
	  var index = -1,
	      length = path.length,
	      result = false;
	
	  while (++index < length) {
	    var key = toKey(path[index]);
	    if (!(result = object != null && hasFunc(object, key))) {
	      break;
	    }
	    object = object[key];
	  }
	  if (result || ++index != length) {
	    return result;
	  }
	  length = object == null ? 0 : object.length;
	  return !!length && isLength(length) && isIndex(key, length) &&
	    (isArray(object) || isArguments(object));
	}
	
	module.exports = hasPath;


/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(26);
	
	/**
	 * Removes all key-value entries from the hash.
	 *
	 * @private
	 * @name clear
	 * @memberOf Hash
	 */
	function hashClear() {
	  this.__data__ = nativeCreate ? nativeCreate(null) : {};
	  this.size = 0;
	}
	
	module.exports = hashClear;


/***/ }),
/* 225 */
/***/ (function(module, exports) {

	/**
	 * Removes `key` and its value from the hash.
	 *
	 * @private
	 * @name delete
	 * @memberOf Hash
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function hashDelete(key) {
	  var result = this.has(key) && delete this.__data__[key];
	  this.size -= result ? 1 : 0;
	  return result;
	}
	
	module.exports = hashDelete;


/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(26);
	
	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Gets the hash value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Hash
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function hashGet(key) {
	  var data = this.__data__;
	  if (nativeCreate) {
	    var result = data[key];
	    return result === HASH_UNDEFINED ? undefined : result;
	  }
	  return hasOwnProperty.call(data, key) ? data[key] : undefined;
	}
	
	module.exports = hashGet;


/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(26);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Checks if a hash value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Hash
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function hashHas(key) {
	  var data = this.__data__;
	  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
	}
	
	module.exports = hashHas;


/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(26);
	
	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';
	
	/**
	 * Sets the hash `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Hash
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the hash instance.
	 */
	function hashSet(key, value) {
	  var data = this.__data__;
	  this.size += this.has(key) ? 0 : 1;
	  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
	  return this;
	}
	
	module.exports = hashSet;


/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

	var baseCreate = __webpack_require__(65),
	    getPrototype = __webpack_require__(96),
	    isPrototype = __webpack_require__(48);
	
	/**
	 * Initializes an object clone.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneObject(object) {
	  return (typeof object.constructor == 'function' && !isPrototype(object))
	    ? baseCreate(getPrototype(object))
	    : {};
	}
	
	module.exports = initCloneObject;


/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(16),
	    isArrayLike = __webpack_require__(21),
	    isIndex = __webpack_require__(20),
	    isObject = __webpack_require__(6);
	
	/**
	 * Checks if the given arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
	 *  else `false`.
	 */
	function isIterateeCall(value, index, object) {
	  if (!isObject(object)) {
	    return false;
	  }
	  var type = typeof index;
	  if (type == 'number'
	        ? (isArrayLike(object) && isIndex(index, object.length))
	        : (type == 'string' && index in object)
	      ) {
	    return eq(object[index], value);
	  }
	  return false;
	}
	
	module.exports = isIterateeCall;


/***/ }),
/* 231 */
/***/ (function(module, exports) {

	/**
	 * Checks if `value` is suitable for use as unique object key.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	 */
	function isKeyable(value) {
	  var type = typeof value;
	  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
	    ? (value !== '__proto__')
	    : (value === null);
	}
	
	module.exports = isKeyable;


/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

	var coreJsData = __webpack_require__(212);
	
	/** Used to detect methods masquerading as native. */
	var maskSrcKey = (function() {
	  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
	  return uid ? ('Symbol(src)_1.' + uid) : '';
	}());
	
	/**
	 * Checks if `func` has its source masked.
	 *
	 * @private
	 * @param {Function} func The function to check.
	 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
	 */
	function isMasked(func) {
	  return !!maskSrcKey && (maskSrcKey in func);
	}
	
	module.exports = isMasked;


/***/ }),
/* 233 */
/***/ (function(module, exports) {

	/**
	 * Removes all key-value entries from the list cache.
	 *
	 * @private
	 * @name clear
	 * @memberOf ListCache
	 */
	function listCacheClear() {
	  this.__data__ = [];
	  this.size = 0;
	}
	
	module.exports = listCacheClear;


/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(24);
	
	/** Used for built-in method references. */
	var arrayProto = Array.prototype;
	
	/** Built-in value references. */
	var splice = arrayProto.splice;
	
	/**
	 * Removes `key` and its value from the list cache.
	 *
	 * @private
	 * @name delete
	 * @memberOf ListCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function listCacheDelete(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);
	
	  if (index < 0) {
	    return false;
	  }
	  var lastIndex = data.length - 1;
	  if (index == lastIndex) {
	    data.pop();
	  } else {
	    splice.call(data, index, 1);
	  }
	  --this.size;
	  return true;
	}
	
	module.exports = listCacheDelete;


/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(24);
	
	/**
	 * Gets the list cache value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf ListCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function listCacheGet(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);
	
	  return index < 0 ? undefined : data[index][1];
	}
	
	module.exports = listCacheGet;


/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(24);
	
	/**
	 * Checks if a list cache value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf ListCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function listCacheHas(key) {
	  return assocIndexOf(this.__data__, key) > -1;
	}
	
	module.exports = listCacheHas;


/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(24);
	
	/**
	 * Sets the list cache `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf ListCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the list cache instance.
	 */
	function listCacheSet(key, value) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);
	
	  if (index < 0) {
	    ++this.size;
	    data.push([key, value]);
	  } else {
	    data[index][1] = value;
	  }
	  return this;
	}
	
	module.exports = listCacheSet;


/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

	var Hash = __webpack_require__(187),
	    ListCache = __webpack_require__(23),
	    Map = __webpack_require__(45);
	
	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */
	function mapCacheClear() {
	  this.size = 0;
	  this.__data__ = {
	    'hash': new Hash,
	    'map': new (Map || ListCache),
	    'string': new Hash
	  };
	}
	
	module.exports = mapCacheClear;


/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(25);
	
	/**
	 * Removes `key` and its value from the map.
	 *
	 * @private
	 * @name delete
	 * @memberOf MapCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function mapCacheDelete(key) {
	  var result = getMapData(this, key)['delete'](key);
	  this.size -= result ? 1 : 0;
	  return result;
	}
	
	module.exports = mapCacheDelete;


/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(25);
	
	/**
	 * Gets the map value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf MapCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function mapCacheGet(key) {
	  return getMapData(this, key).get(key);
	}
	
	module.exports = mapCacheGet;


/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(25);
	
	/**
	 * Checks if a map value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf MapCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function mapCacheHas(key) {
	  return getMapData(this, key).has(key);
	}
	
	module.exports = mapCacheHas;


/***/ }),
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(25);
	
	/**
	 * Sets the map `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf MapCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the map cache instance.
	 */
	function mapCacheSet(key, value) {
	  var data = getMapData(this, key),
	      size = data.size;
	
	  data.set(key, value);
	  this.size += data.size == size ? 0 : 1;
	  return this;
	}
	
	module.exports = mapCacheSet;


/***/ }),
/* 243 */
/***/ (function(module, exports) {

	/**
	 * Converts `map` to its key-value pairs.
	 *
	 * @private
	 * @param {Object} map The map to convert.
	 * @returns {Array} Returns the key-value pairs.
	 */
	function mapToArray(map) {
	  var index = -1,
	      result = Array(map.size);
	
	  map.forEach(function(value, key) {
	    result[++index] = [key, value];
	  });
	  return result;
	}
	
	module.exports = mapToArray;


/***/ }),
/* 244 */
/***/ (function(module, exports, __webpack_require__) {

	var memoize = __webpack_require__(262);
	
	/** Used as the maximum memoize cache size. */
	var MAX_MEMOIZE_SIZE = 500;
	
	/**
	 * A specialized version of `_.memoize` which clears the memoized function's
	 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
	 *
	 * @private
	 * @param {Function} func The function to have its output memoized.
	 * @returns {Function} Returns the new memoized function.
	 */
	function memoizeCapped(func) {
	  var result = memoize(func, function(key) {
	    if (cache.size === MAX_MEMOIZE_SIZE) {
	      cache.clear();
	    }
	    return key;
	  });
	
	  var cache = result.cache;
	  return result;
	}
	
	module.exports = memoizeCapped;


/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(98);
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = overArg(Object.keys, Object);
	
	module.exports = nativeKeys;


/***/ }),
/* 246 */
/***/ (function(module, exports) {

	/**
	 * This function is like
	 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * except that it includes inherited enumerable properties.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function nativeKeysIn(object) {
	  var result = [];
	  if (object != null) {
	    for (var key in Object(object)) {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	module.exports = nativeKeysIn;


/***/ }),
/* 247 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var freeGlobal = __webpack_require__(95);
	
	/** Detect free variable `exports`. */
	var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;
	
	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;
	
	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;
	
	/** Detect free variable `process` from Node.js. */
	var freeProcess = moduleExports && freeGlobal.process;
	
	/** Used to access faster Node.js helpers. */
	var nodeUtil = (function() {
	  try {
	    // Use `util.types` for Node.js 10+.
	    var types = freeModule && freeModule.require && freeModule.require('util').types;
	
	    if (types) {
	      return types;
	    }
	
	    // Legacy `process.binding('util')` for Node.js < 10.
	    return freeProcess && freeProcess.binding && freeProcess.binding('util');
	  } catch (e) {}
	}());
	
	module.exports = nodeUtil;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(54)(module)))

/***/ }),
/* 248 */
/***/ (function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;
	
	/**
	 * Converts `value` to a string using `Object.prototype.toString`.
	 *
	 * @private
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 */
	function objectToString(value) {
	  return nativeObjectToString.call(value);
	}
	
	module.exports = objectToString;


/***/ }),
/* 249 */
/***/ (function(module, exports) {

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';
	
	/**
	 * Adds `value` to the array cache.
	 *
	 * @private
	 * @name add
	 * @memberOf SetCache
	 * @alias push
	 * @param {*} value The value to cache.
	 * @returns {Object} Returns the cache instance.
	 */
	function setCacheAdd(value) {
	  this.__data__.set(value, HASH_UNDEFINED);
	  return this;
	}
	
	module.exports = setCacheAdd;


/***/ }),
/* 250 */
/***/ (function(module, exports) {

	/**
	 * Checks if `value` is in the array cache.
	 *
	 * @private
	 * @name has
	 * @memberOf SetCache
	 * @param {*} value The value to search for.
	 * @returns {number} Returns `true` if `value` is found, else `false`.
	 */
	function setCacheHas(value) {
	  return this.__data__.has(value);
	}
	
	module.exports = setCacheHas;


/***/ }),
/* 251 */
/***/ (function(module, exports) {

	/**
	 * Converts `set` to an array of its values.
	 *
	 * @private
	 * @param {Object} set The set to convert.
	 * @returns {Array} Returns the values.
	 */
	function setToArray(set) {
	  var index = -1,
	      result = Array(set.size);
	
	  set.forEach(function(value) {
	    result[++index] = value;
	  });
	  return result;
	}
	
	module.exports = setToArray;


/***/ }),
/* 252 */
/***/ (function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(23);
	
	/**
	 * Removes all key-value entries from the stack.
	 *
	 * @private
	 * @name clear
	 * @memberOf Stack
	 */
	function stackClear() {
	  this.__data__ = new ListCache;
	  this.size = 0;
	}
	
	module.exports = stackClear;


/***/ }),
/* 253 */
/***/ (function(module, exports) {

	/**
	 * Removes `key` and its value from the stack.
	 *
	 * @private
	 * @name delete
	 * @memberOf Stack
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function stackDelete(key) {
	  var data = this.__data__,
	      result = data['delete'](key);
	
	  this.size = data.size;
	  return result;
	}
	
	module.exports = stackDelete;


/***/ }),
/* 254 */
/***/ (function(module, exports) {

	/**
	 * Gets the stack value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Stack
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function stackGet(key) {
	  return this.__data__.get(key);
	}
	
	module.exports = stackGet;


/***/ }),
/* 255 */
/***/ (function(module, exports) {

	/**
	 * Checks if a stack value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Stack
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function stackHas(key) {
	  return this.__data__.has(key);
	}
	
	module.exports = stackHas;


/***/ }),
/* 256 */
/***/ (function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(23),
	    Map = __webpack_require__(45),
	    MapCache = __webpack_require__(46);
	
	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;
	
	/**
	 * Sets the stack `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Stack
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the stack cache instance.
	 */
	function stackSet(key, value) {
	  var data = this.__data__;
	  if (data instanceof ListCache) {
	    var pairs = data.__data__;
	    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
	      pairs.push([key, value]);
	      this.size = ++data.size;
	      return this;
	    }
	    data = this.__data__ = new MapCache(pairs);
	  }
	  data.set(key, value);
	  this.size = data.size;
	  return this;
	}
	
	module.exports = stackSet;


/***/ }),
/* 257 */
/***/ (function(module, exports, __webpack_require__) {

	var memoizeCapped = __webpack_require__(244);
	
	/** Used to match property names within property paths. */
	var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
	
	/** Used to match backslashes in property paths. */
	var reEscapeChar = /\\(\\)?/g;
	
	/**
	 * Converts `string` to a property path array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the property path array.
	 */
	var stringToPath = memoizeCapped(function(string) {
	  var result = [];
	  if (string.charCodeAt(0) === 46 /* . */) {
	    result.push('');
	  }
	  string.replace(rePropName, function(match, number, quote, subString) {
	    result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
	  });
	  return result;
	});
	
	module.exports = stringToPath;


/***/ }),
/* 258 */
/***/ (function(module, exports) {

	/**
	 * Creates a function that returns `value`.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Util
	 * @param {*} value The value to return from the new function.
	 * @returns {Function} Returns the new constant function.
	 * @example
	 *
	 * var objects = _.times(2, _.constant({ 'a': 1 }));
	 *
	 * console.log(objects);
	 * // => [{ 'a': 1 }, { 'a': 1 }]
	 *
	 * console.log(objects[0] === objects[1]);
	 * // => true
	 */
	function constant(value) {
	  return function() {
	    return value;
	  };
	}
	
	module.exports = constant;


/***/ }),
/* 259 */
/***/ (function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(90);
	
	/**
	 * Gets the value at `path` of `object`. If the resolved value is
	 * `undefined`, the `defaultValue` is returned in its place.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.7.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
	 * @returns {*} Returns the resolved value.
	 * @example
	 *
	 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
	 *
	 * _.get(object, 'a[0].b.c');
	 * // => 3
	 *
	 * _.get(object, ['a', '0', 'b', 'c']);
	 * // => 3
	 *
	 * _.get(object, 'a.b.c', 'default');
	 * // => 'default'
	 */
	function get(object, path, defaultValue) {
	  var result = object == null ? undefined : baseGet(object, path);
	  return result === undefined ? defaultValue : result;
	}
	
	module.exports = get;


/***/ }),
/* 260 */
/***/ (function(module, exports, __webpack_require__) {

	var baseHasIn = __webpack_require__(195),
	    hasPath = __webpack_require__(223);
	
	/**
	 * Checks if `path` is a direct or inherited property of `object`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 * @example
	 *
	 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
	 *
	 * _.hasIn(object, 'a');
	 * // => true
	 *
	 * _.hasIn(object, 'a.b');
	 * // => true
	 *
	 * _.hasIn(object, ['a', 'b']);
	 * // => true
	 *
	 * _.hasIn(object, 'b');
	 * // => false
	 */
	function hasIn(object, path) {
	  return object != null && hasPath(object, path, baseHasIn);
	}
	
	module.exports = hasIn;


/***/ }),
/* 261 */
/***/ (function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(8),
	    isArray = __webpack_require__(4),
	    isObjectLike = __webpack_require__(7);
	
	/** `Object#toString` result references. */
	var stringTag = '[object String]';
	
	/**
	 * Checks if `value` is classified as a `String` primitive or object.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
	 * @example
	 *
	 * _.isString('abc');
	 * // => true
	 *
	 * _.isString(1);
	 * // => false
	 */
	function isString(value) {
	  return typeof value == 'string' ||
	    (!isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag);
	}
	
	module.exports = isString;


/***/ }),
/* 262 */
/***/ (function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(46);
	
	/** Error message constants. */
	var FUNC_ERROR_TEXT = 'Expected a function';
	
	/**
	 * Creates a function that memoizes the result of `func`. If `resolver` is
	 * provided, it determines the cache key for storing the result based on the
	 * arguments provided to the memoized function. By default, the first argument
	 * provided to the memoized function is used as the map cache key. The `func`
	 * is invoked with the `this` binding of the memoized function.
	 *
	 * **Note:** The cache is exposed as the `cache` property on the memoized
	 * function. Its creation may be customized by replacing the `_.memoize.Cache`
	 * constructor with one whose instances implement the
	 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
	 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to have its output memoized.
	 * @param {Function} [resolver] The function to resolve the cache key.
	 * @returns {Function} Returns the new memoized function.
	 * @example
	 *
	 * var object = { 'a': 1, 'b': 2 };
	 * var other = { 'c': 3, 'd': 4 };
	 *
	 * var values = _.memoize(_.values);
	 * values(object);
	 * // => [1, 2]
	 *
	 * values(other);
	 * // => [3, 4]
	 *
	 * object.a = 2;
	 * values(object);
	 * // => [1, 2]
	 *
	 * // Modify the result cache.
	 * values.cache.set(object, ['a', 'b']);
	 * values(object);
	 * // => ['a', 'b']
	 *
	 * // Replace `_.memoize.Cache`.
	 * _.memoize.Cache = WeakMap;
	 */
	function memoize(func, resolver) {
	  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  var memoized = function() {
	    var args = arguments,
	        key = resolver ? resolver.apply(this, args) : args[0],
	        cache = memoized.cache;
	
	    if (cache.has(key)) {
	      return cache.get(key);
	    }
	    var result = func.apply(this, args);
	    memoized.cache = cache.set(key, result) || cache;
	    return result;
	  };
	  memoized.cache = new (memoize.Cache || MapCache);
	  return memoized;
	}
	
	// Expose `MapCache`.
	memoize.Cache = MapCache;
	
	module.exports = memoize;


/***/ }),
/* 263 */
/***/ (function(module, exports, __webpack_require__) {

	var baseMerge = __webpack_require__(203),
	    createAssigner = __webpack_require__(213);
	
	/**
	 * This method is like `_.assign` except that it recursively merges own and
	 * inherited enumerable string keyed properties of source objects into the
	 * destination object. Source properties that resolve to `undefined` are
	 * skipped if a destination value exists. Array and plain object properties
	 * are merged recursively. Other objects and value types are overridden by
	 * assignment. Source objects are applied from left to right. Subsequent
	 * sources overwrite property assignments of previous sources.
	 *
	 * **Note:** This method mutates `object`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.5.0
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * var object = {
	 *   'a': [{ 'b': 2 }, { 'd': 4 }]
	 * };
	 *
	 * var other = {
	 *   'a': [{ 'c': 3 }, { 'e': 5 }]
	 * };
	 *
	 * _.merge(object, other);
	 * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
	 */
	var merge = createAssigner(function(object, source, srcIndex) {
	  baseMerge(object, source, srcIndex);
	});
	
	module.exports = merge;


/***/ }),
/* 264 */
/***/ (function(module, exports, __webpack_require__) {

	var baseSet = __webpack_require__(128);
	
	/**
	 * Sets the value at `path` of `object`. If a portion of `path` doesn't exist,
	 * it's created. Arrays are created for missing index properties while objects
	 * are created for all other missing properties. Use `_.setWith` to customize
	 * `path` creation.
	 *
	 * **Note:** This method mutates `object`.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.7.0
	 * @category Object
	 * @param {Object} object The object to modify.
	 * @param {Array|string} path The path of the property to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
	 *
	 * _.set(object, 'a[0].b.c', 4);
	 * console.log(object.a[0].b.c);
	 * // => 4
	 *
	 * _.set(object, ['x', '0', 'y', 'z'], 5);
	 * console.log(object.x[0].y.z);
	 * // => 5
	 */
	function set(object, path, value) {
	  return object == null ? object : baseSet(object, path, value);
	}
	
	module.exports = set;


/***/ }),
/* 265 */
/***/ (function(module, exports) {

	/**
	 * This method returns a new empty array.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {Array} Returns the new empty array.
	 * @example
	 *
	 * var arrays = _.times(2, _.stubArray);
	 *
	 * console.log(arrays);
	 * // => [[], []]
	 *
	 * console.log(arrays[0] === arrays[1]);
	 * // => false
	 */
	function stubArray() {
	  return [];
	}
	
	module.exports = stubArray;


/***/ }),
/* 266 */
/***/ (function(module, exports) {

	/**
	 * This method returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */
	function stubFalse() {
	  return false;
	}
	
	module.exports = stubFalse;


/***/ }),
/* 267 */
/***/ (function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(211),
	    keysIn = __webpack_require__(103);
	
	/**
	 * Converts `value` to a plain object flattening inherited enumerable string
	 * keyed properties of `value` to own properties of the plain object.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {Object} Returns the converted plain object.
	 * @example
	 *
	 * function Foo() {
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.assign({ 'a': 1 }, new Foo);
	 * // => { 'a': 1, 'b': 2 }
	 *
	 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
	 * // => { 'a': 1, 'b': 2, 'c': 3 }
	 */
	function toPlainObject(value) {
	  return copyObject(value, keysIn(value));
	}
	
	module.exports = toPlainObject;


/***/ }),
/* 268 */
/***/ (function(module, exports, __webpack_require__) {

	var baseToString = __webpack_require__(207);
	
	/**
	 * Converts `value` to a string. An empty string is returned for `null`
	 * and `undefined` values. The sign of `-0` is preserved.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 * @example
	 *
	 * _.toString(null);
	 * // => ''
	 *
	 * _.toString(-0);
	 * // => '-0'
	 *
	 * _.toString([1, 2, 3]);
	 * // => '1,2,3'
	 */
	function toString(value) {
	  return value == null ? '' : baseToString(value);
	}
	
	module.exports = toString;


/***/ }),
/* 269 */,
/* 270 */,
/* 271 */,
/* 272 */,
/* 273 */,
/* 274 */,
/* 275 */,
/* 276 */,
/* 277 */,
/* 278 */,
/* 279 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {"use strict";
	
	exports.__esModule = true;
	exports.publicLoader = undefined;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _findPage = __webpack_require__(359);
	
	var _findPage2 = _interopRequireDefault(_findPage);
	
	var _emitter = __webpack_require__(110);
	
	var _emitter2 = _interopRequireDefault(_emitter);
	
	var _stripPrefix = __webpack_require__(280);
	
	var _stripPrefix2 = _interopRequireDefault(_stripPrefix);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var findPage = void 0;
	
	var syncRequires = {};
	var asyncRequires = {};
	var pathScriptsCache = {};
	var resourceStrCache = {};
	var resourceCache = {};
	var pages = [];
	// Note we're not actively using the path data atm. There
	// could be future optimizations however around trying to ensure
	// we load all resources for likely-to-be-visited paths.
	var pathArray = [];
	var pathCount = {};
	var pathPrefix = "";
	var resourcesArray = [];
	var resourcesCount = {};
	var preferDefault = function preferDefault(m) {
	  return m && m.default || m;
	};
	var prefetcher = void 0;
	var inInitialRender = true;
	var fetchHistory = [];
	var failedPaths = {};
	var failedResources = {};
	var MAX_HISTORY = 5;
	
	// Prefetcher logic
	if (true) {
	  prefetcher = __webpack_require__(362)({
	    getNextQueuedResources: function getNextQueuedResources() {
	      return resourcesArray.slice(-1)[0];
	    },
	    createResourceDownload: function createResourceDownload(resourceName) {
	      fetchResource(resourceName, function () {
	        resourcesArray = resourcesArray.filter(function (r) {
	          return r !== resourceName;
	        });
	        prefetcher.onResourcedFinished(resourceName);
	      });
	    }
	  });
	  _emitter2.default.on("onPreLoadPageResources", function (e) {
	    prefetcher.onPreLoadPageResources(e);
	  });
	  _emitter2.default.on("onPostLoadPageResources", function (e) {
	    prefetcher.onPostLoadPageResources(e);
	  });
	}
	
	var sortResourcesByCount = function sortResourcesByCount(a, b) {
	  if (resourcesCount[a] > resourcesCount[b]) {
	    return 1;
	  } else if (resourcesCount[a] < resourcesCount[b]) {
	    return -1;
	  } else {
	    return 0;
	  }
	};
	
	var sortPagesByCount = function sortPagesByCount(a, b) {
	  if (pathCount[a] > pathCount[b]) {
	    return 1;
	  } else if (pathCount[a] < pathCount[b]) {
	    return -1;
	  } else {
	    return 0;
	  }
	};
	
	var fetchResource = function fetchResource(resourceName) {
	  var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
	
	  if (resourceStrCache[resourceName]) {
	    process.nextTick(function () {
	      cb(null, resourceStrCache[resourceName]);
	    });
	  } else {
	    // Find resource
	    var resourceFunction = void 0;
	    if (resourceName.slice(0, 12) === "component---") {
	      resourceFunction = asyncRequires.components[resourceName];
	    } else if (resourceName.slice(0, 9) === "layout---") {
	      resourceFunction = asyncRequires.layouts[resourceName];
	    } else {
	      resourceFunction = asyncRequires.json[resourceName];
	    }
	
	    // Download the resource
	    resourceFunction(function (err, executeChunk) {
	      resourceStrCache[resourceName] = executeChunk;
	      fetchHistory.push({
	        resource: resourceName,
	        succeeded: !err
	      });
	
	      if (!failedResources[resourceName]) {
	        failedResources[resourceName] = err;
	      }
	
	      fetchHistory = fetchHistory.slice(-MAX_HISTORY);
	      cb(err, executeChunk);
	    });
	  }
	};
	
	var getResourceModule = function getResourceModule(resourceName, cb) {
	  if (resourceCache[resourceName]) {
	    process.nextTick(function () {
	      cb(null, resourceCache[resourceName]);
	    });
	  } else if (failedResources[resourceName]) {
	    process.nextTick(function () {
	      cb(failedResources[resourceName]);
	    });
	  } else {
	    fetchResource(resourceName, function (err, executeChunk) {
	      if (err) {
	        cb(err);
	      } else {
	        var module = preferDefault(executeChunk());
	        resourceCache[resourceName] = module;
	        cb(err, module);
	      }
	    });
	  }
	};
	
	var appearsOnLine = function appearsOnLine() {
	  var isOnLine = navigator.onLine;
	  if (typeof isOnLine === "boolean") {
	    return isOnLine;
	  }
	
	  // If no navigator.onLine support assume onLine if any of last N fetches succeeded
	  var succeededFetch = fetchHistory.find(function (entry) {
	    return entry.succeeded;
	  });
	  return !!succeededFetch;
	};
	
	var handleResourceLoadError = function handleResourceLoadError(path, message) {
	  console.log(message);
	
	  if (!failedPaths[path]) {
	    failedPaths[path] = message;
	  }
	
	  if (appearsOnLine() && window.location.pathname.replace(/\/$/g, "") !== path.replace(/\/$/g, "")) {
	    window.location.pathname = path;
	  }
	};
	
	var mountOrder = 1;
	var queue = {
	  empty: function empty() {
	    pathArray = [];
	    pathCount = {};
	    resourcesCount = {};
	    resourcesArray = [];
	    pages = [];
	    pathPrefix = "";
	  },
	  addPagesArray: function addPagesArray(newPages) {
	    pages = newPages;
	    if (true) {
	      if (false) pathPrefix = __PATH_PREFIX__;
	    }
	    findPage = (0, _findPage2.default)(newPages, pathPrefix);
	  },
	  addDevRequires: function addDevRequires(devRequires) {
	    syncRequires = devRequires;
	  },
	  addProdRequires: function addProdRequires(prodRequires) {
	    asyncRequires = prodRequires;
	  },
	  dequeue: function dequeue() {
	    return pathArray.pop();
	  },
	  enqueue: function enqueue(rawPath) {
	    // Check page exists.
	    var path = (0, _stripPrefix2.default)(rawPath, pathPrefix);
	    if (!pages.some(function (p) {
	      return p.path === path;
	    })) {
	      return false;
	    }
	
	    var mountOrderBoost = 1 / mountOrder;
	    mountOrder += 1;
	    // console.log(
	    // `enqueue "${path}", mountOrder: "${mountOrder}, mountOrderBoost: ${mountOrderBoost}`
	    // )
	
	    // Add to path counts.
	    if (!pathCount[path]) {
	      pathCount[path] = 1;
	    } else {
	      pathCount[path] += 1;
	    }
	
	    // Add path to queue.
	    if (!queue.has(path)) {
	      pathArray.unshift(path);
	    }
	
	    // Sort pages by pathCount
	    pathArray.sort(sortPagesByCount);
	
	    // Add resources to queue.
	    var page = findPage(path);
	    if (page.jsonName) {
	      if (!resourcesCount[page.jsonName]) {
	        resourcesCount[page.jsonName] = 1 + mountOrderBoost;
	      } else {
	        resourcesCount[page.jsonName] += 1 + mountOrderBoost;
	      }
	
	      // Before adding, checking that the JSON resource isn't either
	      // already queued or been downloading.
	      if (resourcesArray.indexOf(page.jsonName) === -1 && !resourceStrCache[page.jsonName]) {
	        resourcesArray.unshift(page.jsonName);
	      }
	    }
	    if (page.componentChunkName) {
	      if (!resourcesCount[page.componentChunkName]) {
	        resourcesCount[page.componentChunkName] = 1 + mountOrderBoost;
	      } else {
	        resourcesCount[page.componentChunkName] += 1 + mountOrderBoost;
	      }
	
	      // Before adding, checking that the component resource isn't either
	      // already queued or been downloading.
	      if (resourcesArray.indexOf(page.componentChunkName) === -1 && !resourceStrCache[page.jsonName]) {
	        resourcesArray.unshift(page.componentChunkName);
	      }
	    }
	
	    // Sort resources by resourcesCount.
	    resourcesArray.sort(sortResourcesByCount);
	    if (true) {
	      prefetcher.onNewResourcesAdded();
	    }
	
	    return true;
	  },
	  getResources: function getResources() {
	    return {
	      resourcesArray: resourcesArray,
	      resourcesCount: resourcesCount
	    };
	  },
	  getPages: function getPages() {
	    return {
	      pathArray: pathArray,
	      pathCount: pathCount
	    };
	  },
	  getPage: function getPage(pathname) {
	    return findPage(pathname);
	  },
	  has: function has(path) {
	    return pathArray.some(function (p) {
	      return p === path;
	    });
	  },
	  getResourcesForPathname: function getResourcesForPathname(path) {
	    var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
	
	    if (inInitialRender && navigator && navigator.serviceWorker && navigator.serviceWorker.controller && navigator.serviceWorker.controller.state === "activated") {
	      // If we're loading from a service worker (it's already activated on
	      // this initial render) and we can't find a page, there's a good chance
	      // we're on a new page that this (now old) service worker doesn't know
	      // about so we'll unregister it and reload.
	      if (!findPage(path)) {
	        navigator.serviceWorker.getRegistrations().then(function (registrations) {
	          // We would probably need this to
	          // prevent unnecessary reloading of the page
	          // while unregistering of ServiceWorker is not happening
	          if (registrations.length) {
	            for (var _iterator = registrations, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	              var _ref;
	
	              if (_isArray) {
	                if (_i >= _iterator.length) break;
	                _ref = _iterator[_i++];
	              } else {
	                _i = _iterator.next();
	                if (_i.done) break;
	                _ref = _i.value;
	              }
	
	              var registration = _ref;
	
	              registration.unregister();
	            }
	            window.location.reload();
	          }
	        });
	      }
	    }
	    inInitialRender = false;
	    // In development we know the code is loaded already
	    // so we just return with it immediately.
	    if (false) {
	      var page = findPage(path);
	      if (!page) return cb();
	      var pageResources = {
	        component: syncRequires.components[page.componentChunkName],
	        json: syncRequires.json[page.jsonName],
	        layout: syncRequires.layouts[page.layout],
	        page: page
	      };
	      cb(pageResources);
	      return pageResources;
	      // Production code path
	    } else {
	      if (failedPaths[path]) {
	        handleResourceLoadError(path, "Previously detected load failure for \"" + path + "\"");
	
	        return cb();
	      }
	
	      var _page = findPage(path);
	
	      if (!_page) {
	        handleResourceLoadError(path, "A page wasn't found for \"" + path + "\"");
	
	        return cb();
	      }
	
	      // Use the path from the page so the pathScriptsCache uses
	      // the normalized path.
	      path = _page.path;
	
	      // Check if it's in the cache already.
	      if (pathScriptsCache[path]) {
	        process.nextTick(function () {
	          cb(pathScriptsCache[path]);
	          _emitter2.default.emit("onPostLoadPageResources", {
	            page: _page,
	            pageResources: pathScriptsCache[path]
	          });
	        });
	        return pathScriptsCache[path];
	      }
	
	      _emitter2.default.emit("onPreLoadPageResources", { path: path });
	      // Nope, we need to load resource(s)
	      var component = void 0;
	      var json = void 0;
	      var layout = void 0;
	      // Load the component/json/layout and parallel and call this
	      // function when they're done loading. When both are loaded,
	      // we move on.
	      var done = function done() {
	        if (component && json && (!_page.layoutComponentChunkName || layout)) {
	          pathScriptsCache[path] = { component: component, json: json, layout: layout, page: _page };
	          var _pageResources = { component: component, json: json, layout: layout, page: _page };
	          cb(_pageResources);
	          _emitter2.default.emit("onPostLoadPageResources", {
	            page: _page,
	            pageResources: _pageResources
	          });
	        }
	      };
	      getResourceModule(_page.componentChunkName, function (err, c) {
	        if (err) {
	          handleResourceLoadError(_page.path, "Loading the component for " + _page.path + " failed");
	        }
	        component = c;
	        done();
	      });
	      getResourceModule(_page.jsonName, function (err, j) {
	        if (err) {
	          handleResourceLoadError(_page.path, "Loading the JSON for " + _page.path + " failed");
	        }
	        json = j;
	        done();
	      });
	
	      _page.layoutComponentChunkName && getResourceModule(_page.layout, function (err, l) {
	        if (err) {
	          handleResourceLoadError(_page.path, "Loading the Layout for " + _page.path + " failed");
	        }
	        layout = l;
	        done();
	      });
	
	      return undefined;
	    }
	  },
	  peek: function peek(path) {
	    return pathArray.slice(-1)[0];
	  },
	  length: function length() {
	    return pathArray.length;
	  },
	  indexOf: function indexOf(path) {
	    return pathArray.length - pathArray.indexOf(path) - 1;
	  }
	};
	
	var publicLoader = exports.publicLoader = {
	  getResourcesForPathname: queue.getResourcesForPathname
	};
	
	exports.default = queue;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(35)))

/***/ }),
/* 280 */
/***/ (function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	
	/**
	 * Remove a prefix from a string. Return the input string if the given prefix
	 * isn't found.
	 */
	
	exports.default = function (str) {
	  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
	
	  if (str.substr(0, prefix.length) === prefix) return str.slice(prefix.length);
	  return str;
	};
	
	module.exports = exports["default"];

/***/ }),
/* 281 */,
/* 282 */,
/* 283 */,
/* 284 */,
/* 285 */,
/* 286 */,
/* 287 */,
/* 288 */,
/* 289 */,
/* 290 */,
/* 291 */,
/* 292 */,
/* 293 */,
/* 294 */,
/* 295 */,
/* 296 */,
/* 297 */,
/* 298 */,
/* 299 */,
/* 300 */,
/* 301 */,
/* 302 */,
/* 303 */,
/* 304 */,
/* 305 */,
/* 306 */,
/* 307 */,
/* 308 */,
/* 309 */,
/* 310 */,
/* 311 */,
/* 312 */,
/* 313 */,
/* 314 */,
/* 315 */,
/* 316 */,
/* 317 */,
/* 318 */,
/* 319 */,
/* 320 */,
/* 321 */,
/* 322 */
/***/ (function(module, exports, __webpack_require__) {

	var baseForOwn = __webpack_require__(589),
	    createBaseEach = __webpack_require__(603);
	
	/**
	 * The base implementation of `_.forEach` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array|Object} Returns `collection`.
	 */
	var baseEach = createBaseEach(baseForOwn);
	
	module.exports = baseEach;


/***/ }),
/* 323 */,
/* 324 */,
/* 325 */,
/* 326 */,
/* 327 */,
/* 328 */,
/* 329 */
/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(6);
	
	/**
	 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` if suitable for strict
	 *  equality comparisons, else `false`.
	 */
	function isStrictComparable(value) {
	  return value === value && !isObject(value);
	}
	
	module.exports = isStrictComparable;


/***/ }),
/* 330 */
/***/ (function(module, exports) {

	/**
	 * A specialized version of `matchesProperty` for source values suitable
	 * for strict equality comparisons, i.e. `===`.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @param {*} srcValue The value to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function matchesStrictComparable(key, srcValue) {
	  return function(object) {
	    if (object == null) {
	      return false;
	    }
	    return object[key] === srcValue &&
	      (srcValue !== undefined || (key in Object(object)));
	  };
	}
	
	module.exports = matchesStrictComparable;


/***/ }),
/* 331 */,
/* 332 */,
/* 333 */,
/* 334 */,
/* 335 */
/***/ (function(module, exports, __webpack_require__) {

	var arrayEach = __webpack_require__(191),
	    baseEach = __webpack_require__(322),
	    castFunction = __webpack_require__(601),
	    isArray = __webpack_require__(4);
	
	/**
	 * Iterates over elements of `collection` and invokes `iteratee` for each element.
	 * The iteratee is invoked with three arguments: (value, index|key, collection).
	 * Iteratee functions may exit iteration early by explicitly returning `false`.
	 *
	 * **Note:** As with other "Collections" methods, objects with a "length"
	 * property are iterated like arrays. To avoid this behavior use `_.forIn`
	 * or `_.forOwn` for object iteration.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @alias each
	 * @category Collection
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	 * @returns {Array|Object} Returns `collection`.
	 * @see _.forEachRight
	 * @example
	 *
	 * _.forEach([1, 2], function(value) {
	 *   console.log(value);
	 * });
	 * // => Logs `1` then `2`.
	 *
	 * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
	 *   console.log(key);
	 * });
	 * // => Logs 'a' then 'b' (iteration order is not guaranteed).
	 */
	function forEach(collection, iteratee) {
	  var func = isArray(collection) ? arrayEach : baseEach;
	  return func(collection, castFunction(iteratee));
	}
	
	module.exports = forEach;


/***/ }),
/* 336 */,
/* 337 */
/***/ (function(module, exports, __webpack_require__) {

	var arrayReduce = __webpack_require__(585),
	    baseEach = __webpack_require__(322),
	    baseIteratee = __webpack_require__(593),
	    baseReduce = __webpack_require__(600),
	    isArray = __webpack_require__(4);
	
	/**
	 * Reduces `collection` to a value which is the accumulated result of running
	 * each element in `collection` thru `iteratee`, where each successive
	 * invocation is supplied the return value of the previous. If `accumulator`
	 * is not given, the first element of `collection` is used as the initial
	 * value. The iteratee is invoked with four arguments:
	 * (accumulator, value, index|key, collection).
	 *
	 * Many lodash methods are guarded to work as iteratees for methods like
	 * `_.reduce`, `_.reduceRight`, and `_.transform`.
	 *
	 * The guarded methods are:
	 * `assign`, `defaults`, `defaultsDeep`, `includes`, `merge`, `orderBy`,
	 * and `sortBy`
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Collection
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	 * @param {*} [accumulator] The initial value.
	 * @returns {*} Returns the accumulated value.
	 * @see _.reduceRight
	 * @example
	 *
	 * _.reduce([1, 2], function(sum, n) {
	 *   return sum + n;
	 * }, 0);
	 * // => 3
	 *
	 * _.reduce({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
	 *   (result[value] || (result[value] = [])).push(key);
	 *   return result;
	 * }, {});
	 * // => { '1': ['a', 'c'], '2': ['b'] } (iteration order is not guaranteed)
	 */
	function reduce(collection, iteratee, accumulator) {
	  var func = isArray(collection) ? arrayReduce : baseReduce,
	      initAccum = arguments.length < 3;
	
	  return func(collection, baseIteratee(iteratee, 4), accumulator, initAccum, baseEach);
	}
	
	module.exports = reduce;


/***/ }),
/* 338 */
/***/ (function(module, exports) {

	module.exports = function parseUnit(str, out) {
	    if (!out)
	        out = [ 0, '' ]
	
	    str = String(str)
	    var num = parseFloat(str, 10)
	    out[0] = num
	    out[1] = str.match(/[\d.\-\+]*\s*(.*)/)[1] || ''
	    return out
	}

/***/ }),
/* 339 */,
/* 340 */,
/* 341 */,
/* 342 */,
/* 343 */,
/* 344 */,
/* 345 */,
/* 346 */,
/* 347 */,
/* 348 */,
/* 349 */,
/* 350 */,
/* 351 */,
/* 352 */,
/* 353 */,
/* 354 */,
/* 355 */,
/* 356 */,
/* 357 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	// prefer default export if available
	var preferDefault = function preferDefault(m) {
	  return m && m.default || m;
	};
	
	exports.components = {
	  "component---node-modules-gatsby-plugin-offline-app-shell-js": __webpack_require__(505),
	  "component---src-templates-project-jsx": __webpack_require__(515),
	  "component---src-pages-404-jsx": __webpack_require__(507),
	  "component---src-pages-bubble-jsx": __webpack_require__(508),
	  "component---src-pages-contact-jsx": __webpack_require__(509),
	  "component---src-pages-index-jsx": __webpack_require__(510),
	  "component---src-pages-o-que-e-a-bolha-jsx": __webpack_require__(511),
	  "component---src-pages-results-jsx": __webpack_require__(512),
	  "component---src-pages-share-jsx": __webpack_require__(513),
	  "component---src-pages-time-jsx": __webpack_require__(514)
	};
	
	exports.json = {
	  "layout-index.json": __webpack_require__(516),
	  "offline-plugin-app-shell-fallback.json": __webpack_require__(526),
	  "smart-triangle-make-triangles-smart.json": __webpack_require__(529),
	  "blob-sphere-make-spheres-blob.json": __webpack_require__(519),
	  "leko-arts-your-theme-creator.json": __webpack_require__(524),
	  "cube-round-make-cubes-round.json": __webpack_require__(522),
	  "404.json": __webpack_require__(517),
	  "bubble.json": __webpack_require__(520),
	  "contact.json": __webpack_require__(521),
	  "index.json": __webpack_require__(523),
	  "o-que-e-a-bolha.json": __webpack_require__(525),
	  "results.json": __webpack_require__(527),
	  "share.json": __webpack_require__(528),
	  "time.json": __webpack_require__(530),
	  "404-html.json": __webpack_require__(518)
	};
	
	exports.layouts = {
	  "layout---index": __webpack_require__(506)
	};

/***/ }),
/* 358 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _propTypes = __webpack_require__(2);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _loader = __webpack_require__(279);
	
	var _loader2 = _interopRequireDefault(_loader);
	
	var _emitter = __webpack_require__(110);
	
	var _emitter2 = _interopRequireDefault(_emitter);
	
	var _apiRunnerBrowser = __webpack_require__(140);
	
	var _shallowCompare = __webpack_require__(691);
	
	var _shallowCompare2 = _interopRequireDefault(_shallowCompare);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var DefaultLayout = function DefaultLayout(_ref) {
	  var children = _ref.children;
	  return _react2.default.createElement(
	    "div",
	    null,
	    children()
	  );
	};
	
	// Pass pathname in as prop.
	// component will try fetching resources. If they exist,
	// will just render, else will render null.
	
	var ComponentRenderer = function (_React$Component) {
	  _inherits(ComponentRenderer, _React$Component);
	
	  function ComponentRenderer(props) {
	    _classCallCheck(this, ComponentRenderer);
	
	    var _this = _possibleConstructorReturn(this, _React$Component.call(this));
	
	    var location = props.location;
	
	    // Set the pathname for 404 pages.
	    if (!_loader2.default.getPage(location.pathname)) {
	      location = _extends({}, location, {
	        pathname: "/404.html"
	      });
	    }
	
	    _this.state = {
	      location: location,
	      pageResources: _loader2.default.getResourcesForPathname(location.pathname)
	    };
	    return _this;
	  }
	
	  ComponentRenderer.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	    var _this2 = this;
	
	    // During development, always pass a component's JSON through so graphql
	    // updates go through.
	    if (false) {
	      if (nextProps && nextProps.pageResources && nextProps.pageResources.json) {
	        this.setState({ pageResources: nextProps.pageResources });
	      }
	    }
	    if (this.state.location.pathname !== nextProps.location.pathname) {
	      var pageResources = _loader2.default.getResourcesForPathname(nextProps.location.pathname);
	      if (!pageResources) {
	        var location = nextProps.location;
	
	        // Set the pathname for 404 pages.
	        if (!_loader2.default.getPage(location.pathname)) {
	          location = _extends({}, location, {
	            pathname: "/404.html"
	          });
	        }
	
	        // Page resources won't be set in cases where the browser back button
	        // or forward button is pushed as we can't wait as normal for resources
	        // to load before changing the page.
	        _loader2.default.getResourcesForPathname(location.pathname, function (pageResources) {
	          _this2.setState({
	            location: location,
	            pageResources: pageResources
	          });
	        });
	      } else {
	        this.setState({
	          location: nextProps.location,
	          pageResources: pageResources
	        });
	      }
	    }
	  };
	
	  ComponentRenderer.prototype.componentDidMount = function componentDidMount() {
	    var _this3 = this;
	
	    // Listen to events so when our page gets updated, we can transition.
	    // This is only useful on delayed transitions as the page will get rendered
	    // without the necessary page resources and then re-render once those come in.
	    _emitter2.default.on("onPostLoadPageResources", function (e) {
	      if (_loader2.default.getPage(_this3.state.location.pathname) && e.page.path === _loader2.default.getPage(_this3.state.location.pathname).path) {
	        _this3.setState({ pageResources: e.pageResources });
	      }
	    });
	  };
	
	  ComponentRenderer.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
	    // 404
	    if (!nextState.pageResources) {
	      return true;
	    }
	    // Check if the component or json have changed.
	    if (!this.state.pageResources && nextState.pageResources) {
	      return true;
	    }
	    if (this.state.pageResources.component !== nextState.pageResources.component) {
	      return true;
	    }
	
	    if (this.state.pageResources.json !== nextState.pageResources.json) {
	      return true;
	    }
	
	    // Check if location has changed on a page using internal routing
	    // via matchPath configuration.
	    if (this.state.location.key !== nextState.location.key && nextState.pageResources.page && (nextState.pageResources.page.matchPath || nextState.pageResources.page.path)) {
	      return true;
	    }
	
	    return (0, _shallowCompare2.default)(this, nextProps, nextState);
	  };
	
	  ComponentRenderer.prototype.render = function render() {
	    var pluginResponses = (0, _apiRunnerBrowser.apiRunner)("replaceComponentRenderer", {
	      props: _extends({}, this.props, { pageResources: this.state.pageResources }),
	      loader: _loader.publicLoader
	    });
	    var replacementComponent = pluginResponses[0];
	    // If page.
	    if (this.props.page) {
	      if (this.state.pageResources) {
	        return replacementComponent || (0, _react.createElement)(this.state.pageResources.component, _extends({
	          key: this.props.location.pathname
	        }, this.props, this.state.pageResources.json));
	      } else {
	        return null;
	      }
	      // If layout.
	    } else if (this.props.layout) {
	      return replacementComponent || (0, _react.createElement)(this.state.pageResources && this.state.pageResources.layout ? this.state.pageResources.layout : DefaultLayout, _extends({
	        key: this.state.pageResources && this.state.pageResources.layout ? this.state.pageResources.layout : "DefaultLayout"
	      }, this.props));
	    } else {
	      return null;
	    }
	  };
	
	  return ComponentRenderer;
	}(_react2.default.Component);
	
	ComponentRenderer.propTypes = {
	  page: _propTypes2.default.bool,
	  layout: _propTypes2.default.bool,
	  location: _propTypes2.default.object
	};
	
	exports.default = ComponentRenderer;
	module.exports = exports["default"];

/***/ }),
/* 359 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _reactRouterDom = __webpack_require__(120);
	
	var _stripPrefix = __webpack_require__(280);
	
	var _stripPrefix2 = _interopRequireDefault(_stripPrefix);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// TODO add tests especially for handling prefixed links.
	var pageCache = {};
	
	module.exports = function (pages) {
	  var pathPrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
	  return function (rawPathname) {
	    var pathname = decodeURIComponent(rawPathname);
	
	    // Remove the pathPrefix from the pathname.
	    var trimmedPathname = (0, _stripPrefix2.default)(pathname, pathPrefix);
	
	    // Remove any hashfragment
	    if (trimmedPathname.split("#").length > 1) {
	      trimmedPathname = trimmedPathname.split("#").slice(0, -1).join("");
	    }
	
	    // Remove search query
	    if (trimmedPathname.split("?").length > 1) {
	      trimmedPathname = trimmedPathname.split("?").slice(0, -1).join("");
	    }
	
	    if (pageCache[trimmedPathname]) {
	      return pageCache[trimmedPathname];
	    }
	
	    var foundPage = void 0;
	    // Array.prototype.find is not supported in IE so we use this somewhat odd
	    // work around.
	    pages.some(function (page) {
	      if (page.matchPath) {
	        // Try both the path and matchPath
	        if ((0, _reactRouterDom.matchPath)(trimmedPathname, { path: page.path }) || (0, _reactRouterDom.matchPath)(trimmedPathname, {
	          path: page.matchPath
	        })) {
	          foundPage = page;
	          pageCache[trimmedPathname] = page;
	          return true;
	        }
	      } else {
	        if ((0, _reactRouterDom.matchPath)(trimmedPathname, {
	          path: page.path,
	          exact: true
	        })) {
	          foundPage = page;
	          pageCache[trimmedPathname] = page;
	          return true;
	        }
	
	        // Finally, try and match request with default document.
	        if ((0, _reactRouterDom.matchPath)(trimmedPathname, {
	          path: page.path + "index.html"
	        })) {
	          foundPage = page;
	          pageCache[trimmedPathname] = page;
	          return true;
	        }
	      }
	
	      return false;
	    });
	
	    return foundPage;
	  };
	};

/***/ }),
/* 360 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createBrowserHistory = __webpack_require__(182);
	
	var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);
	
	var _apiRunnerBrowser = __webpack_require__(140);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var pluginResponses = (0, _apiRunnerBrowser.apiRunner)("replaceHistory");
	var replacementHistory = pluginResponses[0];
	var history = replacementHistory || (0, _createBrowserHistory2.default)();
	module.exports = history;

/***/ }),
/* 361 */,
/* 362 */
/***/ (function(module, exports) {

	"use strict";
	
	module.exports = function (_ref) {
	  var getNextQueuedResources = _ref.getNextQueuedResources,
	      createResourceDownload = _ref.createResourceDownload;
	
	  var pagesLoading = [];
	  var resourcesDownloading = [];
	
	  // Do things
	  var startResourceDownloading = function startResourceDownloading() {
	    var nextResource = getNextQueuedResources();
	    if (nextResource) {
	      resourcesDownloading.push(nextResource);
	      createResourceDownload(nextResource);
	    }
	  };
	
	  var reducer = function reducer(action) {
	    switch (action.type) {
	      case "RESOURCE_FINISHED":
	        resourcesDownloading = resourcesDownloading.filter(function (r) {
	          return r !== action.payload;
	        });
	        break;
	      case "ON_PRE_LOAD_PAGE_RESOURCES":
	        pagesLoading.push(action.payload.path);
	        break;
	      case "ON_POST_LOAD_PAGE_RESOURCES":
	        pagesLoading = pagesLoading.filter(function (p) {
	          return p !== action.payload.page.path;
	        });
	        break;
	      case "ON_NEW_RESOURCES_ADDED":
	        break;
	    }
	
	    // Take actions.
	    // Wait for event loop queue to finish.
	    setTimeout(function () {
	      if (resourcesDownloading.length === 0 && pagesLoading.length === 0) {
	        // Start another resource downloading.
	        startResourceDownloading();
	      }
	    }, 0);
	  };
	
	  return {
	    onResourcedFinished: function onResourcedFinished(event) {
	      // Tell prefetcher that the resource finished downloading
	      // so it can grab the next one.
	      reducer({ type: "RESOURCE_FINISHED", payload: event });
	    },
	    onPreLoadPageResources: function onPreLoadPageResources(event) {
	      // Tell prefetcher a page load has started so it should stop
	      // loading anything new
	      reducer({ type: "ON_PRE_LOAD_PAGE_RESOURCES", payload: event });
	    },
	    onPostLoadPageResources: function onPostLoadPageResources(event) {
	      // Tell prefetcher a page load has finished so it should start
	      // loading resources again.
	      reducer({ type: "ON_POST_LOAD_PAGE_RESOURCES", payload: event });
	    },
	    onNewResourcesAdded: function onNewResourcesAdded() {
	      // Tell prefetcher that more resources to be downloaded have
	      // been added.
	      reducer({ type: "ON_NEW_RESOURCES_ADDED" });
	    },
	    getState: function getState() {
	      return { pagesLoading: pagesLoading, resourcesDownloading: resourcesDownloading };
	    },
	    empty: function empty() {
	      pagesLoading = [];
	      resourcesDownloading = [];
	    }
	  };
	};

/***/ }),
/* 363 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _emitter = __webpack_require__(110);
	
	var _emitter2 = _interopRequireDefault(_emitter);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var pathPrefix = "/";
	if (false) {
	  pathPrefix = __PATH_PREFIX__ + "/";
	}
	
	if ("serviceWorker" in navigator) {
	  navigator.serviceWorker.register(pathPrefix + "sw.js").then(function (reg) {
	    reg.addEventListener("updatefound", function () {
	      // The updatefound event implies that reg.installing is set; see
	      // https://w3c.github.io/ServiceWorker/#service-worker-registration-updatefound-event
	      var installingWorker = reg.installing;
	      console.log("installingWorker", installingWorker);
	      installingWorker.addEventListener("statechange", function () {
	        switch (installingWorker.state) {
	          case "installed":
	            if (navigator.serviceWorker.controller) {
	              // At this point, the old content will have been purged and the fresh content will
	              // have been added to the cache.
	              // We reload immediately so the user sees the new content.
	              // This could/should be made configurable in the future.
	              window.location.reload();
	            } else {
	              // At this point, everything has been precached.
	              // It's the perfect time to display a "Content is cached for offline use." message.
	              console.log("Content is now available offline!");
	              _emitter2.default.emit("sw:installed");
	            }
	            break;
	
	          case "redundant":
	            console.error("The installing service worker became redundant.");
	            break;
	        }
	      });
	    });
	  }).catch(function (e) {
	    console.error("Error during service worker registration:", e);
	  });
	}

/***/ }),
/* 364 */,
/* 365 */,
/* 366 */,
/* 367 */,
/* 368 */,
/* 369 */,
/* 370 */,
/* 371 */,
/* 372 */,
/* 373 */,
/* 374 */,
/* 375 */,
/* 376 */,
/* 377 */,
/* 378 */,
/* 379 */,
/* 380 */,
/* 381 */,
/* 382 */,
/* 383 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _typography = __webpack_require__(694);
	
	var _typography2 = _interopRequireDefault(_typography);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var config = __webpack_require__(10);
	
	var typography = new _typography2.default({
	  title: 'Emma',
	  baseFontSize: config.baseFontSize,
	  baseLineHeight: 1.5,
	  headerFontFamily: [config.headerFontFamily, 'sans-serif'],
	  bodyFontFamily: [config.bodyFontFamily, 'sans-serif'],
	  scaleRatio: 2.5,
	  headerWeight: 700,
	  googleFonts: [{
	    name: config.headerFontFamily,
	    styles: ['700']
	  }, {
	    name: config.bodyFontFamily,
	    styles: ['400']
	  }]
	});
	
	exports.default = typography;
	module.exports = exports['default'];

/***/ }),
/* 384 */,
/* 385 */,
/* 386 */,
/* 387 */,
/* 388 */,
/* 389 */,
/* 390 */,
/* 391 */,
/* 392 */,
/* 393 */
/***/ (function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.9.0
	var adjustFontSizeTo, convertLength, defaults, establishBaseline, linesForFontSize, objectAssign, parseUnit, rhythm, unit, unitLess;
	
	objectAssign = __webpack_require__(104);
	
	convertLength = __webpack_require__(395);
	
	parseUnit = __webpack_require__(338);
	
	unit = function(length) {
	  return parseUnit(length)[1];
	};
	
	unitLess = function(length) {
	  return parseUnit(length)[0];
	};
	
	defaults = {
	  baseFontSize: '16px',
	  baseLineHeight: 1.5,
	  rhythmUnit: 'rem',
	  defaultRhythmBorderWidth: '1px',
	  defaultRhythmBorderStyle: 'solid',
	  roundToNearestHalfLine: true,
	  minLinePadding: '2px'
	};
	
	linesForFontSize = function(fontSize, options) {
	  var convert, fontSizeInPx, lineHeightInPx, lines, minLinePadding;
	  convert = convertLength(options.baseFontSize);
	  fontSizeInPx = unitLess(convert(fontSize, 'px'));
	  lineHeightInPx = unitLess(options.baseLineHeightInPx);
	  minLinePadding = unitLess(convert(options.minLinePadding, 'px'));
	  if (options.roundToNearestHalfLine) {
	    lines = Math.ceil(2 * fontSizeInPx / lineHeightInPx) / 2;
	  } else {
	    lines = Math.ceil(fontSizeInPx / lineHeightInPx);
	  }
	  if ((lines * lineHeightInPx - fontSizeInPx) < (minLinePadding * 2)) {
	    if (options.roundToNearestHalfLine) {
	      lines += 0.5;
	    } else {
	      lines += 1;
	    }
	  }
	  return lines;
	};
	
	rhythm = function(options) {
	  var convert;
	  convert = convertLength(options.baseFontSize);
	  return function(lines, fontSize, offset) {
	    var length, rhythmLength;
	    if (lines == null) {
	      lines = 1;
	    }
	    if (fontSize == null) {
	      fontSize = options.baseFontSize;
	    }
	    if (offset == null) {
	      offset = 0;
	    }
	    length = ((lines * unitLess(options.baseLineHeightInPx)) - offset) + "px";
	    rhythmLength = convert(length, options.rhythmUnit, fontSize);
	    if (unit(rhythmLength) === "px") {
	      rhythmLength = Math.floor(unitLess(rhythmLength)) + unit(rhythmLength);
	    }
	    return parseFloat(unitLess(rhythmLength).toFixed(5)) + unit(rhythmLength);
	  };
	};
	
	establishBaseline = function(options) {
	  var convert;
	  convert = convertLength(options.baseFontSize);
	  return {
	    fontSize: (unitLess(options.baseFontSize) / 16) * 100 + "%",
	    lineHeight: options.baseLineHeight.toString()
	  };
	};
	
	adjustFontSizeTo = function(toSize, lines, fromSize, options) {
	  var convert, r;
	  if (fromSize == null) {
	    fromSize = options.baseFontSize;
	  }
	  if (unit(toSize) === "%") {
	    toSize = unitLess(options.baseFontSize) * (unitLess(toSize) / 100) + "px";
	  }
	  convert = convertLength(options.baseFontSize);
	  fromSize = convert(fromSize, 'px');
	  toSize = convert(toSize, 'px', fromSize);
	  r = rhythm(options);
	  if (lines === "auto") {
	    lines = linesForFontSize(toSize, options);
	  }
	  return {
	    fontSize: convert(toSize, options.rhythmUnit, fromSize),
	    lineHeight: r(lines, fromSize)
	  };
	};
	
	module.exports = function(options) {
	  var convert, defaultsCopy, fontSizeInPx, lineHeight;
	  defaultsCopy = JSON.parse(JSON.stringify(defaults));
	  options = objectAssign(defaultsCopy, options);
	  convert = convertLength(options.baseFontSize);
	  if (unit(options.baseLineHeight)) {
	    fontSizeInPx = unitLess(convert(options.baseFontSize, 'px'));
	    lineHeight = convert(options.baseLineHeight, 'px');
	    options.baseLineHeightInPx = lineHeight;
	    options.baseLineHeight = unitLess(lineHeight) / fontSizeInPx;
	  } else {
	    options.baseLineHeightInPx = (unitLess(options.baseFontSize) * options.baseLineHeight) + "px";
	  }
	  return {
	    rhythm: rhythm(options),
	    establishBaseline: function() {
	      return establishBaseline(options);
	    },
	    linesForFontSize: function(fontSize) {
	      return linesForFontSize(fontSize, options);
	    },
	    adjustFontSizeTo: function(toSize, lines, fromSize) {
	      if (lines == null) {
	        lines = "auto";
	      }
	      return adjustFontSizeTo(toSize, lines, fromSize, options);
	    }
	  };
	};


/***/ }),
/* 394 */
/***/ (function(module, exports) {

	// Console-polyfill. MIT license.
	// https://github.com/paulmillr/console-polyfill
	// Make it safe to do console.log() always.
	(function(con) {
	  'use strict';
	  var prop, method;
	  var empty = {};
	  var dummy = function() {};
	  var properties = 'memory'.split(',');
	  var methods = ('assert,clear,count,debug,dir,dirxml,error,exception,group,' +
	     'groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd,' +
	     'show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn').split(',');
	  while (prop = properties.pop()) con[prop] = con[prop] || empty;
	  while (method = methods.pop()) con[method] = con[method] || dummy;
	})(this.console = this.console || {}); // Using `this` for web workers.


/***/ }),
/* 395 */
/***/ (function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.9.0
	var baseFontSize, parseUnit, unit, unitLess;
	
	parseUnit = __webpack_require__(338);
	
	__webpack_require__(394);
	
	baseFontSize = "16px";
	
	unit = function(length) {
	  return parseUnit(length)[1];
	};
	
	unitLess = function(length) {
	  return parseUnit(length)[0];
	};
	
	module.exports = function(baseFontSize) {
	  if (baseFontSize == null) {
	    baseFontSize = baseFontSize;
	  }
	  return function(length, toUnit, fromContext, toContext) {
	    var fromUnit, outputLength, pxLength;
	    if (fromContext == null) {
	      fromContext = baseFontSize;
	    }
	    if (toContext == null) {
	      toContext = fromContext;
	    }
	    fromUnit = unit(length);
	    if (fromUnit === toUnit) {
	      return length;
	    }
	    pxLength = unitLess(length);
	    if (unit(fromContext) !== "px") {
	      console.warn("Parameter fromContext must resolve to a value in pixel units.");
	    }
	    if (unit(toContext) !== "px") {
	      console.warn("Parameter toContext must resolve to a value in pixel units.");
	    }
	    if (fromUnit !== "px") {
	      if (fromUnit === "em") {
	        pxLength = unitLess(length) * unitLess(fromContext);
	      } else if (fromUnit === "rem") {
	        pxLength = unitLess(length) * unitLess(baseFontSize);
	      } else if (fromUnit === "ex") {
	        pxLength = unitLess(length) * unitLess(fromContext) * 2;
	      } else if (fromUnit === "ch" || fromUnit === "vw" || fromUnit === "vh" || fromUnit === "vmin") {
	        console.warn(fromUnit + " units can't be reliably converted; Returning original value.");
	        return length;
	      } else {
	        console.warn(fromUnit + " is an unknown or unsupported length unit; Returning original value.");
	        return length;
	      }
	    }
	    outputLength = pxLength;
	    if (toUnit !== "px") {
	      if (toUnit === "em") {
	        outputLength = pxLength / unitLess(toContext);
	      } else if (toUnit === "rem") {
	        outputLength = pxLength / unitLess(baseFontSize);
	      } else if (toUnit === "ex") {
	        outputLength = pxLength / unitLess(toContext) / 2;
	      } else if (toUnit === "ch" || toUnit === "vw" || toUnit === "vh" || toUnit === "vmin") {
	        console.warn(toUnit + " units can't be reliably converted; Returning original value.");
	        return length;
	      } else {
	        console.warn(toUnit + " is an unknown or unsupported length unit; Returning original value.");
	        return length;
	      }
	    }
	    return parseFloat(outputLength.toFixed(5)) + toUnit;
	  };
	};


/***/ }),
/* 396 */,
/* 397 */,
/* 398 */,
/* 399 */,
/* 400 */,
/* 401 */,
/* 402 */,
/* 403 */,
/* 404 */,
/* 405 */,
/* 406 */,
/* 407 */,
/* 408 */,
/* 409 */,
/* 410 */,
/* 411 */,
/* 412 */,
/* 413 */,
/* 414 */,
/* 415 */,
/* 416 */,
/* 417 */,
/* 418 */,
/* 419 */,
/* 420 */,
/* 421 */,
/* 422 */,
/* 423 */,
/* 424 */,
/* 425 */,
/* 426 */,
/* 427 */,
/* 428 */,
/* 429 */,
/* 430 */,
/* 431 */,
/* 432 */,
/* 433 */,
/* 434 */,
/* 435 */,
/* 436 */,
/* 437 */,
/* 438 */,
/* 439 */,
/* 440 */,
/* 441 */,
/* 442 */,
/* 443 */,
/* 444 */,
/* 445 */,
/* 446 */,
/* 447 */,
/* 448 */,
/* 449 */,
/* 450 */,
/* 451 */,
/* 452 */,
/* 453 */,
/* 454 */,
/* 455 */,
/* 456 */,
/* 457 */,
/* 458 */,
/* 459 */,
/* 460 */,
/* 461 */,
/* 462 */,
/* 463 */,
/* 464 */,
/* 465 */,
/* 466 */,
/* 467 */,
/* 468 */,
/* 469 */,
/* 470 */,
/* 471 */,
/* 472 */,
/* 473 */,
/* 474 */,
/* 475 */,
/* 476 */,
/* 477 */,
/* 478 */
/***/ (function(module, exports) {

	'use strict';
	module.exports = function (str, sep) {
		if (typeof str !== 'string') {
			throw new TypeError('Expected a string');
		}
	
		sep = typeof sep === 'undefined' ? '_' : sep;
	
		return str
			.replace(/([a-z\d])([A-Z])/g, '$1' + sep + '$2')
			.replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + sep + '$2')
			.toLowerCase();
	};


/***/ }),
/* 479 */,
/* 480 */,
/* 481 */,
/* 482 */,
/* 483 */,
/* 484 */,
/* 485 */,
/* 486 */,
/* 487 */
/***/ (function(module, exports, __webpack_require__) {

	/*!
	  * domready (c) Dustin Diaz 2014 - License MIT
	  */
	!function (name, definition) {
	
	  if (true) module.exports = definition()
	  else if (typeof define == 'function' && typeof define.amd == 'object') define(definition)
	  else this[name] = definition()
	
	}('domready', function () {
	
	  var fns = [], listener
	    , doc = document
	    , hack = doc.documentElement.doScroll
	    , domContentLoaded = 'DOMContentLoaded'
	    , loaded = (hack ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState)
	
	
	  if (!loaded)
	  doc.addEventListener(domContentLoaded, listener = function () {
	    doc.removeEventListener(domContentLoaded, listener)
	    loaded = 1
	    while (listener = fns.shift()) listener()
	  })
	
	  return function (fn) {
	    loaded ? setTimeout(fn, 0) : fns.push(fn)
	  }
	
	});


/***/ }),
/* 488 */,
/* 489 */,
/* 490 */,
/* 491 */,
/* 492 */,
/* 493 */,
/* 494 */,
/* 495 */,
/* 496 */,
/* 497 */,
/* 498 */,
/* 499 */,
/* 500 */,
/* 501 */,
/* 502 */,
/* 503 */,
/* 504 */,
/* 505 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(
	      3
	    );
	    module.exports = function(cb) { return __webpack_require__.e/* nsure */(99219681209289, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__(535) })
	        }
	      });
	     }
	    

/***/ }),
/* 506 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(
	      3
	    );
	    module.exports = function(cb) { return __webpack_require__.e/* nsure */(79611799117203, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__(361) })
	        }
	      });
	     }
	    

/***/ }),
/* 507 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(
	      3
	    );
	    module.exports = function(cb) { return __webpack_require__.e/* nsure */(183328146348521, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__(374) })
	        }
	      });
	     }
	    

/***/ }),
/* 508 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(
	      3
	    );
	    module.exports = function(cb) { return __webpack_require__.e/* nsure */(143687897102401, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__(375) })
	        }
	      });
	     }
	    

/***/ }),
/* 509 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(
	      3
	    );
	    module.exports = function(cb) { return __webpack_require__.e/* nsure */(58411574672382, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__(376) })
	        }
	      });
	     }
	    

/***/ }),
/* 510 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(
	      3
	    );
	    module.exports = function(cb) { return __webpack_require__.e/* nsure */(213534597649335, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__(377) })
	        }
	      });
	     }
	    

/***/ }),
/* 511 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(
	      3
	    );
	    module.exports = function(cb) { return __webpack_require__.e/* nsure */(62865255398775, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__(378) })
	        }
	      });
	     }
	    

/***/ }),
/* 512 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(
	      3
	    );
	    module.exports = function(cb) { return __webpack_require__.e/* nsure */(43947561610677, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__(379) })
	        }
	      });
	     }
	    

/***/ }),
/* 513 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(
	      3
	    );
	    module.exports = function(cb) { return __webpack_require__.e/* nsure */(207180149984783, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__(380) })
	        }
	      });
	     }
	    

/***/ }),
/* 514 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(
	      3
	    );
	    module.exports = function(cb) { return __webpack_require__.e/* nsure */(14108234947130, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__(381) })
	        }
	      });
	     }
	    

/***/ }),
/* 515 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(
	      3
	    );
	    module.exports = function(cb) { return __webpack_require__.e/* nsure */(29990747609436, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__(382) })
	        }
	      });
	     }
	    

/***/ }),
/* 516 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(
	      3
	    );
	    module.exports = function(cb) { return __webpack_require__.e/* nsure */(60335399758886, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__(185) })
	        }
	      });
	     }
	    

/***/ }),
/* 517 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(
	      3
	    );
	    module.exports = function(cb) { return __webpack_require__.e/* nsure */(254022195166212, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__(562) })
	        }
	      });
	     }
	    

/***/ }),
/* 518 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(
	      3
	    );
	    module.exports = function(cb) { return __webpack_require__.e/* nsure */(178698757827068, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__(561) })
	        }
	      });
	     }
	    

/***/ }),
/* 519 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(
	      3
	    );
	    module.exports = function(cb) { return __webpack_require__.e/* nsure */(178949685987347, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__(563) })
	        }
	      });
	     }
	    

/***/ }),
/* 520 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(
	      3
	    );
	    module.exports = function(cb) { return __webpack_require__.e/* nsure */(230376818699225, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__(564) })
	        }
	      });
	     }
	    

/***/ }),
/* 521 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(
	      3
	    );
	    module.exports = function(cb) { return __webpack_require__.e/* nsure */(184662623972074, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__(565) })
	        }
	      });
	     }
	    

/***/ }),
/* 522 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(
	      3
	    );
	    module.exports = function(cb) { return __webpack_require__.e/* nsure */(29139376535037, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__(566) })
	        }
	      });
	     }
	    

/***/ }),
/* 523 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(
	      3
	    );
	    module.exports = function(cb) { return __webpack_require__.e/* nsure */(142629428675168, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__(567) })
	        }
	      });
	     }
	    

/***/ }),
/* 524 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(
	      3
	    );
	    module.exports = function(cb) { return __webpack_require__.e/* nsure */(172932941640215, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__(568) })
	        }
	      });
	     }
	    

/***/ }),
/* 525 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(
	      3
	    );
	    module.exports = function(cb) { return __webpack_require__.e/* nsure */(97356473749538, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__(569) })
	        }
	      });
	     }
	    

/***/ }),
/* 526 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(
	      3
	    );
	    module.exports = function(cb) { return __webpack_require__.e/* nsure */(210333531512890, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__(570) })
	        }
	      });
	     }
	    

/***/ }),
/* 527 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(
	      3
	    );
	    module.exports = function(cb) { return __webpack_require__.e/* nsure */(30606851920564, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__(571) })
	        }
	      });
	     }
	    

/***/ }),
/* 528 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(
	      3
	    );
	    module.exports = function(cb) { return __webpack_require__.e/* nsure */(280720441111072, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__(572) })
	        }
	      });
	     }
	    

/***/ }),
/* 529 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(
	      3
	    );
	    module.exports = function(cb) { return __webpack_require__.e/* nsure */(242597390593422, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__(573) })
	        }
	      });
	     }
	    

/***/ }),
/* 530 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(
	      3
	    );
	    module.exports = function(cb) { return __webpack_require__.e/* nsure */(35156724630433, function(_, error) {
	        if (error) {
	          console.log('bundle loading error', error)
	          cb(true)
	        } else {
	          cb(null, function() { return __webpack_require__(574) })
	        }
	      });
	     }
	    

/***/ }),
/* 531 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _gatsbyLink = __webpack_require__(84);
	
	module.exports = function (root, cb) {
	  root.addEventListener("click", function (ev) {
	    if (ev.button !== 0 || ev.altKey || ev.ctrlKey || ev.metaKey || ev.shiftKey || ev.defaultPrevented) {
	      return true;
	    }
	
	    var anchor = null;
	    for (var n = ev.target; n.parentNode; n = n.parentNode) {
	      if (n.nodeName === "A") {
	        anchor = n;
	        break;
	      }
	    }
	    if (!anchor) return true;
	
	    // Don't catch links where a target (other than self) is set
	    // e.g. _blank.
	    if (anchor.target && anchor.target.toLowerCase() !== "_self") return true;
	
	    // Don't catch links pointed to the same page but with a hash.
	    if (anchor.pathname === window.location.pathname && anchor.hash !== "") {
	      return true;
	    }
	
	    // Dynamically created anchor links (href="#my-anchor") do not always have pathname on IE
	    if (anchor.pathname === "") {
	      return true;
	    }
	
	    // Don't catch links pointed at what look like file extensions (other than
	    // .htm/html extensions).
	    if (anchor.pathname.search(/^.*\.((?!htm)[a-z0-9]{1,5})$/i) !== -1) {
	      return true;
	    }
	
	    // IE clears the host value if the anchor href changed after creation, e.g.
	    // in React. Creating a new anchor element to ensure host value is present
	    var a1 = document.createElement("a");
	    a1.href = anchor.href;
	
	    // In IE, the default port is included in the anchor host but excluded from
	    // the location host.  This affects the ability to directly compare
	    // location host to anchor host.  For example: http://example.com would
	    // have a location.host of 'example.com' and an anchor.host of
	    // 'example.com:80' Creating anchor from the location.href to normalize the
	    // host value.
	    var a2 = document.createElement("a");
	    a2.href = window.location.href;
	
	    if (a1.host !== a2.host) return true;
	
	    // For when pathPrefix is used in an app and there happens to be a link
	    // pointing to the same domain but outside of the app's pathPrefix. For
	    // example, a Gatsby app lives at https://example.com/myapp/, with the
	    // pathPrefix set to `/myapp`. When adding an absolute link to the same
	    // domain but outside of the /myapp path, for example, <a
	    // href="https://example.com/not-my-app"> the plugin won't catch it and
	    // will navigate to an external link instead of doing a pushState resulting
	    // in `https://example.com/myapp/https://example.com/not-my-app`
	    var re = new RegExp("^" + a2.host + (0, _gatsbyLink.withPrefix)("/"));
	    if (!re.test("" + a1.host + a1.pathname)) return true;
	
	    // TODO: add a check for absolute internal links in a callback or here,
	    // or always pass only `${a1.pathname}${a1.hash}`
	    // to avoid `https://example.com/myapp/https://example.com/myapp/here` navigation
	
	    ev.preventDefault();
	
	    cb(anchor.getAttribute("href"));
	    return false;
	  });
	};

/***/ }),
/* 532 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _gatsbyLink = __webpack_require__(84);
	
	var _catchLinks = __webpack_require__(531);
	
	var _catchLinks2 = _interopRequireDefault(_catchLinks);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.onClientEntry = function () {
	  (0, _catchLinks2.default)(window, function (href) {
	    (0, _gatsbyLink.navigateTo)(href);
	  });
	};

/***/ }),
/* 533 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.onRouteUpdate = function (_ref) {
	  var location = _ref.location;
	
	  // Don't track while developing.
	  if (("production") === "production" && typeof ga === "function") {
	    if (location && typeof window.excludeGAPaths !== "undefined" && window.excludeGAPaths.some(function (rx) {
	      return rx.test(location.pathname);
	    })) {
	      return;
	    }
	    window.ga("set", "page", location ? location.pathname + location.search + location.hash : undefined);
	    window.ga("send", "pageview");
	  }
	};

/***/ }),
/* 534 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _extends2 = __webpack_require__(38);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _nprogress = __webpack_require__(634);
	
	var _nprogress2 = _interopRequireDefault(_nprogress);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var defaultOptions = { color: "#29d" };
	
	exports.onClientEntry = function (a) {
	  var pluginOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	  // Merge default options with user defined options in `gatsby-config.js`
	  var options = (0, _extends3.default)({}, defaultOptions, pluginOptions);
	
	  window.___emitter.on("onDelayedLoadPageResources", function () {
	    _nprogress2.default.configure(options);
	    _nprogress2.default.start();
	  });
	  window.___emitter.on("onPostLoadPageResources", function () {
	    _nprogress2.default.done();
	  });
	
	  // Inject styles.
	  var styles = "\n    #nprogress {\n     pointer-events: none;\n    }\n    #nprogress .bar {\n      background: " + options.color + ";\n      position: fixed;\n      z-index: 1031;\n      top: 0;\n      left: 0;\n      width: 100%;\n      height: 2px;\n    }\n    #nprogress .peg {\n      display: block;\n      position: absolute;\n      right: 0px;\n      width: 100px;\n      height: 100%;\n      box-shadow: 0 0 10px " + options.color + ", 0 0 5px " + options.color + ";\n      opacity: 1.0;\n      -webkit-transform: rotate(3deg) translate(0px, -4px);\n      -ms-transform: rotate(3deg) translate(0px, -4px);\n      transform: rotate(3deg) translate(0px, -4px);\n    }\n    #nprogress .spinner {\n      display: block;\n      position: fixed;\n      z-index: 1031;\n      top: 15px;\n      right: 15px;\n    }\n    #nprogress .spinner-icon {\n      width: 18px;\n      height: 18px;\n      box-sizing: border-box;\n      border: solid 2px transparent;\n      border-top-color: " + options.color + ";\n      border-left-color: " + options.color + ";\n      border-radius: 50%;\n      -webkit-animation: nprogress-spinner 400ms linear infinite;\n      animation: nprogress-spinner 400ms linear infinite;\n    }\n    .nprogress-custom-parent {\n      overflow: hidden;\n      position: relative;\n    }\n    .nprogress-custom-parent #nprogress .spinner,\n    .nprogress-custom-parent #nprogress .bar {\n      position: absolute;\n    }\n    @-webkit-keyframes nprogress-spinner {\n      0% {\n        -webkit-transform: rotate(0deg);\n      }\n      100% {\n        -webkit-transform: rotate(360deg);\n      }\n    }\n    @keyframes nprogress-spinner {\n      0% {\n        transform: rotate(0deg);\n      }\n      100% {\n        transform: rotate(360deg);\n      }\n    }\n";
	
	  var node = document.createElement("style");
	  node.id = "nprogress-styles";
	  node.innerHTML = styles;
	  document.head.appendChild(node);
	};

/***/ }),
/* 535 */,
/* 536 */
/***/ (function(module, exports) {

	"use strict";
	
	exports.registerServiceWorker = function () {
	  return true;
	};

/***/ }),
/* 537 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(383)

/***/ }),
/* 538 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _typography = __webpack_require__(537);
	
	var _typography2 = _interopRequireDefault(_typography);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.onClientEntry = function () {
	  // Hot reload typography in development.
	  if (false) {
	    _typography2.default.injectStyles();
	  }
	};

/***/ }),
/* 539 */,
/* 540 */,
/* 541 */,
/* 542 */,
/* 543 */,
/* 544 */,
/* 545 */,
/* 546 */,
/* 547 */,
/* 548 */,
/* 549 */,
/* 550 */,
/* 551 */,
/* 552 */,
/* 553 */,
/* 554 */,
/* 555 */,
/* 556 */,
/* 557 */,
/* 558 */,
/* 559 */
/***/ (function(module, exports) {

	function isNumeric(n) {
	  return !isNaN(parseFloat(n)) && isFinite(n);
	}
	
	
	module.exports = function(lightness, hue, darkBackground) {
	  if (typeof hue === "undefined") {
	    hue = 0;
	  }
	  if (typeof darkBackground === "undefined") {
	    darkBackground = false;
	  }
	
	  // Convert named hues into numeric lightness value.
	  if (hue === "cool") {
	    hue = 237;
	  }
	  else if (hue === "slate") {
	    hue = 122;
	  }
	  else if (hue === "warm") {
	    hue = 69;
	  }
	
	  if (!isNumeric(hue)) {
	    throw new Error("Hue is not a number");
	  }
	
	  if (!isNumeric(lightness)) {
	    throw new Error("Lightness is not a number");
	  }
	
	  if (lightness > 100) {
	    lightness = 100;
	  }
	  if (lightness < 0) {
	    lightness = 0;
	  }
	
	  var saturation = 0;
	  if (hue !== 0) {
	    var a = 19.92978;
	    var b = -0.3651759;
	    var c = 0.001737214;
	    saturation = a + b * lightness + c * Math.pow(lightness, 2);
	  }
	
	  var opacity = 0
	  if (darkBackground) {
	    opacity = lightness / 100
	    lightness = '100%,'
	  } else {
	    opacity = (100 - lightness) / 100
	    lightness = '0%,'
	  }
	
	  return "hsla(" + hue + "," + saturation + "%," + lightness + opacity + ")";
	};


/***/ }),
/* 560 */,
/* 561 */,
/* 562 */,
/* 563 */,
/* 564 */,
/* 565 */,
/* 566 */,
/* 567 */,
/* 568 */,
/* 569 */,
/* 570 */,
/* 571 */,
/* 572 */,
/* 573 */,
/* 574 */,
/* 575 */
/***/ (function(module, exports) {

	module.exports = [{"componentChunkName":"component---node-modules-gatsby-plugin-offline-app-shell-js","layout":"layout---index","layoutComponentChunkName":"component---src-layouts-index-jsx","jsonName":"offline-plugin-app-shell-fallback.json","path":"/offline-plugin-app-shell-fallback/"},{"componentChunkName":"component---src-templates-project-jsx","layout":"layout---index","layoutComponentChunkName":"component---src-layouts-index-jsx","jsonName":"smart-triangle-make-triangles-smart.json","path":"/smart-triangle-make-triangles-smart"},{"componentChunkName":"component---src-templates-project-jsx","layout":"layout---index","layoutComponentChunkName":"component---src-layouts-index-jsx","jsonName":"blob-sphere-make-spheres-blob.json","path":"/blob-sphere-make-spheres-blob"},{"componentChunkName":"component---src-templates-project-jsx","layout":"layout---index","layoutComponentChunkName":"component---src-layouts-index-jsx","jsonName":"leko-arts-your-theme-creator.json","path":"/leko-arts-your-theme-creator"},{"componentChunkName":"component---src-templates-project-jsx","layout":"layout---index","layoutComponentChunkName":"component---src-layouts-index-jsx","jsonName":"cube-round-make-cubes-round.json","path":"/cube-round-make-cubes-round"},{"componentChunkName":"component---src-pages-404-jsx","layout":"layout---index","layoutComponentChunkName":"component---src-layouts-index-jsx","jsonName":"404.json","path":"/404/"},{"componentChunkName":"component---src-pages-bubble-jsx","layout":"layout---index","layoutComponentChunkName":"component---src-layouts-index-jsx","jsonName":"bubble.json","path":"/bubble/"},{"componentChunkName":"component---src-pages-contact-jsx","layout":"layout---index","layoutComponentChunkName":"component---src-layouts-index-jsx","jsonName":"contact.json","path":"/contact/"},{"componentChunkName":"component---src-pages-index-jsx","layout":"layout---index","layoutComponentChunkName":"component---src-layouts-index-jsx","jsonName":"index.json","path":"/"},{"componentChunkName":"component---src-pages-o-que-e-a-bolha-jsx","layout":"layout---index","layoutComponentChunkName":"component---src-layouts-index-jsx","jsonName":"o-que-e-a-bolha.json","path":"/o-que-e-a-bolha/"},{"componentChunkName":"component---src-pages-results-jsx","layout":"layout---index","layoutComponentChunkName":"component---src-layouts-index-jsx","jsonName":"results.json","path":"/results/"},{"componentChunkName":"component---src-pages-share-jsx","layout":"layout---index","layoutComponentChunkName":"component---src-layouts-index-jsx","jsonName":"share.json","path":"/share/"},{"componentChunkName":"component---src-pages-time-jsx","layout":"layout---index","layoutComponentChunkName":"component---src-layouts-index-jsx","jsonName":"time.json","path":"/time/"},{"componentChunkName":"component---src-pages-404-jsx","layout":"layout---index","layoutComponentChunkName":"component---src-layouts-index-jsx","jsonName":"404-html.json","path":"/404.html"}]

/***/ }),
/* 576 */
/***/ (function(module, exports) {

	module.exports = []

/***/ }),
/* 577 */,
/* 578 */,
/* 579 */,
/* 580 */,
/* 581 */
/***/ (function(module, exports) {

	/**
	 * lodash 3.0.3 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	
	/** `Object#toString` result references. */
	var numberTag = '[object Number]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}
	
	/**
	 * Checks if `value` is classified as a `Number` primitive or object.
	 *
	 * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are classified
	 * as numbers, use the `_.isFinite` method.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isNumber(3);
	 * // => true
	 *
	 * _.isNumber(Number.MIN_VALUE);
	 * // => true
	 *
	 * _.isNumber(Infinity);
	 * // => true
	 *
	 * _.isNumber('3');
	 * // => false
	 */
	function isNumber(value) {
	  return typeof value == 'number' ||
	    (isObjectLike(value) && objectToString.call(value) == numberTag);
	}
	
	module.exports = isNumber;


/***/ }),
/* 582 */,
/* 583 */,
/* 584 */,
/* 585 */
/***/ (function(module, exports) {

	/**
	 * A specialized version of `_.reduce` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {*} [accumulator] The initial value.
	 * @param {boolean} [initAccum] Specify using the first element of `array` as
	 *  the initial value.
	 * @returns {*} Returns the accumulated value.
	 */
	function arrayReduce(array, iteratee, accumulator, initAccum) {
	  var index = -1,
	      length = array == null ? 0 : array.length;
	
	  if (initAccum && length) {
	    accumulator = array[++index];
	  }
	  while (++index < length) {
	    accumulator = iteratee(accumulator, array[index], index, array);
	  }
	  return accumulator;
	}
	
	module.exports = arrayReduce;


/***/ }),
/* 586 */,
/* 587 */,
/* 588 */,
/* 589 */
/***/ (function(module, exports, __webpack_require__) {

	var baseFor = __webpack_require__(126),
	    keys = __webpack_require__(102);
	
	/**
	 * The base implementation of `_.forOwn` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForOwn(object, iteratee) {
	  return object && baseFor(object, iteratee, keys);
	}
	
	module.exports = baseForOwn;


/***/ }),
/* 590 */,
/* 591 */
/***/ (function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(64),
	    baseIsEqual = __webpack_require__(127);
	
	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1,
	    COMPARE_UNORDERED_FLAG = 2;
	
	/**
	 * The base implementation of `_.isMatch` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The object to inspect.
	 * @param {Object} source The object of property values to match.
	 * @param {Array} matchData The property names, values, and compare flags to match.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
	 */
	function baseIsMatch(object, source, matchData, customizer) {
	  var index = matchData.length,
	      length = index,
	      noCustomizer = !customizer;
	
	  if (object == null) {
	    return !length;
	  }
	  object = Object(object);
	  while (index--) {
	    var data = matchData[index];
	    if ((noCustomizer && data[2])
	          ? data[1] !== object[data[0]]
	          : !(data[0] in object)
	        ) {
	      return false;
	    }
	  }
	  while (++index < length) {
	    data = matchData[index];
	    var key = data[0],
	        objValue = object[key],
	        srcValue = data[1];
	
	    if (noCustomizer && data[2]) {
	      if (objValue === undefined && !(key in object)) {
	        return false;
	      }
	    } else {
	      var stack = new Stack;
	      if (customizer) {
	        var result = customizer(objValue, srcValue, key, object, source, stack);
	      }
	      if (!(result === undefined
	            ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack)
	            : result
	          )) {
	        return false;
	      }
	    }
	  }
	  return true;
	}
	
	module.exports = baseIsMatch;


/***/ }),
/* 592 */,
/* 593 */
/***/ (function(module, exports, __webpack_require__) {

	var baseMatches = __webpack_require__(594),
	    baseMatchesProperty = __webpack_require__(595),
	    identity = __webpack_require__(32),
	    isArray = __webpack_require__(4),
	    property = __webpack_require__(626);
	
	/**
	 * The base implementation of `_.iteratee`.
	 *
	 * @private
	 * @param {*} [value=_.identity] The value to convert to an iteratee.
	 * @returns {Function} Returns the iteratee.
	 */
	function baseIteratee(value) {
	  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
	  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
	  if (typeof value == 'function') {
	    return value;
	  }
	  if (value == null) {
	    return identity;
	  }
	  if (typeof value == 'object') {
	    return isArray(value)
	      ? baseMatchesProperty(value[0], value[1])
	      : baseMatches(value);
	  }
	  return property(value);
	}
	
	module.exports = baseIteratee;


/***/ }),
/* 594 */
/***/ (function(module, exports, __webpack_require__) {

	var baseIsMatch = __webpack_require__(591),
	    getMatchData = __webpack_require__(610),
	    matchesStrictComparable = __webpack_require__(330);
	
	/**
	 * The base implementation of `_.matches` which doesn't clone `source`.
	 *
	 * @private
	 * @param {Object} source The object of property values to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function baseMatches(source) {
	  var matchData = getMatchData(source);
	  if (matchData.length == 1 && matchData[0][2]) {
	    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
	  }
	  return function(object) {
	    return object === source || baseIsMatch(object, source, matchData);
	  };
	}
	
	module.exports = baseMatches;


/***/ }),
/* 595 */
/***/ (function(module, exports, __webpack_require__) {

	var baseIsEqual = __webpack_require__(127),
	    get = __webpack_require__(259),
	    hasIn = __webpack_require__(260),
	    isKey = __webpack_require__(97),
	    isStrictComparable = __webpack_require__(329),
	    matchesStrictComparable = __webpack_require__(330),
	    toKey = __webpack_require__(27);
	
	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1,
	    COMPARE_UNORDERED_FLAG = 2;
	
	/**
	 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
	 *
	 * @private
	 * @param {string} path The path of the property to get.
	 * @param {*} srcValue The value to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function baseMatchesProperty(path, srcValue) {
	  if (isKey(path) && isStrictComparable(srcValue)) {
	    return matchesStrictComparable(toKey(path), srcValue);
	  }
	  return function(object) {
	    var objValue = get(object, path);
	    return (objValue === undefined && objValue === srcValue)
	      ? hasIn(object, path)
	      : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
	  };
	}
	
	module.exports = baseMatchesProperty;


/***/ }),
/* 596 */,
/* 597 */,
/* 598 */
/***/ (function(module, exports) {

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}
	
	module.exports = baseProperty;


/***/ }),
/* 599 */
/***/ (function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(90);
	
	/**
	 * A specialized version of `baseProperty` which supports deep paths.
	 *
	 * @private
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 */
	function basePropertyDeep(path) {
	  return function(object) {
	    return baseGet(object, path);
	  };
	}
	
	module.exports = basePropertyDeep;


/***/ }),
/* 600 */
/***/ (function(module, exports) {

	/**
	 * The base implementation of `_.reduce` and `_.reduceRight`, without support
	 * for iteratee shorthands, which iterates over `collection` using `eachFunc`.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {*} accumulator The initial value.
	 * @param {boolean} initAccum Specify using the first or last element of
	 *  `collection` as the initial value.
	 * @param {Function} eachFunc The function to iterate over `collection`.
	 * @returns {*} Returns the accumulated value.
	 */
	function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
	  eachFunc(collection, function(value, index, collection) {
	    accumulator = initAccum
	      ? (initAccum = false, value)
	      : iteratee(accumulator, value, index, collection);
	  });
	  return accumulator;
	}
	
	module.exports = baseReduce;


/***/ }),
/* 601 */
/***/ (function(module, exports, __webpack_require__) {

	var identity = __webpack_require__(32);
	
	/**
	 * Casts `value` to `identity` if it's not a function.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {Function} Returns cast function.
	 */
	function castFunction(value) {
	  return typeof value == 'function' ? value : identity;
	}
	
	module.exports = castFunction;


/***/ }),
/* 602 */,
/* 603 */
/***/ (function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(21);
	
	/**
	 * Creates a `baseEach` or `baseEachRight` function.
	 *
	 * @private
	 * @param {Function} eachFunc The function to iterate over a collection.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseEach(eachFunc, fromRight) {
	  return function(collection, iteratee) {
	    if (collection == null) {
	      return collection;
	    }
	    if (!isArrayLike(collection)) {
	      return eachFunc(collection, iteratee);
	    }
	    var length = collection.length,
	        index = fromRight ? length : -1,
	        iterable = Object(collection);
	
	    while ((fromRight ? index-- : ++index < length)) {
	      if (iteratee(iterable[index], index, iterable) === false) {
	        break;
	      }
	    }
	    return collection;
	  };
	}
	
	module.exports = createBaseEach;


/***/ }),
/* 604 */,
/* 605 */,
/* 606 */,
/* 607 */,
/* 608 */,
/* 609 */,
/* 610 */
/***/ (function(module, exports, __webpack_require__) {

	var isStrictComparable = __webpack_require__(329),
	    keys = __webpack_require__(102);
	
	/**
	 * Gets the property names, values, and compare flags of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the match data of `object`.
	 */
	function getMatchData(object) {
	  var result = keys(object),
	      length = result.length;
	
	  while (length--) {
	    var key = result[length],
	        value = object[key];
	
	    result[length] = [key, value, isStrictComparable(value)];
	  }
	  return result;
	}
	
	module.exports = getMatchData;


/***/ }),
/* 611 */,
/* 612 */,
/* 613 */,
/* 614 */,
/* 615 */,
/* 616 */,
/* 617 */,
/* 618 */,
/* 619 */,
/* 620 */,
/* 621 */,
/* 622 */
/***/ (function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(8),
	    isObjectLike = __webpack_require__(7);
	
	/** `Object#toString` result references. */
	var numberTag = '[object Number]';
	
	/**
	 * Checks if `value` is classified as a `Number` primitive or object.
	 *
	 * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are
	 * classified as numbers, use the `_.isFinite` method.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a number, else `false`.
	 * @example
	 *
	 * _.isNumber(3);
	 * // => true
	 *
	 * _.isNumber(Number.MIN_VALUE);
	 * // => true
	 *
	 * _.isNumber(Infinity);
	 * // => true
	 *
	 * _.isNumber('3');
	 * // => false
	 */
	function isNumber(value) {
	  return typeof value == 'number' ||
	    (isObjectLike(value) && baseGetTag(value) == numberTag);
	}
	
	module.exports = isNumber;


/***/ }),
/* 623 */,
/* 624 */,
/* 625 */,
/* 626 */
/***/ (function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(598),
	    basePropertyDeep = __webpack_require__(599),
	    isKey = __webpack_require__(97),
	    toKey = __webpack_require__(27);
	
	/**
	 * Creates a function that returns the value at `path` of a given object.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Util
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 * @example
	 *
	 * var objects = [
	 *   { 'a': { 'b': 2 } },
	 *   { 'a': { 'b': 1 } }
	 * ];
	 *
	 * _.map(objects, _.property('a.b'));
	 * // => [2, 1]
	 *
	 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
	 * // => [1, 2]
	 */
	function property(path) {
	  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
	}
	
	module.exports = property;


/***/ }),
/* 627 */,
/* 628 */,
/* 629 */,
/* 630 */,
/* 631 */,
/* 632 */
/***/ (function(module, exports) {

	function n(n){return n=n||Object.create(null),{on:function(c,e){(n[c]||(n[c]=[])).push(e)},off:function(c,e){n[c]&&n[c].splice(n[c].indexOf(e)>>>0,1)},emit:function(c,e){(n[c]||[]).slice().map(function(n){n(e)}),(n["*"]||[]).slice().map(function(n){n(c,e)})}}}module.exports=n;
	//# sourceMappingURL=mitt.js.map

/***/ }),
/* 633 */
/***/ (function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.9.1
	var isNumber, ratios;
	
	isNumber = __webpack_require__(581);
	
	ratios = {
	  "minor second": 16 / 15,
	  "major second": 9 / 8,
	  "minor third": 6 / 5,
	  "major third": 4 / 3,
	  "diminished fourth": Math.sqrt(2),
	  "perfect fifth": 3 / 2,
	  "minor sixth": 8 / 5,
	  "golden": 1.61803398875,
	  "phi": 1.61803398875,
	  "major sixth": 5 / 3,
	  "minor seventh": 16 / 9,
	  "major seventh": 15 / 8,
	  "octave": 2,
	  "major tenth": 5 / 2,
	  "major eleventh": 8 / 3,
	  "major twelfth": 3,
	  "double octave": 4
	};
	
	module.exports = function(value, ratio) {
	  var r;
	  if (value == null) {
	    value = 0;
	  }
	  if (ratio == null) {
	    ratio = "golden";
	  }
	  if (isNumber(ratio)) {
	    r = ratio;
	  } else if (ratios[ratio] != null) {
	    r = ratios[ratio];
	  } else {
	    r = ratios['golden'];
	  }
	  return Math.pow(r, value);
	};


/***/ }),
/* 634 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/* NProgress, (c) 2013, 2014 Rico Sta. Cruz - http://ricostacruz.com/nprogress
	 * @license MIT */
	
	;(function(root, factory) {
	
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports === 'object') {
	    module.exports = factory();
	  } else {
	    root.NProgress = factory();
	  }
	
	})(this, function() {
	  var NProgress = {};
	
	  NProgress.version = '0.2.0';
	
	  var Settings = NProgress.settings = {
	    minimum: 0.08,
	    easing: 'ease',
	    positionUsing: '',
	    speed: 200,
	    trickle: true,
	    trickleRate: 0.02,
	    trickleSpeed: 800,
	    showSpinner: true,
	    barSelector: '[role="bar"]',
	    spinnerSelector: '[role="spinner"]',
	    parent: 'body',
	    template: '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
	  };
	
	  /**
	   * Updates configuration.
	   *
	   *     NProgress.configure({
	   *       minimum: 0.1
	   *     });
	   */
	  NProgress.configure = function(options) {
	    var key, value;
	    for (key in options) {
	      value = options[key];
	      if (value !== undefined && options.hasOwnProperty(key)) Settings[key] = value;
	    }
	
	    return this;
	  };
	
	  /**
	   * Last number.
	   */
	
	  NProgress.status = null;
	
	  /**
	   * Sets the progress bar status, where `n` is a number from `0.0` to `1.0`.
	   *
	   *     NProgress.set(0.4);
	   *     NProgress.set(1.0);
	   */
	
	  NProgress.set = function(n) {
	    var started = NProgress.isStarted();
	
	    n = clamp(n, Settings.minimum, 1);
	    NProgress.status = (n === 1 ? null : n);
	
	    var progress = NProgress.render(!started),
	        bar      = progress.querySelector(Settings.barSelector),
	        speed    = Settings.speed,
	        ease     = Settings.easing;
	
	    progress.offsetWidth; /* Repaint */
	
	    queue(function(next) {
	      // Set positionUsing if it hasn't already been set
	      if (Settings.positionUsing === '') Settings.positionUsing = NProgress.getPositioningCSS();
	
	      // Add transition
	      css(bar, barPositionCSS(n, speed, ease));
	
	      if (n === 1) {
	        // Fade out
	        css(progress, { 
	          transition: 'none', 
	          opacity: 1 
	        });
	        progress.offsetWidth; /* Repaint */
	
	        setTimeout(function() {
	          css(progress, { 
	            transition: 'all ' + speed + 'ms linear', 
	            opacity: 0 
	          });
	          setTimeout(function() {
	            NProgress.remove();
	            next();
	          }, speed);
	        }, speed);
	      } else {
	        setTimeout(next, speed);
	      }
	    });
	
	    return this;
	  };
	
	  NProgress.isStarted = function() {
	    return typeof NProgress.status === 'number';
	  };
	
	  /**
	   * Shows the progress bar.
	   * This is the same as setting the status to 0%, except that it doesn't go backwards.
	   *
	   *     NProgress.start();
	   *
	   */
	  NProgress.start = function() {
	    if (!NProgress.status) NProgress.set(0);
	
	    var work = function() {
	      setTimeout(function() {
	        if (!NProgress.status) return;
	        NProgress.trickle();
	        work();
	      }, Settings.trickleSpeed);
	    };
	
	    if (Settings.trickle) work();
	
	    return this;
	  };
	
	  /**
	   * Hides the progress bar.
	   * This is the *sort of* the same as setting the status to 100%, with the
	   * difference being `done()` makes some placebo effect of some realistic motion.
	   *
	   *     NProgress.done();
	   *
	   * If `true` is passed, it will show the progress bar even if its hidden.
	   *
	   *     NProgress.done(true);
	   */
	
	  NProgress.done = function(force) {
	    if (!force && !NProgress.status) return this;
	
	    return NProgress.inc(0.3 + 0.5 * Math.random()).set(1);
	  };
	
	  /**
	   * Increments by a random amount.
	   */
	
	  NProgress.inc = function(amount) {
	    var n = NProgress.status;
	
	    if (!n) {
	      return NProgress.start();
	    } else {
	      if (typeof amount !== 'number') {
	        amount = (1 - n) * clamp(Math.random() * n, 0.1, 0.95);
	      }
	
	      n = clamp(n + amount, 0, 0.994);
	      return NProgress.set(n);
	    }
	  };
	
	  NProgress.trickle = function() {
	    return NProgress.inc(Math.random() * Settings.trickleRate);
	  };
	
	  /**
	   * Waits for all supplied jQuery promises and
	   * increases the progress as the promises resolve.
	   *
	   * @param $promise jQUery Promise
	   */
	  (function() {
	    var initial = 0, current = 0;
	
	    NProgress.promise = function($promise) {
	      if (!$promise || $promise.state() === "resolved") {
	        return this;
	      }
	
	      if (current === 0) {
	        NProgress.start();
	      }
	
	      initial++;
	      current++;
	
	      $promise.always(function() {
	        current--;
	        if (current === 0) {
	            initial = 0;
	            NProgress.done();
	        } else {
	            NProgress.set((initial - current) / initial);
	        }
	      });
	
	      return this;
	    };
	
	  })();
	
	  /**
	   * (Internal) renders the progress bar markup based on the `template`
	   * setting.
	   */
	
	  NProgress.render = function(fromStart) {
	    if (NProgress.isRendered()) return document.getElementById('nprogress');
	
	    addClass(document.documentElement, 'nprogress-busy');
	    
	    var progress = document.createElement('div');
	    progress.id = 'nprogress';
	    progress.innerHTML = Settings.template;
	
	    var bar      = progress.querySelector(Settings.barSelector),
	        perc     = fromStart ? '-100' : toBarPerc(NProgress.status || 0),
	        parent   = document.querySelector(Settings.parent),
	        spinner;
	    
	    css(bar, {
	      transition: 'all 0 linear',
	      transform: 'translate3d(' + perc + '%,0,0)'
	    });
	
	    if (!Settings.showSpinner) {
	      spinner = progress.querySelector(Settings.spinnerSelector);
	      spinner && removeElement(spinner);
	    }
	
	    if (parent != document.body) {
	      addClass(parent, 'nprogress-custom-parent');
	    }
	
	    parent.appendChild(progress);
	    return progress;
	  };
	
	  /**
	   * Removes the element. Opposite of render().
	   */
	
	  NProgress.remove = function() {
	    removeClass(document.documentElement, 'nprogress-busy');
	    removeClass(document.querySelector(Settings.parent), 'nprogress-custom-parent');
	    var progress = document.getElementById('nprogress');
	    progress && removeElement(progress);
	  };
	
	  /**
	   * Checks if the progress bar is rendered.
	   */
	
	  NProgress.isRendered = function() {
	    return !!document.getElementById('nprogress');
	  };
	
	  /**
	   * Determine which positioning CSS rule to use.
	   */
	
	  NProgress.getPositioningCSS = function() {
	    // Sniff on document.body.style
	    var bodyStyle = document.body.style;
	
	    // Sniff prefixes
	    var vendorPrefix = ('WebkitTransform' in bodyStyle) ? 'Webkit' :
	                       ('MozTransform' in bodyStyle) ? 'Moz' :
	                       ('msTransform' in bodyStyle) ? 'ms' :
	                       ('OTransform' in bodyStyle) ? 'O' : '';
	
	    if (vendorPrefix + 'Perspective' in bodyStyle) {
	      // Modern browsers with 3D support, e.g. Webkit, IE10
	      return 'translate3d';
	    } else if (vendorPrefix + 'Transform' in bodyStyle) {
	      // Browsers without 3D support, e.g. IE9
	      return 'translate';
	    } else {
	      // Browsers without translate() support, e.g. IE7-8
	      return 'margin';
	    }
	  };
	
	  /**
	   * Helpers
	   */
	
	  function clamp(n, min, max) {
	    if (n < min) return min;
	    if (n > max) return max;
	    return n;
	  }
	
	  /**
	   * (Internal) converts a percentage (`0..1`) to a bar translateX
	   * percentage (`-100%..0%`).
	   */
	
	  function toBarPerc(n) {
	    return (-1 + n) * 100;
	  }
	
	
	  /**
	   * (Internal) returns the correct CSS for changing the bar's
	   * position given an n percentage, and speed and ease from Settings
	   */
	
	  function barPositionCSS(n, speed, ease) {
	    var barCSS;
	
	    if (Settings.positionUsing === 'translate3d') {
	      barCSS = { transform: 'translate3d('+toBarPerc(n)+'%,0,0)' };
	    } else if (Settings.positionUsing === 'translate') {
	      barCSS = { transform: 'translate('+toBarPerc(n)+'%,0)' };
	    } else {
	      barCSS = { 'margin-left': toBarPerc(n)+'%' };
	    }
	
	    barCSS.transition = 'all '+speed+'ms '+ease;
	
	    return barCSS;
	  }
	
	  /**
	   * (Internal) Queues a function to be executed.
	   */
	
	  var queue = (function() {
	    var pending = [];
	    
	    function next() {
	      var fn = pending.shift();
	      if (fn) {
	        fn(next);
	      }
	    }
	
	    return function(fn) {
	      pending.push(fn);
	      if (pending.length == 1) next();
	    };
	  })();
	
	  /**
	   * (Internal) Applies css properties to an element, similar to the jQuery 
	   * css method.
	   *
	   * While this helper does assist with vendor prefixed property names, it 
	   * does not perform any manipulation of values prior to setting styles.
	   */
	
	  var css = (function() {
	    var cssPrefixes = [ 'Webkit', 'O', 'Moz', 'ms' ],
	        cssProps    = {};
	
	    function camelCase(string) {
	      return string.replace(/^-ms-/, 'ms-').replace(/-([\da-z])/gi, function(match, letter) {
	        return letter.toUpperCase();
	      });
	    }
	
	    function getVendorProp(name) {
	      var style = document.body.style;
	      if (name in style) return name;
	
	      var i = cssPrefixes.length,
	          capName = name.charAt(0).toUpperCase() + name.slice(1),
	          vendorName;
	      while (i--) {
	        vendorName = cssPrefixes[i] + capName;
	        if (vendorName in style) return vendorName;
	      }
	
	      return name;
	    }
	
	    function getStyleProp(name) {
	      name = camelCase(name);
	      return cssProps[name] || (cssProps[name] = getVendorProp(name));
	    }
	
	    function applyCss(element, prop, value) {
	      prop = getStyleProp(prop);
	      element.style[prop] = value;
	    }
	
	    return function(element, properties) {
	      var args = arguments,
	          prop, 
	          value;
	
	      if (args.length == 2) {
	        for (prop in properties) {
	          value = properties[prop];
	          if (value !== undefined && properties.hasOwnProperty(prop)) applyCss(element, prop, value);
	        }
	      } else {
	        applyCss(element, args[1], args[2]);
	      }
	    }
	  })();
	
	  /**
	   * (Internal) Determines if an element or space separated list of class names contains a class name.
	   */
	
	  function hasClass(element, name) {
	    var list = typeof element == 'string' ? element : classList(element);
	    return list.indexOf(' ' + name + ' ') >= 0;
	  }
	
	  /**
	   * (Internal) Adds a class to an element.
	   */
	
	  function addClass(element, name) {
	    var oldList = classList(element),
	        newList = oldList + name;
	
	    if (hasClass(oldList, name)) return; 
	
	    // Trim the opening space.
	    element.className = newList.substring(1);
	  }
	
	  /**
	   * (Internal) Removes a class from an element.
	   */
	
	  function removeClass(element, name) {
	    var oldList = classList(element),
	        newList;
	
	    if (!hasClass(element, name)) return;
	
	    // Replace the class name.
	    newList = oldList.replace(' ' + name + ' ', ' ');
	
	    // Trim the opening and closing spaces.
	    element.className = newList.substring(1, newList.length - 1);
	  }
	
	  /**
	   * (Internal) Gets a space separated list of the class names on the element. 
	   * The list is wrapped with a single space on each end to facilitate finding 
	   * matches within the list.
	   */
	
	  function classList(element) {
	    return (' ' + (element.className || '') + ' ').replace(/\s+/gi, ' ');
	  }
	
	  /**
	   * (Internal) Removes an element from the DOM.
	   */
	
	  function removeElement(element) {
	    element && element.parentNode && element.parentNode.removeChild(element);
	  }
	
	  return NProgress;
	});
	


/***/ }),
/* 635 */,
/* 636 */,
/* 637 */,
/* 638 */,
/* 639 */,
/* 640 */,
/* 641 */,
/* 642 */,
/* 643 */,
/* 644 */,
/* 645 */,
/* 646 */,
/* 647 */,
/* 648 */,
/* 649 */,
/* 650 */,
/* 651 */,
/* 652 */,
/* 653 */,
/* 654 */,
/* 655 */,
/* 656 */,
/* 657 */,
/* 658 */,
/* 659 */,
/* 660 */,
/* 661 */,
/* 662 */,
/* 663 */,
/* 664 */,
/* 665 */,
/* 666 */,
/* 667 */,
/* 668 */,
/* 669 */,
/* 670 */,
/* 671 */,
/* 672 */,
/* 673 */,
/* 674 */,
/* 675 */,
/* 676 */,
/* 677 */,
/* 678 */,
/* 679 */,
/* 680 */,
/* 681 */,
/* 682 */,
/* 683 */,
/* 684 */,
/* 685 */,
/* 686 */,
/* 687 */
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/** @license React v0.13.6
	 * scheduler.production.min.js
	 *
	 * Copyright (c) Facebook, Inc. and its affiliates.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */
	
	'use strict';Object.defineProperty(exports,"__esModule",{value:!0});var d=null,e=!1,g=3,k=-1,l=-1,m=!1,n=!1;function p(){if(!m){var a=d.expirationTime;n?q():n=!0;r(t,a)}}
	function u(){var a=d,b=d.next;if(d===b)d=null;else{var c=d.previous;d=c.next=b;b.previous=c}a.next=a.previous=null;c=a.callback;b=a.expirationTime;a=a.priorityLevel;var f=g,Q=l;g=a;l=b;try{var h=c()}finally{g=f,l=Q}if("function"===typeof h)if(h={callback:h,priorityLevel:a,expirationTime:b,next:null,previous:null},null===d)d=h.next=h.previous=h;else{c=null;a=d;do{if(a.expirationTime>=b){c=a;break}a=a.next}while(a!==d);null===c?c=d:c===d&&(d=h,p());b=c.previous;b.next=c.previous=h;h.next=c;h.previous=
	b}}function v(){if(-1===k&&null!==d&&1===d.priorityLevel){m=!0;try{do u();while(null!==d&&1===d.priorityLevel)}finally{m=!1,null!==d?p():n=!1}}}function t(a){m=!0;var b=e;e=a;try{if(a)for(;null!==d;){var c=exports.unstable_now();if(d.expirationTime<=c){do u();while(null!==d&&d.expirationTime<=c)}else break}else if(null!==d){do u();while(null!==d&&!w())}}finally{m=!1,e=b,null!==d?p():n=!1,v()}}
	var x=Date,y="function"===typeof setTimeout?setTimeout:void 0,z="function"===typeof clearTimeout?clearTimeout:void 0,A="function"===typeof requestAnimationFrame?requestAnimationFrame:void 0,B="function"===typeof cancelAnimationFrame?cancelAnimationFrame:void 0,C,D;function E(a){C=A(function(b){z(D);a(b)});D=y(function(){B(C);a(exports.unstable_now())},100)}
	if("object"===typeof performance&&"function"===typeof performance.now){var F=performance;exports.unstable_now=function(){return F.now()}}else exports.unstable_now=function(){return x.now()};var r,q,w,G=null;"undefined"!==typeof window?G=window:"undefined"!==typeof global&&(G=global);
	if(G&&G._schedMock){var H=G._schedMock;r=H[0];q=H[1];w=H[2];exports.unstable_now=H[3]}else if("undefined"===typeof window||"function"!==typeof MessageChannel){var I=null,J=function(a){if(null!==I)try{I(a)}finally{I=null}};r=function(a){null!==I?setTimeout(r,0,a):(I=a,setTimeout(J,0,!1))};q=function(){I=null};w=function(){return!1}}else{"undefined"!==typeof console&&("function"!==typeof A&&console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills"),
	"function"!==typeof B&&console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills"));var K=null,L=!1,M=-1,N=!1,O=!1,P=0,R=33,S=33;w=function(){return P<=exports.unstable_now()};var T=new MessageChannel,U=T.port2;T.port1.onmessage=function(){L=!1;var a=K,b=M;K=null;M=-1;var c=exports.unstable_now(),f=!1;if(0>=P-c)if(-1!==b&&b<=c)f=!0;else{N||(N=!0,E(V));K=a;M=b;return}if(null!==a){O=!0;try{a(f)}finally{O=!1}}};
	var V=function(a){if(null!==K){E(V);var b=a-P+S;b<S&&R<S?(8>b&&(b=8),S=b<R?R:b):R=b;P=a+S;L||(L=!0,U.postMessage(void 0))}else N=!1};r=function(a,b){K=a;M=b;O||0>b?U.postMessage(void 0):N||(N=!0,E(V))};q=function(){K=null;L=!1;M=-1}}exports.unstable_ImmediatePriority=1;exports.unstable_UserBlockingPriority=2;exports.unstable_NormalPriority=3;exports.unstable_IdlePriority=5;exports.unstable_LowPriority=4;
	exports.unstable_runWithPriority=function(a,b){switch(a){case 1:case 2:case 3:case 4:case 5:break;default:a=3}var c=g,f=k;g=a;k=exports.unstable_now();try{return b()}finally{g=c,k=f,v()}};exports.unstable_next=function(a){switch(g){case 1:case 2:case 3:var b=3;break;default:b=g}var c=g,f=k;g=b;k=exports.unstable_now();try{return a()}finally{g=c,k=f,v()}};
	exports.unstable_scheduleCallback=function(a,b){var c=-1!==k?k:exports.unstable_now();if("object"===typeof b&&null!==b&&"number"===typeof b.timeout)b=c+b.timeout;else switch(g){case 1:b=c+-1;break;case 2:b=c+250;break;case 5:b=c+1073741823;break;case 4:b=c+1E4;break;default:b=c+5E3}a={callback:a,priorityLevel:g,expirationTime:b,next:null,previous:null};if(null===d)d=a.next=a.previous=a,p();else{c=null;var f=d;do{if(f.expirationTime>b){c=f;break}f=f.next}while(f!==d);null===c?c=d:c===d&&(d=a,p());
	b=c.previous;b.next=c.previous=a;a.next=c;a.previous=b}return a};exports.unstable_cancelCallback=function(a){var b=a.next;if(null!==b){if(b===a)d=null;else{a===d&&(d=b);var c=a.previous;c.next=b;b.previous=c}a.next=a.previous=null}};exports.unstable_wrapCallback=function(a){var b=g;return function(){var c=g,f=k;g=b;k=exports.unstable_now();try{return a.apply(this,arguments)}finally{g=c,k=f,v()}}};exports.unstable_getCurrentPriorityLevel=function(){return g};
	exports.unstable_shouldYield=function(){return!e&&(null!==d&&d.expirationTime<l||w())};exports.unstable_continueExecution=function(){null!==d&&p()};exports.unstable_pauseExecution=function(){};exports.unstable_getFirstCallbackNode=function(){return d};
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 688 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	if (true) {
	  module.exports = __webpack_require__(687);
	} else {
	  module.exports = require('./cjs/scheduler.development.js');
	}


/***/ }),
/* 689 */,
/* 690 */,
/* 691 */
/***/ (function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	// Pulled from react-compat
	// https://github.com/developit/preact-compat/blob/7c5de00e7c85e2ffd011bf3af02899b63f699d3a/src/index.js#L349
	function shallowDiffers(a, b) {
	  for (var i in a) {
	    if (!(i in b)) return true;
	  }for (var _i in b) {
	    if (a[_i] !== b[_i]) return true;
	  }return false;
	}
	
	exports.default = function (instance, nextProps, nextState) {
	  return shallowDiffers(instance.props, nextProps) || shallowDiffers(instance.state, nextState);
	};
	
	module.exports = exports["default"];

/***/ }),
/* 692 */,
/* 693 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/* eslint-disable */
	/*! normalize.css v4.1.1 | MIT License | github.com/necolas/normalize.css */
	exports.default = 'html{font-family:sans-serif;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{margin:0}article,aside,details,figcaption,figure,footer,header,main,menu,nav,section,summary{display:block}audio,canvas,progress,video{display:inline-block}audio:not([controls]){display:none;height:0}progress{vertical-align:baseline}[hidden],template{display:none}a{background-color:transparent;-webkit-text-decoration-skip:objects}a:active,a:hover{outline-width:0}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:inherit;font-weight:bolder}dfn{font-style:italic}h1{font-size:2em;margin:.67em 0}mark{background-color:#ff0;color:#000}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}img{border-style:none}svg:not(:root){overflow:hidden}code,kbd,pre,samp{font-family:monospace,monospace;font-size:1em}figure{margin:1em 40px}hr{box-sizing:content-box;height:0;overflow:visible}button,input,optgroup,select,textarea{font:inherit;margin:0}optgroup{font-weight:700}button,input{overflow:visible}button,select{text-transform:none}[type=reset],[type=submit],button,html [type=button]{-webkit-appearance:button}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:1px dotted ButtonText}fieldset{border:1px solid silver;margin:0 2px;padding:.35em .625em .75em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-cancel-button,[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-input-placeholder{color:inherit;opacity:.54}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}';

/***/ }),
/* 694 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _objectAssign = __webpack_require__(104);
	
	var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
	var _compassVerticalRhythm = __webpack_require__(393);
	
	var _compassVerticalRhythm2 = _interopRequireDefault(_compassVerticalRhythm);
	
	var _modularscale = __webpack_require__(633);
	
	var _modularscale2 = _interopRequireDefault(_modularscale);
	
	var _createStyles = __webpack_require__(696);
	
	var _createStyles2 = _interopRequireDefault(_createStyles);
	
	var _compileStyles = __webpack_require__(695);
	
	var _compileStyles2 = _interopRequireDefault(_compileStyles);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var typography = function typography(opts) {
	  var defaults = {
	    baseFontSize: '16px',
	    baseLineHeight: 1.45,
	    headerLineHeight: 1.1,
	    scaleRatio: 2,
	    googleFonts: [],
	    headerFontFamily: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'],
	    bodyFontFamily: ['georgia', 'serif'],
	    headerColor: 'inherit',
	    bodyColor: 'hsla(0,0%,0%,0.8)',
	    headerWeight: 'bold',
	    bodyWeight: 'normal',
	    boldWeight: 'bold',
	    includeNormalize: true,
	    blockMarginBottom: 1
	  };
	
	  var options = (0, _objectAssign2.default)({}, defaults, opts);
	
	  var vr = (0, _compassVerticalRhythm2.default)(options);
	
	  // Add this function to the vertical rhythm object so it'll be passed around
	  // as well and be available. Not related really but this is the easiest
	  // way to pass around extra utility functions atm... :-\
	  vr.scale = function (value) {
	    // This doesn't pick the right scale ratio if a theme has more than one ratio.
	    // Perhaps add optional parameter for a width and it'll get the ratio
	    // for this width. Tricky part is maxWidth could be set in non-pixels.
	    var baseFont = parseInt(options.baseFontSize, 10);
	    var newFontSize = (0, _modularscale2.default)(value, options.scaleRatio) * baseFont + 'px';
	    return vr.adjustFontSizeTo(newFontSize);
	  };
	
	  return _extends({
	    options: options
	  }, vr, {
	    createStyles: function createStyles() {
	      return this.toString();
	    },
	    // TODO remove in next breaking release.
	    toJSON: function toJSON() {
	      return (0, _createStyles2.default)(vr, options);
	    },
	    toString: function toString() {
	      return (0, _compileStyles2.default)(vr, options, this.toJSON());
	    },
	    injectStyles: function injectStyles() {
	      if (typeof document !== 'undefined') {
	        // Replace existing
	        if (document.getElementById('typography.js')) {
	          var styleNode = document.getElementById('typography.js');
	          styleNode.innerHTML = this.toString();
	        } else {
	          var node = document.createElement('style');
	          node.id = 'typography.js';
	          node.innerHTML = this.toString();
	          document.head.appendChild(node);
	        }
	      }
	    }
	  });
	};
	
	module.exports = typography;
	
	/*
	const test = typography({
	  baseFontSize: '16px',
	  includeNormalize: false,
	})
	
	console.log(test.toJSON())
	console.log(test.toString())
	*/

/***/ }),
/* 695 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _typographyNormalize = __webpack_require__(693);
	
	var _typographyNormalize2 = _interopRequireDefault(_typographyNormalize);
	
	var _decamelize = __webpack_require__(478);
	
	var _decamelize2 = _interopRequireDefault(_decamelize);
	
	var _forEach = __webpack_require__(335);
	
	var _forEach2 = _interopRequireDefault(_forEach);
	
	var _reduce = __webpack_require__(337);
	
	var _reduce2 = _interopRequireDefault(_reduce);
	
	var _isObject = __webpack_require__(6);
	
	var _isObject2 = _interopRequireDefault(_isObject);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var compileStyles = function compileStyles(styles) {
	  return (0, _reduce2.default)(styles, function (stylesStr, ruleSet, selector) {
	    stylesStr += selector + '{'; // eslint-disable-line
	    (0, _forEach2.default)(ruleSet, function (value, property) {
	      if ((0, _isObject2.default)(value)) {
	        var newObject = {};
	        newObject[property] = value;
	        stylesStr += compileStyles(newObject); // eslint-disable-line
	      } else {
	        var newStyle = (0, _decamelize2.default)(property, '-') + ':' + value + ';'; // eslint-disable-line
	        // If the property is prefixed, add an additional dash at the beginning.
	        var prefixes = ['Webkit', 'ms', 'Moz', 'O'];
	        prefixes.forEach(function (prefix) {
	          if (property.slice(0, prefix.length) === prefix) {
	            newStyle = '-' + newStyle;
	          }
	        });
	        stylesStr += newStyle;
	      }
	    });
	    stylesStr += '}'; // eslint-disable-line
	    return stylesStr;
	  }, '');
	};
	
	
	module.exports = function (vr, options, styles) {
	  // Compile styles to string.
	  var stylesStr = compileStyles(styles);
	
	  if (options.includeNormalize) {
	    stylesStr = '' + _typographyNormalize2.default + stylesStr;
	  }
	
	  return stylesStr;
	};

/***/ }),
/* 696 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _grayPercentage = __webpack_require__(559);
	
	var _grayPercentage2 = _interopRequireDefault(_grayPercentage);
	
	var _set = __webpack_require__(264);
	
	var _set2 = _interopRequireDefault(_set);
	
	var _forEach = __webpack_require__(335);
	
	var _forEach2 = _interopRequireDefault(_forEach);
	
	var _isNumber = __webpack_require__(622);
	
	var _isNumber2 = _interopRequireDefault(_isNumber);
	
	var _isString = __webpack_require__(261);
	
	var _isString2 = _interopRequireDefault(_isString);
	
	var _isFunction = __webpack_require__(28);
	
	var _isFunction2 = _interopRequireDefault(_isFunction);
	
	var _isArray = __webpack_require__(4);
	
	var _isArray2 = _interopRequireDefault(_isArray);
	
	var _merge = __webpack_require__(263);
	
	var _merge2 = _interopRequireDefault(_merge);
	
	var _reduce = __webpack_require__(337);
	
	var _reduce2 = _interopRequireDefault(_reduce);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var setStyles = function setStyles() {
	  var styles = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var els = arguments[1];
	  var rules = arguments[2];
	
	  var elements = void 0;
	  if (!(0, _isArray2.default)(els)) {
	    elements = [els];
	  } else {
	    elements = els;
	  }
	  (0, _forEach2.default)(elements, function (element) {
	    (0, _forEach2.default)(rules, function (value, prop) {
	      (0, _set2.default)(styles, element + "." + prop, value);
	    });
	  });
	  return styles;
	};
	
	// Wrap font names in quotes, unless the font name is actually a keyword.
	// See https://stackoverflow.com/a/13752149 and https://www.w3.org/TR/CSS2/fonts.html#font-family-prop
	var genericFontFamilies = ['inherit', 'default', 'serif', 'sans-serif', 'monospace', 'fantasy', 'cursive', '-apple-system'];
	var wrapFontFamily = function wrapFontFamily(fontFamily) {
	  return genericFontFamilies.indexOf(fontFamily) !== -1 ? fontFamily : "'" + fontFamily + "'";
	};
	
	module.exports = function (vr, options) {
	  var styles = {};
	
	  var _vr$establishBaseline = vr.establishBaseline(),
	      fontSize = _vr$establishBaseline.fontSize,
	      lineHeight = _vr$establishBaseline.lineHeight;
	
	  // Base HTML styles.
	
	
	  styles = setStyles(styles, "html", {
	    font: fontSize + "/" + lineHeight + " " + options.bodyFontFamily.map(wrapFontFamily).join(","),
	    boxSizing: "border-box",
	    overflowY: "scroll"
	  });
	
	  // box-sizing reset.
	  styles = setStyles(styles, ["*", "*:before", "*:after"], {
	    boxSizing: "inherit"
	  });
	
	  // Base body styles.
	  styles = setStyles(styles, "body", {
	    color: options.bodyColor,
	    fontFamily: options.bodyFontFamily.map(wrapFontFamily).join(","),
	    fontWeight: options.bodyWeight,
	    wordWrap: "break-word",
	    fontKerning: "normal",
	    MozFontFeatureSettings: '"kern", "liga", "clig", "calt"',
	    msFontFeatureSettings: '"kern", "liga", "clig", "calt"',
	    WebkitFontFeatureSettings: '"kern", "liga", "clig", "calt"',
	    fontFeatureSettings: '"kern", "liga", "clig", "calt"'
	  });
	
	  // Make images responsive.
	  styles = setStyles(styles, "img", {
	    maxWidth: "100%"
	  });
	
	  // All block elements get one rhythm of bottom margin by default
	  // or whatever is passed in as option.
	  var blockMarginBottom = "";
	  if ((0, _isNumber2.default)(options.blockMarginBottom)) {
	    blockMarginBottom = vr.rhythm(options.blockMarginBottom);
	  } else if ((0, _isString2.default)(options.blockMarginBottom)) {
	    blockMarginBottom = options.blockMarginBottom;
	  } else {
	    blockMarginBottom = vr.rhythm(1);
	  }
	  styles = setStyles(styles, ["h1", "h2", "h3", "h4", "h5", "h6", "hgroup", "ul", "ol", "dl", "dd", "p", "figure", "pre", "table", "fieldset", "blockquote", "form", "noscript", "iframe", "img", "hr", "address"], {
	    // Reset margin/padding to 0.
	    marginLeft: 0,
	    marginRight: 0,
	    marginTop: 0,
	    paddingBottom: 0,
	    paddingLeft: 0,
	    paddingRight: 0,
	    paddingTop: 0,
	    marginBottom: blockMarginBottom
	  });
	
	  // Basic blockquote styles.
	  styles = setStyles(styles, "blockquote", {
	    marginRight: vr.rhythm(1),
	    marginBottom: blockMarginBottom,
	    marginLeft: vr.rhythm(1)
	  });
	
	  // b, strong.
	  styles = setStyles(styles, ["b", "strong", "dt", "th"], {
	    fontWeight: options.boldWeight
	  });
	
	  // hr.
	  styles = setStyles(styles, "hr", {
	    background: (0, _grayPercentage2.default)(80),
	    border: "none",
	    height: "1px",
	    marginBottom: "calc(" + blockMarginBottom + " - 1px)"
	  });
	
	  // ol, ul.
	  styles = setStyles(styles, ["ol", "ul"], {
	    listStylePosition: "outside",
	    listStyleImage: "none",
	    marginLeft: vr.rhythm(1)
	  });
	
	  // li.
	  styles = setStyles(styles, "li", {
	    marginBottom: "calc(" + blockMarginBottom + " / 2)"
	  });
	
	  // Remove default padding on list items.
	  styles = setStyles(styles, ["ol li", "ul li"], {
	    paddingLeft: 0
	  });
	
	  // children ol, ul.
	  styles = setStyles(styles, ["li > ol", "li > ul"], {
	    marginLeft: vr.rhythm(1),
	    marginBottom: "calc(" + blockMarginBottom + " / 2)",
	    marginTop: "calc(" + blockMarginBottom + " / 2)"
	  });
	
	  // Remove margin-bottom on the last-child of a few block elements
	  // The worst offender of this seems to be markdown => html compilers
	  // as they put paragraphs within LIs amoung other oddities.
	  styles = setStyles(styles, ["blockquote *:last-child", "li *:last-child", "p *:last-child"], {
	    marginBottom: 0
	  });
	
	  // Ensure li > p is 1/2 margin — this is another markdown => compiler oddity.
	  styles = setStyles(styles, ["li > p"], {
	    marginBottom: "calc(" + blockMarginBottom + " / 2)"
	  });
	
	  // Make generally smaller elements, smaller.
	  styles = setStyles(styles, ["code", "kbd", "pre", "samp"], _extends({}, vr.adjustFontSizeTo("85%")));
	
	  // Abbr, Acronym.
	  styles = setStyles(styles, ["abbr", "acronym"], {
	    borderBottom: "1px dotted " + (0, _grayPercentage2.default)(50),
	    cursor: "help"
	  });
	  styles["abbr[title]"] = {
	    borderBottom: "1px dotted " + (0, _grayPercentage2.default)(50),
	    cursor: "help",
	    textDecoration: "none"
	  };
	
	  // Table styles.
	  styles = setStyles(styles, ["table"], _extends({}, vr.adjustFontSizeTo(options.baseFontSize), {
	    borderCollapse: "collapse",
	    width: "100%"
	  }));
	  styles = setStyles(styles, ["thead"], {
	    textAlign: "left"
	  });
	  styles = setStyles(styles, ["td,th"], {
	    textAlign: "left",
	    borderBottom: "1px solid " + (0, _grayPercentage2.default)(88),
	    fontFeatureSettings: '"tnum"',
	    MozFontFeatureSettings: '"tnum"',
	    msFontFeatureSettings: '"tnum"',
	    WebkitFontFeatureSettings: '"tnum"',
	    paddingLeft: vr.rhythm(2 / 3),
	    paddingRight: vr.rhythm(2 / 3),
	    paddingTop: vr.rhythm(1 / 2),
	    paddingBottom: "calc(" + vr.rhythm(1 / 2) + " - 1px)"
	  });
	  styles = setStyles(styles, "th:first-child,td:first-child", {
	    paddingLeft: 0
	  });
	  styles = setStyles(styles, "th:last-child,td:last-child", {
	    paddingRight: 0
	  });
	
	  // Create styles for headers.
	  styles = setStyles(styles, ["h1", "h2", "h3", "h4", "h5", "h6"], {
	    color: options.headerColor,
	    fontFamily: options.headerFontFamily.map(wrapFontFamily).join(","),
	    fontWeight: options.headerWeight,
	    textRendering: "optimizeLegibility"
	  });
	
	  // Set header sizes.
	  var h1 = vr.scale(5 / 5);
	  var h2 = vr.scale(3 / 5);
	  var h3 = vr.scale(2 / 5);
	  var h4 = vr.scale(0 / 5);
	  var h5 = vr.scale(-1 / 5);
	  var h6 = vr.scale(-1.5 / 5);
	
	  (0, _forEach2.default)([h1, h2, h3, h4, h5, h6], function (header, i) {
	    styles = (0, _set2.default)(styles, "h" + (i + 1) + ".fontSize", header.fontSize);
	    styles = (0, _set2.default)(styles, "h" + (i + 1) + ".lineHeight", options.headerLineHeight);
	  });
	
	  // TODO add support for Breakpoints here.
	
	  // Call plugins if any.
	  if ((0, _isArray2.default)(options.plugins)) {
	    styles = (0, _reduce2.default)(options.plugins, function (stylesObj, plugin) {
	      return (0, _merge2.default)(stylesObj, plugin(vr, options, stylesObj));
	    }, styles);
	  }
	
	  // Call overrideStyles function on options (if set).
	  if (options.overrideStyles && (0, _isFunction2.default)(options.overrideStyles)) {
	    styles = (0, _merge2.default)(styles, options.overrideStyles(vr, options, styles));
	  }
	
	  // Call overrideThemeStyles function on options (if set).
	  if (options.overrideThemeStyles && (0, _isFunction2.default)(options.overrideThemeStyles)) {
	    styles = (0, _merge2.default)(styles, options.overrideThemeStyles(vr, options, styles));
	  }
	
	  return styles;
	};

/***/ })
]);
//# sourceMappingURL=app-e02005b991f23457825f.js.map