matesWebApp.controller('userProfileController', ['$scope', 'UserProfile', 'FileUploader', "Universities", "Courses", "DescriptiveWords", "$http", "$state", function ($scope, UserProfile, FileUploader, Universities, Courses, DescriptiveWords, $http, $state) {
    $scope.user = {};
    $scope.uploader = new FileUploader();
    $scope.universities = [];
    $scope.courses = [];
    $scope.descriptiveWords = [];
    $scope.profilePictureSrc = "https://lut.im/7JCpw12uUT/mY0Mb78SvSIcjvkf.png";
    var imageToUpload;
    $scope.dateTest = Date.now();

    $scope.initialize = function () {
        $scope.fetchUserData();
        setUpUploaderFilter();
    }

    $scope.refreshUniversities = function (search_term) {
        if (search_term) {
            Universities.query({
                term: search_term
            }).$promise.then(function (result) {
                $scope.universities = result;
            });
        }
    }

    $scope.refreshCourses = function (search_term) {
        if (search_term) {
            Courses.query({
                term: search_term
            }).$promise.then(function (result) {
                $scope.courses = result;
            });
        }
    }

    $scope.refreshDescriptiveWords = function (search_term) {
        if (search_term) {
            DescriptiveWords.query({
                term: search_term
            }).$promise.then(function (result) {
                $scope.descriptiveWords = result;
            });
        }
    }

    $scope.fetchUserData = function () {
        UserProfile.get().$promise.then(function (data) {
            $scope.user = data;
            $scope.profilePictureSrc = 'https://storage.googleapis.com/mates-web-image-bucket/' + $scope.user._id + '.jpg';
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
        // Open cropping service
        fileItem.url = "/api/upload_image/" + $scope.user._id;
        fileItem.alias = "image";
        imageToUpload = fileItem;
        var reader = new FileReader();
        reader.onload = function (event) {
            $scope.profilePictureSrc = event.target.result;
            $scope.$apply();
        };
        reader.readAsDataURL(fileItem._file);
    };

    $scope.onBeforeUploadItem = function (item) {

    }


    $scope.updateUserProfile = function () {
        if (imageToUpload) {
            imageToUpload.upload();
        }

        $http.post('/api/update_user_profile', $scope.user).then(function (success) {
            $state.go('index');
        });
    }

    $scope.initialize();
}]);