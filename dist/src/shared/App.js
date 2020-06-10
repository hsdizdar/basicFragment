'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var tslib_es6 = require('../../node_modules/tslib/tslib.es6.js');
var React = require('react');
var React__default = _interopDefault(React);
var reactHooks = require('@apollo/react-hooks');
var ioc_react = require('../providers/ioc.react.js');
var routes = require('./routes.js');
var reactRouterDom = require('react-router-dom');
var _rollupPluginBabelHelpers = require('../../_virtual/_rollupPluginBabelHelpers.js');
require('../../node_modules/reflect-metadata/Reflect.js');
var errorBoundary = require('../errorBoundary.js');
var NotFound = require('./NotFound.js');
var config = require('../state/config.js');
var ioc = require('../providers/ioc.js');

var App = function App(props) {
  return /*#__PURE__*/React__default.createElement(ioc_react.Provider, {
    container: ioc.container
  }, /*#__PURE__*/React__default.createElement(reactHooks.ApolloProvider, {
    client: config.default
  }, /*#__PURE__*/React__default.createElement(errorBoundary.default, null, /*#__PURE__*/React__default.createElement(reactRouterDom.Switch, null, routes.default.map(function (_a) {
    var path = _a.path,
        exact = _a.exact,
        Component = _a.component,
        rest = tslib_es6.__rest(_a, ["path", "exact", "component"]);

    return /*#__PURE__*/React__default.createElement(reactRouterDom.Route, {
      key: path,
      path: path,
      exact: exact,
      render: function render(props) {
        return /*#__PURE__*/React__default.createElement(Component, _rollupPluginBabelHelpers.extends({}, props, rest));
      }
    });
  }), /*#__PURE__*/React__default.createElement(reactRouterDom.Route, {
    render: function render(props) {
      return /*#__PURE__*/React__default.createElement(NotFound.default, props);
    }
  })))));
};

exports.default = App;
//# sourceMappingURL=App.js.map
