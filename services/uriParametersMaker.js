(function () {
    var app = angular.module("CV");

    app.factory("uriParametersService", ["constants", function (constants) {

        var uriParametersService = {};

        uriParametersService.makeAndGetAGetUriParameters = function (parameters) {
            var uriGetParameters = constants.parameterPrefix;

            for (var index = 0; index < parameters.length; index++) {
                var currentParameter = parameters[index];

                if (currentParameter.value !== undefined) {
                    uriGetParameters += currentParameter.key;
                    uriGetParameters += constants.parameterValueAssignment;
                    uriGetParameters += currentParameter.value;
                }

                //Si no es el ultimo parametro apendeo el &
                if (index != (parameters.length)) {
                    uriGetParameters += constants.andParameter;
                }
            }

            return uriGetParameters;
        }

        return uriParametersService;

        }]);
})();
