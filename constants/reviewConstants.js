(function () {
    var app = angular.module("CV");

    app.factory("reviewConstants", function () {

        var reviewConstants = {
            minutesRound: 10,
            minutesBetweeness: 30,
            resourceName: "TravelReview",
            timeSeparator: ":",
            dateSeparator: "-",
            dateFormat: "d" + this.dateSeparator + "m" + this.dateSeparator + "Y",
            timeFormat: "H" + this.timeSeparator + "i",
            timePrefix: "T",
            secondsBeforeDismiss: 4000
        };

        return reviewConstants;
    });

}());