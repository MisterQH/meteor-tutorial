// Use old-school javascript in this file to make it work nicely
const configure = require('enzyme').configure;
const Adapter = require('enzyme-adapter-react-16').default;

function setupWallaby(wallaby) {
  return {
    // debug: true, // Use this if things go wrong
    testFramework: 'mocha',
    files: [
      // load all files in imports
      'imports/**/**.js*',
      // Don't load node_modules twice
      // Don't import unnecessary folders
      // Don't load tests here, but in the next variable
      '!imports/**/*.spec.js*',
      // Load language files for some tests
    ],
    tests: ['imports/**/*.spec.js*'],
    compilers: {
      '**/*.js?(x)': wallaby.compilers.babel({
        presets: ['@babel/preset-env', '@babel/preset-react'],
        plugins: [
          // '@babel/plugin-transform-modules-commonjs',
          '@babel/plugin-proposal-class-properties',
          // 'meteor-babel/plugins/dynamic-import',
          [
            'module-resolver',
            {
              root: ['.'],
              alias: {
                core: './imports/core',
                meteor: './imports/meteorStubs',
              },
            },
          ],
        ],
      }),
    },
    env: { type: 'node' },
    setup() {
      console.log('configure:', configure);
      global.IS_WALLABY = true;
      global.fetch = require('node-fetch');
      // Do this to prevent some weird issues
      global.window = { navigator: { userAgent: 'node.js' } };

      configure({ adapter: new Adapter() });
    },
  };
}

module.exports = setupWallaby;
