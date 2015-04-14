module.exports = function(grunt) {
  return {
    check: {
      options: {
        jshintrc: true
      },
      files: {
        src: [
          '<%=env.APP_DIR%>/grunt.js',
          '<%=env.GRUNT_DIR%>/**/*.js',
          '<%=env.SRC_DIR%>/app/**/*.js'
        ]
      }
    }
  };
};
