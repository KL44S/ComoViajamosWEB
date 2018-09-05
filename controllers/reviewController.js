(function () {

    var app = angular.module("CV");

    app.controller("reviewController", ["$scope", "reviewConstants", "constants", "transportService", "$http", "customSelectService", "arrayService",
        function ($scope, reviewConstants, constants, transportService, $http, customSelectService, arrayService) {

            //Privado
            function getFormattedDate(momentDate) {
                momentDate = momentDate.minutes(Math.round(momentDate.minutes() / reviewConstants.minutesRound) * reviewConstants.minutesRound);

                return momentDate;
            }

            function initDates() {
                var dateFrom = moment();
                dateFrom = getFormattedDate(dateFrom);
                dateFrom = dateFrom.minutes(dateFrom.minutes() - reviewConstants.minutesBetweeness);
                $scope.dateTimeFrom = dateFrom;

                var dateUntil = moment();
                dateUntil = getFormattedDate(dateUntil);
                $scope.dateTimeUntil = dateUntil;
            }

            function init() {
                transportService.getTransportTypes().then(function (transportTypes) {
                    $scope.transportTypes = transportTypes;

                    /*reviewService.getReviewFeelings().then(function (feelings) {
                        $scope.feelings = feelings;

                        $scope.hasThePageBeenLoaded = false;
                    });*/
                });
            }

            //público
            initDates();

            $scope.reviewForm = {
                isReviewFormClosed: true,
                openSidebarIcon: "icon-menu",
                closeSidebarIcon: "icon-close"
            };

            $scope.toogleForm = function () {
                $scope.reviewForm.isReviewFormClosed = !$scope.reviewForm.isReviewFormClosed;
            };

            $scope.selectedTransport = new SelectOption();
            $scope.selectedBranch = new SelectOption();
            $scope.selectedOrientation = new SelectOption();
            $scope.selectedFeeling = new SelectOption();

            $scope.transportTypeHasBeenSelected = function (transportTypeId) {
                transportService.getTransports(transportTypeId).then(function (transports) {
                    $scope.transports = customSelectService.GetCustomSelectArrayOptions(transports, "transportId", "description");
                });
            };

            $scope.transportHasBeenSelected = function () {
                var transportId = $scope.selectedTransport.value;
                console.log($scope.selectedTransport);

                transportService.getTransportBranches(transportId).then(function (branches) {
                    $scope.branches = customSelectService.GetCustomSelectArrayOptions(branches, "branchId", "description");
                });
            };

            $scope.branchHasBeenSelected = function () {
                var branchId = $scope.selectedBranch.value;
                var arrayFilters = [
                    new ArrayFilter("branchId", branchId)
                ];

                var branch = arrayService.getFirstArrayElementByFilters($scope.branches, arrayFilters);

                $scope.orientations = branch.orientations;
            };

            $scope.feelingHasBeenSelected = function () {
                var feelingId = $scope.selectedFeeling.value;

                reviewService.getReviewFeelingReasons(feelingId).then(function (reasons) {
                    $scope.reasons = customSelectService.GetCustomSelectArrayOptions(reasons, "reasonId", "description");
                });
            };

            $scope.saveReview = function () {
                var review = {

                };

                reviewService.saveReview(review).then(function (reasons) {
                    $scope.dismissPopup();
                });
            };

            angular.element(document).ready(function () {
                init();
            });

        }]);

})();