'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$mdSidenav', '$mdBottomSheet', '$mdDialog','$mdToast','$timeout','$mdMedia',
  function($scope, Authentication,  $mdSidenav, $mdBottomSheet, $mdDialog, $mdToast, $timeout, $mdMedia) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

    $scope.status = '  ';
    $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');

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
          .then(function(answer) {
            $scope.status = 'You said the information was "' + answer + '".';
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
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };

  $scope.formuProduct = false;
  $scope.products = [];
  $scope.addProduct = function () {
    $scope.formuProduct = true;
  };

  $scope.cancelProduct = function () {
    $scope.formuProduct = false;
  };
}
