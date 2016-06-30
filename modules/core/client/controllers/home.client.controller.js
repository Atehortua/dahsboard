'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$mdSidenav', '$mdBottomSheet', '$mdDialog','$mdToast','$timeout',
  function($scope, Authentication,  $mdSidenav, $mdBottomSheet, $mdDialog, $mdToast,$timeout) {
    // This provides Authentication context.
    $scope.authentication = Authentication;


    $scope.clearFiltro = function () {
      $scope.filtroInventario = "";
      console.log("limpiando Filtro")
    }
  }
]);
