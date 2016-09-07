angular
  .module("pointApp")
  .controller('MainController', ['$scope', 'MainService', function($scope, MainService) {
    $scope.greeting = 'Hola!';
    $scope.form = {};
    $scope.toggleLogin = MainService.toggleLogin;
    $scope.toggleSignup = MainService.toggleSignup;
  }]);
