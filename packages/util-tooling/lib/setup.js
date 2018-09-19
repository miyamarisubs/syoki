const { resolve } = require('upath');

const { spawn } = require('./spawn');
const { getDirtyPackages } = require('./getDirtyPackages');
const { getAllPackages } = require('./getAllPackages');
const { getChangedPackages } = require('./getChangedPackages');

const tty = process.stdout.isTTY;

const build = process.argv.includes('build');
const watch = process.argv.includes('watch');
const test = process.argv.includes('test');
const lint = process.argv.includes('lint');
const fix = process.argv.includes('fix');

const stdio = [process.stdin, process.stdout, process.stderr];
const env = { ...process.env, FORCE_COLOR: Number(tty) };

const concurrently = async (xs, max = 0, options = {}) => {
    const { rawNames, rawColors, commands } = Object.entries(xs).reduce(
        (xs, [name, command]) => ({
            ...xs,
            rawNames: [...xs.rawNames, name],
            rawColors: [...xs.rawColors, command.color],
            commands: [...xs.commands, [command.app, ...command.args].join(' ')],
        }),
        {
            rawNames: [],
            rawColors: [],
            commands: [],
        },
    );

    for (const name of rawNames) {
        max = Math.max(max, name.length);
    }

    const names = rawNames.map(x => `${x.padEnd(max, ' ')}`).join(',');
    const colors = rawColors.join(',');

    return await spawn(
        'concurrently',
        ['--prefix', '{name} =>', '--names', names, '--prefix-colors', colors, ...commands],
        { stdio, env, ...options },
    );
};

const exit = ({ signal, status }) => {
    if (signal || status) {
        process.exit(1);
    } else {
        process.exit(0);
    }
};

const getPkg = x => {
    const { name, scripts } = require(resolve(__dirname, '..', '..', x, 'package.json'));

    return {
        name,
        run: Boolean(scripts && scripts.this),
    };
};

module.exports = {
    tty,

    build,
    watch,
    test,
    lint,
    fix,

    stdio,
    env,

    getDirtyPackages,
    getAllPackages,
    getChangedPackages,
    concurrently,
    exit,
    getPkg,
};
