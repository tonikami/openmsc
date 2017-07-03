
matesWebApp.controller('homeController', ['$scope', 'Users', "MyMatesList", "$state", "AddMemeber", "$http", "$uibModal", "UserDecision", "UserSuggestion","MatesListTemp", function($scope, Users, MyMatesList, $state, AddMemeber, $http, $uibModal, UserDecision, UserSuggestion, MatesListTemp) {
    $scope.users = [];
    $scope.suggestedUsers = [];
    $scope.myMatesList = [];
    $scope.publicMatesList = [];
    $scope.randomNumber = Math.floor((Math.random() * 3) + 1);

    $scope.initialize = function() { // gets info for the page
        $scope.fectchUserData();
        $scope.fetchUserPlaylist();
        $scope.getUsersGrid();
        $scope.getTempMatesList();
    }

    $scope.fectchUserData = function() {
        // request user info from server
        Users.query().$promise.then(function(response){
            if (response.length >= 1) {
                $scope.users = response;
            }
        });
    }

    $scope.fetchUserPlaylist = function() {
        // gets users playlist from server
        MyMatesList.query().$promise.then(function(response) {
            if (response.length >= 1) {
                $scope.myMatesList = response;
            }
        });
    }
    
    // $scope.fetchUserSuggestion = function() {
    //     // gets users playlist from server
    //     UserSuggestion.query().$promise.then(function(response) {
    //         $scope.suggestedUsers = response;
    //     });
    // }
    
    $scope.onDrop = function(event, ui, data) {
        var isMember = false;
        for (var i = 0; i < data.matesList.members.length; i++) {
            if (data.userToAdd._id == data.matesList.members[i].user._id) {
                isMember = true;
            }
        }
    
        if (!isMember) {
            data.matesList.members.push({user: data.userToAdd, accepted: false, admin: false})
            $scope.$apply();
            
            AddMemeber.get({matesListId: data.matesList._id, user_id: data.userToAdd._id}, function(response){
            });
            
            UserDecision.get({user_id: data.userToAdd._id, added: true}, function(response) {
            });
        }
    }
    
    $scope.showChat = function(mates_list_id) {
        $state.go('index.chat', { matesListId: mates_list_id });
    }
    
    $scope.closeChat = function() {
        $state.go ('index')
    }
    
    $scope.getUsersGrid = function() {
        
    }
    
    $scope.showUserModal = function(user) {
        
        var userModalInstance = $uibModal .open({
            animation: true,
            templateUrl: 'html/UserModal.html',
            controller: 'userModalController'
// Use to pass data to the controller
//            resolve: {
//            items: function () {
//              return $scope.items;
//            },
//            key: function() {return key; }
//            }
        });
        
        UserDecision.get({user_id: user._id, added: false}, function(response) {
            
        });
    }


    $scope.getTempMatesList = function() {
        MatesListTemp.query().$promise.then(function (results) {
            $scope.publicMatesList = results;
        });
    }
    $scope.initialize(); // calls function when page loads
}]);
