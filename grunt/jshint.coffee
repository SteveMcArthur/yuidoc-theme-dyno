# entry point
module.exports = (grunt) ->
	compile:
		options:
			jshintrc: true
		files:
			src: ['<%=env.SRC_DIR%>/**/*.js']