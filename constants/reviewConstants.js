(function () {
    var app = angular.module("CV");

    app.factory("reviewConstants", function () {

        var reviewConstants = {
            minutesRound: 10,
            minutesBetweeness: 30,
            resourceName: "TravelReview",
        };

        return reviewConstants;
    });

}());