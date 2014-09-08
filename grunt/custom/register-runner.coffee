# entry point
module.exports = (grunt) ->

	taskName = 'runner'

	grunt.task.registerMultiTask(taskName, '', ->
	
		# clean, compile then run karma
		grunt.task.run [
			"clean:testArtifacts"
			"compile"
			"karma:"+this.target
		]
		
	)