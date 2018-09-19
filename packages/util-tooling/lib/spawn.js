const spawnAsync = require('cross-spawn');

const spawn = (...args) =>
    new Promise(resolve => {
        const process = spawnAsync(...args);

        let stdout = '';

        if (process.stdout) {
            process.stdout.on('data', buffer => {
                stdout += buffer.toString();
            });
        }

        process.once('exit', (status, signal) => {
            resolve({
                stdout,
                signal,
                status,
            });
        });
    });

module.exports = { spawn };
