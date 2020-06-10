'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

var InversifyContext = React__default.createContext({
  container: null
});
var Provider = function Provider(props) {
  return /*#__PURE__*/React__default.createElement(InversifyContext.Provider, {
    value: {
      container: props.container
    }
  }, props.children);
};
function useInjection(identifier) {
  var container = React.useContext(InversifyContext).container;

  if (!container) {
    throw new Error();
  }

  return container.get(identifier);
}

exports.Provider = Provider;
exports.useInjection = useInjection;
//# sourceMappingURL=ioc.react.js.map
