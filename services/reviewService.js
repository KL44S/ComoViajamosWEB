(function () {
    var app = angular.module("CV");

    app.factory("reviewService", ["httpService", "reviewConstants", "reviewFeelingService", "constants", "$q",
        function (httpService, serviceConstants, reviewFeelingService, constants, $q) {
            var baseUri = constants.baseUri + serviceConstants.resourceName;

            var reviewService = {};

            reviewService.isDatetimeValid = function (datetime) {
                var result = (datetime !== undefined && datetime !== "" && datetime !== null);

                return result;
            };

            reviewService.areDatetimesValid = function (datetimeFrom, datetimeUntil) {
                var datetimeFromAsInt = datetimeFrom.toIntFormatted(serviceConstants.dateSeparator, serviceConstants.timeSeparator);
                var datetimeUntilAsInt = datetimeUntil.toIntFormatted(serviceConstants.dateSeparator, serviceConstants.timeSeparator);

                var result = (datetimeFromAsInt < datetimeUntilAsInt);

                return result;
            };

            reviewService.isFeelingValid = function (selectedFeeling) {
                return reviewFeelingService.isFeelingValid(selectedFeeling);
            };

            reviewService.isReasonValid = function (reasons, selectedReason) {
                return reviewFeelingService.isReasonValid(reasons, selectedReason);
            };

            reviewService.getReviewFeelings = function () {
                return reviewFeelingService.getReviewFeelings();
            };

            reviewService.getReviewFeelingReasons = function (feelingId, transportTypeId) {
                return reviewFeelingService.getReviewFeelingReasons(feelingId, transportTypeId);
            };

            reviewService.saveReview = function (review) {
                var deferred = $q.defer();
                var promise = deferred.promise;

                httpService.post(baseUri, review, {'Content-Type': 'application/json'}).then(function (response) {
                    deferred.resolve(response.data);

                }, function errorCallback(error) {
                    deferred.reject(error);
                });

                return promise;
            };

            return reviewService;

        }]);
})();
