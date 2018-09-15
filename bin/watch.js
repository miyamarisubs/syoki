const concurrently = require('concurrently');

concurrently([
    {
        command: 'babel src --out-dir dist --extensions .ts --source-maps --watch --skip-initial-build',
        name: 'babel',
    },
    {
        command: 'tsc --emitDeclarationOnly --declaration --pretty --watch --preserveWatchOutput', // FUTURE: Add `--skip-initial-build`.
        name: 'tsc',
    },
]);
