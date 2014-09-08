# entry point
module.exports = (grunt) ->
	pathUtil = require("path")

	compile:
		options:
			jshintrc: true
		files:
			src: [pathUtil.join("<%=env.SRC_DIR%>", "app", "**", "*.js")]