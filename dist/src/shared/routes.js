'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Counter = require('./Counter.js');
var SearchLog = require('./SearchLog.js');

var routes = [{
  path: '/',
  exact: true,
  component: Counter.default
}, {
  path: '/log',
  exact: true,
  component: SearchLog.default
}];

exports.default = routes;
//# sourceMappingURL=routes.js.map
