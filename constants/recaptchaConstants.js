(function () {
    var app = angular.module("CV");

    app.factory("recaptchaConstants", function () {
        var recaptchaConstants = {
            "key": "6Ldv8oIUAAAAAMfDqFJuPS1laYDUGMfneQ_2omT9",
            "action": "send_review",
            "refreshTime": 60000
        };

        return recaptchaConstants;
    });

}());