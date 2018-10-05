(function () {
    var app = angular.module("CV");

    app.factory("reviewFeelingReasonService", ["httpService", "reviewFeelingReasonConstants", "constants", "$q", "uriParametersService",
        function (httpService, serviceConstants, constants, $q, uriParametersService) {

            function makeAndGetParameters(feelingId, transportTypeId) {
                var parameters = [];

                if (feelingId !== undefined) {
                    parameters.push(new Pair(serviceConstants.feelingIdParameter, feelingId));
                }

                if (transportTypeId !== undefined) {
                    parameters.push(new Pair(serviceConstants.transportTypeIdParameter, transportTypeId));
                }

                var uriParameters = uriParametersService.makeAndGetAGetUriParameters(parameters);

                return uriParameters;
            }

            var baseUri = constants.baseUri + serviceConstants.resourceName;

            var reviewFeelingReasonService = {};

            reviewFeelingReasonService.isReasonValid = function (reasons, selectedReason) {
                var areThereReasons = (reasons !== undefined && reasons.length !== 0);

                var result = (!areThereReasons ||
                                (selectedReason.id !== undefined && selectedReason.id !== "" && selectedReason.id !== null) );

                return result;
            };

            reviewFeelingReasonService.getReviewFeelingReasons = function (feelingId, transportTypeId) {
                var deferred = $q.defer();
                var promise = deferred.promise;
 
                var uri = baseUri + makeAndGetParameters(feelingId, transportTypeId);
                
                httpService.get(uri, { cache: true }).then(function (response) {
                    deferred.resolve(response.data);

                }, function errorCallback(error) {
                    deferred.reject(error);
                });

                return promise;
            };

            return reviewFeelingReasonService;

        }]);
})();
