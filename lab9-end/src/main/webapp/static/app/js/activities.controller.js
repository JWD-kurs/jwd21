var wafepaApp = angular.module('wafepaApp');
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

    $scope.goToAdd = function(){
        $location.path("/activities/add");
    }
});