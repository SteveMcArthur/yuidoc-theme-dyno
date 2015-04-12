(function() {
  'use strict';

  var app = angular.module('app', [
    'app.core',
    'app.yuidoc'
  ]);

  marked.setOptions({
    highlight: function(code) {
      return hljs.highlightAuto(code).value;
    }
  });

  app.constant('marked', window.marked);
  app.constant('hljs', window.hljs);
  app.constant('yuidocDataPath', 'dist/doc/data.json');
  app.constant('querifySync', querify.sync);
})();
