# entry point
module.exports = (grunt) ->
	pathUtil = require("path")

	#
	require('load-grunt-config')(
		grunt,
		configPath: pathUtil.join(process.cwd(), 'grunt')
		config: require("./grunt/config")(grunt, __dirname) # shares a config with tasks
	)

	# register custom tasks
	require("./grunt/custom/register-runner")(grunt)
