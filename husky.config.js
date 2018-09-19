module.exports = {
    hooks: {
        'pre-commit': 'yarn root build && yarn root lint',
        'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS',
    },
};
