var wafepaApp = angular.module('wafepaApp');
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