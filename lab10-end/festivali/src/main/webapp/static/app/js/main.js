var festivalApp = angular.module("festivalApp", ['ngRoute']);

festivalApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/',{
        templateUrl: '/static/app/html/partial/festivali.html'
    }).when('/festivali/edit/:id',{
        templateUrl: '/static/app/html/partial/edit-festival.html'
    }).otherwise({
        redirectTo: '/'
    });
}]);

festivalApp.controller("festivaliCtrl", function($scope, $http, $location){

    var base_url_festivali = "/api/festivali";
    var base_url_mesta = "/api/mesta";

    $scope.promeniRezim = function(){
        $scope.rezimDodavanja = !$scope.rezimDodavanja;
    };
    $scope.rezimDodavanja = true;

    $scope.pageNum = 0;
    $scope.totalPages = 0;

    $scope.mesta = [];
    $scope.festivali = [];

    $scope.noviFestival = {};
    $scope.noviFestival.naziv = "";
    $scope.noviFestival.organizator = "";
    $scope.noviFestival.datumPocetka = "";
    $scope.noviFestival.cenaKarte = "";
    $scope.noviFestival.mestoId = "";


    $scope.trazeniFestival = {};
    $scope.trazeniFestival.naziv = "";
    $scope.trazeniFestival.organizator = "";
    $scope.trazeniFestival.maxCena = "";

    var getFestivali = function(){

        var config = {params: {}};

        config.params.pageNum = $scope.pageNum;

        if($scope.trazeniFestival.naziv != ""){
            config.params.naziv = $scope.trazeniFestival.naziv;
        }

        if($scope.trazeniFestival.organizator != ""){
            config.params.organizator = $scope.trazeniFestival.organizator;
        }

        if($scope.trazeniFestival.maxCena != ""){
            config.params.maxCena = $scope.trazeniFestival.maxCena;
        }


        $http.get(base_url_festivali, config)
            .then(function success(data){
                $scope.festivali = data.data;
                $scope.totalPages = data.headers('totalPages');

            });
    };

    var getMesta = function(){

        $http.get(base_url_mesta)
            .then(function success(data){
                $scope.mesta = data.data;
            });

    };

    getFestivali();
    getMesta();

    $scope.nazad = function(){
        if($scope.pageNum > 0) {
            $scope.pageNum = $scope.pageNum - 1;
            getFestivali();
        }
    };

    $scope.napred = function(){
        if($scope.pageNum < $scope.totalPages - 1){
            $scope.pageNum = $scope.pageNum + 1;
            getFestivali();
        }
    };

    $scope.dodaj = function(){
        $http.post(base_url_festivali, $scope.noviFestival)
            .then(function success(data){
                console.log(data.data);
                alert("Uspesno dodat festival u bazu.");
                getFestivali();

                $scope.noviFestival.naziv = "";
                $scope.noviFestival.organizator = "";
                $scope.noviFestival.datumPocetka = "";
                $scope.noviFestival.cenaKarte = "";
                $scope.noviFestival.mestoId = "";
            });
    };

    $scope.trazi = function () {
        $scope.pageNum = 0;
        getFestivali();
    }

    $scope.izmeni = function(id){
        $location.path('/festivali/edit/' + id);
    }

    $scope.obrisi = function(id){
        $http.delete(base_url_festivali + "/" + id).then(
            function success(data){
                getFestivali();
            },
            function error(data){
                alert("Neuspesno brisanje!");
                console.log(data);
            }
        );

    }
});

festivalApp.controller("editFestivalCtrl", function($scope, $http, $routeParams, $location){

    var base_url_festivali = "/api/festivali";

    $scope.stariFestival = null;

    var getStariFestival = function(){

        $http.get(base_url_festivali + "/" + $routeParams.id)
            .then(function success(data){
               $scope.stariFestival = data.data;
            });

    }
    getStariFestival();
    
    $scope.izmeni = function(){
        $http.put(base_url_festivali + "/" + $scope.stariFestival.id, $scope.stariFestival)
            .then(function success(data){
                alert("Uspešno izmenjen objekat!");
                $location.path("/");
            });
    }
});












