webpackJsonp([213534597649335],{

/***/ 695:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "static/hero.132f1974.png";

/***/ }),

/***/ 361:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactReveal = __webpack_require__(23);
	
	var _HomeHeroModule = __webpack_require__(490);
	
	var _HomeHeroModule2 = _interopRequireDefault(_HomeHeroModule);
	
	var _hero = __webpack_require__(695);
	
	var _hero2 = _interopRequireDefault(_hero);
	
	var _PrimaryButton = __webpack_require__(69);
	
	var _PrimaryButton2 = _interopRequireDefault(_PrimaryButton);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var HomeHero = function HomeHero() {
	  return _react2.default.createElement(
	    "div",
	    { className: _HomeHeroModule2.default.wrapper },
	    _react2.default.createElement(_reactReveal.Fade, { down: true }),
	    _react2.default.createElement("img", { className: _HomeHeroModule2.default.heroImage, src: _hero2.default }),
	    _react2.default.createElement(
	      "div",
	      { className: _HomeHeroModule2.default.heroText },
	      _react2.default.createElement(
	        "h2",
	        null,
	        "Qual \xE9 a sua bolha?"
	      ),
	      _react2.default.createElement(
	        "p",
	        { className: _HomeHeroModule2.default.body },
	        "As grandes empresas sabem tudo sobre voc\xEA. O que voc\xEA compra, o que voc\xEA gosta de comer, se vai \xE0 academia, qual sua banda favorita, sua cor favorita... Existem muitos dados sobre voc\xEA na rede e eles n\xE3o s\xE3o aparentes. Por isso essa iniciativa foi criada!"
	      ),
	      _react2.default.createElement(
	        "p",
	        { className: _HomeHeroModule2.default.body },
	        "Quer descobrir qual \xE9 a sua bolha e como voc\xEA usa a internet? Instale a extens\xE3o e tenha acesso aos seus pr\xF3prios dados."
	      ),
	      _react2.default.createElement(_PrimaryButton2.default, {
	        isLink: true,
	        title: "Instale a extens\xE3o",
	        linkTo: "https://chrome.google.com/webstore/detail/kallcfbeikglpoaapgfldobcfkgdcfle/"
	      })
	    )
	  );
	};
	
	exports.default = HomeHero;
	module.exports = exports["default"];

/***/ }),

/***/ 490:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"wrapper":"src-components-HomeHero----HomeHero-module---wrapper---eAayj","heroImage":"src-components-HomeHero----HomeHero-module---heroImage---3ckKt","heroText":"src-components-HomeHero----HomeHero-module---heroText---2r0-4","body":"src-components-HomeHero----HomeHero-module---body---352eq"};

/***/ }),

/***/ 69:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactReveal = __webpack_require__(23);
	
	var _PrimaryButtonModule = __webpack_require__(84);
	
	var _PrimaryButtonModule2 = _interopRequireDefault(_PrimaryButtonModule);
	
	var _gatsbyLink = __webpack_require__(45);
	
	var _gatsbyLink2 = _interopRequireDefault(_gatsbyLink);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var PrimaryButton = function PrimaryButton(_ref) {
	  var isLink = _ref.isLink,
	      linkTo = _ref.linkTo,
	      title = _ref.title,
	      isActive = _ref.isActive,
	      icon = _ref.icon;
	
	  return isLink ? _react2.default.createElement(
	    "a",
	    {
	      className: _PrimaryButtonModule2.default.primaryButton + " " + (isActive ? _PrimaryButtonModule2.default.active : "") + (icon ? _PrimaryButtonModule2.default.buttonIcon : ""),
	      href: linkTo,
	      target: "_blank" },
	    title,
	    icon && _react2.default.createElement(
	      "div",
	      { className: _PrimaryButtonModule2.default.icon },
	      _react2.default.createElement("img", { src: icon })
	    )
	  ) : _react2.default.createElement(
	    _gatsbyLink2.default,
	    { to: linkTo },
	    _react2.default.createElement(
	      "button",
	      {
	        className: _PrimaryButtonModule2.default.primaryButton + " " + (isActive ? _PrimaryButtonModule2.default.active : ""),
	        type: "button" },
	      title
	    )
	  );
	};
	
	exports.default = PrimaryButton;
	module.exports = exports["default"];

/***/ }),

/***/ 84:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"primaryButton":"src-components-PrimaryButton----PrimaryButton-module---primaryButton---3_j88","buttonIcon":"src-components-PrimaryButton----PrimaryButton-module---buttonIcon---3svYU","active":"src-components-PrimaryButton----PrimaryButton-module---active---3Wvrg","icon":"src-components-PrimaryButton----PrimaryButton-module---icon---22jTR"};

/***/ }),

/***/ 374:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactHelmet = __webpack_require__(17);
	
	var _reactHelmet2 = _interopRequireDefault(_reactHelmet);
	
	var _SiteConfig = __webpack_require__(10);
	
	var _SiteConfig2 = _interopRequireDefault(_SiteConfig);
	
	var _HomeHero = __webpack_require__(361);
	
	var _HomeHero2 = _interopRequireDefault(_HomeHero);
	
	var _Footer = __webpack_require__(36);
	
	var _Footer2 = _interopRequireDefault(_Footer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Index = function Index(props) {
	  return _react2.default.createElement(
	    "div",
	    { className: "container index-container" },
	    _react2.default.createElement(
	      _reactHelmet2.default,
	      null,
	      _react2.default.createElement(
	        "title",
	        null,
	        _SiteConfig2.default.siteTitle
	      )
	    ),
	    _react2.default.createElement(_HomeHero2.default, null),
	    _react2.default.createElement(_Footer2.default, null)
	  );
	};
	
	exports.default = Index;
	module.exports = exports["default"];

/***/ })

});
//# sourceMappingURL=component---src-pages-index-jsx-69f8b294a405b379045d.js.map