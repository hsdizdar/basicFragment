'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var logger = {
  log: function log(_log, type) {
    if (_log === void 0) {
      _log = 'deneme';
    }

    if (type === void 0) {
      type = 'info';
    }

    fetch('http://localhost:81/logger', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        log: _log,
        type: type
      })
    });
  },
  info: function info(log) {
    if (log === void 0) {
      log = 'deneme';
    }

    fetch('http://localhost:81/logger', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        log: log,
        type: 'info'
      })
    });
  },
  error: function error(log) {
    if (log === void 0) {
      log = 'deneme';
    }

    fetch('http://localhost:81/logger', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        log: log,
        type: 'error'
      })
    });
  },
  warn: function warn(log) {
    if (log === void 0) {
      log = 'deneme';
    }

    fetch('http://localhost:81/logger', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        log: log,
        type: 'warn'
      })
    });
  },
  debug: function debug(log) {
    if (log === void 0) {
      log = 'deneme';
    }

    fetch('http://localhost:81/logger', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        log: log,
        type: 'debug'
      })
    });
  }
};

exports.logger = logger;
//# sourceMappingURL=logger.js.map
