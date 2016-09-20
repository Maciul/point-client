angular
  .module("pointApp")
  .controller("TypeaheadController", ['$scope','$http','$q',
  function($scope, $http, $q) {


var numbers= null;


  $http.get('https://point380.herokuapp.com/companies').then(function(data) {

    data = data.data.data.map(company => {return {name: company.name}} );
    numbers = new Bloodhound({
        datumTokenizer: function(d) { return Bloodhound.tokenizers.whitespace(d.name); },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: data
      });
        numbers.initialize();

        $scope.exampleData = {
          displayKey: 'name',
          source: numbers.ttAdapter()
        };

        $scope.exampleOptions = {
          hint: true,
          highlight: true
        };
  });

    $scope.foo = null;
      // initialize the bloodhound suggestion engine

      // Single dataset example



}]);
