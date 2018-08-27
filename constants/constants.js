(function () {
    var app = angular.module("CV");

    app.factory("constants", function () {
        var constants = {
            "baseUri": "https://como-viajamos.herokuapp.com/api/", //http://localhost:7320/api/
            "interalErrorPath": "error.html",
            "home": "index.html",
            "parameterPrefix": "?",
            "parameterValueAssignment": "=",
            "andParameter": "&"
        };

        return constants;
    });

}());