module.exports = {
  parserPreset: { parserOpts: { headerPattern: /^([a-z]+)(?:\(([^)]+)\))?: (.+)$/ } },
  rules: {
    'type-enum': [2, 'always', ['feat', 'fix', 'docs', 'test', 'chore', 'ci', 'refactor', 'perf', 'build']],
    'subject-empty': [2, 'never'],
    'header-max-length': [2, 'always', 100],
  },
};
