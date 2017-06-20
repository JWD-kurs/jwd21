var wafepaApp = angular.module('wafepaApp', ['ngRoute']);

wafepaApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl : '/static/app/html/partial/home.html'
        })
        .when('/activities', {
            templateUrl : '/static/app/html/partial/activities.html'
        })
        .when('/activities/add', {
            templateUrl : '/static/app/html/partial/add-activity.html'
        })
        .when('/activities/edit/:aid', {
            templateUrl : '/static/app/html/partial/edit-activity.html'
        })
        .when('/standovi', {
            templateUrl : '/static/app/html/partial/standovi.html'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);

wafepaApp.controller('activitiesCtrl', function($scope, $http, $location){
	
    var url_base = "http://localhost:8080/api/activities";

    $scope.activities = [];
    $scope.got_activities = false;

    var getActivities = function(){
        var ac_promise = $http.get(url_base);
        ac_promise.then(
            function success(data){
                $scope.activities = data.data;
                $scope.got_activities = true;
            },
            function error(data){
                console.log(data);
                alert("Something went wrong!");
            }
        );
    }

    getActivities();

    $scope.deleteActivity = function(id){
        var promise = $http.delete(url_base + "/" + id);
        promise.then(
            function success(data){
                alert("Success!");
                getActivities();
            },
            function error(data){
                console.log(data);
                alert("Something went wrong!");
            }
        );
    }

    $scope.editActivity = function(id){
        $location.path("/activities/edit/" + id);
    }
});

wafepaApp.controller("addActivityCtrl", function($scope, $http, $location){

    var url_base = "http://localhost:8080/api/activities";

    $scope.newActivity = {};
    $scope.newActivity.name = "";

    $scope.addActivity = function(){
        if($scope.newActivity.name != ""){
            $http.post(url_base, $scope.newActivity).then(
                function success(data){
                    $location.path("/activities");
                },
                function error(data){
                    console.log(data);
                    alert("Something went wrong!");
                }
            );
        }
    }

});

wafepaApp.controller("editActivityCtrl", function($scope, $routeParams, $http, $location){

    var url_base = "http://localhost:8080/api/activities";
    var id = $routeParams.aid;

    $scope.activity = {};
    $scope.activity.name = "";

    var getActivity = function(){
        $http.get(url_base + "/" + id).then(
            function success(data){
                alert("Success!");
                $scope.activity = data.data;
            },
            function error(data){
                console.log(data);
                alert("Something went wrong");
            }
        );
    }

    getActivity();

    $scope.editActivity = function(){
        $http.put(url_base + "/" + id, $scope.activity).then(
            function success(data){
                $location.path("/activities");
            },
            function error(data){
                console.log(data);
                alert("Something went wrong!");
            }
        );
    }
});


wafepaApp.controller("standoviCtrl", function($scope, $http){

    var url_base_sajmovi = "http://localhost:8080/api/sajmovi";
    var url_base_standovi = "http://localhost:8080/api/standovi";

    $scope.sajmovi = [];
    $scope.standovi = [];


    $scope.noviStand = {};
    $scope.noviStand.zakupac = "";
    $scope.noviStand.povrsina = "";
    $scope.noviStand.sajamId = 0;

    var getSajmovi = function(){

        $http.get(url_base_sajmovi).then(
            function success(data){
                $scope.sajmovi = data.data;
                alert("Radi");
            },
            function error(data){
                alert("Something went wrong!");
                console.log(data);
            }
        );

    }

    getSajmovi();


    var getStandovi = function(){

        var promise = $http.get(url_base_standovi);
        promise.then(
            function success(data){
                $scope.standovi = data.data;
            },
            function error(data){
                alert("Something went wrong!");

            }
        );
    }

    getStandovi();

    $scope.addStand = function(){

        if($scope.noviStand.zakupac != "" 
            && !isNaN($scope.noviStand.povrsina)
            && $scope.noviStand.povrsina != "" 
            && $scope.noviStand.sajamId != 0){


            $http.post(url_base_standovi, $scope.noviStand).then(
                function success(data){
                    getStandovi();
                },
                function error(data){
                    alert("Something went wrong");
                    console.log("data");
                }

            );
        }
    }

});