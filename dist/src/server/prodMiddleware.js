'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var tslib_es6 = require('../../node_modules/tslib/tslib.es6.js');
var React = require('react');
var React__default = _interopDefault(React);
var styled = require('styled-components');
var styled__default = _interopDefault(styled);
var server = require('react-dom/server');
var reactRouterDom = require('react-router-dom');
var App = require('../shared/App.js');
var _package = require('../../package.js');

var FragmentResponseType;

(function (FragmentResponseType) {
  FragmentResponseType["State"] = "state";
  FragmentResponseType["Script"] = "script";
  FragmentResponseType["Style"] = "style";
  FragmentResponseType["Content"] = "content";
})(FragmentResponseType || (FragmentResponseType = {}));

var writeFragmentResponse = function writeFragmentResponse(res, type, content) {
  res.write(JSON.stringify({
    name: _package.default.name,
    type: type,
    content: content
  }));
};

var prodMiddleware = function prodMiddleware(req, res, next) {
  return tslib_es6.__awaiter(void 0, void 0, void 0, function () {
    var sheet, Markup, styledMarkup, bodyStream;
    return tslib_es6.__generator(this, function (_a) {
      res.setHeader('Content-Type', 'application/json');
      sheet = new styled.ServerStyleSheet();
      Markup = /*#__PURE__*/React__default.createElement(reactRouterDom.StaticRouter, {
        location: req.url
      }, /*#__PURE__*/React__default.createElement(App.default, null)); // Apollo initial state

      try {
        styledMarkup = sheet.collectStyles(Markup);
        bodyStream = sheet.interleaveWithNodeStream(server.renderToNodeStream(styledMarkup));
        writeFragmentResponse(res, FragmentResponseType.Content, "<div id=\"eft\">");
        bodyStream.on('data', function (chunk) {
          return tslib_es6.__awaiter(void 0, void 0, void 0, function () {
            return tslib_es6.__generator(this, function (_a) {
              return [2
              /*return*/
              , writeFragmentResponse(res, FragmentResponseType.Content, chunk.toString())];
            });
          });
        });
        bodyStream.on('end', function () {
          writeFragmentResponse(res, FragmentResponseType.Content, "</div>");
          writeFragmentResponse(res, FragmentResponseType.Script, "http://localhost:81/" + _package.default.name + ".js");
          res.end();
        });
        bodyStream.on('error', function (err) {
          console.error('react render error:', err);
        });
      } catch (error) {
        console.log('error', error);
        next(error);
      }

      return [2
      /*return*/
      ];
    });
  });
};

exports.default = prodMiddleware;
//# sourceMappingURL=prodMiddleware.js.map
