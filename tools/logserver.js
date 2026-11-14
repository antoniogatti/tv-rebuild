// Dev harness for TV test apps.
//   POST /log          TV -> PC: log line, appended to tv.log
//   GET  /cmd          TV polls for the next queued JS command ("" if none)
//   POST /cmd          PC enqueues a JS command for the TV
//   GET  /img.png      sample image to test LAN image loading
const http = require('http');
const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, 'tv.log');
const queue = [];
http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') { res.end(); return; }
  if (req.method === 'GET' && req.url.startsWith('/cmd')) { res.end(queue.shift() || ''); return; }
  if (req.method === 'GET' && req.url.startsWith('/img.png')) {
    res.setHeader('Content-Type', 'image/png');
    res.end(fs.readFileSync(path.join(__dirname, '..', 'apps', 'hello', 'icon.png'))); return;
  }
  let body = '';
  req.on('data', (c) => (body += c));
  req.on('end', () => {
    if (req.url.startsWith('/cmd')) { queue.push(body); res.end('queued'); return; }
    fs.appendFileSync(logFile, body + '\n');
    console.log(body);
    res.end('ok');
  });
}).listen(8765, '0.0.0.0', () => console.log('listening on 8765'));
