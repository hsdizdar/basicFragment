'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var routes = require('../../shared/routes.js');

var paths = routes.default.map(function (_a) {
  var path = _a.path;
  return path;
});
var isProd = process.env.NODE_ENV === 'production';

exports.isProd = isProd;
exports.paths = paths;
//# sourceMappingURL=index.js.map
