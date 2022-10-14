module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'class-methods-use-this': 'off',
    'consistent-return': 'off',
    curly: ['error', 'all'],
    'func-names': 'off',
    'global-require': 'off',
    'import/extensions': 'off',
    'import/named': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-named-as-default': 2,
    'import/no-unresolved': 'off',
    'import/order': [
      'error',
      {
        pathGroups: [{ pattern: 'client/**', group: 'internal' }],
        groups: ['builtin', 'external', 'unknown', ['internal'], 'parent', 'sibling', 'index', 'object', 'type'],
        pathGroupsExcludedImportTypes: [],
        'newlines-between': 'always',
      },
    ],
    'import/prefer-default-export': 'off',
    'lines-between-class-members': 'off',
    'max-classes-per-file': 'off',
    'no-await-in-loop': 'off',
    'no-console': 'off',
    'no-nested-ternary': 'off',
    'no-param-reassign': 'off',
    'no-plusplus': 'off',
    'no-restricted-globals': 'off',
    'no-restricted-syntax': [
      'error',
      {
        selector: 'ForInStatement',
        message: 'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
      },
      {
        selector: 'LabeledStatement',
        message: 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
      },
      {
        selector: 'WithStatement',
        message: '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
      },
    ],
    'no-shadow': 'off',
    'no-underscore-dangle': 'off',
    'no-use-before-define': 'off',
    'prefer-destructuring': 'off',
    'prefer-template': 1,
    'react/jsx-uses-react': 2,
    'react/jsx-uses-vars': 2,
    'react/react-in-jsx-scope': 2,
  },
};
