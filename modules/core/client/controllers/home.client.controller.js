'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$mdSidenav', '$mdBottomSheet', '$mdDialog','$mdToast',
  function($scope, Authentication,  $mdSidenav, $mdBottomSheet, $mdDialog, $mdToast) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
    
  }
]);
