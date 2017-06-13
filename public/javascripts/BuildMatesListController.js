matesWebApp.factory("CreatedMatesList", function ($resource) {
    return $resource("/api/created_mates_list");
});

matesWebApp.factory("AllUsers", function ($resource) {
    return $resource("/api/all_users/:page/:limit", {
        page: '@page',
        limit: '@limit'
    });
});

matesWebApp.factory("UserSearch", function ($resource) {
    return $resource('/api/user_search/:search_term', {
        search_term: '@search_term'
    });
});


matesWebApp.factory("CreatedMatesList", function ($resource) {
    return $resource("/api/created_mates_list");
});

matesWebApp.factory("AllUsers", function ($resource) {
    return $resource("/api/all_users/:page/:limit", {
        page: '@page',
        limit: '@limit'
    });
});

matesWebApp.factory("UserInvite", function ($resource) {
    return $resource("/api/user_invite/:user_id", {
        user_id: '@user_id',
    });
});

matesWebApp.controller('BuildMatesListController', ['$scope', '$state', "CreatedMatesList", "UserPaginateService", "AllUsers", "UserSearch", "PublicUserProfile",
    "$uibModal", "PublicUserProfileService", "UserInvite", "ConfirmationDialogService",
"FileUploader",
    function ($scope, $state, CreatedMatesList, UserPaginateService, AllUsers, UserSearch, PublicUserProfile, $uibModal, PublicUserProfileService, UserInvite, ConfirmationDialogService, FileUploader) {
        $scope.myMatesList = {};
        $scope.selectedUserFromSearch = {};

        // Paginate stuff
        $scope.currentUser = {}
        $scope.hideNextButton = true;
        $scope.hidePreviousButton = true;
        $scope.loadingNext = false;
        $scope.looadingPrevious = false;


        // Invite to Join Button stuff
        $scope.InviteButtonStatus = 1; // 1 = Loading, 2 = Already Invited, 3 = Not Already Invited

        // House image upload
        $scope.uploader = new FileUploader();

        $scope.initialize = function () {
            $scope.fetchMyMatesList();
            $scope.fetchCurrentPage();
            setUpUploaderFilter();
        }

        $scope.fetchMyMatesList = function () {
            CreatedMatesList.get({}).$promise.then(function (mates_list) {
                $scope.myMatesList = mates_list;
                $scope.myMatesList.max_people = $scope.myMatesList.max_people + "";
                $scope.myMatesList.removedMembers = [];
            });
        }

        $scope.saveChanges = function () {
            CreatedMatesList.save({}, $scope.myMatesList).$promise.then(function (saved_mates_list, putResponseHeaders) {
                $scope.myMatesList = saved_mates_list;
                $scope.myMatesList.max_people = $scope.myMatesList.max_people + "";
                $scope.myMatesList.removedMembers = [];
            });
        }

        $scope.removeUser = function (user_id) {
            var newMembers = [];
            for (var i = 0; i < $scope.myMatesList.members.length; i++) {
                if ($scope.myMatesList.members[i]._id !== user_id) {
                    newMembers.push($scope.myMatesList.members[i]);
                }
            }
            $scope.myMatesList.members = newMembers;
            $scope.myMatesList.removedMembers.push(user_id);
        }

        $scope.preview = function () {}

        // Paginate stuff
        $scope.fetchCurrentPage = function () {
            AllUsers.get({
                page: UserPaginateService.getCurrentPage(),
                limit: 1
            }).$promise.then(function (response) {
                UserPaginateService.setCurrentPage(response.currentPage);
                UserPaginateService.setTotalNumPages(response.totalPages);
                $scope.currentUser = response.data[0];

                $scope.pageChanged();
            });
        }

        $scope.fetchNextPageData = function () {
            $scope.loadingNext = true;
            AllUsers.get({
                page: UserPaginateService.getCurrentPage() + 1,
                limit: 1
            }).$promise.then(function (response) {
                UserPaginateService.setCurrentPage(response.currentPage);
                UserPaginateService.setTotalNumPages(response.totalPages);
                $scope.currentUser = response.data[0];

                $scope.loadingNext = false;
                $scope.pageChanged();
            });
        };

        $scope.fetchPreviousPage = function () {
            $scope.loadingPrevious = true;
            AllUsers.get({
                page: UserPaginateService.getCurrentPage() - 1,
                limit: 1
            }).$promise.then(function (response) {
                UserPaginateService.setCurrentPage(response.currentPage);
                UserPaginateService.setTotalNumPages(response.totalPages);

                $scope.currentUser = response.data[0];
                $scope.loadingPrevious = false;

                $scope.pageChanged();
            });
        };

        $scope.pageChanged = function () {
            // Check if buttons need to be hidden
            if (UserPaginateService.getCurrentPage() < 2) {
                $scope.hidePreviousButton = true;
            } else {
                $scope.hidePreviousButton = false;
            }

            if (UserPaginateService.getCurrentPage() >= UserPaginateService.getTotalNumPages()) {
                $scope.hideNextButton = true;
            } else {
                $scope.hideNextButton = false;
            }
        }

        $scope.searchedUsers = [];
        $scope.refreshSearchedUsers = function (search_term) {
            if (search_term) {
                UserSearch.query({
                    search_term: search_term
                }).$promise.then(function (result) {
                    $scope.searchedUsers = result;
                });
            }
        }

        $scope.$watch('currentUser', function (newValue, oldValue, scope) {
            if ($scope.currentUser._id) {
                $scope.InviteButtonStatus = 1;
                UserInvite.get({
                    user_id: $scope.currentUser._id
                }).$promise.then(function (offer) {
                    if (offer._id) {
                        $scope.InviteButtonStatus = 2;
                    } else {
                        $scope.InviteButtonStatus = 3;
                    }
                });
            }
        }, true);

        $scope.$watch('selectedUserFromSearch', function (newValue, oldValue, scope) {
            if ($scope.selectedUserFromSearch.user) {
                PublicUserProfile.get({
                    user_id: $scope.selectedUserFromSearch.user._id
                }, function (response) {
                    PublicUserProfileService.setUser(response);
                    $uibModal.open({
                        animation: true,
                        templateUrl: 'html/SearchUserResultModal.html',
                        controller: 'SearchUserResultModalController'
                    });
                });
            }
        }, true);

        $scope.invite = function (userId) {
            $scope.InviteButtonStatus = 1;

            // Check if user has a mateslist before trying to invite
            if (!$scope.myMatesList._id) {
                var modalOptions = {
                    closeButtonText: 'Cancel',
                    actionButtonText: 'Ok',
                    headerText: 'Create Mates List',
                    bodyText: 'You must create a Mates List to invite users'
                };

                ConfirmationDialogService.showModal({}, modalOptions).then(function (result) {});

                $scope.InviteButtonStatus = 3;
                return;
            }

            UserInvite.save({
                user_id: $scope.currentUser._id
            }).$promise.then(function (offer) {
                if (offer._id) {
                    $scope.InviteButtonStatus = 2;
                } else {
                    $scope.InviteButtonStatus = 3;
                }
            });
        };

        $scope.cancelInvite = function (userId) {
            $scope.InviteButtonStatus = 1;
            UserInvite.remove({
                user_id: $scope.currentUser._id
            }).$promise.then(function (offer) {
                $scope.InviteButtonStatus = 3;
            });
        }

        function setUpUploaderFilter() {
            $scope.uploader.filters.push({
                name: 'imageFilter',
                fn: function (item, options) {
                    var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                    return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
                }
            });
        }

        $scope.uploader.onAfterAddingFile = function (fileItem) {
            // Used to generate unique key for image
            var uuid = guid();

            // Upload image
            fileItem.url = "/api/upload_image/" + $scope.myMatesList._id + "-key-" + uuid;
            fileItem.alias = "image";
            $scope.uploader.uploadItem(fileItem)

            fileItem.onSuccess = function (response, status, headers) {
                $scope.myMatesList.houseImages.push({url: response.url});
                $scope.$apply();
            }
        };
        
        $scope.removeHouseImage = function(houseImageId) {
            var newHouseImages = [];
            
            for (var i = 0; i < $scope.myMatesList.houseImages.length; i++) {
                if ($scope.myMatesList.houseImages[i]._id !== houseImageId) {
                    newHouseImages.push($scope.myMatesList.houseImages[i]); 
                }
            }
            
            $scope.myMatesList.houseImages = newHouseImages;
        }

        function guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }
        $scope.initialize();
}]);

matesWebApp.service('UserPaginateService', function () {
    var currentPage = 1;
    var totalNumPages = 1;

    this.setCurrentPage = function (value) {
        currentPage = value;
    }

    this.getCurrentPage = function () {
        return currentPage;
    }

    this.setTotalNumPages = function (value) {
        totalNumPages = value;
    }

    this.getTotalNumPages = function () {
        return totalNumPages;
    }
});