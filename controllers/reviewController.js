(function () {

    var app = angular.module("CV");

    app.controller("reviewController", ["$scope", "reviewConstants", "constants", "transportService", "$http", "customSelectService", "arrayService",
        "reviewService", "spinnerService", "$window",
        function ($scope, reviewConstants, constants, transportService, $http, customSelectService, arrayService, reviewService, spinnerService, $window) {

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

            function initDates() {
                function areDatesEquals(dateFrom, dateUntil) {
                    if (dateFrom === undefined) {
                        dateFrom = $scope.dateFrom;
                    };

                    if (dateUntil === undefined) {
                        dateUntil = $scope.dateUntil;
                    };

                    return (dateFrom == dateUntil);
                };

                function updateTimeUntil(dateFrom, dateUntil) {
                    if (areDatesEquals(dateFrom, dateUntil)) {
                        timeUntilInstance.set("minTime", $scope.timeFrom);
                    }
                    else {
                        timeUntilInstance.set("minTime", undefined);
                    };
                };

                function updateTimeFrom(dateFrom, dateUntil) {
                    if (areDatesEquals(dateFrom, dateUntil)) {
                        timeFromInstance.set("maxTime", $scope.timeUntil);
                    }
                    else {
                        timeFromInstance.set("maxTime", undefined);
                    };
                };

                function updateTimes(dateFrom, dateUntil) {
                    updateTimeUntil(dateFrom, dateUntil);
                    updateTimeFrom(dateFrom, dateUntil);                   
                };

                //fechas
                var dateFormat = reviewConstants.dateFormat;
                var timeFormat = reviewConstants.timeFormat;
                var today = 'today';

                var dateFromInstance;
                var dateUntilInstance;
                var timeFromInstance;
                var timeUntilInstance;

                var now = new Date();
                var formattedToday = formatJsDate(now);


                $scope.dateFrom = formattedToday;
                $scope.dateUntil = formattedToday;
                $scope.timeUntil = formatJsTime(now);
                $scope.timeFrom = getFromTime(now);

                $scope.dateFromOptions = {
                    dateFormat: dateFormat,
                    defaultDate: today,
                    maxDate: today,
                    onChange: function (selectedDates, dateStr, instance) {
                        dateUntilInstance.set("minDate", instance.parseDate(dateStr, dateFormat));

                        var dateFrom = formatJsDate(selectedDates[0]);
                        updateTimes(dateFrom, $scope.dateUntil);

                        $scope.timeFrom = "";

                        $scope.form.dateFrom.isInvalid = false;
                        $scope.form.timeFrom.isInvalid = true;

                        console.log(selectedDates);
                    },
                    onReady: function (selectedDates, dateStr, instance) {
                        dateFromInstance = instance;
                    }
                };

                $scope.dateUntilOptions = {
                    dateFormat: dateFormat,
                    defaultDate: today,
                    minDate: today,
                    onChange: function (selectedDates, dateStr, instance) {
                        dateFromInstance.set("maxDate", instance.parseDate(dateStr, dateFormat));

                        var dateUntil = formatJsDate(selectedDates[0]);
                        updateTimes($scope.dateFrom, dateUntil);

                        $scope.timeUntil = "";

                        $scope.form.dateUntil.isInvalid = false;
                        $scope.form.timeUntil.isInvalid = true;

                        console.log(selectedDates);
                    },
                    onReady: function (selectedDates, dateStr, instance) {
                        dateUntilInstance = instance;
                    }
                };

                $scope.timeFromOptions = {
                    enableTime: true,
                    noCalendar: true,
                    dateFormat: timeFormat,
                    maxTime: $scope.timeUntil,
                    defaultDate: $scope.timeFrom,
                    time_24hr: true,
                    onChange: function (selectedDates, dateStr, instance) {
                        updateTimeUntil();
                        $scope.form.timeFrom.isInvalid = false;

                        console.log(selectedDates);
                    },
                    onReady: function (selectedDates, dateStr, instance) {
                        timeFromInstance = instance;
                    }
                };

                $scope.timeUntilOptions = {
                    enableTime: true,
                    noCalendar: true,
                    dateFormat: timeFormat,
                    minTime: $scope.timeFrom,
                    defaultDate: $scope.timeUntil,
                    time_24hr: true,
                    onChange: function (selectedDates, dateStr, instance) {
                        updateTimeFrom();
                        $scope.form.timeUntil.isInvalid = false;

                        console.log(selectedDates);
                    },
                    onReady: function (selectedDates, dateStr, instance) {
                        timeUntilInstance = instance;
                    }
                };

                $scope.datePostSetup = function (fpItem) {
                    //console.log('flatpickr', fpItem);
                };
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
                        this.reason.isInvalid = !reviewService.isReasonValid($scope.reasons, $scope.selectedReason);

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

                $scope.selectedTransport = new ReviewTransport();
                $scope.selectedBranch = new ReviewTransportBranch();
                $scope.selectedOrientation = new ReviewTransportBranchOrientation();
                $scope.selectedFeeling = new ReviewFeeling();
                $scope.selectedReason = new ReviewFeelingReason();
                $scope.selectedTransportType = undefined;

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
                        
                        var review = {

                        };
                        console.log("pers");
                        //reviewService.saveReview(review).then(function (reasons) {
                        //    $scope.dismissPopup();
                        //});
                    };
                };
            };

            function captchaWasSuccessed() {
                $scope.form.captcha.isInvalid = false;
            };

            function captchaWasExpired() {
                $scope.form.captcha.isInvalid = true;
            };

            function initSpinner() {
                $scope.containerId = "reviewContainer";
                spinnerService.showSpinner($scope.containerId);
            };

            function init() {
                grecaptcha.render('recaptcha', {
                    'callback': captchaWasSuccessed,
                    'expiredCallback': captchaWasExpired
                });

                transportService.getTransportTypes().then(function (transportTypes) {
                    $scope.transportTypes = transportTypes;

                    spinnerService.hideSpinner($scope.containerId);
                });
            };

            //público
            initSpinner();
            initDates();
            initReviewForm();

            angular.element(document).ready(function () {
                init();
            });

        }]);

})();