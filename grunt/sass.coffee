# entry point
module.exports = (grunt) ->
	dev:
		options:
			compass: true
			debugInfo: true
			lineNumbers: true
			style: 'expanded' # output_style = expanded or nested or compact or compressed
		files:
			'src/assets/css/screen.css': 'src/sass/screen.scss'
	#'src/assets/css/print.css': 'sass/print.scss'
	dist:
		options:
			compass: true
			style: 'compressed' # output_style = expanded or nested or compact or compressed
		files:
			'src/assets/css/screen.css': 'src/sass/screen.scss'
#'src/assets/css/print.css': 'sass/print.scss'