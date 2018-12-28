(function () {
    var app = angular.module("CV");

    app.factory("constants", function () {
        var constants = {
            "baseUri": "https://como-viajamos.herokuapp.com/api/", //http://localhost:60443/api/
            "interalErrorPath": "error.html",
            "home": "index.html",
            "parameterPrefix": "?",
            "parameterValueAssignment": "=",
            "andParameter": "&",
            "sections": {
                "index": "/index.html",
                "stats": "/estadisticas.html",
                "info": "/info.html"
            }
        };

        return constants;
    });

}());