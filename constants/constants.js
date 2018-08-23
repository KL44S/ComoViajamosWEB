(function () {
    var app = angular.module("CV");

    app.factory("constants", function () {
        var constants = {
            "baseUri": "https://dream-team-metro.herokuapp.com/api/", //http://localhost:49922/api/
            "interalErrorPath": "error.html",
            "home": "index.html",
            "parameterPrefix": "?",
            "parameterValueAssignment": "=",
            "andParameter": "&"
        };

        return constants;
    });

}());