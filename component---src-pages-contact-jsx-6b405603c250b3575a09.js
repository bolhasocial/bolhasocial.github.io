webpackJsonp([58411574672382],{

/***/ 69:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(40);
	
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

/***/ 145:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactReveal = __webpack_require__(29);
	
	var _HeaderModule = __webpack_require__(181);
	
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

/***/ 181:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"header":"src-components-Header----Header-module---header---2gV_n"};

/***/ }),

/***/ 410:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactHelmet = __webpack_require__(17);
	
	var _reactHelmet2 = _interopRequireDefault(_reactHelmet);
	
	var _Header = __webpack_require__(145);
	
	var _Header2 = _interopRequireDefault(_Header);
	
	var _Container = __webpack_require__(69);
	
	var _Container2 = _interopRequireDefault(_Container);
	
	var _Footer = __webpack_require__(36);
	
	var _Footer2 = _interopRequireDefault(_Footer);
	
	var _SiteConfig = __webpack_require__(10);
	
	var _SiteConfig2 = _interopRequireDefault(_SiteConfig);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Contact = function Contact() {
	  return _react2.default.createElement(
	    'div',
	    { className: 'container contact-container' },
	    _react2.default.createElement(_reactHelmet2.default, { title: 'Contact | ' + _SiteConfig2.default.siteTitle }),
	    _react2.default.createElement(
	      _Header2.default,
	      null,
	      'Contact'
	    ),
	    _react2.default.createElement(
	      _Container2.default,
	      { text: true },
	      _react2.default.createElement(
	        'h1',
	        null,
	        'Contact me!'
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
	
	exports.default = Contact;
	module.exports = exports['default'];

/***/ })

});
//# sourceMappingURL=component---src-pages-contact-jsx-6b405603c250b3575a09.js.map