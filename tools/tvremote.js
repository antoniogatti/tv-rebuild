// Samsung TV remote: node tvremote.js KEY_MENU KEY_DOWN ...   (use "wait:ms" for delays)
const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');

const TV = process.env.TV_IP || '192.168.1.127';
const tokenFile = path.join(__dirname, '.tvtoken');
const token = fs.existsSync(tokenFile) ? fs.readFileSync(tokenFile, 'utf8').trim() : '';
const name = Buffer.from('tv-rebuild').toString('base64');
const url = `wss://${TV}:8002/api/v2/channels/samsung.remote.control?name=${name}` + (token ? `&token=${token}` : '');
const steps = process.argv.slice(2);

const ws = new WebSocket(url, { rejectUnauthorized: false });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

ws.on('message', async (data) => {
  const msg = JSON.parse(data.toString());
  if (msg.event === 'ms.channel.connect') {
    if (msg.data && msg.data.token) fs.writeFileSync(tokenFile, msg.data.token);
    console.log('connected');
    for (const s of steps) {
      if (s.startsWith('wait:')) { await sleep(Number(s.slice(5))); continue; }
      ws.send(JSON.stringify({ method: 'ms.remote.control', params: { Cmd: 'Click', DataOfCmd: s, Option: 'false', TypeOfRemote: 'SendRemoteKey' } }));
      console.log('sent ' + s);
      await sleep(700);
    }
    ws.close();
    process.exit(0);
  } else if (msg.event === 'ms.channel.unauthorized' || msg.event === 'ms.error') {
    console.log(JSON.stringify(msg)); process.exit(1);
  }
});
ws.on('error', (e) => { console.log('error ' + e.message); process.exit(1); });
setTimeout(() => { console.log('timeout (accept the prompt on the TV?)'); process.exit(1); }, 60000);
