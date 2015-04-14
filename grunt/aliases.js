module.exports = {
  'default': [
    'compile'
  ],

  'compile': [
    'clean:srcArtifacts',
    'jshint:check',
    'uglify:minifiyToDist'
  ],

  'publish:patch': [
    'test',
    'dist',
    'bump:patch'
  ],

  'publish:minor': [
    'test',
    'dist',
    'bump:minor'
  ],

  'publish:major': [
    'test',
    'dist',
    'bump:major'
  ],

  'deploy': [
    'clean:deployArtifacts',
    'compile',
    'shell:cloneGhPages',
    'clean:emptyGhPages',
    'copy:srcToGhPages',
    'shell:addAllGhPages',
    'shell:pushGhPages'
  ],

  'test': [
    'runner:singleRunFirefox'
  ]
};
