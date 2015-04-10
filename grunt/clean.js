module.exports = function(grunt) {
  var pathUtil = require('path');
  return {
    npmModules: {
      force: true,
      src: [pathUtil.join('<%=env.MODULES_DIR%>')]
    },
    bowerComponents: {
      force: true,
      src: [pathUtil.join('<%=env.BOWER_DIR%>')]
    },
    srcArtifacts: {
      force: true,
      src: [
        pathUtil.join('<%=env.OUT_DIR%>'),
        pathUtil.join('<%=env.DIST_DIR%>') + '/**/*.js',
        pathUtil.join('<%=env.DIST_DIR%>') + '/**/*.map'
      ]
    },
    testArtifacts: {
      force: true,
      src: [pathUtil.join('<%=env.TEST_OUT_DIR%>')]
    },
    deployArtifacts: {
      force: true,
      src: [pathUtil.join('<%=env.APP_DIR%>', 'gh-pages')]
    },
    emptyGhPages: {
      force: true,
      src: ['./gh-pages/**/*', '!./gh-pages/.git']
    }
  };
};
