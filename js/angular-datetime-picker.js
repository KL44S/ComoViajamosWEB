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
                    scope.currentMonth.date.setMonth(month);
                    scope.currentMonth.month.number = month;
                    scope.currentMonth.month.description = months[month];
                    scope.currentMonth.weeks = getWeeks(month, scope.currentMonth.getYear());
                };

                function getWeeks(month, year) {
                    var isCurrentMonth = true;
                    var dayIndex = 1;
                    var maxDays = 31;
                    var firstDayOfWeek = 1;
                    var sundayIndex = 7;

                    var weeks = [];
                    var currentWeek = new Week();

                    while (isCurrentMonth && dayIndex <= maxDays) {
                        var currentDay = new Date(year, month, dayIndex);

                        isCurrentMonth = (currentDay.getMonth() === month);

                        if (isCurrentMonth) {
                            var dayNumber = currentDay.getDay();

                            if (dayNumber === firstDayOfWeek) {
                                weeks.push(currentWeek);
                                currentWeek = new Week();
                            };

                            if (dayNumber === 0) {
                                dayNumber = sundayIndex;
                            };

                            currentWeek[dayNumber] = currentDay;
                        };

                        dayIndex++;
                    };
                };

                scope.days = [
                    "DO",
                    "LU",
                    "MA",
                    "MI",
                    "JU",
                    "VI",
                    "SA"
                ];

                scope.currentMonth = {
                    date: new date(scope.picker.date.getYear(), scope.picker.date.getMonth(), scope.picker.date.getDate()),
                    month: {
                        number: (scope.picker.date.getMonth() + 1),
                        description: months[scope.picker.date.getMonth()]
                    },
                    weeks: getWeeks(scope.picker.date.getMonth(), scope.picker.date.getYear())
                };

                scope.nextMonth = function () {
                    var newMonth = scope.currentMonth.date.getMonth() + 1;
                    setMonth(newMonth);
                };

                scope.previousMonth = function () {
                    var newMonth = scope.currentMonth.date.getMonth() - 1;
                    setMonth(newMonth);
                };

                scope.selectDate = function (date) {
                    if (date) {
                        scope.picker.date = date;
                    };
                };

                scope.isDateSelected = function (date) {
                    var isTheSameDate = false;

                    if (date) {
                        isTheSameDate = date.getYear() === scope.picker.date.getYear();

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
                        var stringCurrentDate = date.getYear().toString() + date.getMonth().toString() + date.getDate();

                        var stringMinDate = scope.picker.minDate.getYear().toString() + scope.picker.minDate.getMonth().toString()
                                                + scope.picker.minDate.getDate();

                        var stringMaxDate = scope.picker.maxDate.getYear().toString() + scope.picker.maxDate.getMonth().toString()
                            + scope.picker.maxDate.getDate();

                        var currentDate = parseInt(stringCurrentDate);
                        var minDate = parseInt(stringMinDate);
                        var maxDate = parseInt(stringMaxDate);

                        mustBeDisabled = (currentDate < minDate || currentDate > maxDate);
                    };

                    return mustBeDisabled;
                };
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