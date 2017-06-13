var matesWebApp = angular.module("MatesWeb_App", ['ngSanitize', 'ui.router', 'ngDragDrop', 'ngResource', 'ui.bootstrap', 'angularFileUpload', 'ui.select', '720kb.datepicker', 'luegg.directives', 'ngAnimate', 'bootstrapLightbox']);

matesWebApp.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('index', {
        url: '/',
        views: {
            'users_view': {
                templateUrl: 'html/BuildOrJoin.html',
                controller: 'BuildOrJoinController'
            },
            'navigation_view': {
                templateUrl: 'html/navigation.html',
                controller: 'navController'
            }
        }
    })
    .state('UserProfile', {
        url: '/UserProfile',
        views: {
            'users_view': {
                templateUrl: 'html/userProfileModal.html',
                controller: 'userProfileController'
            },
            'navigation_view': {
                templateUrl: 'html/navigation.html',
                controller: 'navController'
            }
        }
    })
    .state('mainHome', {
        url: '/mainHome',
        views: {
            'users_view': {
                templateUrl: 'html/mainHome.html',
                controller: 'MainHomeController'
            }
        }
    })
    .state('join', {
        url: '/join?page&uni',
        views: {
            'users_view': {
                templateUrl: 'html/JoinMatesListAsCard.html',
                controller: 'JoinMatesListAsCardController',
            },
            'navigation_view': {
                templateUrl: 'html/navigation.html',
                controller: 'navController'
            }
        }
    })
    .state('joinMatesList', {
        url: '/join&type=list',
        views: {
            'users_view': {
                templateUrl: 'html/JoinMatesListAsList.html',
                controller: 'JoinMatesListAsListsController'
            },
            'navigation_view': {
                templateUrl: 'html/navigation.html',
                controller: 'navController'
            }
        }
    })
    .state('build', {
        url: '/build',
        views: {
            'users_view': {
                templateUrl: 'html/BuildMatesList.html',
                controller: 'BuildMatesListController'
            },
            'navigation_view': {
                templateUrl: 'html/navigation.html',
                controller: 'navController'
            }
        }
    })
    .state('dashboard', {
        url: '/dashboard',
        views: {
            'users_view': {
                templateUrl: 'html/dashboard.html',
                controller: 'dashboardController'
            },
            'navigation_view': {
                templateUrl: 'html/navigation.html',
                controller: 'navController'
            }
        }
    })
    .state('messages', {
        url: '/messages',
        views: {
            'users_view': {
                templateUrl: 'html/messenger.html',
                controller: 'messengerController'
            },
            'navigation_view': {
                templateUrl: 'html/navigation.html',
                controller: 'navController'
            }
        }
    })
    .state('SingleMatesListView', {
        url: '/SingleMatesListView/:matesListId',
        views: {
            'users_view': {
                templateUrl: 'html/SingleMatesList.html',
                controller: 'SingleMatesListController'
            },
            'navigation_view': {
                templateUrl: '/html/navigation.html',
                controller: 'navController'
            }
        }
    })

    .state('dashboard.chat', {
        url: '/chat/:matesListId/:userId',
        views: {
            'chat_view': {
                templateUrl: 'html/chat.html',
                controller: 'chatController'
            }
        }
    });
    $urlRouterProvider.when('', '/');
});

matesWebApp.factory("Messages", function ($resource) {
    return $resource("/api/:matesListId/messages", {
        matesListId: '@matesListId'
    });
});

matesWebApp.factory("SendMessage", function ($resource) {
    return $resource("/api/:matesListId/sendMessage/:message", {
        message: '@message',
        matesListId: '@matesListId'
    });
});

matesWebApp.factory("Users", function ($resource) {
    return $resource("/api/all_users");
});

matesWebApp.factory("MyMatesList", function ($resource) {
    return $resource("/api/mates_list");
});

matesWebApp.factory("MyMatesList", function ($resource) {
    return $resource("/api/mates_list");
});

matesWebApp.factory("AddMember", function ($resource) {
    return $resource('/api/accept_request/:offer_id', {
        offer_id: '@offer_id'
    });
});

matesWebApp.factory("UserProfile", function ($resource) {
    return $resource('/api/user_profile');
});

matesWebApp.factory("PublicUserProfile", function ($resource) {
    return $resource("/api/:user_id/user_profile", {
        user_id: '@user_id'
    });
});

matesWebApp.factory("UserDecision", function ($resource) {
    return $resource('/api/store_user_decision/:user_id/:added', {
        user_id: '@user_id',
        added: '@added'
    });
});

matesWebApp.factory("UserSuggestion", function ($resource) {
    return $resource('/api/suggested_users');
});

matesWebApp.factory("Universities", function ($resource) {
    return $resource('/api/university_search/:term', {
        term: '@term'
    });
});

matesWebApp.factory("MatesListTemp", function ($resource) {
    return $resource('/api/all_mateslist/:page/:limit', {
        page: "@page",
        limit: "@limit"
    });
});

matesWebApp.factory("Universities", function ($resource) {
    return $resource('/api/university_search/:term', {
        term: '@term'
    });
});

matesWebApp.factory("Courses", function ($resource) {
    return $resource('/api/course_search/:term', {
        term: '@term'
    });
});

matesWebApp.factory("DescriptiveWords", function ($resource) {
    return $resource('/api/descriptive_word_search/:term', {
        term: '@term'
    });
});

matesWebApp.factory("NotificationsShort", function ($resource) {
    return $resource('/api/short_notifications');
});

