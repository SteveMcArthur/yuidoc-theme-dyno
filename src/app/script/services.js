(function () {

    "use strict";

    var services = angular.module("app.services", ["ngResource", "app.repositories"]);
    services.constant('yuidocDataPath', 'dist/doc/data.json');
    services.service("apiService",
        function (dataRepository, yuidocDataPath) {
            return {
                get: function () {
                    return dataRepository.read(yuidocDataPath)
                            .then(function (yuidocDataJSON) {
                                return yuidocDataJSON;
                            }
                    );
                }
            };
        });

}());