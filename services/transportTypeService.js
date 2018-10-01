(function () {
    var app = angular.module("CV");

    app.factory("transportTypeService", ["httpService", "transportTypeConstants", "constants", "$q",
        function (httpService, serviceConstants, constants, $q) {

            var baseUri = constants.baseUri + serviceConstants.resourceName;

            var transportTypeService = {};

            transportTypeService.isValid(transportTypeId) {
                var result = (transportTypeId !== undefined && transportTypeId !== "" && transportTypeId !== null);

                return result;
            };

            transportTypeService.getTransportTypes = function () {
                var deferred = $q.defer();
                var promise = deferred.promise;

                httpService.get(baseUri, { cache: true }).then(function (response) {
                    deferred.resolve(response.data);

                }, function errorCallback(error) {
                    deferred.reject(error);
                });

                return promise;
            };

            return transportTypeService;

    }]);
})();
