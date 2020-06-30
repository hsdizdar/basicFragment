'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var logger = require('../logger.js');
var reactHooks = require('@apollo/react-hooks');
var counterQueries = require('../state/queries/counterQueries.js');
var counterMutation = require('../state/mutations/counterMutation.js');
var ioc_react = require('../providers/ioc.react.js');

var Counter = function Counter() {
  var _a = reactHooks.useQuery(counterQueries.GET_COUNTER),
      data = _a.data,
      loading = _a.loading,
      error = _a.error;

  var configData = reactHooks.useQuery(counterQueries.GET_CONFIG).data;

  var _b = React__default.useState(null),
      setErrorCatch = _b[1];

  var increment = reactHooks.useMutation(counterMutation.UPDATE_COUNTER, {
    variables: {
      offset: 1
    }
  })[0];
  var decrement = reactHooks.useMutation(counterMutation.UPDATE_COUNTER, {
    variables: {
      offset: -1
    }
  })[0];
  var provider = ioc_react.useInjection('nameProvider');

  var logIncrement = function logIncrement() {
    logger.logger.error('ERROR');
    logger.logger.info('INFO');
    logger.logger.warn('WARN');
    logger.logger.debug('DEBUG');
    increment();
  };

  if (loading) return /*#__PURE__*/React__default.createElement("p", null, "Loading...");
  if (error) return /*#__PURE__*/React__default.createElement("p", null, "Error");

  if (data.counter < 5) {
    return /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement("p", null, "Provider:"), /*#__PURE__*/React__default.createElement("p", null, provider.provide()), /*#__PURE__*/React__default.createElement("p", null, "Counter: ", data === null || data === void 0 ? void 0 : data.counter), /*#__PURE__*/React__default.createElement("p", null, "Process: ", configData.process), /*#__PURE__*/React__default.createElement("button", {
      type: "button",
      onClick: function onClick() {
        return logIncrement();
      }
    }, "Increase"), /*#__PURE__*/React__default.createElement("button", {
      type: "button",
      onClick: function onClick() {
        return decrement();
      }
    }, "Decrease"));
  } else {
    logger.logger.error('Error from Boundary');
    setErrorCatch(function () {
      throw new Error('error');
    });
  }
};

exports.default = Counter;
//# sourceMappingURL=Counter.js.map
