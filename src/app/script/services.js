(function () {

    "use strict";

    var services = angular.module("app.services", ["ngResource"]);

    services.service("collectionService",
        function (fileRepository) {
            var dataFilePath = "/data.json";
            var configFilePath = "/config.json";
            var propertiesFilePath = "/properties.json";

            return {
                get: function (collectionName) {

                    var all = [
                        fileRepository.read(collectionName + configFilePath),
                        fileRepository.read(collectionName + propertiesFilePath),
                        fileRepository.read(collectionName + dataFilePath)
                    ];

                    return Promise.all(all)
                        .then(function (allResults) {

                            return {
                                name: collectionName,
                                config: allResults[0],
                                properties: allResults[1],
                                data: allResults[2]
                            };

                        }
                    );

                },
                getConfig: function (collectionName) {
                    return fileRepository.read(collectionName + configFilePath);
                },
                getProperties: function (collectionName) {
                    return fileRepository.read(collectionName + propertiesFilePath);
                },
                saveProperties: function (collectionName, newProperties, commitMessage) {

                    return fileRepository.update(collectionName + propertiesFilePath, newProperties, commitMessage);
                }
            };

        });


}());