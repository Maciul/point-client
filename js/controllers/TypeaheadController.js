angular
  .module("pointApp")
  .controller("TypeaheadController", ['$scope','$http','$q',
  function($scope, $http, $q) {

    var numbers = new Bloodhound({
        datumTokenizer: function(d) { return Bloodhound.tokenizers.whitespace(d.name); },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: [
          {name: 'Kroger'}
        ]
      });

      // initialize the bloodhound suggestion engine
      numbers.initialize();

      // Allows the addition of local datum
      // values to a pre-existing bloodhound engine.
      $scope.addValue = function () {
        numbers.add({
          num: 'twenty'
        });
      };

      // Typeahead options object
      $scope.exampleOptions = {
        highlight: true
      };

      // Single dataset example
      $scope.exampleData = {
        displayKey: 'name',
        source: numbers.ttAdapter()
      };

      // // Multiple dataset example
      // $scope.multiExample = [
      //   {
      //     name: 'nba',
      //     displayKey: 'team',
      //     source: nba.ttAdapter()   // Note the nba Bloodhound engine isn't really defined here.
      //   },
      //   {
      //     name: 'nhl',
      //     displayKey: 'team',
      //     source: nhl.ttAdapter()   // Note the nhl Bloodhound engine isn't really defined here.
      //   }
      // ];

      $scope.foo = null;

}]);
