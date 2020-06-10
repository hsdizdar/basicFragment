'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var tslib_es6 = require('../node_modules/tslib/tslib.es6.js');
var React = require('react');
var React__default = _interopDefault(React);

var ErrorBoundary =
/** @class */
function (_super) {
  tslib_es6.__extends(ErrorBoundary, _super);

  function ErrorBoundary(props) {
    var _this = _super.call(this, props) || this;

    _this.state = {
      error: null,
      errorInfo: null
    };
    return _this;
  }

  ErrorBoundary.prototype.componentDidCatch = function (error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    console.log('Error caught from did catch');
  };

  ErrorBoundary.prototype.render = function () {
    if (this.state.errorInfo) {
      return /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement("h2", null, "Something went wrong."), /*#__PURE__*/React__default.createElement("details", {
        style: {
          whiteSpace: 'pre-wrap'
        }
      }, this.state.error && this.state.error.toString(), /*#__PURE__*/React__default.createElement("br", null), this.state.errorInfo.componentStack));
    }

    return this.props.children;
  };

  return ErrorBoundary;
}(React__default.Component);

exports.default = ErrorBoundary;
//# sourceMappingURL=errorBoundary.js.map
