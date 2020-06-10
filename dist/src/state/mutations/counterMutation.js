'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../../node_modules/tslib/tslib.es6.js');
var client = require('@apollo/client');
var counterQueries = require('../queries/counterQueries.js');

var UPDATE_COUNTER = client.gql(templateObject_1 || (templateObject_1 = tslib_es6.__makeTemplateObject(["\n  mutation updateCounter($offset: Number!) {\n    updateCounter(offset: $offset) @client\n  }\n"], ["\n  mutation updateCounter($offset: Number!) {\n    updateCounter(offset: $offset) @client\n  }\n"])));
var CounterMutations = {
  updateCounter: function updateCounter(_, variables, _a) {
    var cache = _a.cache;
    var data = cache.readQuery({
      query: counterQueries.GET_COUNTER
    });
    var newCounterValue = data.counter + variables.offset;
    cache.writeData({
      data: {
        counter: newCounterValue
      }
    });
    return null;
  }
};
var templateObject_1;

exports.CounterMutations = CounterMutations;
exports.UPDATE_COUNTER = UPDATE_COUNTER;
//# sourceMappingURL=counterMutation.js.map
