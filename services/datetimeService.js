(function () {
    var app = angular.module("CV");

    app.factory("datetimeService", function () {

        function getZeroPaddingNumber(number, size) {
            var formattedNumber = number;

            while (formattedNumber.length < size) {
                formattedNumber = "0" + formattedNumber;
            };

            return formattedNumber;
        };

        var datetimeService = {};

        datetimeService.compareDates = function (date, anotherDate) {
            var newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
            var newAnotherDate = new Date(anotherDate.getFullYear(), anotherDate.getMonth(), anotherDate.getDate(), 0, 0, 0);

            return datetimeService.compareDatetimes(newDate, newAnotherDate);
        };

        datetimeService.compareTimes = function (time, anotherTime) {
            var newTime = new Date(1, 1, 1, time.getHours(), time.getMinutes(), time.getSeconds());
            var newAnotherTime = new Date(1, 1, 1, anotherTime.getHours(), anotherTime.getMinutes(), anotherTime.getSeconds());

            return datetimeService.compareDatetimes(newTime, newAnotherTime);
        };

        datetimeService.compareDatetimes = function (datetime, anotherDatetime) {
            datetime.setMilliseconds(0);
            anotherDatetime.setMilliseconds(0);

            var result = (datetime.getTime() - anotherDatetime.getTime());

            return result;
        };

        return datetimeService;

    });
})();
