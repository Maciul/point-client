angular.module("pointApp", ["ui.router", "ngAnimate", "nvd3", "siyfion.sfTypeahead"])

  .config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('/', {
            url: '/',
            templateUrl: 'partials/main.html',
            controller: 'MainController'
        })
        .state('/dash', {
          url: '/dash',
          templateUrl: 'partials/dashboard.html',
          controller: 'DashboardController'
        })
        .state('/form', {
          url: '/form',
          templateUrl: 'partials/form.html',
          controller: 'TypeaheadController'
        })
      });
