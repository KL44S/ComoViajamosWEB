(function () {
    var app = angular.module("CV");

    app.factory("reviewService", ["httpService", "reviewConstants", "reviewFeelingService", "constants", "$q",
        function (httpService, serviceConstants, reviewFeelingService, constants, $q) {

            var baseUri = constants.baseUri + serviceConstants.resourceName;

            var reviewService = {};

            reviewService.getReviewFeelings = function () {
                return reviewFeelingService.getReviewFeelings();
            };

            reviewService.getReviewFeelingReasons = function (feelingId, transportTypeId) {
                return reviewFeelingService.getReviewFeelingReasons(feelingId, transportTypeId);
            };

            reviewService.createReview = function (review) {
                var deferred = $q.defer();
                var promise = deferred.promise;

                httpService.post(baseUri, review).then(function (response) {
                    deferred.resolve(response.data);

                }, function errorCallback(error) {
                    deferred.reject(error);
                });

                return promise;
            };

            return reviewService;

        }]);
})();