matesWebApp.factory("MessageNotificationsShort", function ($resource) {
    return $resource('/api/short_message_notifications');
});

matesWebApp.factory("Courses", function ($resource) {
    return $resource('/api/course_search/:term', {
        term: '@term'
    });
});

matesWebApp.factory("DescriptiveWords", function ($resource) {
    return $resource('/api/descriptive_word_search/:term', {
        term: '@term'
    });
});

matesWebApp.factory("UserOffers", function ($resource) {
    return $resource('/api/all_user_invites');
});

matesWebApp.factory("MatesListOffers", function ($resource) {
    return $resource('/api/mates_list_offers');
});

matesWebApp.factory("MatesListRequests", function ($resource) {
    return $resource("/api/all_mates_list_requests");
});

matesWebApp.factory("MatesListView", function ($resource) {
    return $resource("api/mateslist/:id", {
        id: "@id"
    });
});

matesWebApp.factory("AcceptMatesListOffer", function ($resource) {
    return $resource("/api/accept_invite/:offer_id", {
        offer_id: "@offer_id"
    });
});

matesWebApp.factory("NotificationSeen", function ($resource) {
    return $resource("/api/notitications_read");
});

matesWebApp.factory("MessageNotificationSeen", function ($resource) {
    return $resource("/api/message_notifications_read");
});

matesWebApp.factory("MyMatesList", function ($resource) {
    return $resource("/api/mates_list");
});

matesWebApp.factory("IgnoreUserOffer", function ($resource) {
    return $resource("/api/ignore_user_offer/:offer_id", {
        offer_id: "@offer_id"
    });
});

matesWebApp.factory("IgnoreMatesListOffer", function ($resource) {
    return $resource("/api/ignore_mateslist_offer/:offer_id", {
        offer_id: "@offer_id"
    });
});

matesWebApp.factory("SocketUrl", function ($resource) {
    return $resource("/socketURL");
});
// Services
matesWebApp.service("PublicUserProfileService", function () {
    var user = {};
    var userId;
    this.setUser = function (User) {
        user = User;
    };

    this.getUser = function () {
        return user;
    };

    this.setUserId = function (id) {
        userId = id;
    };

    this.getUserId = function () {
        return userId;
    };
});


matesWebApp.service("CurrentUserService", function () {

    var user = {};

    this.setUser = function (u) {
        user = u;
    };

    this.getUser = function () {
        return user;
    }

});
matesWebApp.service("Utilities", function () {
    var socketIoInstance = null;

    this.initSocketIo = function () {
        socketIoInstance = io.connect('http://localhost:5000');
    };

    this.getSocketIoInstance = function () {
        return socketIoInstance;
    }

    this.setSocketIoInstance = function (socket) {
        socketIoInstance = socket;
    }

});

matesWebApp.service("UtilityFunctions", function () {

    this.shuffleTags = function shuffle(a) {
        var j, x, i;
        for (i = a.length; i; i--) {
            j = Math.floor(Math.random() * i);
            x = a[i - 1];
            a[i - 1] = a[j];
            a[j] = x;
        }
        return a;
    }
});


matesWebApp.service("UpdatedAtService", function () {

    var aDay = 24 * 60 * 60 * 1000;
    // Credit to
    this.timeSince = function (isoString) {
        //noinspection JSValidateTypes
        var date = new Date(new Date(isoString).getTime() - aDay);
        var seconds = Math.floor((new Date() - (date)) / 1000);

        var interval = Math.floor(seconds / 31536000);

        if (interval > 1) {
            return interval + " years";
        }
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
            return interval + " months";
        }
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
            return interval + " days";
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
            return interval + " hours";
        }
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
            return interval + " minutes";
        }
        return " < 1 minute";
    };
});

// Viewing a profile to invite someone
matesWebApp.controller("SearchUserResultModalController", ["$scope", "PublicUserProfileService", "$state", "$uibModalInstance", "UserInvite", function ($scope, PublicUserProfileService, $state, $uibModalInstance, UserInvite) {
    $scope.user = PublicUserProfileService.getUser();
    $scope.InviteButtonStatus = 1; // 1 = Loading, 2 = Already Invited, 3 = Not Already Invited

    $scope.initialize = function () {
        UserInvite.get({
            user_id: $scope.user._id
        }).$promise.then(function (offer) {
            if (offer._id) {
                $scope.InviteButtonStatus = 2;
            } else {
                $scope.InviteButtonStatus = 3;
            }
        });
    }

    $scope.invite = function () {
        UserInvite.save({
            user_id: $scope.user._id
        }).$promise.then(function (offer) {
            if (offer._id) {
                $scope.InviteButtonStatus = 2;
            } else {
                $scope.InviteButtonStatus = 3;
            }
        });
    }

    $scope.cancelInvite = function () {
        $scope.InviteButtonStatus = 1;
        UserInvite.remove({
            user_id: $scope.user._id
        }).$promise.then(function (offer) {
            $scope.InviteButtonStatus = 3;
        });
    }

    $scope.close = function () {
        $uibModalInstance.close();
    }

    $scope.initialize();
}]);

// Viewing someone's public profile in modal
matesWebApp.controller("PublicUserProfileController", ["$scope", "PublicUserProfileService", "$state", "$uibModalInstance", function ($scope, PublicUserProfileService, $state, $uibModalInstance) {
    $scope.user = PublicUserProfileService.getUser();

    $scope.close = function () {
        $uibModalInstance.close();
    }
}]);

matesWebApp.controller("MainHomeController", ["$scope", function ($scope) {

    $scope.init = function () {

    };

    $scope.init();
}]);