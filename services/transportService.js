﻿(function () {
    var app = angular.module("CV");

    app.factory("transportService", ["httpService", "transportConstants", "transportTypeService", "uriParametersService", "constants", "$q",
        function (httpService, serviceConstants, transportTypeService, uriParametersService, constants, $q) {

            var baseUri = constants.baseUri + serviceConstants.resourceName;

            function makeAndGetParameters(transportId, transportTypeId) {
                var parameters = [];

                if (transportId !== undefined) {
                    parameters.push(new Pair(serviceConstants.transportIdParameter, transportId));
                }

                if (transportTypeId !== undefined) {
                    parameters.push(new Pair(serviceConstants.transportTypeIdParameter, transportTypeId));
                }

                var uriParameters = uriParametersService.makeAndGetAGetUriParameters(parameters);

                return uriParameters;
            }

            var transportService = {};

            transportService.getTransportTypes = function () {
                return transportTypeService.getTransportTypes();
            };

            transportService.getTransports = function (transportTypeId) {
                var uri = baseUri + makeAndGetParameters(undefined, transportTypeId);

                var deferred = $q.defer();
                var promise = deferred.promise;

                httpService.get(uri, { cache: true }).then(function (response) {
                    deferred.resolve(response.data);

                }, function errorCallback(error) {
                    deferred.reject(error);
                });

                return promise;
            };

            return transportService;

    }]);
})();