#!/usr/bin/env node --no-warnings

const { color } = require('../lib/color');

const {
    build,
    watch,
    test,
    lint,
    fix,

    concurrently,

    getDirtyPackages,
    getAllPackages,
    getChangedPackages,
    getPkg,
    exit,
} = require('../lib/setup');

(async () => {
    if (build) {
        const raw = await getDirtyPackages();

        let max = 0;

        const pkgs = raw.map(x => ({ dir: x, ...getPkg(x) })).map(x => ({ ...x, color: color(x.name) }));

        for (const { name } of pkgs) {
            max = Math.max(max, name.length);
        }

        let ok = true;

        for (const pkg of pkgs) {
            const { signal, status } = await concurrently(
                {
                    [pkg.name]: {
                        app: 'in-pkg',
                        args: [pkg.dir, 'syoki-this', 'build'],
                        color: pkg.color,
                    },
                },
                max,
            );

            ok &= !Boolean(status && signal);
        }

        process.exit(Number(!ok));
    } else if (watch) {
        const raw = await getAllPackages();
        const pkgs = raw.map(x => ({ dir: x, ...getPkg(x) })).map(x => ({ ...x, color: color(x.name) }));

        // NEXT: Root Prettier watcher.

        concurrently(
            pkgs.reduce(
                (xs, pkg) => ({
                    ...xs,
                    [pkg.name]: {
                        app: 'in-pkg',
                        args: [pkg.dir, 'syoki-this', 'watch'],
                        color: pkg.color,
                    },
                }),
                {},
            ),
        ).then(exit);
    } else if (test) {
        const raw = await getAllPackages();
        const pkgs = raw.map(x => ({ dir: x, ...getPkg(x) })).map(x => ({ ...x, color: color(x.name) }));

        concurrently(
            pkgs.reduce(
                (xs, pkg) => ({
                    ...xs,
                    [pkg.name]: {
                        app: 'in-pkg',
                        args: [pkg.dir, 'syoki-this', 'test'],
                        color: pkg.color,
                    },
                }),
                {},
            ),
        ).then(exit);
    } else if (lint) {
        const raw = await getChangedPackages();
        const pkgs = raw.map(x => ({ dir: x, ...getPkg(x) })).map(x => ({ ...x, color: color(x.name) }));

        // NEXT: Root Prettier linter.

        concurrently(
            pkgs.reduce(
                (xs, pkg) => ({
                    ...xs,
                    [pkg.name]: {
                        app: 'in-pkg',
                        args: [pkg.dir, 'syoki-this', 'lint'],
                        color: pkg.color,
                    },
                }),
                {},
            ),
        ).then(exit);
    } else if (fix) {
        const raw = await getChangedPackages();
        const pkgs = raw.map(x => ({ dir: x, ...getPkg(x) })).map(x => ({ ...x, color: color(x.name) }));

        // NEXT: Root Prettier fixer.

        concurrently(
            pkgs.reduce(
                (xs, pkg) => ({
                    ...xs,
                    [pkg.name]: {
                        app: 'in-pkg',
                        args: [pkg.dir, 'syoki-this', 'fix'],
                        color: pkg.color,
                    },
                }),
                {},
            ),
        ).then(exit);
    }
})();
