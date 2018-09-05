(function () {
    var app = angular.module("CV");

    app.factory("transportBranchService", ["httpService", "transportBranchConstants", "constants", "$q", "uriParametersService",
        function (httpService, serviceConstants, constants, $q, uriParametersService) {

            function makeAndGetParameters(transportId, transportBranchId) {
                var parameters = [];

                if (transportId !== undefined) {
                    parameters.push(new Pair(serviceConstants.transportIdParameter, transportId));
                }

                if (transportBranchId !== undefined) {
                    parameters.push(new Pair(serviceConstants.transportBranchIdParameter, transportBranchId));
                }

                var uriParameters = uriParametersService.makeAndGetAGetUriParameters(parameters);

                return uriParameters;
            }

            var baseUri = constants.baseUri + serviceConstants.resourceName;

            var transportBranchService = {};

            transportBranchService.getTransportBranches = function (transportId, transportBranchId) {
                var deferred = $q.defer();
                var promise = deferred.promise;

                var uri = baseUri + makeAndGetParameters(transportId, transportBranchId);

                httpService.get(uri, { cache: true }).then(function (response) {
                    deferred.resolve(response.data);

                }, function errorCallback(error) {
                    deferred.reject(error);
                });

                return promise;
            };

            return transportBranchService;

        }]);
})();
