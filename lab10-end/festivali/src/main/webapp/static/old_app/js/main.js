
var app = angular.module("wafepa", ['ngRoute']);

app.controller("addActivityCtrl",function ($scope, $http, $location) {
    $scope.url_base = "api/activities";

    $scope.activity = {};
    $scope.activity.name = "";

    $scope.add = function () {
        $http.post($scope.url_base, $scope.activity).then(
            function success(data) {
                alert("Uspesno je dodata aktivnost u bazu!");
                console.log(data.data);
                $location.path('/activities');
            }
        );
    }
});


app.controller("activitiesCtrl", function ($scope, $http, $location) {

    $scope.searchActivity = {};
    $scope.searchActivity.name = "";
    $scope.url_base = "api/activities";
    $scope.activities = null;

    $scope.page = 0;
    $scope.num_pages = 0;

    $scope.search = function () {
        $scope.page = 0;
        getActivities();
    }

    $scope.back = function () {
        $scope.page = $scope.page - 1;
        getActivities();
    }

    $scope.forward = function () {
        $scope.page = $scope.page + 1;
        getActivities();
    }

    var getActivities = function () {
        var config = { params : {}};
        if($scope.searchActivity.name != ""){
            config.params.name = $scope.searchActivity.name;
        }

        if($scope.page != 0){
            config.params.page = $scope.page;
        }

        $http.get($scope.url_base, config).then(
            function successCallBack(data, status){
                $scope.activities = data.data;
                $scope.num_pages = data.headers("pages");
            }
        )
    }

    getActivities();

    $scope.proceedToEdit = function(id){
        $location.path("/activities/edit/" + id);
    }
    
    $scope.deleteActivity = function (id) {
        $http.delete($scope.url_base + "/" + id).then(
            function successCallback(data) {
                alert("Uspesno je izbrisan korisnik sa id:" + data.data.id);
                getActivities();
            }
        );
    }
});

app.controller("editActivityCtrl", function ($scope, $http, $routeParams, $location) {
    $scope.base_url = "/api/activities";
    $scope.activity = null;

    console.log($routeParams);

    var getActivity = function () {
        $http.get($scope.base_url + "/" + $routeParams.id).
            then(function successCallback(data, status) {
                console.log(data.data);
                $scope.activity = data.data;
            }, function errorCallback(data, status) {
                alert("Nije uspelo dovlacenje");
                console.log(data);
            });
    }

    getActivity();

    $scope.edit = function () {
        alert("Editovanje!");
        $http.put($scope.base_url + "/" + $scope.activity.id, $scope.activity).
            then(function successCallback(data, status) {
                alert("Uspesna izmena!");
                $location.path('/activities');
            }, function errorCallback(data, status) {
                alert("Doslo je do greske");
                console.log(status);
            });

    };
})

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/',{
        templateUrl: '/static/app/html/partial/home.html'
    }).when('/activities',{
        templateUrl: '/static/app/html/partial/activities.html'
    }).when('/activities/edit/:id',{
        templateUrl: '/static/app/html/partial/edit-activity.html'
    }).when('/activities/add',{
        templateUrl: '/static/app/html/partial/add-activity.html'
    }).otherwise({
        redirectTo: '/'
    });
}]);