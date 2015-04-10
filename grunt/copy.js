module.exports = function(grunt) {
  var pathUtil = require('path');
  return {
    srcToGhPages: {
      expand: true,
      cwd: pathUtil.join('<%=env.SRC_DIR%>'),
      src: ['**/*.*', '!sass/**/*.*'],
      dest: pathUtil.join('gh-pages')
    }
  };
};
