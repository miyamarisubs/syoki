const concurrently = require('concurrently');

concurrently([
    {
        command: 'tsc --noEmit',
        name: 'tsc',
    },
]);
