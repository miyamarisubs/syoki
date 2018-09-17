const { writeFileSync } = require('fs');
const { sync: mkdirpSync } = require('mkdirp');

const { version } = require('../lerna');

const [, , name, description] = process.argv;

mkdirpSync(`packages/${name}/src`);

writeFileSync(
    `packages/${name}/package.json`,
    /* language=JSON */ `{
    "name": "@syoki/${name}",
    "version": "${version}",
    "description": "${description}",
    "main": "dist/index.js",
    "repository": "https://github.com/miyamarisubs/syoki/tree/master/packages/${name}",
    "author": "Marina Miyaoka <miyaokamarina@gmail.com> (https://t.me/miyaokamarina)",
    "license": "MIT",
    "scripts": {
        "build": "node ../../bin/build.js",
        "watch": "node ../../bin/watch.js",
        "lint": "node ../../bin/lint.js",
        "build-ci": "node ../../bin/build-ci.js",
        "fix": "node ../../bin/fix.js"
    },
    "dependencies": {
        "@babel/runtime": "^7.0.0"
    }
}
`,
);

writeFileSync(
    `packages/${name}/tsconfig.json`,
    /* language=JSON */ `{
    "extends": "../../tsconfig.json",
    "compilerOptions": {
        "rootDir": "src",
        "outDir": "dist"
    }
}
`,
);

writeFileSync(
    `packages/${name}/README.md`,
    /* language=Markdown */ `# \`@syoki/${name}\`

> ${description}.

## Installation

\`\`\`bash
yarn add @syoki/${name}
\`\`\`

## License

MIT
`,
);

writeFileSync(
    `packages/${name}/babel.config.js`,
    /* language=JavaScript */ `module.exports = require('../../babel.config');
`,
);

writeFileSync(
    `packages/${name}/src/index.ts`,
    /* language=TypeScript */ `
`,
);
