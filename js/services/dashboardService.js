angular
  .module("pointApp")
  .service('DashboardService', ['$http', function($http) {

    return  {
      getScienceData: getScienceData
    };

    function getScienceData() {
      console.log('something is happening')
      $http({
        method: 'GET',
        url: 'https://point380.herokuapp.com/sciencebase'
        }).then(function (data) {
          console.log(data.data.data[0].target);
          // this callback will be called asynchronously
          // when the response is available
        }, function errorCallback(error) {
          console.log(error);
        });
      }
  }]);
