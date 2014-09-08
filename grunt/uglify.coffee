module.exports = (grunt) ->
	pathUtil = require("path")

	# bundle to dist
	compiled:
		options:
			sourceMap: true
			beautify: false
		src: [
			pathUtil.join("<%=env.OUT_DIR%>", "**/*.js")
		]
		dest: "<%=env.DIST_DIR%>/<%=env.OUT_MIN_FILE%>"