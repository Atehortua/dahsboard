'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$mdSidenav', '$mdBottomSheet', '$mdDialog','$mdToast',
  function($scope, Authentication,  $mdSidenav, $mdBottomSheet, $mdDialog, $mdToast) {
    // This provides Authentication context.
    $scope.authentication = Authentication;


    function toggleUsersList() {
      $mdSidenav('left').toggle();
    }
    
    var self = this;
    self.toggleList   = toggleUsersList;

    $scope.showAlert = function(ev) {
      // Appending dialog to document.body to cover sidenav in docs app
      // Modal dialogs should fully cover application
      // to prevent interaction outside of dialog
      $mdDialog.show(
          $mdDialog.alert()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(true)
              .title('This is an alert title')
              .textContent('You can specify some description text in here.')
              .ariaLabel('Alert Dialog Demo')
              .ok('Got it!')
              .targetEvent(ev)
      );
    };

    $scope.showConfirm = function(ev) {
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.confirm()
          .title('Would you like to delete your debt?')
          .textContent('All of the banks have agreed to forgive you your debts.')
          .ariaLabel('Lucky day')
          .targetEvent(ev)
          .ok('Please do it!')
          .cancel('Sounds like a scam');
      $mdDialog.show(confirm).then(function() {
        $scope.status = 'Confirm';
      }, function() {
        $scope.status = 'No confirm';
      });
    };

    $scope.showSimpleToast = function() {
      $mdToast.show(
          $mdToast.simple()
              .textContent('Simple Toast!')
              .position('top')
              .hideDelay(3000)
      );
    };

  }
]);
