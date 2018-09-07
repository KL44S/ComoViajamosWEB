(function () {

    var app = angular.module("CV");

    app.controller("reviewController", ["$scope", "reviewConstants", "constants", "transportService", "$http", "customSelectService", "arrayService",
        "reviewService",
        function ($scope, reviewConstants, constants, transportService, $http, customSelectService, arrayService, reviewService) {

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

            $scope.selectedTransport = "";
            $scope.selectedBranch = "";
            $scope.selectedOrientation = "";
            $scope.selectedFeeling = "";
            $scope.selectedReason = "";
            $scope.selectedTransportType = undefined;

            $scope.transportTypeHasBeenSelected = function (transportTypeId) {
                if ($scope.selectedTransportType != transportTypeId) {
                    $scope.selectedTransportType = transportTypeId;

                    transportService.getTransports(transportTypeId).then(function (transports) {
                        $scope.transports = customSelectService.GetCustomSelectArrayOptions(transports, "transportId", "description");

                        $scope.branches = [];
                        $scope.orientations = [];

                        $scope.selectedTransport = "";
                        $scope.selectedBranch = "";
                        $scope.selectedOrientation = "";
                    });
                };
            };

            $scope.transportHasBeenSelected = function (selectedItem) {
                var transportId = selectedItem.value;

                if (transportId !== null) {
                    transportService.getTransportBranches(transportId).then(function (branches) {
                        $scope.modelBranches = branches;
                        $scope.branches = customSelectService.GetCustomSelectArrayOptions(branches, "branchId", "description");
                    });
                }
                else {
                    $scope.branches = [];
                };

                $scope.orientations = [];

                $scope.selectedBranch = "";
                $scope.selectedOrientation = "";
            };

            $scope.branchHasBeenSelected = function (selectedItem) {
                var branchId = selectedItem.value;

                if (branchId !== null) {
                    var arrayFilters = [
                        new ArrayFilter("branchId", branchId)
                    ];

                    var branch = arrayService.getFirstArrayElementByFilters($scope.modelBranches, arrayFilters);

                    $scope.orientations = customSelectService.GetCustomSelectArrayOptions(branch.orientations, "orientationId", "description");
                }
                else {
                    $scope.orientations = [];
                };

                $scope.selectedOrientation = "";
            };

            $scope.orientationHasBeenSelected = function (selectedItem) {
                if (selectedItem.value !== null) {
                    reviewService.getReviewFeelings().then(function (feelings) {
                        $scope.feelings = customSelectService.GetCustomSelectArrayOptions(feelings, "feelingId", "description");
                    });
                }
                else {
                    $scope.feelings = [];
                };
            };

            $scope.feelingHasBeenSelected = function (selectedItem) {
                var feelingId = selectedItem.value;

                reviewService.getReviewFeelingReasons(feelingId, $scope.selectedTransportType).then(function (reasons) {
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