const concurrently = require('concurrently');

concurrently([
    {
        command: 'tslint --fix --project ./tsconfig.json',
        name: 'tslint',
    },
]);
