(function() {
  angular.module('app.yuidoc.services', ['ngResource']);
  angular.module('app.yuidoc.elements', ['ngSanitize', 'app.yuidoc.services']);

  // create the default namespace for simple referencing
  angular.module('app.yuidoc', [
    'app.yuidoc.services',
    'app.yuidoc.elements'
  ]);
})();
