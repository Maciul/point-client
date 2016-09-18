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
          height: 500,
          margin : {
              top: 20,
              right: 40,
              bottom: 40,
              left: 100
          },
          x: function(d){ return d.x; },
          y: function(d){ return d.y; },
          useInteractiveGuideline: true,
          forceY:([-10, 20]),
          xDomain: [2007, 2020],
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
          callback: function(chart){
              console.log("!!! lineChart callback !!!");
          }
      },
      title: {
          enable: true,
          text: 'Science Base vs Portfolio',
          css: {
            color: 'darkblue'
          }
      },


      caption: {
          enable: true,
          html: '<b>Figure 1. Some awesome text here</b>',
          css: {
              'color': 'darkblue',
              'text-align': 'justify',
              'margin': '40px 13px 0px 7px'
          }
      }
  };

}]);
