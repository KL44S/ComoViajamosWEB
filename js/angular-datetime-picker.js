function DatePicker(date, minDate, maxDate) {
    if (minDate === undefined) {
        minDate = new Date(90, 1, 1);
    };

    if (maxDate === undefined) {
        maxDate = new Date(3000, 1, 1);
    };

    this.date = date;
    this.minDate = minDate;
    this.maxDate = maxDate;
};

(function () {
    var datePickers = [];

    var app = angular.module('datetimePicker', []);

    app.directive('datePicker', function () {

        var controller = function ($scope) {
            var vm = this;

            var monthAndDaySize = 2;

            var months = [
                "Enero",
                "Febrero",
                "Marzo",
                "Abril",
                "Mayo",
                "Junio",
                "Julio",
                "Agosto",
                "Septiembre",
                "Octubre",
                "Noviembre",
                "Diciembre"
            ];

            function Week() {
                this.days = [
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null
                ];
            };

            function setMonth(month) {
                var newMonth = vm.currentMonth.date.getMonth() + month;
                vm.currentMonth.date.setMonth(newMonth);

                newMonth = vm.currentMonth.date.getMonth();

                vm.currentMonth.month.number = newMonth;
                vm.currentMonth.month.description = months[newMonth];
                vm.currentMonth.month.weeks = getWeeks(newMonth, vm.currentMonth.date.getFullYear());
            };

            function getWeeks(month, year) {
                var isCurrentMonth = true;
                var dayIndex = 1;
                var maxDays = 31;
                var lastDayOfTheWeek = 0;
                var sundayIndex = 7;

                var weeks = [];
                var currentWeek = new Week();

                while (isCurrentMonth && dayIndex <= maxDays) {
                    var currentDay = new Date(year, month, dayIndex);
                    isCurrentMonth = (currentDay.getMonth() === month);

                    if (isCurrentMonth) {
                        var dayNumber = currentDay.getDay();
                        var isLastDay = (dayNumber === lastDayOfTheWeek);

                        if (isLastDay) {
                            dayNumber = sundayIndex;
                        };

                        currentWeek.days[dayNumber - 1] = currentDay;

                        if (isLastDay) {
                            weeks.push(currentWeek);
                            currentWeek = new Week();
                        }
                        else if (dayIndex === maxDays) {
                            weeks.push(currentWeek);
                        };
                    }
                    else {
                        weeks.push(currentWeek);
                    };

                    dayIndex++;
                };

                return weeks;
            };

            function getZeroPaddingNumber(number, size) {
                var formattedNumber = number;

                while (formattedNumber.length < size) {
                    formattedNumber = "0" + formattedNumber;
                };

                return formattedNumber;
            };

            function getSelectedDate(date) {
                var formattedDate = "";

                if (date) {
                    formattedDate = getZeroPaddingNumber(date.getDate().toString(), monthAndDaySize) + "-"
                                    + getZeroPaddingNumber((date.getMonth() + 1).toString(), monthAndDaySize) + "-"
                                    + date.getFullYear();
                };

                return formattedDate;
            };

            function initDatePicker() {
                var month;
                var year;
                var date = $scope.picker.date ? new Date($scope.picker.date.getFullYear(),
                                                        $scope.picker.date.getMonth(),
                                                        $scope.picker.date.getDate())
                                : new Date();

                vm.currentMonth = {
                    date: date,
                    month: {
                        number: (date.getMonth() + 1),
                        description: months[date.getMonth()],
                        weeks: getWeeks(date.getMonth(), date.getFullYear())
                    }
                };
            };

            function init() {
                initDatePicker();

                datePickers.push({
                    isDatePickerOpen: false
                });
                vm.datePickerIndex = (datePickers.length - 1);

                $scope.$watch("picker", function (newValue, oldValue) {

                    if (newValue.date !== oldValue.date) {
                        vm.selectedDate = getSelectedDate($scope.picker.date);
                    };
                });
            };

            vm.days = [
                "LU",
                "MA",
                "MI",
                "JU",
                "VI",
                "SA",
                "DO"
            ];

            vm.selectedDate = getSelectedDate($scope.picker.date);

            vm.nextMonth = function () {
                setMonth(1);
            };

            vm.previousMonth = function () {
                setMonth(-1);
            };

            vm.selectDate = function (date) {
                if (date) {
                    if (!vm.isDateSelected(date) && !vm.mustDateBeDisabled(date)) {
                        $scope.picker.date = date;
                        vm.selectedDate = getSelectedDate(date);

                        $scope.callback();
                    };
                };
            };

            vm.isDateSelected = function (date) {
                var isTheSameDate = false;

                if (date && $scope.picker.date) {
                    isTheSameDate = date.getFullYear() === $scope.picker.date.getFullYear();

                    if (isTheSameDate) {
                        isTheSameDate = date.getMonth() === $scope.picker.date.getMonth();

                        if (isTheSameDate) {
                            isTheSameDate = date.getDate() === $scope.picker.date.getDate();
                        };
                    };
                };

                return isTheSameDate;
            };

            vm.mustDateBeDisabled = function (date) {
                var mustBeDisabled = true;

                if (date) {
                    var stringCurrentDate = date.getFullYear().toString() + getZeroPaddingNumber(date.getMonth().toString(), monthAndDaySize)
                                            + getZeroPaddingNumber(date.getDate().toString(), monthAndDaySize);

                    var stringMinDate = $scope.picker.minDate.getFullYear().toString()
                                        + getZeroPaddingNumber($scope.picker.minDate.getMonth().toString(), monthAndDaySize)
                                            + getZeroPaddingNumber($scope.picker.minDate.getDate().toString(), monthAndDaySize);

                    var stringMaxDate = $scope.picker.maxDate.getFullYear().toString()
                                        + getZeroPaddingNumber($scope.picker.maxDate.getMonth().toString(), monthAndDaySize)
                                            + getZeroPaddingNumber($scope.picker.maxDate.getDate().toString(), monthAndDaySize);

                    var currentDate = parseInt(stringCurrentDate);
                    var minDate = parseInt(stringMinDate);
                    var maxDate = parseInt(stringMaxDate);

                    mustBeDisabled = (currentDate < minDate || currentDate > maxDate);
                };

                return mustBeDisabled;
            };

            vm.isToday = function (date) {
                var isDateToday = false;

                if (date) {
                    var today = new Date();

                    isDateToday = ((today.getFullYear() === date.getFullYear())
                                        && (today.getMonth() === date.getMonth())
                                        && (today.getDate() === date.getDate()));
                };

                return isDateToday;

            };

            vm.isDatePickerOpen = function () {
                return datePickers[vm.datePickerIndex].isDatePickerOpen;
            };

            vm.openDatePicker = function ($event) {
                if (!vm.isDatePickerOpen()) {
                    $event.stopPropagation();

                    datePickers[vm.datePickerIndex].isDatePickerOpen = true;
                    initDatePicker();
                };
            };

            window.onclick = function ($event) {
                var somethingHasChanged = false;

                for (var i = 0; i < datePickers.length; i++) {
                    var clickedElement = angular.element($event.target);
                    var clickableClass = "date-picker-clickable" + i;

                    if (!clickedElement.hasClass(clickableClass) && datePickers[i].isDatePickerOpen) {
                        datePickers[i].isDatePickerOpen = false;
                        somethingHasChanged = true;
                    };
                };

                if (somethingHasChanged) {
                    $scope.$apply();
                };

            };

            init();

        };

        return {
            restrict: 'E',
            templateUrl: 'templates/date-picker.html',
            scope: {
                picker: '=',
                callback: '&'
            },
            controller: controller,
            controllerAs: 'vm'
        };
    });

    app.directive('timePicker', function () {
        return {
            restrict: 'E',
            templateUrl: 'templates/time-picker.html',
            replace: true,
            scope: {
                timePicker: '='
            },
            link: function (scope, element, attrs) {

            }
        };
    });

})();