(function () {
    var app = angular.module("CV");

    app.factory("httpConstants", function () {
        var httpConstants = {
            "authParameter": "access_token",
            "token": "f998dded8d0f8aca812d8e5fdea0143aa190ec4014239bc7e9d3bde3cbd9e140"
        };

        return httpConstants;
    });

}());