const { toUnix, resolve } = require('upath');

const { spawn } = require('./spawn');
const { isPackageDirty } = require('./isPackageDirty');

const getDirtyPackages = async () => {
    const raw = await spawn('lerna', ['exec', '--sort', '--', 'node', resolve(__dirname, '..', 'bin', 'package.js')]);

    const list = raw.stdout
        .trim()
        .split('\n')
        .map(async x => {
            const base = toUnix(x.trim());

            return {
                base,
                dirty: await isPackageDirty(base),
            };
        });

    const dirtyPackages = [];

    for await (const { base, dirty } of list) {
        if (dirty) {
            dirtyPackages.push(base);
        }
    }

    return dirtyPackages;
};

module.exports = { getDirtyPackages };
