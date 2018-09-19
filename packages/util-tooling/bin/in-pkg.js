#!/usr/bin/env node --no-warnings

const { resolve } = require('upath');

const { spawn } = require('../lib/spawn');
const { env, stdio, exit } = require('../lib/setup');

const [, , pkg, cmd, ...rest] = process.argv;

spawn(cmd, rest, { env, stdio, cwd: resolve(__dirname, '..', '..', pkg) }).then(exit);
