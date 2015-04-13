module.exports = function(grunt) {
  var pathUtil = require('path');
  return {
    minifiyToDist: {
      options: {
        sourceMap: true,
        beautify: true,
        compress: false,
        mangle: false
      },
      src: [
        pathUtil.join('<%=env.SRC_DIR%>/app', 'core/core.js'),
        pathUtil.join('<%=env.SRC_DIR%>/app', 'core/filters.js'),
        pathUtil.join('<%=env.SRC_DIR%>/app', 'core/controllers.js'),
        pathUtil.join('<%=env.SRC_DIR%>/app', 'core/services/**/*.js'),
        pathUtil.join('<%=env.SRC_DIR%>/app', 'core/elements/**/*.js'),
        pathUtil.join('<%=env.SRC_DIR%>/app', 'core/attributes/**/*.js'),
        pathUtil.join('<%=env.SRC_DIR%>/app', 'yuidoc/yuidoc.js'),
        pathUtil.join('<%=env.SRC_DIR%>/app', 'yuidoc/services/**/*.js'),
        pathUtil.join('<%=env.SRC_DIR%>/app', 'yuidoc/elements/**/*.js'),
        pathUtil.join('<%=env.SRC_DIR%>/app', 'app.js')
      ],
      dest: '<%=env.DIST_DIR%>/<%=env.OUT_MIN_FILE%>'
    }
  };
};
