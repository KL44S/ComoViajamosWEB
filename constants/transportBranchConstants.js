(function () {
    var app = angular.module("CV");

    app.factory("transportBranchConstants", function () {

        var transportBranchConstants = {
            resourceName: "TransportBranch",
            transportIdParameter: "transportId",
            transportBranchIdParameter: "branchId"
        };

        return transportBranchConstants;
    });

}());