var singleMatesListApp = angular.module("Single_MatesList_App", ['ngSanitize', 'ui.router', 'ngResource', 'ui.bootstrap', 'ui.select', 'ngAnimate', 'bootstrapLightbox']);

singleMatesListApp.controller("SingleMatesList_Not_Registered", ["$scope", function ($scope) {
    $scope.myInterval = 5000;
    $scope.noWrapSlides = false;
    $scope.active = 0;

    $scope.currentMatesList;

    $scope.init = function (mates_list) {
        $scope.currentMatesList = JSON.parse(mates_list);
    }
}]);