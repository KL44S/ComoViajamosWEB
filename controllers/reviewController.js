(function () {

    var app = angular.module("CV");

    app.controller("reviewController", ["$scope", "reviewConstants", "constants", "transportService", "$http", "customSelectService", "arrayService",
        "reviewService", "spinnerService",
        function ($scope, reviewConstants, constants, transportService, $http, customSelectService, arrayService, reviewService, spinnerService) {

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

                    spinnerService.hideSpinner($scope.containerId);
                });
            }

            //público
            $scope.containerId = "reviewContainer";

            spinnerService.showSpinner($scope.containerId);
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

            $scope.transportTypeHasBeenSelected = function (transportType) {
                var transportTypesNumber = $scope.transportTypes.length;

                for (var i = 0; i < transportTypesNumber; i++) {
                    var currentTransportType = $scope.transportTypes[i];

                    currentTransportType.selected = false;
                };

                transportType.selected = true;

                var transportTypeId = transportType.transportTypeId;

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

                if (selectedItem !== undefined && selectedItem !== null && selectedItem.value !== null) {
                    var transportId = selectedItem.value;

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
                if (selectedItem !== undefined && selectedItem !== null && selectedItem.value !== null) {
                    var branchId = selectedItem.value;

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
                if (selectedItem !== undefined && selectedItem !== null && selectedItem.value !== null) {
                    reviewService.getReviewFeelings().then(function (feelings) {
                        $scope.feelings = customSelectService.GetCustomSelectArrayOptions(feelings, "feelingId", "description");
                    });
                }
                else {
                    $scope.feelings = [];
                    $scope.reasons = [];
                };
            };

            $scope.feelingHasBeenSelected = function (selectedItem) {
                if (selectedItem !== undefined && selectedItem !== null && selectedItem.value !== null) {
                    var feelingId = selectedItem.value;

                    reviewService.getReviewFeelingReasons(feelingId, $scope.selectedTransportType).then(function (reasons) {
                        $scope.reasons = customSelectService.GetCustomSelectArrayOptions(reasons, "reasonId", "description");
                    });
                }
                else {
                    $scope.feelings = [];
                    $scope.reasons = [];
                };

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