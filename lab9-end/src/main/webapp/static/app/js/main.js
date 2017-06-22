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