module.exports =
	#================
	"default": [
		"compile"
	]
#================
	"compile": [
		"clean:removeArtifacts"
		"jshint:compile"
		"copy:srcToOut"
		"uglify:min"
	]
#================
	"test": [
		"compile"
		"runner:phantomjs"
	]