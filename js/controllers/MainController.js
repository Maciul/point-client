angular
  .module("pointApp")
  .controller('MainController', ['$scope', '$location', '$anchorScroll', 'MainService',
  function($scope, $location, $anchorScroll, MainService) {
    $scope.greeting = 'Hola!';
    $scope.form = {};
    $scope.toggleLogin = MainService.toggleLogin;
    $scope.toggleSignup = MainService.toggleSignup;

    $scope.scrollTo = function(id) {
      $location.hash(id);
      $anchorScroll();
    };
  }]);
