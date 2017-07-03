matesWebApp.controller('chatController', ['$scope', 'Messages', "SendMessage", "$stateParams", "Utilities", "$state",
    "SocketUrl", "CurrentUserService",
    function ($scope, Messages, SendMessage, $stateParams, Utilities, $state, SocketUrl, CurrentUserService) {
        $scope.messages = [];
        $scope.messageToSend = null;
        $scope.chatTitle = 'Chat';

        // var socket = io.connect('https://matesapp.herokuapp.com/');
        var socket;

        var currentUser = CurrentUserService.getUser();
        SocketUrl.get().$promise.then(function (result) {
            socket = io.connect(result.url);
            socket.emit("notification_room", $stateParams.userId);
            socket.on("chat-notification", function (notification) {
                $scope.fetchChatMessages();
            });
        });
        // var socket = io.connect('http://localhost:5000/');


        // Utilities.setSocketIoInstance(socket);
        $scope.initialize = function () {
            $scope.fetchChatMessages();
        };

        $scope.fetchChatMessages = function () {
            Messages.query({
                matesListId: $stateParams.matesListId
            }).$promise.then(function (response) {
                if (response.length >= 1) {
                    $scope.messages = response;
                }
            });
        };

        $scope.sendMessage = function () {
            // var message = {
            //     author: currentUser,
            //     body: $scope.messageToSend
            // };
            // $scope.messages.push(message);
            SendMessage.get({
                message: $scope.messageToSend,
                matesListId: $stateParams.matesListId
            }, function (response) {
                // console.log(response);
                $scope.messages.push(response); // moved this above
            });
            $scope.messageToSend = null;
        };

        $scope.closeChat = function () {
            $state.go('dashboard');
        };

        $scope.initialize();
    }]);