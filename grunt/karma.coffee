# entry point
module.exports = (grunt) ->

	#================
	options:
		configFile: '<%=env.TEST_DIR%>/karma/default-config.js'

	chrome:
		browsers: ['Chrome']
		singleRun: false

	firefox:
		browsers: ['Firefox']
		singleRun: false

	ie:
		browsers: ['IE']
		singleRun: false

	phantomjs:
		browsers: ['PhantomJS']
		singleRun: true

	all:
		browsers: ['Chrome', 'Firefox', 'IE']