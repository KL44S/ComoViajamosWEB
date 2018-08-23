(function () {
    var app = angular.module("CV");

    app.factory("httpCodesConstants", function () {
        var httpCodesConstants = {
            "created": 201,
            "noContent": 204,
            "unauthorized": 401,
            "forbidden": 403,
            "unprocessableEntity": 422,
            "notFound": 404,
            "internalError": 500
        };

        return httpCodesConstants;
    });

}());