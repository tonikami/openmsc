/**
 * Created by boatengyeboah on 15/04/2017.
 */
matesWebApp.controller("matesListViewModalController", ["$scope", "currentMatesList", "AcceptMatesListOffer",
    "$uibModalInstance", "IgnoreUserOffer",
    function ($scope, currentMatesList, AcceptMatesListOffer, $uibModalInstance, IgnoreUserOffer) {
        $scope.currentMatesList = currentMatesList;

        $scope.moment = moment;

        if ($scope.currentMatesList.members) {
            $scope.currentMatesList.tags = [];
            for (var i = 0; i < $scope.currentMatesList.members.length; i++) {
                $scope.currentMatesList.tags = $scope.currentMatesList.tags.concat($scope.currentMatesList.members[i].description.descriptiveWords);
            }

            if ($scope.currentMatesList.max_people) {
                $scope.currentMatesList.availableSpaces = Array($scope.currentMatesList.max_people - $scope.currentMatesList.members.length);
            }
        }


        $scope.close = function () {
            $uibModalInstance.close();
        };

        $scope.accept = function () {
            AcceptMatesListOffer.save({offer_id: currentMatesList.offerId}, function (response) {
                $uibModalInstance.close();
            });
        };

        $scope.ignoreUserOffer = function (offerId) {
            IgnoreUserOffer.save({offer_id:currentMatesList.offerId});
            $uibModalInstance.close();
        };



        $scope.ignore = function () {
            $uibModalInstance.close();
        };

    }]);