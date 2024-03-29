module.exports = function(grunt, gruntRootPath) {
  'use strict';
  var pathUtil = require('path');
  var env = {};
  env.APP_DIR = process.cwd();
  env.WINDOWS = process.platform.indexOf('win') === 0;
  env.NODE = process.execPath;
  env.NPM = env.WINDOWS ? process.execPath.replace('node.exe', 'npm.cmd') : 'npm';
  env.EXT = env.WINDOWS ? '.cmd' : '';
  env.SRC_DIR = pathUtil.join(env.APP_DIR, 'src');
  env.OUT_DIR = pathUtil.join(env.APP_DIR, 'out');

  env.MODULES_DIR = pathUtil.join(env.APP_DIR, 'node_modules');
  env.BOWER_DIR = pathUtil.join(env.APP_DIR, 'bower_components');

  env.BIN_DIR = pathUtil.join(env.MODULES_DIR, '.bin');

  env.TEST_DIR = pathUtil.join(env.APP_DIR, 'test');
  env.TEST_SRC_DIR = pathUtil.join(env.TEST_DIR, '');
  env.TEST_OUT_DIR = pathUtil.join(env.TEST_DIR, 'out');

  env.GRUNT_DIR = pathUtil.join(env.APP_DIR, 'grunt');
  env.DIST_DIR = pathUtil.join(env.SRC_DIR, 'dist');

  var outFilename = pathUtil.basename(process.cwd());
  if (outFilename.substring(outFilename.length - 2) === 'js') {
    outFilename = outFilename.substring(0, outFilename.length - 2);
  }

  env.SRC_FILE = pathUtil.join(env.SRC_DIR, outFilename + '.js');
  env.OUT_BUNDLE_FILE = outFilename + '.js';
  env.OUT_TEST_BUNDLE_FILE = outFilename + '-tests.js';
  env.OUT_MIN_FILE = outFilename + '.min.js';
  env.OUT_BUNDLE_MIN_FILE = outFilename + '.all.min.js';

  env.CLEAN_FOLDERS = ['dist', 'out', 'log'];

  env.PACKAGE_PATH = pathUtil.join(env.APP_DIR, 'package.json');

  return {
    env: env,
    pkg: require(env.PACKAGE_PATH)
  };

};
