'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$mdSidenav', '$mdBottomSheet', '$mdDialog','$mdToast','$timeout','$mdMedia',
  function($scope, Authentication,  $mdSidenav, $mdBottomSheet, $mdDialog, $mdToast, $timeout, $mdMedia) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

    $scope.status = '  ';
    $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
    $scope.facturas = [];
    $scope.clearFiltro = function () {
      $scope.filtroInventario = "";
      console.log("limpiando Filtro")
    }
    
    $scope.showFormuFactura = function(ev) {
      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'formuFactura.tmpl.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: useFullScreen
      })
          .then(function(factura) {
            /* aca va la funcion a la base de datos */
            $scope.facturas.push(factura)
          }, function() {
            $scope.status = 'You cancelled the dialog.';
          });
      $scope.$watch(function() {
        return $mdMedia('xs') || $mdMedia('sm');
      }, function(wantsFullScreen) {
        $scope.customFullscreen = (wantsFullScreen === true);
      });
    };
    
  }
]);

function DialogController($scope, $mdDialog) {
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(cod,products) {
    if(cod && products){
      var factura = {
        codigo:cod,
        products:products
      };
      console.log(factura)
      $mdDialog.hide(factura);
    }
  };

  $scope.formuProduct = false;
  $scope.products = [];
  $scope.product = [];

  $scope.openFormuPro = function () {
    $scope.formuProduct = true;
  };

  $scope.addProduct = function (product) {
    $scope.products.push(product);
    $scope.product = [];
    $scope.formuProduct = false;
  }

  $scope.cancelProduct = function () {
    $scope.product = [];
    $scope.formuProduct = false;
  };
}
