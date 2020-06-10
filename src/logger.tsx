export const logger = {
  log: (log = 'deneme', type = 'info') => {
    fetch('http://localhost:81/logger', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ log: log, type: type }),
    });
  },
  info: (log = 'deneme') => {
    fetch('http://localhost:81/logger', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ log: log, type: 'info' }),
    });
  },
  error: (log = 'deneme') => {
    fetch('http://localhost:81/logger', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ log: log, type: 'error' }),
    });
  },
  warn: (log = 'deneme') => {
    fetch('http://localhost:81/logger', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ log: log, type: 'warn' }),
    });
  },
  debug: (log = 'deneme') => {
    fetch('http://localhost:81/logger', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ log: log, type: 'debug' }),
    });
  },
};
