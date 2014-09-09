(function () {

    "use strict";

    var services = angular.module("app.services", ["ngResource", "app.repositories"]);
    services.constant('yuidocDataPath', 'dist/doc/data.json');
    services.constant('querify', querify);

    services.service("apiService",
        function (dataRepository, yuidocDataPath, querify) {
            return {
                get: function () {
                    return dataRepository.read(yuidocDataPath)
                        .then(function (yuidocDataJSON) {
                            return yuidocDataJSON;
                        }
                    );
                },
                getGlobalClasses: function () {

                    dataRepository.read(yuidocDataPath)
                        .then(function (yuidocData) {

                            var query = {
                                module: {
                                    $equals: undefined
                                }
                            };

                            return querify.extract(yuidocData.classes, query);
                        }
                    );

                }
            };
        });

}());