# entry point
module.exports = (grunt) ->
	taskName = 'publish'

	grunt.task.registerMultiTask(taskName, '', ->
		grunt.task.run [

			"test"

			"dist"

			"bump:" + this.target
			
			"shell:git.addWithAll"

			"shell:git.commitPublish"

		]
	)