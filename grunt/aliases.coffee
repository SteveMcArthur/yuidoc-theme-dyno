module.exports =

	"default": [
		"compile"
	]

	"compile": [
		"clean:srcArtifacts"
		"jshint:compile"
		"copy:srcToOut"
	]

	"publish:patch": [
		# fail if git status not clean
		# compile\test
		# outToDist
		# bump:<type>
		# prompt commit message
		# commit
		# npm publish
		# bower publish
		# yuidoc publish

		"test"
		"dist"
		"bump:patch"
		#"shell:gitCommit"
		#"shell:npmPublish"
		#"shell:bowerPublish"
		#"yuidoc:compile"
		#"shell:gitCommitGhPages"
	]

	"publish:minor": [
		"test"
		"dist"
		"bump:minor"
	]

	"publish:major": [
		"test"
		"dist"
		"bump:major"
	]

	"dist": [
		"compile"
		"copy:outToDist"
		"uglify:compiled"
		"uglify:compiledWithDeps"
		"yuidoc:generateJSON"
	]

	"test": [
		"runner:singleRunFirefox"
	]