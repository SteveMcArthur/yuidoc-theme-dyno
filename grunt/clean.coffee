# entry point
module.exports = (grunt) ->
	pathUtil = require("path")

	npmModules:
		force: true
		src: [
			pathUtil.join("<%=env.MODULES_DIR%>")
		]

	bowerComponents:
		force: true
		src: [
			pathUtil.join("<%=env.BOWER_DIR%>")
		]

	srcArtifacts:
		force: true
		src: [
			pathUtil.join("<%=env.OUT_DIR%>")
			pathUtil.join("<%=env.DIST_DIR%>")
		]

	testArtifacts:
		force: true
		src: [
			pathUtil.join("<%=env.TEST_OUT_DIR%>")
		]