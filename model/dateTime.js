function Datetime(date, time) {
    this.date = date;
    this.time = time;

    this.toIntFormatted = function (dateSeparator, timeSeparator) {
        var dateSplitted = this.date.split(dateSeparator);
        var yearIndex = 2;
        var monthIndex = 1;
        var dayIndex = 0;

        var dateFormatted = dateSplitted[yearIndex] + dateSplitted[monthIndex] + dateSplitted[dayIndex];
        var timeFormatted = this.time.replace(timeSeparator, "");

        var datetimeFormatted = dateFormatted + timeFormatted;
        var datetimeAsInt = parseInt(datetimeFormatted);

        return datetimeAsInt;
    };
}