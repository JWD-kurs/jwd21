var wafepaApp = angular.module('wafepaApp');

wafepaApp.controller("standoviCtrl", function($scope, $http){

    var url_base_sajmovi = "http://localhost:8080/api/sajmovi";
    var url_base_standovi = "http://localhost:8080/api/standovi";

    $scope.sajmovi = [];
    $scope.standovi = [];

    $scope.pageNum = 0;
    $scope.totalPages = 0;

    $scope.noviStand = {};
    $scope.noviStand.zakupac = "";
    $scope.noviStand.povrsina = "";
    $scope.noviStand.sajamId = 0;

    $scope.trazeniStand = {};
    $scope.trazeniStand.zakupac = "";
    $scope.trazeniStand.minP = "";
    $scope.trazeniStand.maxP = "";

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

        var config = { params: {}};

        config.params.pageNum = $scope.pageNum;

        if($scope.trazeniStand.zakupac != ""){
            config.params.zakupac = $scope.trazeniStand.zakupac;
        }

        if($scope.trazeniStand.minP != ""){
            config.params.minP = $scope.trazeniStand.minP;
        }

        if($scope.trazeniStand.maxP != ""){
            config.params.maxP = $scope.trazeniStand.maxP;
        }

        var promise = $http.get(url_base_standovi, config);
        promise.then(
            function success(data){
                $scope.standovi = data.data;
                $scope.totalPages = data.headers("totalPages");
                console.log($scope.totalPages);
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
                    $scope.noviStand.zakupac = "";
                    $scope.noviStand.povrsina = "";
                    $scope.noviStand.sajamId = 0;
                },
                function error(data){
                    alert("Something went wrong");
                    console.log("data");
                }

            );
        }
    }

    $scope.changePage = function(num){
        $scope.pageNum = $scope.pageNum + num;
        getStandovi();
    }

    $scope.filter = function(){
        $scope.pageNum = 0;
        getStandovi();
    }

});