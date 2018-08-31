(function () {

    var app = angular.module("CV");

    app.controller("navbarController", ["$scope", function ($scope) {

        $scope.isSidebarOpen = false;
        $scope.options = [
            new NavbarOption("#", "ESTADÍSTICAS"),
            new NavbarOption("#", "APP"),
            new NavbarOption("#", "INFO"),
        ];

        $scope.openSidebar = function () {
            $scope.isSidebarOpen = true;
        };

        $scope.closeSidebar = function () {
            $scope.isSidebarOpen = false;
        };
    }]);

})();