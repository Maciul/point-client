angular.module("pointApp", ["ui.router", "ngAnimate", "nvd3"])

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
      });
