webpackJsonp([62865255398775],{

/***/ 760:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "static/what1-hero.fb4e5fa1.png";

/***/ }),

/***/ 761:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "static/what2-hero.5d8f7415.png";

/***/ }),

/***/ 762:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "static/what3-hero.7bb77c94.png";

/***/ }),

/***/ 763:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "static/what4-hero.93fb0311.png";

/***/ }),

/***/ 764:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "static/what5-hero.10a899ab.png";

/***/ }),

/***/ 146:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactReveal = __webpack_require__(29);
	
	var _PrimaryButton = __webpack_require__(37);
	
	var _PrimaryButton2 = _interopRequireDefault(_PrimaryButton);
	
	var _HeroModule = __webpack_require__(182);
	
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
	            { className: _HeroModule2.default.title },
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
	            { className: _HeroModule2.default.title },
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

/***/ 182:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"wrapper":"src-components-Hero----Hero-module---wrapper---1ihuP","wrapperLeft":"src-components-Hero----Hero-module---wrapperLeft---OJm3K","heroImageLeft":"src-components-Hero----Hero-module---heroImageLeft---3nKf8","heroImage":"src-components-Hero----Hero-module---heroImage---rPgTq","main":"src-components-Hero----Hero-module---main---19jD5","mainLeft":"src-components-Hero----Hero-module---mainLeft---2yZlg","body":"src-components-Hero----Hero-module---body---2eA8z","title":"src-components-Hero----Hero-module---title---9bx6t"};

/***/ }),

/***/ 412:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _Footer = __webpack_require__(36);
	
	var _Footer2 = _interopRequireDefault(_Footer);
	
	var _reactHelmet = __webpack_require__(17);
	
	var _reactHelmet2 = _interopRequireDefault(_reactHelmet);
	
	var _Hero = __webpack_require__(146);
	
	var _Hero2 = _interopRequireDefault(_Hero);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _SiteConfig = __webpack_require__(10);
	
	var _SiteConfig2 = _interopRequireDefault(_SiteConfig);
	
	var _what1Hero = __webpack_require__(760);
	
	var _what1Hero2 = _interopRequireDefault(_what1Hero);
	
	var _what2Hero = __webpack_require__(761);
	
	var _what2Hero2 = _interopRequireDefault(_what2Hero);
	
	var _what3Hero = __webpack_require__(762);
	
	var _what3Hero2 = _interopRequireDefault(_what3Hero);
	
	var _what4Hero = __webpack_require__(763);
	
	var _what4Hero2 = _interopRequireDefault(_what4Hero);
	
	var _what5Hero = __webpack_require__(764);
	
	var _what5Hero2 = _interopRequireDefault(_what5Hero);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var What = function What() {
	  return _react2.default.createElement(
	    'div',
	    { className: 'container about-container' },
	    _react2.default.createElement(_reactHelmet2.default, { title: 'O que \xE9 a bolha social? | ' + _SiteConfig2.default.siteTitle }),
	    _react2.default.createElement(_Hero2.default, {
	      title: 'O que é a bolha social?',
	      body: ['Já percebeu que, quando você acessa a internet, você começa a ter um fluxo não linear de informações?', 'Uma pesquisa simples que, inicialmente, poderia ser rápida, mas quando você percebe, já se passaram três horas e agora seu navegador está no Youtube reproduzindo um vídeo de pandas risonhos.'],
	      image: _what1Hero2.default
	    }),
	    _react2.default.createElement(_Hero2.default, {
	      isLeftImage: true,
	      body: ['Ficamos tão imersos na navegação que não percebemos mais quais páginas acessamos ou temos alguma lembrança do conteúdo que consumimos. E daí?'],
	      image: _what2Hero2.default
	    }),
	    _react2.default.createElement(_Hero2.default, {
	      body: ['Imersos, nós clicamos em páginas e mais páginas de assuntos do nosso interesse. E, no fim das contas, ficamos mais tempo do que geralmente gostaríamos, pois os algoritmos são muito bons em nos recomendar temas que, através do nosso perfil ou de histórico de busca, nos seduzem e nos mantém vidrados.'],
	      image: _what3Hero2.default
	    }),
	    _react2.default.createElement(_Hero2.default, {
	      isLeftImage: true,
	      body: ['Na bolha social, você tem acesso ao seu próprio consumo de conteúdo. Ou seja, parte do que os algoritmos sabem sobre você está sendo disponibilizado para o seu autoconhecimento.', 'Assim, você pode entender de como é composta a sua bolha de conteúdo e comparar com a de todos que participaram desse experimento.'],
	      image: _what4Hero2.default
	    }),
	    _react2.default.createElement(_Hero2.default, {
	      body: ['Além de descobrir mais sobre a sua bolha, ao ver o comparativo, o usuário estoura a bolha. Uma vez que ele tem consciência, na prática, que existe outra configuração de consumo do  conteúdo que não a sua.'],
	      image: _what5Hero2.default,
	      linkTitle: 'baixe aqui e estoure a sua bolha!',
	      linkUrl: 'https://chrome.google.com/webstore/detail/kallcfbeikglpoaapgfldobcfkgdcfle/'
	    }),
	    _react2.default.createElement(_Footer2.default, null)
	  );
	};
	
	exports.default = What;
	module.exports = exports['default'];

/***/ })

});
//# sourceMappingURL=component---src-pages-o-que-e-a-bolha-jsx-325e8326922afdaf25c9.js.map