(function () {

    var app = angular.module("CV");

    app.controller("navbarController", ["$scope", "constants", "$window", function ($scope, constants, $window) {

        function setCurrentPath() {
            var currentPath = $window.location.pathname;
            var pathSplitted = currentPath.split("/");

            currentPath = pathSplitted[pathSplitted.length - 1];

            $scope.currentPath = (currentPath === "") ? constants.sections.index : currentPath
        };

        function init() {
            $scope.isSidebarOpen = false;
            $scope.options = [
                new NavbarOption(constants.sections.index, "INICIO"),
                new NavbarOption(constants.sections.stats, "ESTADÍSTICAS"),
                new NavbarOption(constants.sections.info, "INFO"),
            ];

            $scope.openSidebar = function () {
                $scope.isSidebarOpen = true;
            };

            $scope.closeSidebar = function () {
                $scope.isSidebarOpen = false;
            };

            setCurrentPath();
        };

        init();
    }]);

})();