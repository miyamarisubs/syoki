const { toUnix, resolve } = require('upath');

const { spawn } = require('./spawn');

const getChangedPackages = async () => {
    const raw = await spawn('lerna', ['exec', '--sort', '--since', 'HEAD', '--', 'node', resolve(__dirname, '..', 'bin', 'package.js')]);

    return raw.stdout
        .trim()
        .split('\n')
        .map(x => {
            const base = toUnix(x.trim());
            const pkg = require(resolve(__dirname, '..', '..', base, 'package.json'));

            return {
                base,
                run: Boolean(pkg.scripts && pkg.scripts.this),
            };
        })
        .filter(x => x.run)
        .map(x => x.base);
};

module.exports = { getChangedPackages };
