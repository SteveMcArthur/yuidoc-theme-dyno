module.exports = (grunt) ->
	'use strict'

	pathUtil = require("path")

	options:
		sourceMap: true

	min:
		files:
			"<%=env.OUT_DIR%>/<%=env.OUT_MIN_FILE%>": [pathUtil.join("<%=env.OUT_DIR%>", "**/*.js")],

	# bundles deps in to dist
	withDeps:
		src: [
			"<%=env.APP_DIR%>/bower_components/promise-extras/dist/promise-extras.min.js"
			pathUtil.join("<%=env.OUT_DIR%>", "**/*.js")
		]
		dest: "<%=env.DIST_DIR%>/<%=env.OUT_BUNDLE_MIN_FILE%>"