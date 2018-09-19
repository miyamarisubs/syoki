const globby = require('globby');
const { resolve, relative } = require('upath');
const { stat } = require('fs').promises;

const parse = x => /(?<name>.+)\.(?<ext>ts|css)$/.exec(x);

const isPackageDirty = async base => {
    const location = resolve(__dirname, '..', '..', base);
    const all = await globby(resolve(location, 'src', '**'));

    const files = all.filter(x => !x.match(/\.spec\.ts$/));

    /**
     * @type {boolean}
     */
    let dirty = false;

    for (const file of files) {
        if (dirty) {
            break;
        }

        const { name, ext } = parse(file).groups;
        const rel = relative(resolve(location, 'src'), name);
        const mtime = (await stat(file)).mtime;

        let artsExt;
        let artsCount;

        switch (ext) {
            case 'ts':
                artsExt = '.{js,js.map,d.ts}';
                artsCount = 3;

                break;
            case 'css':
                artsExt = '.{css,css.map,d.ts}';
                artsCount = 3;

                break;
            default:
                throw new Error('Bad file extension');
        }

        const arts = await globby(resolve(location, 'dist', rel + artsExt));

        dirty = arts.length < artsCount;

        if (!dirty) {
            for (const art of arts) {
                const artMtime = (await stat(art)).mtime;

                dirty = mtime > artMtime;

                if (dirty) {
                    break;
                }
            }
        }
    }

    return dirty;
};

module.exports = { isPackageDirty };
