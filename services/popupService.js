(function () {
    var app = angular.module("CV");

    app.factory("popupService", ["popupConstants", "$q", "$document", "$templateRequest", "$sce", "$compile", "$animate",
        function (popupConstants, $q, $document, $templateRequest, $sce, $compile, $animate) {

        //privado
        function getProcessedParameters(parameters) {
            if (parameters.appendTo == undefined || parameters.appendTo == "" || parameters.appendTo == null) {
                parameters.appendTo = popupConstants.defaultAppendTo;
            }

            if (parameters.size == undefined || parameters.size == "" || parameters.appendTo == null) {
                parameters.size = popupConstants.defaultSize;
            }

            if (parameters.isAutoDismissAvailable == undefined) {
                parameters.isAutoDismissAvailable = popupConstants.defaultAutoDismiss;
            }

            parameters.scope.dismissPopup = popup.dismiss;
            parameters.scope.noneAction = function ($event) {
                $event.preventDefault();
                $event.stopPropagation();
            };

            return parameters;
        }

        function getPopupBackgroundElement() {
            var backgroundElement = angular.element(popupConstants.defaultBackgroundElement);
            backgroundElement.addClass(popupConstants.backgroundClass);

            if (popup.config.isAutoDismissAvailable) {
                backgroundElement.attr(popupConstants.ngClick, "dismissPopup();");
            }

            return backgroundElement;
        }

        function getContentElement() {
            var cssClass = popupConstants.contentClass + "-" + popup.config.size;
            
            var contentElement = angular.element(popupConstants.defaultBackgroundElement);
            contentElement.addClass(popupConstants.contentClass);
            contentElement.addClass(cssClass);

            if (popup.config.isAutoDismissAvailable) {
                contentElement.attr(popupConstants.ngClick, "noneAction($event);");
            }

            contentElement.attr("ng-controller", popup.config.controller);

            if (popup.config.params && popup.config.params !== undefined && popup.config.params !== null) {
                var initFunction = "init(" + JSON.stringify(popup.config.params) + ");";
                contentElement.attr("ng-init", initFunction);
            }

            return contentElement;
        }

        function finishPromise(finishType, data) {
            var appendToElement = getAppendToElement(popup.config.appendTo);
            var popupContent = popup.parentElement.children()[0];

            $animate.addClass(popupContent, popupConstants.hidePopupCssClass).then(function () {
                appendToElement.css({ overflow: "" });

                popup.parentElement.remove();

                var resolveObject = {
                    data: data,
                    result: finishType
                }

                popup.popupPromise.resolve(resolveObject);
            });
        }

        function getAppendToElement(appendToElement) {
            return $document.find(appendToElement).eq(0);
        }

        //Servicio privado de poppup
        var popup = {};

        popup.resultTypes = popupConstants.resultTypes;

        popup.close = function (data) {
            finishPromise(popupConstants.resultTypes.close, data);
        }

        popup.dismiss = function () {
            finishPromise(popupConstants.resultTypes.dismiss);
        }

        //público
        var popupService = {};

        popupService.open = function (parameters) {
            popup.popupPromise = $q.defer();
            popup.result = popup.popupPromise.promise;

            parameters = getProcessedParameters(parameters);
            popup.config = parameters;

            var templateUrl = $sce.getTrustedResourceUrl(parameters.templateUrl);

            $templateRequest(templateUrl).then(function successCallback(template) {
                var popupElement = template;

                var popupContentElement = getContentElement();
                popupContentElement.append(popupElement);

                popup.parentElement = getPopupBackgroundElement();
                popup.parentElement.append(popupContentElement);

                var appendToElement = getAppendToElement(parameters.appendTo);
                appendToElement.css({ overflow: "hidden" });
                appendToElement.prepend(popup.parentElement);

                popupContentElement.addClass(popupConstants.showPopupCssClass);

                $compile(popup.parentElement)(popup.config.scope);

            }, function errorCallback(error) {
                popup.popupPromise.reject(error);
            });

            return popup;
        }

        return popupService;

    }]);
})();
