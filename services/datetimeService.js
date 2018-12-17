(function () {
    var app = angular.module("CV");

    app.factory("datetimeService", function () {

        var monthAndDaySize = 2;

        function getZeroPaddingNumber(number, size) {
            var formattedNumber = number;

            while (formattedNumber.length < size) {
                formattedNumber = "0" + formattedNumber;
            };

            return formattedNumber;
        };

        var datetimeService = {};

        datetimeService.compareDates = function (date, anotherDate) {
            var newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            newDate.setHours(0);
            newDate.setMinutes(0);
            newDate.setSeconds(0);
            newDate.setMilliseconds(0);

            var newAnotherDate = new Date(anotherDate.getFullYear(), anotherDate.getMonth(), anotherDate.getDate());
            newAnotherDate.setHours(0);
            newAnotherDate.setMinutes(0);
            newAnotherDate.setSeconds(0);
            newAnotherDate.setMilliseconds(0);

            return datetimeService.compareDatetimes(newDate, newAnotherDate);
        };

        datetimeService.compareDatetimes = function (datetime, anotherDatetime) {
            var result = (datetime.getTime() - anotherDatetime.getDate());

            return result;
        };

        return datetimeService;

    });
})();
