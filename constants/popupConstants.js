(function () {
    var app = angular.module("CV");

    app.factory("popupConstants", function () {
        var popupConstants = {
            "defaultAppendTo": "body",
            "defaultBackgroundElement": "<div></div>",
            "backgroundClass": "popup-bk",
            "contentClass": "popup-content",
            "ngClick": "ng-click",
            "sizes": {
                "sm": "sm",
                "md": "md",
                "lg": "lg"
            },
            "defaultSize": "md",
            "defaultAutoDismiss": true,
            "hidePopupCssClass": "popup-content-hide",
            "showPopupCssClass": "popup-content-show",
            "resultTypes": {
                "dismiss": 0,
                "close": 1
            }
        };

        return popupConstants;
    });

}());