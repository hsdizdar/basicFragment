'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var tslib_es6 = require('../../node_modules/tslib/tslib.es6.js');
var React = require('react');
var React__default = _interopDefault(React);
var styled = require('styled-components');
var styled__default = _interopDefault(styled);

/* only server side render */
var StyledWrapper = styled__default.div(templateObject_1 || (templateObject_1 = tslib_es6.__makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  justify-content: space-evenly;\n  flex-direction: column;\n  width: 100vw;\n  height: 100vh;\n  background-color: antiquewhite;\n"], ["\n  display: flex;\n  align-items: center;\n  justify-content: space-evenly;\n  flex-direction: column;\n  width: 100vw;\n  height: 100vh;\n  background-color: antiquewhite;\n"])));
var StyledMessage = styled__default.p(templateObject_2 || (templateObject_2 = tslib_es6.__makeTemplateObject(["\n  color: #333;\n  font-size: 25px;\n"], ["\n  color: #333;\n  font-size: 25px;\n"])));
var StyledLink = styled__default.a(templateObject_3 || (templateObject_3 = tslib_es6.__makeTemplateObject(["\n  color: #000;\n  font-size: 25px;\n  text-decoration: underline;\n"], ["\n  color: #000;\n  font-size: 25px;\n  text-decoration: underline;\n"])));

var NotFound = function NotFound() {
  return /*#__PURE__*/React__default.createElement(StyledWrapper, null, /*#__PURE__*/React__default.createElement(StyledMessage, null, "No match"), /*#__PURE__*/React__default.createElement(StyledLink, {
    href: "/"
  }, "Goto Homepage"));
};
var templateObject_1, templateObject_2, templateObject_3;

exports.default = NotFound;
//# sourceMappingURL=NotFound.js.map
