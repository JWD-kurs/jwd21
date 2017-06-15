var wafepaApp = angular.module('wafepaApp', ['ngRoute']);

wafepaApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl : '/static/app/html/partial/proba.html'
        })
        .when('/activities', {
            templateUrl : '/static/app/html/partial/activities.html'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);

wafepaApp.controller('myCtrl', function($scope){
	$scope.poruka="Poruka";
});
