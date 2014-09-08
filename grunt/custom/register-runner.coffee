# entry point
module.exports = (grunt) ->
	taskName = 'runner'

	grunt.task.registerMultiTask(taskName, '', ->
		# jshint then run karma config
		grunt.task.run ["jshint:compile", "karma:" + this.target]
	)