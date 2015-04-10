module.exports = function(grunt) {
  var pathUtil = require('path');
  return {
    minifiyToDist: {
      options: {
        sourceMap: true,
        beautify: false,
        compress: false,
        mangle: false
      },
      src: [
        pathUtil.join('<%=env.SRC_DIR%>/app', 'script/repositories.js'),
        pathUtil.join('<%=env.SRC_DIR%>/app', 'script/services.js'),
        pathUtil.join('<%=env.SRC_DIR%>/app', 'script/controllers.js'),
        pathUtil.join('<%=env.SRC_DIR%>/app', 'script/filters.js'),
        pathUtil.join('<%=env.SRC_DIR%>/app', 'script/directives.js'),
        pathUtil.join('<%=env.SRC_DIR%>/app', 'app.js')
      ],
      dest: '<%=env.DIST_DIR%>/<%=env.OUT_MIN_FILE%>'
    }
  };
};
