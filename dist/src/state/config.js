'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../node_modules/tslib/tslib.es6.js');
var client$1 = require('@apollo/client');
var counterMutation = require('./mutations/counterMutation.js');
var apolloCacheInmemory = require('apollo-cache-inmemory');
var initialState = require('./initialState.js');

var isServer = typeof window === 'undefined';
var cache = isServer ? new apolloCacheInmemory.InMemoryCache() : new apolloCacheInmemory.InMemoryCache().restore(window.__BASICFRAGMENT_INITIAL_STATE__);
console.log(cache);
isServer ? console.log('') : console.log(window);
var client = new client$1.ApolloClient({
  cache: cache,
  resolvers: {
    Mutation: tslib_es6.__assign({}, counterMutation.CounterMutations)
  }
});
isServer ? cache.writeData({
  data: initialState.default
}) : null;
console.log('writeData', cache);

exports.default = client;
//# sourceMappingURL=config.js.map
