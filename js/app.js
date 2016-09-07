angular.module("pointApp", ["ui.router", "ngAnimate"])

  .config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('/', {
            url: '/',
            templateUrl: 'partials/main.html',
            controller: 'MainController'
        });
      });
