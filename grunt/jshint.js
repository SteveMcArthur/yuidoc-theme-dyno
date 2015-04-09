module.exports = function(grunt) {
  return {
    compile: {
      options: {
        jshintrc: true
      },
      files: {
        src: ['<%=env.SRC_DIR%>/app/*.js']
      }
    }
  }
};
