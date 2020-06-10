'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var tslib_es6 = require('../../node_modules/tslib/tslib.es6.js');
var path$1 = _interopDefault(require('path'));
var http = _interopDefault(require('http'));
var index = require('../../node_modules/express/index.js');
var cors = _interopDefault(require('cors'));
var reload = _interopDefault(require('reload'));
var index$1 = require('../../node_modules/compression/index.js');
var index$2 = require('./utils/index.js');
var devMiddleware = require('./devMiddleware.js');
var prodMiddleware = require('./prodMiddleware.js');

var winston = require('winston');

var envPath;
process.env.BUILD === 'development' ? envPath = '.env.development' : envPath = '.env.production';

require('dotenv').config({
  path: envPath
});

var app = index.default();

var fs = require('fs');

var PORT = process.env.PORT || 81;
var buildPath = path$1.join(__dirname, '../../public');
var publicPath = path$1.join(__dirname, '../../../public');
var modulesPath = path$1.join(__dirname, '../node_modules');

var getTodaysDate = function getTodaysDate() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');

  if (mm.charAt(0) === '0') {
    mm = mm.substr(1);
  }

  var yyyy = today.getFullYear();
  return mm + '/' + dd + '/' + yyyy;
};

var getFileName = function getFileName() {
  var logFileName = getTodaysDate();

  if (process.env.LOG_DURATION === 'monthly') {
    var index = logFileName.indexOf('/');
    var monthPart = logFileName.substring(0, index);
    logFileName = monthPart + logFileName.substring(index + 3);

    while (logFileName.includes('/')) {
      logFileName = logFileName.replace('/', '.');
    }
  } else {
    while (logFileName.includes('/')) {
      logFileName = logFileName.replace('/', '.');
    }
  }

  return logFileName;
};

var getLogConfigDuration = function getLogConfigDuration() {
  var logConfigDuration = {};

  if (process.env.LOG_DURATION === 'monthly') {
    logConfigDuration = {
      filename: "./log/monthly/" + getFileName() + ".log",
      level: process.env.LOG_LEVEL
    };
  } else {
    logConfigDuration = {
      filename: "./log/daily/" + getFileName() + ".log",
      level: process.env.LOG_LEVEL
    };
  }

  return logConfigDuration;
};

var createLogger = function createLogger() {
  var _a = winston.format,
      combine = _a.combine,
      timestamp = _a.timestamp,
      align = _a.align,
      json = _a.json;

  var timezoned = function timezoned() {
    return new Date().toLocaleString('en-US', {
      timeZone: 'Europe/Moscow',
      hour12: false
    });
  };

  var logFormat = combine(timestamp({
    format: timezoned
  }), json(), align());
  var logConfig = {
    format: logFormat,
    transports: [new winston.transports.File({
      filename: 'combined.log',
      level: process.env.LOG_LEVEL
    }), new winston.transports.File(getLogConfigDuration()), new winston.transports.Console({
      level: process.env.LOG_LEVEL
    })]
  };
  var logger = winston.createLogger(logConfig);
  return logger;
};

createLogger();

var searchLogs = function searchLogs(filePath, date, level, message) {
  if (date === void 0) {
    date = getTodaysDate();
  }

  if (level === void 0) {
    level = null;
  }

  if (message === void 0) {
    message = null;
  }

  return new Promise(function (resolve, reject) {
    if (filePath != null) {
      fs.readFile(filePath, function (err, data) {
        if (err) {
          console.log('__dirname: ' + __dirname);
          console.log('error reading file', err);
          return reject;
        } else {
          var data_iterated = data.toString().split('\n');
          data_iterated.pop();
          var json_array_data = data_iterated.map(function (log) {
            return JSON.parse(log);
          });
          var date_filtered_results = json_array_data.filter(function (log) {
            return log.timestamp.includes(date);
          });
          var level_filtered = levelFilterLogs(date_filtered_results, level);
          var message_filtered = messageFilterLogs(level_filtered, message);
          return resolve(message_filtered);
        }
      });
    } else {
      return reject;
    }
  });
};

var levelFilterLogs = function levelFilterLogs(logArray, levelArray) {
  if (levelArray === void 0) {
    levelArray = null;
  }

  var level_filtered = [];
  var level_filter_object = {};

  if (levelArray != null) {
    var _loop_1 = function _loop_1(i) {
      level_filter_object['level_filtered' + i] = logArray.filter(function (log) {
        return log.level.includes(levelArray[i]);
      });
    };

    for (var i = 0; i < levelArray.length; i++) {
      _loop_1(i);
    }

    for (var i = 0; i < levelArray.length; i++) {
      if ("level_filtered" + i in level_filter_object) {
        level_filtered = level_filtered.concat(level_filter_object["level_filtered" + i]);
      }
    }
  } else {
    level_filtered = logArray;
  }

  return level_filtered;
};

var messageFilterLogs = function messageFilterLogs(logArray, message) {
  if (message === void 0) {
    message = null;
  }

  var message_filtered;

  if (message != null) {
    message_filtered = logArray.filter(function (log) {
      return log.message.includes(message);
    });
  } else {
    message_filtered = logArray;
  }

  return message_filtered;
};

app.use(cors('*'));
index$2.isProd && app.use(index$1.default());
app.use(index.default["static"](buildPath));
app.use(index.default["static"](publicPath));
app.use('/assets', [index.default["static"](modulesPath + '/node_modules/jquery/dist/')]);
app.use(index.default.json());

if (index$2.isProd) {
  app.use(prodMiddleware.default);
} else {
  var logger_1 = createLogger();
  app.post('/logger', function (req, res) {
    logger_1.log(req.body.type, req.body.log);
    return res.status(200).send();
  });
  app.post('/getLogs', function (req, res) {
    var date = req.body.date;

    if (date[3] == '0') {
      date = date.substr(0, 3) + date.substr(4, date.length - 1);
    }

    if (date) {
      if (date[0] === '0') {
        date = date.substr(1);
      }
    }

    searchLogs('./combined.log', date, req.body.level, req.body.message).then(function (data) {
      return res.status(200).json({
        data: data
      });
    });
  });
  app.use('/', devMiddleware.default);
} // Error handling


app.use(function (err, req, res) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
var httpServer = http.createServer(app);

var runServer = function runServer() {
  return httpServer.listen(PORT, function () {
    console.log("\uD83D\uDE80 Server ready at http://localhost:" + PORT);
  });
};

var runDevelopmentServer = function runDevelopmentServer() {
  return tslib_es6.__awaiter(void 0, void 0, void 0, function () {
    var err_1;
    return tslib_es6.__generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 2,, 3]);

          return [4
          /*yield*/
          , reload(app)];

        case 1:
          _a.sent();

          runServer();
          return [3
          /*break*/
          , 3];

        case 2:
          err_1 = _a.sent();
          console.error('Reload could not start, could not start server/sample app', err_1);
          return [3
          /*break*/
          , 3];

        case 3:
          return [2
          /*return*/
          ];
      }
    });
  });
};

index$2.isProd ? runServer() : runDevelopmentServer();
//# sourceMappingURL=index.js.map
