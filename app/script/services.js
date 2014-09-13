(function () {

    "use strict";

    var services = angular.module("app.services", ["ngResource", "app.repositories"]);

    services.service("docService",
        function (projectRepository, modulesRepository, classesRepository, classitemsRepository) {
            return {

	            getProject: function(){
		            return projectRepository.read();
	            },
                getModules: function () {
                    return modulesRepository.list();
                },
	            getClasses: function () {
		            return classesRepository.list();
	            },
	            getClassItems: function () {
		            return classitemsRepository.list();
	            },
	            getGlobalClasses: function () {

		            var query = {
			            $not: {
				            $has: 'module'
			            }
		            };

		            return classesRepository.query(query);
	            }
            };
        });

}());