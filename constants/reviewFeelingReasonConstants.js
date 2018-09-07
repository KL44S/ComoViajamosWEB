(function () {
    var app = angular.module("CV");

    app.factory("reviewFeelingReasonConstants", function () {

        var reviewFeelingReasonConstants = {
            resourceName: "TravelFeelingReason",
            feelingIdParameter: "travelFeelingId",
            transportTypeIdParameter: "transportTypeId"
        };

        return reviewFeelingReasonConstants;
    });

}());