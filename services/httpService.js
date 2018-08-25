(function () {
    var app = angular.module("CV");

    app.factory("httpService", ["$http", "$q", "httpConstants",
        function ($http, $q, httpConstants) {

            function fillOptions(options) {
                if (options === undefined) {
                    options = {};
                }

                if (options.headers === undefined) {
                    options.headers = {};
                }

                options.headers[httpConstants.authParameter] = httpConstants.token;
            }

            var httpService = {};

            httpService.get = function (uri, options) {
                var deferred = $q.defer();
                var promise = deferred.promise;

                fillOptions(options);
                console.log(options);
                $http.get(uri, options).then(function successCallback(response) {

                    deferred.resolve(response);

                }, function errorCallback(error) {
                    deferred.reject(error);
                });

                return promise;
            }

            httpService.post = function (uri, data, options) {
                var deferred = $q.defer();
                var promise = deferred.promise;

                fillOptions(options);

                $http.post(uri, data, options).then(function successCallback(response) {

                    deferred.resolve(response);

                }, function errorCallback(error) {
                    deferred.reject(error);
                });

                return promise;
            }

            return httpService;

        }]);
})();
