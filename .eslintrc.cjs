const fs = require('fs');
const path = require('path');

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    // Default to the recommended ESLint rules
    // Change or include additional rulesets here
    'eslint:recommended',
    // Remove ESLint rules that conflict with Prettier (must be last in the extends array)
    'prettier',
  ],
  ignorePatterns: [
    // DON'T ignore dotfiles by default
    '!**/.*',
    // Load .gitignore and .prettierignore content as base ESLint ignore patterns
    ...fs
      .readFileSync(path.join(__dirname, '.gitignore'), 'utf8')
      .split('\n')
      .filter((line) => line && !line.startsWith('#')),
    ...fs
      .readFileSync(path.join(__dirname, '.prettierignore'), 'utf8')
      .split('\n')
      .filter((line) => line && !line.startsWith('#')),
    // Include any additional ignore patterns here
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['**/.*.cjs'],
      parserOptions: {
        sourceType: 'commonjs',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {},
};
