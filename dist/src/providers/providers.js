'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../node_modules/tslib/tslib.es6.js');
var inversify = require('../../node_modules/inversify/lib/inversify.js');

var NameProvider =
/** @class */
function () {
  function NameProvider() {}

  NameProvider.prototype.provide = function () {
    return 'HELLO';
  };

  NameProvider = tslib_es6.__decorate([inversify.injectable()], NameProvider);
  return NameProvider;
}();

exports.NameProvider = NameProvider;
//# sourceMappingURL=providers.js.map
