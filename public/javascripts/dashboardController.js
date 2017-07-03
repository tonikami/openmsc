/**
 * Created by boatengyeboah on 15/04/2017.
 */
matesWebApp.controller("dashboardController", ["$scope", "UserProfile", "UserOffers", "$uibModal",
    "MatesListView", "$state", "MyMatesList", "MatesListRequests", "IgnoreUserOffer", "IgnoreMatesListOffer", "AddMember",
    function($scope, UserProfile, UserOffers, $uibModal, MatesListView, $state, MyMatesList,
             MatesListRequests, IgnoreUserOffer, IgnoreMatesListOffer, AddMember){
    $scope.user = {};
    $scope.offers = [];
    $scope.matesLists = [];
    $scope.matesListRequests = [];
    $scope.moment =  moment;
    $scope.init = function () {
        UserProfile.get().$promise.then(function(result){
            $scope.user = result;
        });

        $scope.getUserOffers();
        $scope.getUsersMatesList();
        $scope.getMatesListRequests();
    };

    $scope.getMatesListRequests = function () {
        MatesListRequests.query().$promise.then(function (results) {
            // console.log(results);
            $scope.matesListRequests = results;
        });
    };

    $scope.getUsersMatesList = function() {
        MyMatesList.query().$promise.then(function (results) {
            $scope.matesLists = results;
        });
    };

    $scope.getUserOffers = function() {
        UserOffers.query().$promise.then(function (offers) {
           $scope.offers = offers;
        });
    };


    $scope.ignoreUserOffer = function (offerId) {
        IgnoreUserOffer.save({offer_id:offerId});
        $state.reload();
        $scope.apply();
    };
    $scope.ignoreMatesListOffer = function (offerId) {
        IgnoreMatesListOffer.save({offer_id:offerId});
        $state.reload();
    };


    $scope.acceptUserOffer = function (offerId) {
        // console.log("accept offer with id" + offerId);
        AddMember.save({offer_id:offerId}, function (response) {
            $state.reload();
        });
    };


        $scope.openMessageBox = function (matesListId) {
            $state.go('dashboard.chat', {
                matesListId: matesListId,
                userId: $scope.user._id
            });
        }


        $scope.viewMyMatesList = function(matesListId) {
            MatesListView.get({id:matesListId}, function (response) {
                $uibModal.open({
                    animation: true,
                    templateUrl: 'html/matesListViewModal.html',
                    controller: 'matesListViewModalController',
                    resolve: {
                        currentMatesList: response
                    }
                }).closed.then(function () {

                });

            });
        };

    $scope.view = function (matesListId, offerId) {
        MatesListView.get({id:matesListId}, function (response) {
            response.offerId = offerId;
            $uibModal.open({
                animation: true,
                templateUrl: 'html/matesListViewModal.html',
                controller: 'matesListViewModalController',
                resolve: {
                    currentMatesList: response
                }
            }).closed.then(function () {
                $state.reload();

            });

        });

    };

        $scope.init();

}]);