(function() {
  'use strict';
  // create the core module namespaces
  angular.module('app.core.services', ['ngResource']);
  angular.module('app.core.filters', []);
  angular.module('app.core.attributes', []);
  angular.module('app.core.elements', ['app.core.services']);
  angular.module('app.core.controllers', ['app.yuidoc.services', 'ngSanitize']);

  // create the default namespace for simple referencing
  angular.module('app.core', [
    'app.core.services',
    'app.core.filters',
    'app.core.attributes',
    'app.core.elements',
    'app.core.controllers'
  ]);
})();
