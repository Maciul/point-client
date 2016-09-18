angular
  .module("pointApp")
  .controller('DashboardController', ['$scope','$location', 'DashboardService',
  function($scope, $location, DashboardService) {
    $scope.greeting = 'Hola!';
    $scope.scienceData = [];
    // $scope.formSubmit = DashboardService.formSubmit;
    $scope.form = {};


    $scope.formSubmit = function(form) {
      DashboardService.formSubmit(form).then(function(data) {
        console.log(data);
        $scope.scienceData = data;
      });
    };

    $scope.options3 = {
      chart: {
          type: 'lineChart',
          // height: 500,
          margin : {
              top: 40,
              right: 40,
              bottom: 100,
              left: 100
          },
          x: function(d){ return d.x; },
          y: function(d){ return d.y; },
          useInteractiveGuideline: true,
          duration: 1500,
          forceY:([-10, 20]),
          xDomain: ([2007, 2017]),
          color: (d3.scale.category10().range()),
          dispatch: {
              stateChange: function(e){ console.log("stateChange"); },
              changeState: function(e){ console.log("changeState"); },
              tooltipShow: function(e){ console.log("tooltipShow"); },
              tooltipHide: function(e){ console.log("tooltipHide"); }
          },
          xAxis: {
              axisLabel: 'Target Year',

          },
          yAxis: {
              axisLabel: 'Cumulative Reduction',
              tickFormat: function(d) {
                return d3.format(',.2f')(d);
              },
              axisLabelDistance: 10,
          },
      },
      title: {
          enable: true,

          text: 'Science Base vs Portfolio',
          css: {
            color: 'darkblue',
            position: 'absolute',
            'margin-left': '50vw'
          }
      },

  };

}]);
