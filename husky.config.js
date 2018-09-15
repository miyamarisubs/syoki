module.exports = {
    hooks: {
        'pre-commit': 'yarn run build-ci && yarn run lint && yarn run test',
        'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS',
    },
};
