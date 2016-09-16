angular
  .module("pointApp")
  .factory('DashboardService', ['$http', function($http) {

    return  {
      getScienceData: getScienceData
    };

    function getScienceData() {
      console.log('something is happening')
      return $http({
        method: 'GET',
        url: 'https://point380.herokuapp.com/sciencebase/2008'
        }).then(function (data) {
          var cleanData = data.data.data[0];
          var values = [];
          var values1 = [];
          var result = []
          var year = parseFloat(cleanData.year);
          for (var i = 0; i < cleanData.target.length; i++) {
            values.push({x: year + i, y: parseFloat(cleanData.target[i])});
          }
          for (i = 0; i < cleanData.target.length; i++) {
            values1.push({x: year + i, y: parseFloat(cleanData.target[i]) + 10});
          }
          result.push({values:values, key:'sciencebase1'});
          // result.push({values:values1, key:'sciencebase2'})
          console.log(values)
          console.log(result)
          return result
          // this callback will be called asynchronously
          // when the response is available
        }, function errorCallback(error) {
          console.log(error);
        });
      }
  }]);
