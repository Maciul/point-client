angular
  .module("pointApp")
  .controller("TypeaheadController", ['$scope','$http','$q',
  function($scope, $http, $q) {


var numbers= null;

  $http.get('https://point380.herokuapp.com/companies').then(function(data) {

    data = data.data.data.map(company => {return {name: company.name}} );
    companies = new Bloodhound({
        datumTokenizer: function(d) { return Bloodhound.tokenizers.whitespace(d.name); },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: data
      });
        companies.initialize();

        $scope.exampleData = {
          displayKey: 'name',
          source: companies.ttAdapter()
        };

        $scope.exampleOptions = {
          highlight: true
        };
  });

    $scope.foo = null;

}]);
