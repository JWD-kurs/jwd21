var wafepaApp = angular.module('wafepaApp', ['ngRoute']);



wafepaApp.controller('MyController', function($scope) {
	$scope.message = 'Hello';
	
	$scope.displayMessage = function() {
		alert('Poruka je:' + $scope.message);
	};
});

wafepaApp.controller('HomeController', function($scope) {
	$scope.inputText = 'HelloWorld';
	
	$scope.content = 'Initial';
	
	$scope.clearText = function() {
		$scope.inputText = '';
	};
	
});



wafepaApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl : '/static/app/html/home.html'
        })
        .when('/activities', {
            templateUrl : '/static/app/html/activities.html'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);



