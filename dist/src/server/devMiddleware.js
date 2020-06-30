'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var tslib_es6 = require('../../node_modules/tslib/tslib.es6.js');
var React = require('react');
var React__default = _interopDefault(React);
var client$1 = require('@apollo/client');
var styled = require('styled-components');
var styled__default = _interopDefault(styled);
var server = require('react-dom/server');
var reactRouterDom = require('react-router-dom');
var reactSsr = require('@apollo/react-ssr');
var config = require('../state/config.js');
var App = require('../shared/App.js');
var layout = require('./layout.js');

var fs = require('fs');

var dotenv = require('dotenv');

var devMiddleware = function devMiddleware(req, res, next, createLogger) {
  return tslib_es6.__awaiter(void 0, void 0, void 0, function () {
    var initialState, envConfig, k, k, sheet, Markup, styledMarkup, bodyStream;
    return tslib_es6.__generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          initialState = config.default.extract();

          if (req.query.env) {
            envConfig = void 0;

            if (req.query.env === 'prod') {
              envConfig = dotenv.parse(fs.readFileSync('.env.prod'));

              for (k in envConfig) {
                process.env[k] = envConfig[k];
              }

              initialState.ROOT_QUERY.process = 'PROD';
              createLogger();
            } else {
              envConfig = dotenv.parse(fs.readFileSync('.env.dev'));

              for (k in envConfig) {
                process.env[k] = envConfig[k];
              }

              initialState.ROOT_QUERY.process = 'DEV';
              createLogger();
            }
          }

          sheet = new styled.ServerStyleSheet();
          Markup = /*#__PURE__*/React__default.createElement(client$1.ApolloProvider, {
            client: config.default
          }, /*#__PURE__*/React__default.createElement(reactRouterDom.StaticRouter, {
            location: req.url
          }, /*#__PURE__*/React__default.createElement(App.default, null)));
          return [4
          /*yield*/
          , reactSsr.getDataFromTree(Markup)];

        case 1:
          _a.sent();

          try {
            styledMarkup = sheet.collectStyles(Markup);
            bodyStream = sheet.interleaveWithNodeStream(server.renderToNodeStream(styledMarkup));
            console.log('önce', initialState);
            res.write(layout.top({
              state: initialState
            }));
            console.log('sonra', initialState);
            bodyStream.on('data', function (chunk) {
              return tslib_es6.__awaiter(void 0, void 0, void 0, function () {
                return tslib_es6.__generator(this, function (_a) {
                  return [2
                  /*return*/
                  , res.write(chunk)];
                });
              });
            });
            bodyStream.on('end', function () {
              res.write(layout.bottom());
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
      }
    });
  });
}; // // Not found

exports.default = devMiddleware;
//# sourceMappingURL=devMiddleware.js.map
