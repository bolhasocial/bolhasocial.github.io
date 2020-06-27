webpackJsonp([143687897102401],{

/***/ 72:
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2016 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */
	
	(function () {
		'use strict';
	
		var hasOwn = {}.hasOwnProperty;
	
		function classNames () {
			var classes = [];
	
			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;
	
				var argType = typeof arg;
	
				if (argType === 'string' || argType === 'number') {
					classes.push(arg);
				} else if (Array.isArray(arg)) {
					classes.push(classNames.apply(null, arg));
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				}
			}
	
			return classes.join(' ');
		}
	
		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	}());


/***/ }),

/***/ 67:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(72);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _ContainerModule = __webpack_require__(83);
	
	var _ContainerModule2 = _interopRequireDefault(_ContainerModule);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Container = function Container(props) {
	  var _cx;
	
	  var children = props.children;
	
	  var classes = (0, _classnames2.default)(_ContainerModule2.default.container, (_cx = {}, _cx[_ContainerModule2.default.text] = props.text, _cx));
	  return _react2.default.createElement(
	    'div',
	    { className: classes },
	    children
	  );
	};
	
	exports.default = Container;
	module.exports = exports['default'];

/***/ }),

/***/ 83:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"container":"src-components-Container----Container-module---container---3KHiT","text":"src-components-Container----Container-module---text---2-KQ0"};

/***/ }),

/***/ 141:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactReveal = __webpack_require__(29);
	
	var _HeaderModule = __webpack_require__(177);
	
	var _HeaderModule2 = _interopRequireDefault(_HeaderModule);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Header = function Header(_ref) {
	  var children = _ref.children;
	  return _react2.default.createElement(
	    'div',
	    { className: _HeaderModule2.default.header },
	    _react2.default.createElement(
	      _reactReveal.Fade,
	      { down: true, tag: 'h1' },
	      children
	    )
	  );
	};
	
	exports.default = Header;
	module.exports = exports['default'];

/***/ }),

/***/ 177:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"header":"src-components-Header----Header-module---header---2gV_n"};

/***/ }),

/***/ 375:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactHelmet = __webpack_require__(17);
	
	var _reactHelmet2 = _interopRequireDefault(_reactHelmet);
	
	var _Header = __webpack_require__(141);
	
	var _Header2 = _interopRequireDefault(_Header);
	
	var _Container = __webpack_require__(67);
	
	var _Container2 = _interopRequireDefault(_Container);
	
	var _Footer = __webpack_require__(36);
	
	var _Footer2 = _interopRequireDefault(_Footer);
	
	var _SiteConfig = __webpack_require__(10);
	
	var _SiteConfig2 = _interopRequireDefault(_SiteConfig);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var About = function About() {
	  return _react2.default.createElement(
	    'div',
	    { className: 'container about-container' },
	    _react2.default.createElement(_reactHelmet2.default, { title: 'About | ' + _SiteConfig2.default.siteTitle }),
	    _react2.default.createElement(
	      _Header2.default,
	      null,
	      'About'
	    ),
	    _react2.default.createElement(
	      _Container2.default,
	      { text: true },
	      _react2.default.createElement(
	        'h1',
	        null,
	        'Hi!'
	      ),
	      _react2.default.createElement(
	        'p',
	        null,
	        'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar. The Big Oxmox advised her not to do so, because there were thousands.'
	      )
	    ),
	    _react2.default.createElement(_Footer2.default, null)
	  );
	};
	
	exports.default = About;
	module.exports = exports['default'];

/***/ })

});
//# sourceMappingURL=component---src-pages-bubble-jsx-9d939ca134dbbc592648.js.map