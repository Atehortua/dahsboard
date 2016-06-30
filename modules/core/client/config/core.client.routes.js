'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    // Redirect to 404 when route not found
    $urlRouterProvider.otherwise('not-found');

    // Home state routing
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'modules/core/views/home.client.view.html'
      }) .state('homeK', {
        url: '/homek',
        templateUrl: 'modules/core/views/homeK.html',
        controller: 'HomeK'
    }) .state('homey', {
        url: '/homey',
        templateUrl: 'modules/core/views/homeY.html',
        controller: 'HomeY'
    })
      .state('not-found', {
        url: '/not-found',
        templateUrl: 'modules/core/views/404.client.view.html'
      });
  }
]);
