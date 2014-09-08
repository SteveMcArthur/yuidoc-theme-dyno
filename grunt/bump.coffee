# entry point
module.exports = (grunt) ->

	options:
		filepaths:[
			'package.json'
			'bower.json'
		]
		syncVersions: true
		commit: false
		tag: false
