#!/usr/bin/env node --no-warnings

const {
    tty,

    build,
    watch,
    test,
    lint,
    fix,

    concurrently,
    exit,
} = require('../lib/setup');

// Initialize commands:

const prettierGlobs = ['*.{md,js,json}', 'src/**/*.{js,json}'];

const babel = {
    app: 'babel',
    args: ['src', '--out-dir', 'dist', '--extensions', '.ts', '--ignore', 'spec.ts', '--source-maps'],
    color: 'yellow',
};

const tsc = {
    app: 'tsc',
    args: [],
    color: 'cyan',
};

const jest = {
    app: 'jest',
    args: [],
    color: 'red',
};

const tslint = {
    app: 'tslint',
    args: ['--project', './tsconfig.json', '--format', 'codeFrame'],
    color: 'green',
};

const prettier = {
    app: 'prettylint',
    args: [...prettierGlobs, '--format', 'eslint/lib/formatters/codeframe.js'],
    color: 'gray',
};

// Configure commands:

if (tty) {
    tsc.args.push('--pretty');
}

if (build) {
    tsc.args.push('--emitDeclarationOnly', '--declaration');
}

if (watch) {
    babel.args.push('--watch');
    tsc.args.push('--watch', '--preserveWatchOutput');
    jest.args.push('--watchAll');

    prettier.args.shift();
    prettier.args.shift();
}

if (test) {
    //
}

if (lint) {
    tsc.args.push('--noEmit');
}

if (fix) {
    tslint.args.push('--fix');
    prettier.args.push('--fix');
}

// Run commands:

if (build) {
    concurrently({ babel, tsc }).then(exit);
} else if (watch) {
    concurrently({ babel, tsc, jest }, 'prettier'.length).then(() => exit({}));
    // concurrently({ prettier });
    // NEXT: Chokidar+Prettier+TSLint.
} else if (test) {
    concurrently({ jest }).then(exit);
} else if (lint) {
    concurrently({ jest, tsc, tslint, prettier }).then(exit);
} else if (fix) {
    concurrently({ tslint, prettier }).then(exit);
}
