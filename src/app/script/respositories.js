(function () {

    "use strict";

    var repositories = angular.module("app.repositories", ["ngResource"]);

    repositories.service("dbProvider", function ($resource) {
        return {
            read: function(yuidocDataPath){

                return $resource(yuidocDataPath, {})
                        .get().$promise;

                        //.catch(helpers.toErrorLog);
            }
        };
    });

    repositories.service("dataRepository", function (dbProvider) {
        return {
            read: function (sourcePath) {
                return dbProvider.read(sourcePath);
            }
        };
    });

    repositories.constant("cachedRepository", function CachedRepository(repositoryServiceName, repository, $cacheFactory) {

        var cache = $cacheFactory(repositoryServiceName);
        var cacheKey = "store";

        function getStorageKey(sourcePath) {
            return sourcePath + "/" + repositoryServiceName + "/" + cacheKey;
        }

        return {
            read: function (sourcePath) {
                var cacheDatasetKey = getStorageKey(sourcePath || '.');
                var cached = cache.get(cacheDatasetKey);

                if (cached === undefined) {
                    // return the Promise
                    return repository.read(sourcePath)
                            .then(function (results) {
                                // store results in the cache
                                cache.put(cacheDatasetKey, results);

                                // pass on the results
                                return results;
                            });
                }

                // return a resolved promise
                return Promise.resolve(cached);
                    //.then(helpers.writeLog("cachedRepository", "reading from cache", cacheDatasetKey));
            },
            clearCache: function (sourcePath) {
                var cacheDatasetKey = getStorageKey(sourcePath);
                cache.remove(cacheDatasetKey);
            }

        };
    });

    /* decorators */
    repositories.config(["$provide", "cachedRepository", function ($provide, cachedRepository) {

        var reposToCache = [
            "dataRepository"
        ];

        // cached interception
        for(var index=0; index < reposToCache.length; index++) {

            var repoServiceName = reposToCache[index];
            var repoServiceNameKey = repoServiceName + "Key";

            $provide.value(repoServiceNameKey, repoServiceName);

            $provide.decorator(repoServiceName, [repoServiceNameKey, "$delegate", "$cacheFactory",
                cachedRepository
            ]);

        }

    }]);

}());
