const concurrently = require('concurrently');

concurrently([
    {
        command: 'babel src --out-dir dist --extensions .ts --source-maps',
        name: 'babel',
    },
    {
        command: 'tsc --emitDeclarationOnly --declaration',
        name: 'tsc',
    },
]);
