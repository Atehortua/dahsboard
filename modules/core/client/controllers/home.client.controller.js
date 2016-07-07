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

  /**
   * cerrar el dialogo
   */
  $scope.hide = function() {
    $mdDialog.hide();
  };

  /**
   * cerrar el dialogo
   */
  $scope.cancel = function() {
    $mdDialog.cancel();
  };

  /**
   * Enviar producto a la vista de home
   * @param cod codigo de la factura
   * @param products todos los productos de la factura
     */
  $scope.answer = function(cod,products) {
    if(cod && products.length > 0){
      var factura = {
        codigo:cod,
        products:products
      };
      $scope.error = "";
      console.log(factura)
      $mdDialog.hide(factura);
    }else{
      $scope.error = "LLena todos los campos para poder agregar";
    }
  };

  $scope.formuProduct = false;
  $scope.products = [];
  $scope.product = [];
  $scope.error = "";

  /**
   * abrir formulario de productos
   */
  $scope.openFormuPro = function () {
    $scope.error = "";
    $scope.formuProduct = true;
  };

  /**
   * añadir producto a la tabla
   * @param product informacion del producto
     */
  $scope.addProduct = function (product) {
    if($scope.products.length > 0){
      $scope.statusFormu = true;
      $scope.products.forEach(function (pr) {
        if(pr.codigo === product.codigo){
          $scope.statusFormu = false;
        }
      });
      if($scope.statusFormu){
        $scope.products.push(product);
        $scope.product = [];
        $scope.formuProduct = false;
        $scope.error = "";
      }else{
        $scope.error = "El codigo esta repetido"
      }
    }else{
      $scope.products.push(product);
      $scope.product = [];
      $scope.formuProduct = false;
      $scope.error = "";
    }

  };

  /**
   * remover los prodcutos de la tabla
   * @param codigoProduct codigo del producto que se quiere borrar
     */
  $scope.removeProduct = function (codigoProduct) {
    $scope.error = "";
    $scope.products.forEach(function (pr,index) {
      if(pr.codigo === codigoProduct){
        $scope.products.splice(index,1);
      }
    })
  };

  /**
   * cancelar formulario
   */
  $scope.cancelProduct = function () {
    $scope.error = "";
    $scope.product = [];
    $scope.formuProduct = false;
  };
}
