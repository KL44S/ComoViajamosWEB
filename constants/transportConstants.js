(function () {
    var app = angular.module("CV");

    app.factory("transportConstants", function () {

        var transportConstants = {
            resourceName: "Transport",
            transportIdParameter: "transportId",
            transportTypeIdParameter: "transportTypeId"
        };

        return transportConstants;
    });

}());