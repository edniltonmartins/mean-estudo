angular.module('mean-estudo')
    .controller('VeiculosController', 
        function($scope){
            $scope.total = 0;
            $scope.incrementa = ()=>{
                $scope.total++;
            }
        }
);
