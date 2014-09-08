(function () {

    "use strict";

    var services = angular.module("app.services", ["ngResource", "app.repositories"]);
    services.constant('yuidocDataPath', 'assets/data.json');
    services.service("apiService",
        function (dataRepository, yuidocDataPath) {
            var dataFilePath = "assets/data.json";
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