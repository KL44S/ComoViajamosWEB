(function () {
    var app = angular.module("CV");

    app.factory("transportService", ["httpService", "transportConstants", "transportTypeService", "uriParametersService", "constants",
        function (httpService, serviceConstants, transportTypeService, uriParametersService, constants) {

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
                var uri = makeAndGetParameters(undefined, transportTypeId);

                return httpService.get(uri, { cache: true });
            };

            return transportService;

    }]);
})();
