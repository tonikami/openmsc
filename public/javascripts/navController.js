matesWebApp.controller('navController', ['$scope', 'UserProfile', '$uibModal', "Utilities",
    "NotificationsShort", "CurrentUserService", '$state', "NotificationSeen", "MessageNotificationSeen", "MessageNotificationsShort", "SocketUrl",
    function ($scope, UserProfile, $uibModal, Utilities, NotificationsShort, CurrentUserService, $state, NotificationSeen, MessageNotificationSeen, MessageNotificationsShort, SocketUrl) {
        $scope.user = null;

        $scope.$state = $state;
        var socket;
        SocketUrl.get().$promise.then(function (result) {
            // console.log("domain is" + result.url);
            socket = io.connect(result.url);
        });
        // var socket = io.connect('https://mates-backend-tests.herokuapp.com/');
        $scope.moment = moment;
        $scope.notifications = [];
        $scope.numOfUnread = 0;
        $scope.initialize = function () {
            SocketUrl.get().$promise.then(function (result) {
                socket = io.connect(result.url);
                $scope.getLoggedInUser();
                $scope.getNotifications();
                $scope.getMessageNotifications();
            });
        };

        // Chat notifications
        $scope.numOfMessageUnread = 0;
        $scope.messageNotifications = [];

        $scope.setListenToNotificationEvents = function () {
            socket.emit("notification_room", $scope.user._id);
            socket.on("notification", function (notification) {
                $scope.numOfUnread++;
                $scope.notifications.push(notification);
                $scope.$apply();
            });

            socket.on("chat-notification", function (notification) {
                console.log(notification);
                $scope.numOfMessageUnread++;
                $scope.messageNotifications.push(notification);
                $scope.$apply();
            });
        };

        $scope.getLoggedInUser = function () {
            UserProfile.get().$promise.then(function (response) {
                $scope.user = response;
                CurrentUserService.setUser(response);
                $scope.setListenToNotificationEvents();
            });
        };

        $scope.getNotifications = function () {
            NotificationsShort.query().$promise.then(function (notifications) {
                notifications.forEach(function (notification) {
                    if (notification.seen == false) {
                        $scope.numOfUnread++;
                        $scope.notifications.push(notification);
                    }
                });

            });
        };

        $scope.getMessageNotifications = function () {
            MessageNotificationsShort.query().$promise.then(function (notifications) {
                notifications.forEach(function (notification) {
                    if (notification.seen == false) {
                        $scope.numOfMessageUnread++;
                        $scope.messageNotifications.push(notification);
                    }
                });

            });
        };

        $scope.showProfileModal = function () {
            $state.go('UserProfile');
        };

        $scope.goToDashboard = function () {
            $state.go('dashboard');
        };

        $scope.messageNotificationViewAll = function () {
            $state.go('dashboard');
        }

        $scope.goToChat = function (matesListId) {
            $state.go('dashboard.chat', {
                matesListId: matesListId,
                userId: $scope.user._id
            });
        }

        $scope.messageNotificationsTapped = function () {
            MessageNotificationSeen.save();
            $scope.numOfMessageUnread = 0;
        }

        $scope.notificationTapped = function () {
            NotificationSeen.save();
            $scope.numOfUnread = 0;
        }

        $scope.initialize();
    }]);