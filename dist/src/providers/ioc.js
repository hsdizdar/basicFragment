'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var inversify = require('../../node_modules/inversify/lib/inversify.js');
var providers = require('./providers.js');

var container = new inversify.Container();
container.bind('nameProvider').to(providers.NameProvider);

exports.container = container;
//# sourceMappingURL=ioc.js.map
