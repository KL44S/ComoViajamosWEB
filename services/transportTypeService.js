(function () {
    var app = angular.module("CV");

    app.factory("transportTypeService", ["httpService", "transportTypeConstants", "constants",
        function (httpService, serviceConstants, constants) {

            var baseUri = constants.baseUri + serviceConstants.resourceName;

            var transportTypeService = {};

            transportTypeService.getTransportTypes = function () {
                return httpService.get(baseUri, { cache: true });
            };

            return transportTypeService;

    }]);
})();
