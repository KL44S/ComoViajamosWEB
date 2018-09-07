(function () {
    var app = angular.module("CV");

    app.factory("reviewFeelingService", ["httpService", "reviewFeelingConstants", "reviewFeelingReasonService", "constants", "$q",
        function (httpService, serviceConstants, reviewFeelingReasonService, constants, $q) {

            var baseUri = constants.baseUri + serviceConstants.resourceName;

            var reviewFeelingService = {};

            reviewFeelingService.getReviewFeelingReasons = function (feelingId, transportTypeId) {
                return reviewFeelingReasonService.getReviewFeelingReasons(feelingId, transportTypeId);
            };

            reviewFeelingService.getReviewFeelings = function () {
                var deferred = $q.defer();
                var promise = deferred.promise;

                httpService.get(baseUri, { cache: true } ).then(function (response) {
                    deferred.resolve(response.data);

                }, function errorCallback(error) {
                    deferred.reject(error);
                });

                return promise;
            };

            return reviewFeelingService;

        }]);
})();
