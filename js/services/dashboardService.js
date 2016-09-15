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
          var resultData = [];
          var result = [
            {
              values: [],
              key: ''
            }
          ];
          result[0].key = 'Science Base';
          var year = parseFloat(cleanData.year);
          for (var i = 0; i < cleanData.target.length; i++) {
            result[0].values.push({x: year + i, y: parseFloat(cleanData.target[i])});
          }
          return result;
          // this callback will be called asynchronously
          // when the response is available
        }, function errorCallback(error) {
          console.log(error);
        });
      }
  }]);
