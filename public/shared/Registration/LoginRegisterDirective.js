var registration = angular.module("registraton", ['ngResource']);

registration.factory("Login", function ($resource) {
    return $resource('/auth/login')
});

registration.factory("Signup", function ($resource) {
    return $resource('/auth/signup')
});

registration.factory("User", function ($resource) {
    return $resource('/api/user')
});

registration.directive('requiresLogin', function () {
    return {
        scope: {
            success: "&"
        },
        template: '<ng-transclude ng-click="handleClick($event)"></ng-transclude>',
        controller: function ($scope, $mdDialog, User) {
            $scope.handleClick = function (ev) {
                var loggedIn = false;

                User.get(function (response) {
                    if (response._id) {
                        $scope.success();
                    } else {
                        $mdDialog.show({
                                templateUrl: '/shared/Registration/LoginRegister.html',
                                controller: 'RegistrationController',
                                parent: angular.element(document.body),
                                targetEvent: ev,
                                clickOutsideToClose: true
                            })
                            .then(function (response) {
                                if (index != -1) {
                                    $scope.currentLayer.notes[index].color = response.color;
                                    $scope.currentLayer.notes[index].path = response.notesName;
                                } else {
                                    notes = {
                                        sizeX: 1,
                                        path: response.notesName,
                                        color: response.color
                                    };
                                    $scope.currentLayer.notes.push(notes);
                                }
                            });
                    }
                });
            }
        },
        transclude: true
    };
});

registration.directive('loginNav', function () {
    return {
        template: '<h2 ng-show="loggedIn">Logged in as {{username}} <a href="/auth/logout">Logout</a></h2>',
        controller: function ($scope, User) {

            $scope.init = function () {
                User.get(function (response) {
                    if (response._id) {
                        $scope.username = response.username;
                        $scope.loggedIn = true;
                    }
                });
            }
            $scope.init();
        }
    };
});

registration.controller('RegistrationController', function ($scope, Login, Signup, $mdDialog, $window) {
    $scope.loginFailure = false;
    $scope.registerFailure = false;

    $scope.login = function () {
        Login.save({}, $scope.form.login).$promise.then(function (response) {
            if (!response._id) {
                $scope.loginFailure = true;
            } else {
                $mdDialog.hide();
                $window.location.reload();

            }
        });
    }

    $scope.register = function () {
        Signup.save({}, $scope.form.register).$promise.then(function (response) {
            if (!response._id) {
                $scope.registerFailure = true;
            } else {
                $mdDialog.cancel();
                $window.location.reload();

            }
        });
    }
});