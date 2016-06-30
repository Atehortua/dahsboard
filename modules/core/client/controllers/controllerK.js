'use strict';

angular.module('core').controller('HomeK', ['$scope', 'Authentication', '$mdSidenav', '$mdBottomSheet', '$mdDialog','$mdToast',
    function($scope, Authentication,  $mdSidenav, $mdBottomSheet, $mdDialog, $mdToast) {
        // This provides Authentication context.
        $scope.authentication = Authentication;


        $scope.confir = ""
        $scope.clicK = function (recibi) {
            if(recibi === "hola"){
                $scope.confir="Estoy aqui";
            }else{
                $scope.confir = "No estoy aca";
            }

        }
    }
]);

