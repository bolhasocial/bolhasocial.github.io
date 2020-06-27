webpackJsonp([213534597649335],{

/***/ 697:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "static/hero.132f1974.png";

/***/ }),

/***/ 142:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactReveal = __webpack_require__(29);
	
	var _PrimaryButton = __webpack_require__(68);
	
	var _PrimaryButton2 = _interopRequireDefault(_PrimaryButton);
	
	var _HeroModule = __webpack_require__(178);
	
	var _HeroModule2 = _interopRequireDefault(_HeroModule);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Hero = function Hero(_ref) {
	  var image = _ref.image,
	      title = _ref.title,
	      body = _ref.body,
	      isLeftImage = _ref.isLeftImage,
	      linkTitle = _ref.linkTitle,
	      linkUrl = _ref.linkUrl;
	  return _react2.default.createElement(
	    'div',
	    { className: '' + (isLeftImage ? _HeroModule2.default.wrapperLeft : _HeroModule2.default.wrapper) },
	    _react2.default.createElement(_reactReveal.Fade, { down: true }),
	    isLeftImage ? _react2.default.createElement(
	      _react.Fragment,
	      null,
	      _react2.default.createElement(
	        'div',
	        { className: _HeroModule2.default.mainLeft },
	        _react2.default.createElement(
	          'div',
	          { className: _HeroModule2.default.heroTextLeft },
	          title && _react2.default.createElement(
	            'h2',
	            null,
	            title
	          ),
	          body.map(function (item, index) {
	            return _react2.default.createElement(
	              'p',
	              { key: 'body-' + index, className: _HeroModule2.default.body },
	              item
	            );
	          })
	        ),
	        linkTitle && linkUrl && _react2.default.createElement(_PrimaryButton2.default, { isLink: true, title: linkTitle, linkTo: linkUrl })
	      ),
	      _react2.default.createElement('img', { className: _HeroModule2.default.heroImageLeft, src: image })
	    ) : _react2.default.createElement(
	      _react.Fragment,
	      null,
	      _react2.default.createElement('img', { className: _HeroModule2.default.heroImage, src: image }),
	      _react2.default.createElement(
	        'div',
	        { className: _HeroModule2.default.main },
	        _react2.default.createElement(
	          'div',
	          { className: _HeroModule2.default.heroText },
	          title && _react2.default.createElement(
	            'h2',
	            null,
	            title
	          ),
	          body.map(function (item, index) {
	            return _react2.default.createElement(
	              'p',
	              { key: 'body-' + index, className: _HeroModule2.default.body },
	              item
	            );
	          })
	        ),
	        linkTitle && linkUrl && _react2.default.createElement(_PrimaryButton2.default, { isLink: true, title: linkTitle, linkTo: linkUrl })
	      )
	    )
	  );
	};
	
	exports.default = Hero;
	module.exports = exports['default'];

/***/ }),

/***/ 178:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"wrapper":"src-components-Hero----Hero-module---wrapper---1ihuP","wrapperLeft":"src-components-Hero----Hero-module---wrapperLeft---OJm3K","heroImageLeft":"src-components-Hero----Hero-module---heroImageLeft---3nKf8","heroImage":"src-components-Hero----Hero-module---heroImage---rPgTq","main":"src-components-Hero----Hero-module---main---19jD5","mainLeft":"src-components-Hero----Hero-module---mainLeft---2yZlg","body":"src-components-Hero----Hero-module---body---2eA8z"};

/***/ }),

/***/ 364:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _reactReveal = __webpack_require__(29);
	
	var _PrimaryButton = __webpack_require__(68);
	
	var _PrimaryButton2 = _interopRequireDefault(_PrimaryButton);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _hero = __webpack_require__(697);
	
	var _hero2 = _interopRequireDefault(_hero);
	
	var _HomeHeroModule = __webpack_require__(491);
	
	var _HomeHeroModule2 = _interopRequireDefault(_HomeHeroModule);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var HomeHero = function HomeHero() {
	  return _react2.default.createElement(
	    'div',
	    { className: _HomeHeroModule2.default.wrapper },
	    _react2.default.createElement(_reactReveal.Fade, { down: true }),
	    _react2.default.createElement('img', { className: _HomeHeroModule2.default.heroImage, src: _hero2.default }),
	    _react2.default.createElement(
	      'div',
	      { className: _HomeHeroModule2.default.heroText },
	      _react2.default.createElement(
	        'h2',
	        null,
	        'Qual \xE9 a sua bolha?'
	      ),
	      _react2.default.createElement(
	        'p',
	        { className: _HomeHeroModule2.default.body },
	        'As grandes empresas sabem tudo sobre voc\xEA. O que voc\xEA compra, o que voc\xEA gosta de comer, se vai \xE0 academia, qual sua banda favorita, sua cor favorita... Existem muitos dados sobre voc\xEA na rede e eles n\xE3o s\xE3o aparentes. Por isso essa iniciativa foi criada!'
	      ),
	      _react2.default.createElement(
	        'p',
	        { className: _HomeHeroModule2.default.body },
	        'Quer descobrir qual \xE9 a sua bolha e como voc\xEA usa a internet? Instale a extens\xE3o e tenha acesso aos seus pr\xF3prios dados.'
	      ),
	      _react2.default.createElement(_PrimaryButton2.default, {
	        isLink: true,
	        title: 'Instale a extens\xE3o',
	        linkTo: 'https://chrome.google.com/webstore/detail/kallcfbeikglpoaapgfldobcfkgdcfle/'
	      })
	    )
	  );
	};
	
	exports.default = HomeHero;
	module.exports = exports['default'];

/***/ }),

/***/ 491:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"wrapper":"src-components-HomeHero----HomeHero-module---wrapper---eAayj","heroImage":"src-components-HomeHero----HomeHero-module---heroImage---3ckKt","heroText":"src-components-HomeHero----HomeHero-module---heroText---2r0-4","body":"src-components-HomeHero----HomeHero-module---body---352eq"};

/***/ }),

/***/ 377:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _Footer = __webpack_require__(36);
	
	var _Footer2 = _interopRequireDefault(_Footer);
	
	var _reactHelmet = __webpack_require__(17);
	
	var _reactHelmet2 = _interopRequireDefault(_reactHelmet);
	
	var _Hero = __webpack_require__(142);
	
	var _Hero2 = _interopRequireDefault(_Hero);
	
	var _HomeHero = __webpack_require__(364);
	
	var _HomeHero2 = _interopRequireDefault(_HomeHero);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _SiteConfig = __webpack_require__(10);
	
	var _SiteConfig2 = _interopRequireDefault(_SiteConfig);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Index = function Index(props) {
	  return _react2.default.createElement(
	    'div',
	    { className: 'container index-container' },
	    _react2.default.createElement(
	      _reactHelmet2.default,
	      null,
	      _react2.default.createElement(
	        'title',
	        null,
	        _SiteConfig2.default.siteTitle
	      )
	    ),
	    _react2.default.createElement(_HomeHero2.default, null),
	    _react2.default.createElement(_Footer2.default, null)
	  );
	};
	
	exports.default = Index;
	module.exports = exports['default'];

/***/ })

});
//# sourceMappingURL=component---src-pages-index-jsx-bf527166f7318e725143.js.map