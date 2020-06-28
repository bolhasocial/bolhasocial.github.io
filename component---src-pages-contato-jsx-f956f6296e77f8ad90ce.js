webpackJsonp([134177184806937],{

/***/ 749:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "static/contact-hero2.532f3ed8.png";

/***/ }),

/***/ 394:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.default = Form;
	
	var _PrimaryButton = __webpack_require__(36);
	
	var _PrimaryButton2 = _interopRequireDefault(_PrimaryButton);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _FormModule = __webpack_require__(531);
	
	var _FormModule2 = _interopRequireDefault(_FormModule);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function Form(_ref) {
	  var onsubmit = _ref.onsubmit;
	
	  var _useState = (0, _react.useState)(''),
	      name = _useState[0],
	      setName = _useState[1];
	
	  var _useState2 = (0, _react.useState)(''),
	      email = _useState2[0],
	      setEmail = _useState2[1];
	
	  var _useState3 = (0, _react.useState)(''),
	      phone = _useState3[0],
	      setPhone = _useState3[1];
	
	  var _useState4 = (0, _react.useState)(''),
	      message = _useState4[0],
	      setMessage = _useState4[1];
	
	  function handleSubmit(event) {
	    event.preventDefault();
	    window.open('mailto:maristela@nmadigital.com?subject="Uma mensagem para Bolha Social"&body=' + name + '\n' + email + '\n' + phone + '\n' + message);
	    onsubmit();
	  }
	
	  return _react2.default.createElement(
	    'form',
	    { name: 'bolha', enctype: 'text/plain', onSubmit: handleSubmit },
	    _react2.default.createElement('input', {
	      'for': 'bolha',
	      value: name,
	      onChange: function onChange(event) {
	        event.persist();
	        setName(event.target.value);
	      },
	      className: _FormModule2.default.inputText,
	      placeholder: 'Nome'
	    }),
	    _react2.default.createElement('input', {
	      'for': 'bolha',
	      onChange: function onChange(event) {
	        event.persist();
	        setEmail(event.target.value);
	      },
	      className: _FormModule2.default.inputText,
	      type: 'email',
	      value: email,
	      placeholder: 'Email'
	    }),
	    _react2.default.createElement('input', {
	      'for': 'bolha',
	      onChange: function onChange(event) {
	        event.persist();
	        setPhone(event.target.value);
	      },
	      className: _FormModule2.default.inputText,
	      type: 'tel',
	      value: phone,
	      placeholder: 'Telefone'
	    }),
	    _react2.default.createElement('textarea', {
	      'for': 'bolha',
	      value: message,
	      onChange: function onChange(event) {
	        event.persist();
	        setMessage(event.target.value);
	      },
	      className: _FormModule2.default.inputTextarea,
	      placeholder: 'Mensagem'
	    }),
	    _react2.default.createElement(_PrimaryButton2.default, { isSubmit: true, title: 'ENVIAR' })
	  );
	}
	module.exports = exports['default'];

/***/ }),

/***/ 531:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"inputTextarea":"src-components-Form----Form-module---inputTextarea---Zc3H1","inputText":"src-components-Form----Form-module---inputText---3y07Q"};

/***/ }),

/***/ 407:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Footer = __webpack_require__(35);
	
	var _Footer2 = _interopRequireDefault(_Footer);
	
	var _Form = __webpack_require__(394);
	
	var _Form2 = _interopRequireDefault(_Form);
	
	var _reactHelmet = __webpack_require__(22);
	
	var _reactHelmet2 = _interopRequireDefault(_reactHelmet);
	
	var _Hero = __webpack_require__(110);
	
	var _Hero2 = _interopRequireDefault(_Hero);
	
	var _SiteConfig = __webpack_require__(12);
	
	var _SiteConfig2 = _interopRequireDefault(_SiteConfig);
	
	var _contactHero = __webpack_require__(749);
	
	var _contactHero2 = _interopRequireDefault(_contactHero);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Contact = function Contact() {
	  var _useState = (0, _react.useState)(false),
	      isSubmitted = _useState[0],
	      setIsSubmitted = _useState[1];
	
	  return _react2.default.createElement(
	    'div',
	    { className: 'container contact-container' },
	    _react2.default.createElement(_reactHelmet2.default, { title: 'Contato | ' + _SiteConfig2.default.siteTitle }),
	    _react2.default.createElement(
	      _Hero2.default,
	      { isLeftImage: true, image: _contactHero2.default },
	      !isSubmitted ? _react2.default.createElement(
	        _react.Fragment,
	        null,
	        _react2.default.createElement(
	          'h2',
	          null,
	          'Entre em contato'
	        ),
	        _react2.default.createElement(_Form2.default, { onsubmit: function onsubmit() {
	            return setIsSubmitted(true);
	          } }),
	        ' '
	      ) : _react2.default.createElement(
	        'h2',
	        null,
	        'Obrigado!'
	      )
	    ),
	    _react2.default.createElement(_Footer2.default, null)
	  );
	};
	
	exports.default = Contact;
	module.exports = exports['default'];

/***/ })

});
//# sourceMappingURL=component---src-pages-contato-jsx-f956f6296e77f8ad90ce.js.map