'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../../node_modules/tslib/tslib.es6.js');
var client = require('@apollo/client');

var GET_COUNTER = client.gql(templateObject_1 || (templateObject_1 = tslib_es6.__makeTemplateObject(["\n  query GetCounterValue {\n    counter @client\n  }\n"], ["\n  query GetCounterValue {\n    counter @client\n  }\n"])));
var GET_CONFIG = client.gql(templateObject_2 || (templateObject_2 = tslib_es6.__makeTemplateObject(["\n  query GetConfigValue {\n    process @client\n  }\n"], ["\n  query GetConfigValue {\n    process @client\n  }\n"])));
var templateObject_1, templateObject_2;

exports.GET_CONFIG = GET_CONFIG;
exports.GET_COUNTER = GET_COUNTER;
//# sourceMappingURL=counterQueries.js.map
