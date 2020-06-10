'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../node_modules/tslib/tslib.es6.js');
var index = require('./utils/index.js');
require('../../node_modules/common-tags/es/TemplateTag/TemplateTag.js');
require('../../node_modules/common-tags/es/commaLists/commaLists.js');
require('../../node_modules/common-tags/es/commaListsAnd/commaListsAnd.js');
require('../../node_modules/common-tags/es/commaListsOr/commaListsOr.js');
require('../../node_modules/common-tags/es/html/html.js');
require('../../node_modules/common-tags/es/safeHtml/safeHtml.js');
require('../../node_modules/common-tags/es/oneLine/oneLine.js');
var oneLineTrim = require('../../node_modules/common-tags/es/oneLineTrim/oneLineTrim.js');
require('../../node_modules/common-tags/es/oneLineCommaLists/oneLineCommaLists.js');
require('../../node_modules/common-tags/es/oneLineCommaListsOr/oneLineCommaListsOr.js');
require('../../node_modules/common-tags/es/oneLineCommaListsAnd/oneLineCommaListsAnd.js');
require('../../node_modules/common-tags/es/inlineLists/inlineLists.js');
require('../../node_modules/common-tags/es/oneLineInlineLists/oneLineInlineLists.js');
require('../../node_modules/common-tags/es/stripIndent/stripIndent.js');
require('../../node_modules/common-tags/es/stripIndents/stripIndents.js');
var _package = require('../../package.js');

var head = function head(_a) {
  var styleTags = _a.styleTags,
      _b = _a.state,
      state = _b === void 0 ? {} : _b;
  return oneLineTrim.default(templateObject_1 || (templateObject_1 = tslib_es6.__makeTemplateObject(["<!DOCTYPE html>\n<html lang=\"tr\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>", "-v", "</title>\n    ", "\n    ", "\n  </head>"], ["<!DOCTYPE html>\n<html lang=\"tr\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>", "-v", "</title>\n    ", "\n    ", "\n  </head>"])), _package.default.name, _package.default.version, styleTags || '', state && "<script>" + ("window.__" + _package.default.name.toUpperCase() + "_INITIAL_STATE__=" + JSON.stringify(state).replace(/</g, "\\u003c") + ";") + "</script>");
};

var top = function top(params) {
  return oneLineTrim.default(templateObject_2 || (templateObject_2 = tslib_es6.__makeTemplateObject(["", "<body><div id=\"basicFragment\">"], ["", "<body><div id=\"basicFragment\">"])), head(params));
};
var bottom = function bottom() {
  return oneLineTrim.default(templateObject_3 || (templateObject_3 = tslib_es6.__makeTemplateObject(["</div>\n          <script defer=\"defer\" src=\"/", ".js\"></script>\n          ", "\n        </body>\n      </html>"], ["</div>\n          <script defer=\"defer\" src=\"/", ".js\"></script>\n          ", "\n        </body>\n      </html>"])), _package.default.name, !index.isProd && '<script defer="defer" src="/reload/reload.js"></script>');
};
var templateObject_1, templateObject_2, templateObject_3;

exports.bottom = bottom;
exports.top = top;
//# sourceMappingURL=layout.js.map
