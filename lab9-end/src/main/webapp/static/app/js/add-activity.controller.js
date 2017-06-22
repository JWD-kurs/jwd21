var wafepaApp = angular.module('wafepaApp');
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