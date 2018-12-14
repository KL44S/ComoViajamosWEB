(function () {
    var app = angular.module('datetimePicker', []);

    app.directive('datePicker', function () {
        return {
            restrict: 'E',
            templateUrl: 'templates/date-picker.html',
            scope: {
                picker: '='
            },
            link: function (scope, element, attrs) {
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
                    var newMonth = scope.currentMonth.date.getMonth() + month;
                    scope.currentMonth.date.setMonth(newMonth);

                    newMonth = scope.currentMonth.date.getMonth();

                    scope.currentMonth.month.number = newMonth;
                    scope.currentMonth.month.description = months[newMonth];
                    scope.currentMonth.month.weeks = getWeeks(newMonth, scope.currentMonth.date.getFullYear());
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
                                        + getZeroPaddingNumber(date.getMonth().toString(), monthAndDaySize) + "-"
                                        + date.getFullYear();
                    };

                    return formattedDate;
                };

                function initDatePicker() {
                    var month;
                    var year;
                    var date = scope.picker.date ? new Date(scope.picker.date.getFullYear(),
                                                            scope.picker.date.getMonth(),
                                                            scope.picker.date.getDate())
                                    : new Date();

                    scope.currentMonth = {
                        date: date,
                        month: {
                            number: (date.getMonth() + 1),
                            description: months[date.getMonth()],
                            weeks: getWeeks(date.getMonth(), date.getFullYear())
                        }
                    };
                };

                scope.isDatePickerOpen = false;

                scope.days = [
                    "LU",
                    "MA",
                    "MI",
                    "JU",
                    "VI",
                    "SA",
                    "DO"
                ];

                scope.selectedDate = getSelectedDate(scope.picker.date);

                scope.nextMonth = function () {
                    setMonth(1);
                };

                scope.previousMonth = function () {
                    setMonth(-1);
                };

                scope.selectDate = function (date) {
                    if (date) {
                        if (!scope.isDateSelected(date) && !scope.mustDateBeDisabled(date)) {
                            scope.picker.date = date;
                            scope.selectedDate = getSelectedDate(scope.picker.date);
                        };
                    };
                };

                scope.isDateSelected = function (date) {
                    var isTheSameDate = false;

                    if (date && scope.picker.date) {
                        isTheSameDate = date.getFullYear() === scope.picker.date.getFullYear();

                        if (isTheSameDate) {
                            isTheSameDate = date.getMonth() === scope.picker.date.getMonth();

                            if (isTheSameDate) {
                                isTheSameDate = date.getDate() === scope.picker.date.getDate();
                            };
                        };
                    };

                    return isTheSameDate;
                };

                scope.mustDateBeDisabled = function (date) {
                    var mustBeDisabled = true;

                    if (date) {
                        var stringCurrentDate = date.getFullYear().toString() + getZeroPaddingNumber(date.getMonth().toString(), monthAndDaySize)
                                                + getZeroPaddingNumber(date.getDate().toString(), monthAndDaySize);

                        var stringMinDate = scope.picker.minDate.getFullYear().toString() 
                                            + getZeroPaddingNumber(scope.picker.minDate.getMonth().toString(), monthAndDaySize)
                                                + getZeroPaddingNumber(scope.picker.minDate.getDate().toString(), monthAndDaySize);

                        var stringMaxDate = scope.picker.maxDate.getFullYear().toString()
                                            + getZeroPaddingNumber(scope.picker.maxDate.getMonth().toString(), monthAndDaySize)
                                                + getZeroPaddingNumber(scope.picker.maxDate.getDate().toString(), monthAndDaySize);

                        var currentDate = parseInt(stringCurrentDate);
                        var minDate = parseInt(stringMinDate);
                        var maxDate = parseInt(stringMaxDate);

                        mustBeDisabled = (currentDate < minDate || currentDate > maxDate);
                    };

                    return mustBeDisabled;
                };

                scope.isToday = function (date) {
                    var isDateToday = false;

                    if (date) {
                        var today = new Date();

                        isDateToday = ((today.getFullYear() === date.getFullYear())
                                            && (today.getMonth() === date.getMonth())
                                            && (today.getDate() === date.getDate()));
                    };

                    return isDateToday;

                };

                scope.openDatePicker = function ($event) {
                    $event.stopPropagation();

                    scope.isDatePickerOpen = true;
                    initDatePicker();
                };

                window.onclick = function ($event) {
                    var clickedElement = angular.element($event.target);
                    var clickableClass = "date-picker-clickable";

                    if (!clickedElement.hasClass(clickableClass) && scope.isDatePickerOpen) {
                        scope.isDatePickerOpen = false;

                        scope.$apply();
                    };
                };

                initDatePicker();
            }
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