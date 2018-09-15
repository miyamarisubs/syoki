module.exports = {
    transform: {
        '^.+\\.[jt]s$': 'babel-jest',
    },
    roots: ['<rootDir>/packages/'],
    moduleNameMapper: {
        '@syoki/(.*)$': '<rootDir>/packages/$1',
    },
    testEnvironment: 'node',
    testRegex: '\\.spec\\.ts$',
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
};
