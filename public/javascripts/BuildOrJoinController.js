/**
 * Created by boatengyeboah on 09/04/2017.
 */
matesWebApp.controller('BuildOrJoinController', ['$scope', '$state', function($scope, $state){

    $scope.switchState = function(nextState) {
        switch (nextState) {
            case "join":
                $state.go("join");
                break;
            case "build":
                $state.go("build");
                break;
        }
    }
}]);