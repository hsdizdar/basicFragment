/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/camelcase */
import express, { Application } from 'express';
import path from 'path';
import cors from 'cors';
import http from 'http';
import reload from 'reload';
import compression from 'compression';

import { isProd } from './utils';
import devMiddleware from './devMiddleware';
import prodMiddleware from './prodMiddleware';
const winston = require('winston');

let envPath;
process.env.BUILD === 'development' ? (envPath = '.env.development') : (envPath = '.env.production');

require('dotenv').config({
  path: envPath,
});
const app: Application = express();
const fs = require('fs');

const PORT = process.env.PORT || 81;

const buildPath = path.join(__dirname, '../../public');
const publicPath = path.join(__dirname, '../../../public');
const modulesPath = path.join(__dirname, '../node_modules');

const getTodaysDate = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0');
  if (mm.charAt(0) === '0') {
    mm = mm.substr(1);
  }
  const yyyy = today.getFullYear();
  return mm + '/' + dd + '/' + yyyy;
};

const getFileName = () => {
  let logFileName = getTodaysDate();

  if (process.env.LOG_DURATION === 'monthly') {
    const index = logFileName.indexOf('/');
    const monthPart = logFileName.substring(0, index);
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

const getLogConfigDuration = () => {
  let logConfigDuration = {};

  if (process.env.LOG_DURATION === 'monthly') {
    logConfigDuration = {
      filename: `./log/monthly/${getFileName()}.log`,
      level: process.env.LOG_LEVEL,
    };
  } else {
    logConfigDuration = {
      filename: `./log/daily/${getFileName()}.log`,
      level: process.env.LOG_LEVEL,
    };
  }
  return logConfigDuration;
};

const createLogger = () => {
  const { combine, timestamp, align, json } = winston.format;

  const timezoned = () => {
    return new Date().toLocaleString('en-US', {
      timeZone: 'Europe/Moscow',
      hour12: false,
    });
  };

  const logFormat = combine(
    timestamp({
      format: timezoned,
    }),
    json(),
    align()
  );

  const logConfig = {
    format: logFormat,
    transports: [
      new winston.transports.File({
        filename: 'combined.log',
        level: process.env.LOG_LEVEL,
      }),
      new winston.transports.File(getLogConfigDuration()),
      new winston.transports.Console({
        level: process.env.LOG_LEVEL,
      }),
    ],
  };

  const logger = winston.createLogger(logConfig);
  return logger;
};

createLogger();

const searchLogs = function (filePath: string | null, date = getTodaysDate(), level = null, message = null) {
  return new Promise(function (resolve, reject) {
    if (filePath != null) {
      fs.readFile(filePath, (err: any, data: { toString: () => string }) => {
        if (err) {
          console.log('__dirname: ' + __dirname);
          console.log('error reading file', err);
          return reject;
        } else {
          const data_iterated = data.toString().split('\n');
          data_iterated.pop();
          const json_array_data = data_iterated.map((log) => JSON.parse(log));
          const date_filtered_results = json_array_data.filter((log) => {
            return log.timestamp.includes(date);
          });
          const level_filtered = levelFilterLogs(date_filtered_results, level);
          const message_filtered = messageFilterLogs(level_filtered, message);
          return resolve(message_filtered);
        }
      });
    } else {
      return reject;
    }
  });
};

const levelFilterLogs = (logArray: any[], levelArray = null) => {
  let level_filtered = [];
  const level_filter_object = {};
  if (levelArray != null) {
    for (let i = 0; i < levelArray.length; i++) {
      level_filter_object['level_filtered' + i] = logArray.filter((log) => {
        return log.level.includes(levelArray[i]);
      });
    }
    for (let i = 0; i < levelArray.length; i++) {
      if (`level_filtered${i}` in level_filter_object) {
        level_filtered = level_filtered.concat(level_filter_object[`level_filtered${i}`]);
      }
    }
  } else {
    level_filtered = logArray;
  }
  return level_filtered;
};

const messageFilterLogs = (logArray: any[], message = null) => {
  let message_filtered;
  if (message != null) {
    message_filtered = logArray.filter((log) => {
      return log.message.includes(message);
    });
  } else {
    message_filtered = logArray;
  }
  return message_filtered;
};

app.use(cors('*'));

isProd && app.use(compression());

app.use(express.static(buildPath));
app.use(express.static(publicPath));
app.use('/assets', [express.static(modulesPath + '/node_modules/jquery/dist/')]);
app.use(express.json());

if (isProd) {
  app.use(prodMiddleware);
} else {
  const logger = createLogger();

  app.post('/logger', (req, res) => {
    logger.log(req.body.type, req.body.log);
    return res.status(200).send();
  });

  app.post('/getLogs', (req, res) => {
    let date = req.body.date;
    if (date[3] == '0') {
      date = date.substr(0, 3) + date.substr(4, date.length - 1);
    }
    if (date) {
      if (date[0] === '0') {
        date = date.substr(1);
      }
    }
    searchLogs('./combined.log', date, req.body.level, req.body.message).then((data) => {
      return res.status(200).json({ data });
    });
  });

  app.use('/', devMiddleware);
}

// Error handling
app.use(function (err, req, res) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const httpServer = http.createServer(app);

const runServer = (): void =>
  httpServer.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}`);
  });

const runDevelopmentServer = async (): Promise => {
  try {
    await reload(app);
    runServer();
  } catch (err) {
    console.error('Reload could not start, could not start server/sample app', err);
  }
};

isProd ? runServer() : runDevelopmentServer();
