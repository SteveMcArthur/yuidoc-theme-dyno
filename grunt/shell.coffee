# entry point
module.exports = (grunt) ->

	"git.addWithAll":
		command: "git add . -A"
		options:
			stdout: true
			stderr: true
			failOnError: true
			execOptions:
				cwd: "<%=env.APP_DIR%>"

	"git.commitPublish":
		command: 'git commit -m "publishing distribution files"'
		options:
			stdout: true
			stderr: true
			failOnError: true
			execOptions:
				cwd: "<%=env.APP_DIR%>"

	"git.failIfChangePending":
		command: "git add . -A"
		options:
			stdout: true
			stderr: true
			failOnError: true
			execOptions:
				cwd: "<%=env.APP_DIR%>"
			callback: (err, stdout, stderr, done) ->
				console.log("failIfChangePending", stdout != 0);
				done()

	"npm.publish":
		command: "npm publish"
		options:
			stdout: true
			stderr: true
			failOnError: true
			execOptions:
				cwd: "<%=env.APP_DIR%>"

	"genDoc":
		command: "yuidoc"
		options:
			stdout: true
			stderr: true
			failOnError: true
			execOptions:
				cwd: "<%=env.APP_DIR%>"