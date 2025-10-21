const http = require('http');
const data = JSON.stringify({ email: process.env.TEST_EMAIL || 'shikhar4883.se24@chitkara.edu.in' });
const opts = {
  hostname: 'localhost',
  port: 3001,
  path: '/api/subscribe',
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(data) }
};

const req = http.request(opts, res => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    console.log('STATUS', res.statusCode);
    console.log('BODY', d);
  });
});

req.on('error', e => { console.error('ERR', e); process.exit(1); });
req.write(data);
req.end();
