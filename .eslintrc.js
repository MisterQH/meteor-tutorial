module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['import', 'jsx-a11y', 'meteor', 'react'],
  extends: ['airbnb', 'plugin:meteor/recommended', 'plugin:react/recommended'],
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  rules: {
    // eslint default rules
    'class-methods-use-this': 'off',
    indent: [1, 2],
    'max-len': ['error', 80],
    'no-underscore-dangle': [
      'error',
      {
        allowAfterThis: true,
        // These are all meteor specific exceptions
        allow: [
          '_id',
          '_ensureIndex',
          '_verifyEmailToken',
          '_resetPasswordToken',
          '_storedLoginToken',
          '_name',
          '_execute',
        ],
      },
    ],
    // The most sane value, allows objects to stay on a single line if possible
    'object-curly-newline': ['error', { consistent: true }],
    'multiline-ternary': ['error', 'always-multiline'],

    // UPDATE: This math issue appears to be fixed, try it out for a while
    // and then remove these comments
    // Use "functions"  instead of "all" to avoid this issue:
    // https://github.com/prettier/prettier-eslint/issues/180
    'no-extra-parens': ['error', 'functions'],
    'no-mixed-operators': ['error', { allowSamePrecedence: false }],
    'function-paren-newline': ['error', 'multiline'],

    // eslint-plugin-import rules

    // Good rule, but requires too many exceptions:
    // * core/ module (any any imports in core/, because no good package.json)
    // * /imports modules
    // * meteor/* modules
    'import/no-unresolved': 'off',
    // This rule also complains about /imports
    'import/no-absolute-path': 'off',
    // Keep an eye on this issue for a fix that allows this rule to be turned
    // on for meteor packages:
    // https://github.com/benmosher/eslint-plugin-import/issues/479
    'import/no-extraneous-dependencies': 'off',
    // FIXME: Require extensions for all files except .js and .jsx
    // this rule is being worked on:
    // https://github.com/benmosher/eslint-plugin-import/issues/984
    'import/extensions': 'off',
    // This rule is annoying when you are thinking about extending a file, so
    // you don't export default even with a single export
    'import/prefer-default-export': 'off',
    // When you wrap a module in a container before exporting you cannot access
    // the original module during tests.
    // So for testing, importing the same module as named is helpful
    'import/no-named-as-default': 'off',

    // eslint-plugin-jsx-a11y rules

    // Adding onClick handlers on non-buttons is useful
    'jsx-a11y/no-static-element-interactions': 'off',

    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/anchor-is-valid': 'off',

    // eslint-plugin-react rules

    // Lots of objects are being passed around in this repo,
    // this rule makes it inconvenient to do that
    'react/forbid-prop-types': 'off',
    'react/sort-prop-types': [
      'error',
      {
        callbacksLast: false,
        ignoreCase: true,
        requiredFirst: false,
        sortShapeProp: false,
      },
    ],

    // Session makes perfect sense sometimes and we can use it with cookies easily
    'meteor/no-session': 'off',
  },
};
