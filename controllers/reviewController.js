(function () {

    var app = angular.module("CV");

    app.controller("reviewController", ["$scope", "reviewConstants", "constants", "transportService", "$http", "customSelectService", "arrayService",
        "reviewService", "spinnerService", "$window", "datetimeService",
        function ($scope, reviewConstants, constants, transportService, $http, customSelectService, arrayService, reviewService, spinnerService, $window,
            datetimeService) {

            //Privado
            function getFormattedDate(momentDate) {
                momentDate = momentDate.minutes(Math.round(momentDate.minutes() / reviewConstants.minutesRound) * reviewConstants.minutesRound);

                return momentDate;
            };

            function mapSelectedOption(entity, selectedOption) {
                if (selectedOption !== undefined) {
                    entity.id = selectedOption.value;
                    entity.description = selectedOption.description;
                };
            };

            function addZeroIfItIsNecessary(number) {
                var numberAsString = number.toString();

                if (numberAsString.length === 1) {
                    numberAsString = "0" + numberAsString;
                };

                return numberAsString;
            };

            function formatJsDate(date) {
                var formattedDate = "";

                if (date !== undefined) {
                    var separator = reviewConstants.dateSeparator;
                    var day = date.getDate();
                    var month = date.getMonth() + 1;
                    var year = date.getFullYear();

                    var formattedDay = addZeroIfItIsNecessary(day);
                    var formattedMonth = addZeroIfItIsNecessary(month);

                    var formattedDate = formattedDay + separator + formattedMonth + separator + year;
                };

                return formattedDate;
            };

            function formatJsTime(time) {
                var formattedTime = "";

                if (time !== undefined) {
                    var separator = reviewConstants.timeSeparator;
                    var hours = time.getHours();
                    var minutes = time.getMinutes();

                    var formattedHours = addZeroIfItIsNecessary(hours);
                    var formattedMinutes = addZeroIfItIsNecessary(minutes);

                    var formattedTime = formattedHours + separator + formattedMinutes;
                };

                return formattedTime;
            };

            function getFromTime(now) {
                if (now !== undefined) {
                    now.setMinutes(now.getMinutes() - reviewConstants.minutesBetweeness);
                };

                return formatJsTime(now);
            };

            function initReviewForm() {
                $scope.form = {
                    transportType: new FormItem(),
                    transport: new FormItem(),
                    transportBranch: new FormItem(),
                    transportOrientation: new FormItem(),
                    feeling: new FormItem(),
                    reason: new FormItem(),
                    dateFrom: new FormItem(),
                    dateUntil: new FormItem(),
                    timeFrom: new FormItem(),
                    timeUntil: new FormItem(),
                    captcha: new FormItem(true),
                    validate: function () {
                        this.transportType.isInvalid = !transportService.isTransportTypeValid($scope.selectedTransportType);
                        this.transport.isInvalid = !transportService.isTransportValid($scope.selectedTransport);
                        this.transportBranch.isInvalid = !transportService.isBranchValid($scope.selectedBranch);
                        this.transportOrientation.isInvalid = !transportService.isOrientationValid($scope.selectedOrientation);
                        this.feeling.isInvalid = !reviewService.isFeelingValid($scope.selectedFeeling);
                        this.reason.isInvalid = !reviewService.isReasonValid($scope.reasons, $scope.selectedReasons);

                        //Fechas
                        var isDateFromValid = reviewService.isDatetimeValid($scope.dateFrom);
                        var isDateUntilvalid = reviewService.isDatetimeValid($scope.dateUntil);
                        var isTimeFromValid = reviewService.isDatetimeValid($scope.timeFrom);
                        var isTimeUntilValid = reviewService.isDatetimeValid($scope.timeUntil);

                        var areDatetimesValid = reviewService.areDatetimesValid(new CustomDatetime($scope.dateFrom, $scope.timeFrom),
                            new CustomDatetime($scope.dateUntil, $scope.timeUntil));

                        this.dateFrom.isInvalid = !(isDateFromValid && areDatetimesValid);
                        this.dateUntil.isInvalid = !(isDateUntilvalid && areDatetimesValid);
                        this.timeFrom.isInvalid = !(isTimeFromValid && areDatetimesValid);
                        this.timeUntil.isInvalid = !(isTimeUntilValid && areDatetimesValid);
                    },
                    isValid: function () {
                        var result = !this.transportType.isInvalid &&
                            !this.transport.isInvalid &&
                            !this.transportBranch.isInvalid &&
                            !this.transportOrientation.isInvalid &&
                            !this.feeling.isInvalid &&
                            !this.reason.isInvalid &&
                            !this.dateFrom.isInvalid &&
                            !this.dateUntil.isInvalid &&
                            !this.timeFrom.isInvalid &&
                            !this.timeUntil.isInvalid &&
                            !this.captcha.isInvalid;

                        return result;
                    }
                };

                $scope.reviewForm = {
                    isReviewFormClosed: true,
                    openSidebarIcon: "icon-menu",
                    closeSidebarIcon: "icon-close"
                };

                $scope.toogleForm = function () {
                    $scope.reviewForm.isReviewFormClosed = !$scope.reviewForm.isReviewFormClosed;
                };


                $scope.selectedOrientation = new ReviewTransportBranchOrientation();
                $scope.selectedBranch = new ReviewTransportBranch(undefined, undefined, $scope.selectedOrientation);
                $scope.selectedTransport = new ReviewTransport(undefined, undefined, $scope.selectedBranch);

                $scope.selectedReason = new ReviewFeelingReason();
                $scope.selectedReasons = [];
                $scope.selectedFeeling = new ReviewFeeling(undefined, undefined, $scope.selectedReason);

                $scope.review = new Review();

                $scope.transportTypeHasBeenSelected = function (transportType) {
                    $scope.form.transportType.isInvalid = false;

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

                            $scope.transportHasBeenSelected();
                        });
                    };
                };

                $scope.transportHasBeenSelected = function (selectedItem) {

                    mapSelectedOption($scope.selectedTransport, selectedItem);

                    if (selectedItem !== undefined && selectedItem !== null && selectedItem.value !== null) {
                        $scope.form.transport.isInvalid = false;

                        var transportId = selectedItem.value;

                        transportService.getTransportBranches(transportId).then(function (branches) {
                            $scope.modelBranches = branches;
                            $scope.branches = customSelectService.GetCustomSelectArrayOptions(branches, "branchId", "description");
                        });
                    }
                    else {
                        $scope.branches = [];
                    };

                    $scope.branchHasBeenSelected();
                };

                $scope.branchHasBeenSelected = function (selectedItem) {
                    mapSelectedOption($scope.selectedBranch, selectedItem);

                    if (selectedItem !== undefined && selectedItem !== null && selectedItem.value !== null) {
                        $scope.form.transportBranch.isInvalid = false;

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

                    $scope.orientationHasBeenSelected();
                };

                $scope.orientationHasBeenSelected = function (selectedItem) {
                    mapSelectedOption($scope.selectedOrientation, selectedItem);

                    if (selectedItem !== undefined && selectedItem !== null && selectedItem.value !== null) {
                        $scope.form.transportOrientation.isInvalid = false;

                        reviewService.getReviewFeelings().then(function (feelings) {
                            $scope.feelings = customSelectService.GetCustomSelectArrayOptions(feelings, "feelingId", "description");
                        });
                    };
                };

                $scope.reasonHasBeenSelected = function (selectedItem) {
                    mapSelectedOption($scope.selectedReason, selectedItem);

                    if (selectedItem !== undefined && selectedItem !== null && selectedItem.value !== null) {
                        $scope.form.reason.isInvalid = false;
                    };
                };

                $scope.reasonsHasBeenSelected = function (selectedItems) {
                    $scope.selectedReasons = selectedItems;

                    if (selectedItems !== undefined && selectedItems !== null && selectedItems.length > 0) {
                        $scope.form.reason.isInvalid = false;
                    };
                };

                $scope.feelingHasBeenSelected = function (selectedItem) {
                    mapSelectedOption($scope.selectedFeeling, selectedItem);

                    if (selectedItem !== undefined && selectedItem !== null && selectedItem.value !== null) {
                        $scope.form.feeling.isInvalid = false;

                        var feelingId = selectedItem.value;

                        reviewService.getReviewFeelingReasons(feelingId, $scope.selectedTransportType).then(function (reasons) {
                            $scope.reasons = customSelectService.GetCustomSelectArrayOptions(reasons, "reasonId", "description");

                            if (reasons.length === 0) {
                                $scope.reasonHasBeenSelected();
                            };
                        });
                    }
                    else {
                        $scope.reasons = [];
                        $scope.reasonHasBeenSelected();
                    };
                };

                $scope.saveReview = function () {
                    $scope.form.validate();

                    if ($scope.form.isValid()) {
                        $scope.review.datetimeFrom = getDatetimeFormattedToSave($scope.dateFrom, $scope.timeFrom);
                        $scope.review.datetimeUntil = getDatetimeFormattedToSave($scope.dateUntil, $scope.timeUntil);
                        $scope.review.travelFeelingId = $scope.selectedFeeling.id;
                        $scope.review.travelFeelingReasonIds = $scope.selectedReasons;
                        $scope.review.transportId = $scope.selectedTransport.id;
                        $scope.review.transportBranchId = $scope.selectedBranch.id;
                        $scope.review.transportBranchOrientationId = $scope.selectedOrientation.id;

                        reviewService.saveReview($scope.review).then(function () {
                            $scope.dismissPopup();
                        });
                    };
                };
            };

            function getDatetimeFormattedToSave(date, time) {
                var datetime = date + reviewConstants.timePrefix + time;

                return datetime;
            };

            function captchaWasSuccessed(token) {
                console.log(token);
                $scope.form.captcha.isInvalid = false;
                $scope.review.captchaToken = token;
            };

            function captchaWasExpired() {
                $scope.form.captcha.isInvalid = true;
                $scope.review.captchaToken = undefined;
            };

            function captchaWasExcepted() {
                console.log();
            };

            function initSpinner() {
                $scope.containerId = "reviewContainer";
                spinnerService.showSpinner($scope.containerId);
            };

            function loadCaptcha() {
                grecaptcha.ready(function () {
                    grecaptcha.render('recaptcha', {
                        'callback': captchaWasSuccessed,
                        'expiredCallback': captchaWasExpired,
                        'errorCallback': captchaWasExcepted
                    });
                });



                $scope.loadingNecessaryElements[$scope.loadingNecessaryElementsIndexes.captcha] = true;
                tryHideSpinner();
            };

            function loadTransportTypes() {
                transportService.getTransportTypes().then(function (transportTypes) {
                    $scope.transportTypes = transportTypes;

                    $scope.loadingNecessaryElements[$scope.loadingNecessaryElementsIndexes.transportTypes] = true;
                    tryHideSpinner();
                });
            };

            function tryHideSpinner() {
                var allRight = true;
                var index = 0;
                var loadingElementsLength = $scope.loadingNecessaryElements.length;

                while (allRight && index < loadingElementsLength) {
                    var currentLoadingElement = $scope.loadingNecessaryElements[index];
                    allRight = allRight && currentLoadingElement;

                    index++;
                };

                if (allRight) {
                    spinnerService.hideSpinner($scope.containerId);
                };
            };

            function removeRestrictionTimes() {
                $scope.timePickerFrom.minTime = undefined;
                $scope.timePickerFrom.maxTime = undefined;
                $scope.timePickerUntil.minTime = undefined;
                $scope.timePickerUntil.maxTime = undefined;
            };

            function initDatePicker() {
                $scope.datePickerFrom = new DatePicker(new Date(), undefined, new Date());
                $scope.datePickerUntil = new DatePicker(new Date(), new Date(), undefined);

                $scope.dateFromHasChanged = function () {
                    $scope.datePickerUntil.minDate = $scope.datePickerFrom.date;

                    if ($scope.datePickerUntil.date) {
                        var comparisonResult = datetimeService.compareDates($scope.datePickerFrom.date, $scope.datePickerUntil.date);

                        if (comparisonResult > 0) {
                            $scope.datePickerUntil.date = undefined;
                        }
                        else if (comparisonResult === 0) {
                            $scope.timeUntilHasChanged();
                        }
                        else {
                            removeRestrictionTimes();
                        };
                    };

                };

                $scope.dateUntilHasChanged = function () {
                    $scope.datePickerFrom.maxDate = $scope.datePickerUntil.date;

                    if ($scope.datePickerFrom.date) {
                        var comparisonResult = datetimeService.compareDates($scope.datePickerUntil.date, $scope.datePickerFrom.date);

                        if (comparisonResult < 0) {
                            $scope.datePickerFrom.date = undefined;
                        }
                        else if (comparisonResult === 0) {
                            $scope.timeFromHasChanged();
                        }
                        else {
                            removeRestrictionTimes();
                        };
                    };

                };
            };

            function addMinutesInaNewTime(time, minutes) {
                var newTime = new Date();
                newTime.setHours(time.getHours());
                newTime.setMinutes(time.getMinutes() + minutes);

                return newTime;
            };

            function buildAndGetTimeLater(time) {
                return addMinutesInaNewTime(time, reviewConstants.minutesBetweeness);
            };

            function buildAndGetTimeAgo(time) {
                return addMinutesInaNewTime(time, -(reviewConstants.minutesBetweeness));
            };

            function initTimePicker() {
                var now = new Date();
                var timeAgo = buildAndGetTimeAgo(now);

                $scope.timePickerFrom = new TimePicker(timeAgo, undefined, now);
                $scope.timePickerUntil = new TimePicker(now, timeAgo);

                $scope.timeFromHasChanged = function () {
                    if ($scope.timePickerFrom.time && $scope.datePickerUntil.date && $scope.timePickerUntil.time) {
                        var comparisonResult = datetimeService.compareDates($scope.datePickerFrom.date, $scope.datePickerUntil.date);

                        if (comparisonResult === 0) {
                            $scope.timePickerUntil.minTime = $scope.timePickerFrom.time;


                            comparisonResult = datetimeService.compareTimes($scope.timePickerFrom.time, $scope.timePickerUntil.time);

                            if (comparisonResult > 0) {
                                $scope.timePickerUntil.time = buildAndGetTimeLater($scope.timePickerFrom.time);
                            };
                        };
                    };                   
                };

                $scope.timeUntilHasChanged = function () {
                    if ($scope.timePickerUntil.time && $scope.datePickerFrom.date && $scope.timePickerFrom.time) {
                        var comparisonResult = datetimeService.compareDates($scope.datePickerFrom.date, $scope.datePickerUntil.date);

                        if (comparisonResult === 0) {
                            $scope.timePickerFrom.maxTime = $scope.timePickerUntil.time;

                            comparisonResult = datetimeService.compareTimes($scope.timePickerUntil.time, $scope.timePickerFrom.time);

                            if (comparisonResult < 0) {
                                $scope.timePickerFrom.time = buildAndGetTimeAgo($scope.timePickerUntil.time);
                            };
                        };
                    }; 
                };
            };

            //público
            $scope.loadingNecessaryElements = [
                false,
                false
            ];

            $scope.loadingNecessaryElementsIndexes = {
                captcha: 0,
                transportTypes: 1
            };

            initSpinner();

            angular.element(document).ready(function () {
                loadCaptcha();
            });

            loadTransportTypes();
            initDatePicker();
            initTimePicker();
            initReviewForm();
        }]);

})();