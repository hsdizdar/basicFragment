'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var tslib_es6 = require('../../node_modules/tslib/tslib.es6.js');
var React = require('react');
var React__default = _interopDefault(React);
var reactMultiSelectComponent_esm = require('../../node_modules/react-multi-select-component/dist/react-multi-select-component.esm.js');
var styled = require('styled-components');
var styled__default = _interopDefault(styled);

var Container = styled__default.div(templateObject_1 || (templateObject_1 = tslib_es6.__makeTemplateObject(["\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-start;\n  align-items: flex-start;\n"], ["\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-start;\n  align-items: flex-start;\n"])));
var LeftSubContainer = styled__default.div(templateObject_2 || (templateObject_2 = tslib_es6.__makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: flex-start;\n  margin-right: 50px;\n  border-width: thin;\n  border-style: solid;\n  border-color: #cccccc;\n  padding: 10px;\n"], ["\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: flex-start;\n  margin-right: 50px;\n  border-width: thin;\n  border-style: solid;\n  border-color: #cccccc;\n  padding: 10px;\n"])));
var RightSubContainer = styled__default.div(templateObject_3 || (templateObject_3 = tslib_es6.__makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: flex-start;\n"], ["\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: flex-start;\n"])));
var SubTitle = styled__default.span(templateObject_4 || (templateObject_4 = tslib_es6.__makeTemplateObject(["\n  font-size: 16px;\n  margin-top: 20px;\n  margin-bottom: 5px;\n  width: 50px;\n  text-align: left;\n"], ["\n  font-size: 16px;\n  margin-top: 20px;\n  margin-bottom: 5px;\n  width: 50px;\n  text-align: left;\n"])));
var Input = styled__default.input(templateObject_5 || (templateObject_5 = tslib_es6.__makeTemplateObject(["\n  width: 200px;\n  height: 25px;\n  border-width: thin;\n  border-style: solid;\n  border-color: #cccccc;\n  border-radius: 5px;\n  padding: 5px;\n"], ["\n  width: 200px;\n  height: 25px;\n  border-width: thin;\n  border-style: solid;\n  border-color: #cccccc;\n  border-radius: 5px;\n  padding: 5px;\n"])));
var Button = styled__default.button(templateObject_6 || (templateObject_6 = tslib_es6.__makeTemplateObject(["\n  width: 210px;\n  height: 35px;\n  background-color: #4caf50;\n  border: none;\n  border-radius: 5px;\n  text-color: white;\n  margin-top: 20px;\n"], ["\n  width: 210px;\n  height: 35px;\n  background-color: #4caf50;\n  border: none;\n  border-radius: 5px;\n  text-color: white;\n  margin-top: 20px;\n"])));
var LogContainer = styled__default.div(templateObject_7 || (templateObject_7 = tslib_es6.__makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: flex-start;\n  border-width: thin;\n  border-style: solid;\n  border-color: #cccccc;\n"], ["\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: flex-start;\n  border-width: thin;\n  border-style: solid;\n  border-color: #cccccc;\n"])));
var LogTitle = styled__default.span(templateObject_8 || (templateObject_8 = tslib_es6.__makeTemplateObject(["\n  background-color: #4caf50;\n  text-align: center;\n  padding: 5px;\n  color: white;\n  width: 300px;\n"], ["\n  background-color: #4caf50;\n  text-align: center;\n  padding: 5px;\n  color: white;\n  width: 300px;\n"])));
var LogContent = styled__default.p(templateObject_9 || (templateObject_9 = tslib_es6.__makeTemplateObject(["\n  text-align: center;\n  padding: 4px;\n  width: 300px;\n  margin: 0px;\n"], ["\n  text-align: center;\n  padding: 4px;\n  width: 300px;\n  margin: 0px;\n"])));

var SearchLog = function SearchLog() {
  var options = [{
    label: 'Info',
    value: 'info'
  }, {
    label: 'Warn',
    value: 'warn'
  }, {
    label: 'Error',
    value: 'error'
  }];

  var _a = React.useState(''),
      message = _a[0],
      setMessage = _a[1];

  var _b = React.useState(''),
      date = _b[0],
      setDate = _b[1];

  var _c = React.useState([]),
      selected = _c[0],
      setSelected = _c[1];

  var _d = React.useState({
    message: null,
    level: null,
    date: null
  }),
      logsInfo = _d[0],
      setLogsInfo = _d[1];

  var _e = React.useState([]),
      allLogs = _e[0],
      changeLogs = _e[1];

  var submit = function submit() {
    setLogsInfo({
      message: message === '' ? null : message,
      level: selected.length === 0 ? null : selected.map(function (item) {
        return item.value;
      }),
      date: date === '' ? null : date
    });
  };

  var getLogs = function getLogs() {
    fetch('http://localhost:81/getLogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(logsInfo)
    }).then(function (data) {
      return data.json().then(function (text) {
        return changeLogs(text.data);
      });
    });
  };

  React.useEffect(function () {
    getLogs();
  }, [logsInfo]);

  var showLogs = function showLogs() {
    if (allLogs.length > 0) {
      return allLogs.map(function (item) {
        return /*#__PURE__*/React__default.createElement(Container, null, /*#__PURE__*/React__default.createElement(LogContainer, null, /*#__PURE__*/React__default.createElement(LogContent, null, item.timestamp)), /*#__PURE__*/React__default.createElement(LogContainer, null, /*#__PURE__*/React__default.createElement(LogContent, null, item.level)), /*#__PURE__*/React__default.createElement(LogContainer, null, /*#__PURE__*/React__default.createElement(LogContent, null, item.message)));
      });
    } else {
      return /*#__PURE__*/React__default.createElement(Container, null, /*#__PURE__*/React__default.createElement(LogContainer, null, /*#__PURE__*/React__default.createElement(LogContent, null, "-")), /*#__PURE__*/React__default.createElement(LogContainer, null, /*#__PURE__*/React__default.createElement(LogContent, null, "-")), /*#__PURE__*/React__default.createElement(LogContainer, null, /*#__PURE__*/React__default.createElement(LogContent, null, "-")));
    }
  };

  return /*#__PURE__*/React__default.createElement(Container, null, /*#__PURE__*/React__default.createElement(LeftSubContainer, null, /*#__PURE__*/React__default.createElement("h2", null, "Log Search"), /*#__PURE__*/React__default.createElement(SubTitle, null, "Message: "), /*#__PURE__*/React__default.createElement(Input, {
    type: "text",
    onChange: function onChange(event) {
      return setMessage(event.target.value);
    }
  }), /*#__PURE__*/React__default.createElement(SubTitle, null, "Level: "), /*#__PURE__*/React__default.createElement(reactMultiSelectComponent_esm.default, {
    disableSearch: true,
    options: options,
    value: selected,
    onChange: setSelected,
    labelledBy: 'Select'
  }), /*#__PURE__*/React__default.createElement(SubTitle, null, "Date: "), /*#__PURE__*/React__default.createElement(Input, {
    placeholder: "DD/MM/YYYY",
    type: "date",
    max: "2200-12-31",
    onChange: function onChange(event) {
      var year = event.target.value.substring(0, 4);
      var month = event.target.value.substring(5, 7);
      var day = event.target.value.substring(8, 10);
      setDate(month + '/' + day + '/' + year);
    }
  }), /*#__PURE__*/React__default.createElement(Button, {
    type: "button",
    onClick: function onClick() {
      return submit();
    }
  }, "Submit")), /*#__PURE__*/React__default.createElement(RightSubContainer, null, /*#__PURE__*/React__default.createElement(Container, null, /*#__PURE__*/React__default.createElement(LogTitle, null, "Date"), /*#__PURE__*/React__default.createElement(LogTitle, null, "Level"), /*#__PURE__*/React__default.createElement(LogTitle, null, "Message")), showLogs()));
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9;

exports.default = SearchLog;
//# sourceMappingURL=SearchLog.js.map
