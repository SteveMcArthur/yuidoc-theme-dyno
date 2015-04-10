module.exports = function(grunt) {
  return {
    "cloneGhPages": {
      command: 'git clone https://github.com/pflannery/yuidoc-theme-dyno ./gh-pages -b gh-pages',
      options: {
        stdout: true,
        stderr: true,
        failOnError: true,
        execOptions: {
          cwd: "<%=env.APP_DIR%>"
        }
      }
    },
    "addAllGhPages": {
      command: "git add . -A",
      options: {
        stdout: true,
        stderr: true,
        failOnError: true,
        execOptions: {
          cwd: "<%=env.APP_DIR%>/gh-pages"
        }
      }
    },
    "commitGhPages": {
      command: 'git commit -m "deploys <%=pkg.version%>"',
      options: {
        stdout: true,
        stderr: true,
        failOnError: true,
        execOptions: {
          cwd: "<%=env.APP_DIR%>/gh-pages"
        }
      }
    },
    "pushGhPages": {
      command: 'git push https://'+process.env.GIT_DEPLOY_TOKEN+':x-oauth-basic@github.com/pflannery/yuidoc-theme-dyno.git',
      options: {
        stdout: true,
        stderr: true,
        failOnError: true,
        execOptions: {
          cwd: "<%=env.APP_DIR%>/gh-pages"
        }
      }
    }
  };
};
