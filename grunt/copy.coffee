# entry point
module.exports = (grunt) ->
	pathUtil = require('path')

	srcToOut:
		expand: true
		cwd: pathUtil.join('<%=env.SRC_DIR%>')
		src: '**/*.js'
		dest: pathUtil.join('<%=env.OUT_DIR%>')

	outToDist:
		expand: true
		cwd: pathUtil.join('<%=env.OUT_DIR%>')
		src: ['**/*.js', '**/*.map']
		dest: pathUtil.join('<%=env.DIST_DIR%>')