/**
 * Created by boatengyeboah on 15/04/2017.
 */
matesWebApp.controller("messengerController", ["$scope", function ($scope) {

    $scope.messages = [];
    $scope.init = function () {
        $scope.fetchMessages();
    };

    $scope.fetchMessages = function() {

    };

    $scope.init();
}]);