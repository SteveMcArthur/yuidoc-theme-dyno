module.exports = {
  'default': [
    'compile'
  ],

  'compile': [
    'clean:srcArtifacts',
    'jshint:compile',
    'uglify:bundleToOut'
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

  'dist': [
    'compile',
    'uglify:minifiyToDist'
    //'yuidoc:generateJSON'
  ],

  'test': [
    'runner:singleRunFirefox'
  ]
};
