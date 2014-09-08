# entry point
module.exports = (grunt) ->

	generateJSON:
		name: '<%= package.name %>'
		description: '<%= package.description %>'
		version: '<%= package.version %>'
		url: '<%= package.homepage %>'
		options:
			paths: "<%=env.SRC_DIR%>"
			outdir: "./dist/doc"
			markdown: "true"
			attributesEmit: "true"
			linkNatives: "true"
			nocode: "true"
			parseOnly: "true"