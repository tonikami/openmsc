/**
 * Created by boatengyeboah on 10/04/2017.
 */

 function JoinMatesListService() {
    var JoinMatesListService = {};
    var matesList = [];

    JoinMatesListService.getItems = function () {
        return matesList;
    };

    JoinMatesListService.setItems = function (items) {
        matesList = items;
    };
}

matesWebApp.factory("JoinMatesListService", JoinMatesListService);

matesWebApp.factory("AllMatesList", function ($resource) {
    return $resource("/api/all_mateslist/:page/:limit/:university", {
        page: '@page',
        limit: '@limit',
        university: '@university'
    });
});

matesWebApp.service("MatesListPaginateService", function () {
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

matesWebApp.factory("MatesListRequest", function ($resource) {
    return $resource("/api/mates_list_request/:mates_list_id", {
        mates_list_id: '@mates_list_id',
    });
});

matesWebApp.controller("JoinMatesListAsCardController", ["$scope", "AllMatesList", "PublicUserProfile",
    "$uibModal", "PublicUserProfileService", "$state", "UpdatedAtService", "MatesListPaginateService", "MatesListRequest", "Universities", "UserProfile", "Lightbox", "$stateParams",
    function ($scope, AllMatesList, PublicUserProfile, $uibModal, PublicUserProfileService, $state, UpdatedAtService, MatesListPaginateService, MatesListRequest, Universities, UserProfile, Lightbox, $stateParams) {
        $scope.UpdatedAtService = UpdatedAtService;

        // Paginate stuff
        $scope.currentMatesList = {};
        $scope.hideNextButton = true;
        $scope.hidePreviousButton = true;
        $scope.loadingNext = false;
        $scope.looadingPrevious = false;

        $scope.moment = moment;

        $scope.universities = [];
        $scope.selectUniversity = {};
        $scope.selectUniversity.selected = " ";
        var prevUni;

        $scope.myInterval = 5000;
        $scope.noWrapSlides = false;
        $scope.active = 0;
        $scope.images = [];
        var hasSetFirstUni = false;
        $scope.state = $state;
        $scope.initialize = function () {
            if (!$stateParams.uni) {
                UserProfile.get().$promise.then(function (profile) {
                    if (profile.uni.name) {
                        $scope.selectUniversity.selected = profile.uni.name;
                        $scope.prevUni = $scope.selectUniversity.selected;
                    }
                    prevUni = profile.uni.name;
                    $scope.fetchCurrentPage();
                });
            } else {
                $scope.selectUniversity.selected = $stateParams.uni;
                prevUni = $stateParams.uni;
                $scope.fetchCurrentPage();
            }

        };

        $scope.refreshUniversities = function (search_term) {
            if (search_term) {
                Universities.query({
                    term: search_term
                }).$promise.then(function (result) {
                    $scope.universities = result;
                });
            }
        };

        // Request to join button stuff
        $scope.RequestButtonStatus = 1; // 1 = Loading, 2 = Already Requested, 3 = Not Requested Invited


        $scope.fetchCurrentPage = function () {
            AllMatesList.get({
                page: $stateParams.page || 1,
                limit: 1,
                university: $stateParams.uni || " "
            }).$promise.then(function (response) {
                if (response.data.length != 0) {
                    $scope.shouldHideCard = false;
                    MatesListPaginateService.setCurrentPage(response.currentPage);
                    MatesListPaginateService.setTotalNumPages(response.totalPages);
                    $scope.currentMatesList = response.data[0];
                    if ($scope.currentMatesList.houseImages.length > 0) {
                        for (var i = 0; i < $scope.currentMatesList.houseImages.length; i++) {
                            $scope.images.push({
                                "url": $scope.currentMatesList.houseImages[i].url
                            });
                        }
                    }

                    if ($scope.currentMatesList.members) {
                        $scope.currentMatesList.tags = [];
                        for (var i = 0; i < $scope.currentMatesList.members.length; i++) {
                            $scope.currentMatesList.tags = $scope.currentMatesList.tags.concat($scope.currentMatesList.members[i].description.descriptiveWords);
                        }

                        if ($scope.currentMatesList.max_people) {
                            $scope.currentMatesList.availableSpaces = Array($scope.currentMatesList.max_people - $scope.currentMatesList.members.length);
                        }
                    }

                    if ($scope.currentMatesList._id) {
                        $scope.RequestButtonStatus = 1;
                        MatesListRequest.get({
                            mates_list_id: $scope.currentMatesList._id
                        }).$promise.then(function (offer) {
                            if (offer._id) {
                                $scope.RequestButtonStatus = 2;
                            } else {
                                $scope.RequestButtonStatus = 3;
                            }
                        });
                    }


                    $scope.checkButtonHide();
                } else {
                    $scope.shouldHideCard = true;
                }
            });
        };

        $scope.reloadPage = function(uni) {
            if (uni !== prevUni) {
                $state.go("join", {
                    page: 1,
                    uni: uni
                });
            }
        };

        $scope.checkButtonHide = function () {
            $scope.hidePreviousButton = MatesListPaginateService.getCurrentPage() < 2;
            $scope.hideNextButton = MatesListPaginateService.getCurrentPage() >= MatesListPaginateService.getTotalNumPages();
        };

        // Add tags when currentMatesListChanges
        // $scope.$watch('currentMatesList', function (newValue, oldValue, scope) {

        // }, true);

        $scope.request = function (matesListId) {
            $scope.RequestButtonStatus = 1;
            MatesListRequest.save({
                mates_list_id: matesListId
            }).$promise.then(function (offer) {
                if (offer._id) {
                    $scope.RequestButtonStatus = 2;
                } else {
                    $scope.RequestButtonStatus = 3;
                }
            });
        };

        $scope.cancelRequest = function (matesListId) {
            $scope.RequestButtonStatus = 1;
            MatesListRequest.remove({
                mates_list_id: matesListId
            }).$promise.then(function (offer) {
                $scope.RequestButtonStatus = 3;
            });
        };

        $scope.showUserProfile = function (id) {
            // console.log(id);
            PublicUserProfile.get({
                user_id: id
            }, function (response) {
                PublicUserProfileService.setUser(response);
                $uibModal.open({
                    animation: true,
                    templateUrl: 'html/PublicUserProfileModal.html',
                    controller: 'PublicUserProfileController'
                });
            });
        };

        $scope.list = function () {
            $state.go("joinMatesList");
        };


        $scope.interested = function (matesListId) {
            MatesListOffer.get({
                mates_list_id: matesListId
            }, function (response) {
                // handle response
            });
        };




        $scope.goNextPage = function () {
            $state.go("join", {
                page: MatesListPaginateService.getCurrentPage() + 1,
                uni: $scope.selectUniversity.selected
            });
        }

        $scope.goPrevPage = function () {
            $state.go("join", {
                page: MatesListPaginateService.getCurrentPage() - 1,
                uni: $scope.selectUniversity.selected
            });
        }


        $scope.openLightboxModal = function (index) {
            Lightbox.openModal($scope.images, index);
        };


        $scope.getTags = _.memoize(function (members) {

            const maxNumTags = 10;
            var tags = [];
            console.log("New list");
            for (var i = 0; i < members.length; i++) {
                var user = members[i].user;
                // console.log(user);
                var userTags = user.description.descriptiveWords;
                if (userTags.length > 0) {
                    console.log("user tags");
                    tags.push.apply(tags, userTags);
                }
            }
            var j, x, v;
            for (v = tags.length; v; v--) {
                j = Math.floor(Math.random() * v);
                x = tags[v - 1];
                tags[v - 1] = tags[j];
                tags[j] = x;
            }


            return tags.slice(0, maxNumTags);
        });


        $scope.initialize();
    }]);




matesWebApp.service("JoinMatesListPaginationService", function () {
    var currentPage = 1;
    var totalNumPages = 1;

    this.setCurrentPage = function (p) {
        currentPage = p;
    };

    this.getCurrentPage = function () {
        return currentPage;
    };

    this.setTotalNumPages = function (x) {
        totalNumPages = x;
    };

    $scope.listMode = function () {
        $state.go("joinList");
    };
});



matesWebApp.service("JoinMatesListPaginationService", function () {
    var currentPage = 1;
    var totalNumPages = 1;

    this.setCurrentPage = function (p) {
        currentPage = p;
    };

    this.getCurrentPage = function () {
        return currentPage;
    };

    this.setTotalNumPages = function (x) {
        totalNumPages = x;
    };

    this.getTotalNumPages = function () {
        return totalNumPages;
    }
});



matesWebApp.controller("JoinMatesListAsListsController", ["$scope", "JoinMatesListPaginationService",
    "MatesListTemp", "$state", "UpdatedAtService", "UtilityFunctions", "PublicUserProfile", "PublicUserProfileService",
    function ($scope, JoinMatesListPaginationService, MatesListTemp, $state, UpdatedAtService, PublicUserProfile, PublicUserProfileService) {
        $scope.currentPage = JoinMatesListPaginationService.getCurrentPage();
        $scope.totalNumPages = JoinMatesListPaginationService.getTotalNumPages();
        $scope.maxResultsPerPage = 10;
        $scope.listResults = [];

        $scope.UpdatedAtService = UpdatedAtService;
        $scope.init = function () {
            // get data
            $scope.fetchData();

        };

        $scope.getTags = _.memoize(function (members) {

            const maxNumTags = 5;
            var tags = [];
            console.log("New list");
            for (var i = 0; i < members.length; i++) {
                var user = members[i].user;
                // console.log(user);
                var userTags = user.description.descriptiveWords;
                if (userTags.length > 0) {
                    console.log("user tags");
                    tags.push.apply(tags, userTags);
                }
            }
            var j, x, v;
            for (v = tags.length; v; v--) {
                j = Math.floor(Math.random() * v);
                x = tags[v - 1];
                tags[v - 1] = tags[j];
                tags[j] = x;
            }


            return tags.slice(0, maxNumTags);
        });

        $scope.fetchData = function () {
            MatesListTemp.get({
                page: $scope.currentPage,
                limit: $scope.maxResultsPerPage
            }, function (response) {
                $scope.listResults = response.data;
                $scope.maxNumPages = response.total;
                $scope.totalNumHouses = response.total;
            });
        };

        $scope.getPaginationArray = function () {
            return Array.apply(null, {
                length: $scope.totalNumPages
            }).map(Number.call, Number)
        };

        $scope.goToPage = function (page) {
            JoinMatesListPaginationService.setCurrentPage(page);
            JoinMatesListPaginationService.setTotalNumPages($scope.totalNumPages);
            $state.reload();
        };

        $scope.showUserProfile = function (id) {
            console.log(id);
            // Why does this not work? It works for controller above!
            // PublicUserProfile.get({user_id:id}, function(response){
            //     PublicUserProfileService.setUser(response);
            //     $uibModal.open({
            //         animation: true,
            //         templateUrl: 'html/PublicUserProfileModal.html',
            //         controller: 'PublicUserProfileController'
            //     });
            // });
        };

        $scope.init();
    }]);

matesWebApp.controller("SingleMatesListController", ["$scope", "MatesListRequest", "MatesListView", "$stateParams", function ($scope, MatesListRequest, MatesListView, $stateParams) {
    $scope.myInterval = 5000;
    $scope.noWrapSlides = false;
    $scope.active = 0;

    $scope.currentMatesList;
    $scope.RequestButtonStatus = 1; // 1 = Loading, 2 = Already Requested, 3 = Not Requested Invited

    $scope.init = function () {
        MatesListView.get({
            id: $stateParams.matesListId
        }).$promise.then(function (mates_list) {
            $scope.currentMatesList = mates_list;


            MatesListRequest.get({
                mates_list_id: $scope.currentMatesList._id
            }).$promise.then(function (offer) {
                if (offer._id) {
                    $scope.RequestButtonStatus = 2;
                } else {
                    $scope.RequestButtonStatus = 3;
                }
            });
        });
    }

    $scope.request = function () {
        $scope.RequestButtonStatus = 1;
        MatesListRequest.save({
            mates_list_id: $scope.currentMatesList._id
        }).$promise.then(function (offer) {
            if (offer._id) {
                $scope.RequestButtonStatus = 2;
            } else {
                $scope.RequestButtonStatus = 3;
            }
        });
    };

    $scope.cancelRequest = function () {
        $scope.RequestButtonStatus = 1;
        MatesListRequest.remove({
            mates_list_id: $scope.currentMatesList._id
        }).$promise.then(function (offer) {
            $scope.RequestButtonStatus = 3;
        });
    };
    
    $scope.init();
}]);