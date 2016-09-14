angular
  .module("pointApp")
  .controller('DashboardController', ['$scope','$location', 'DashboardService',
  function($scope, $location, DashboardService) {
    $scope.greeting = 'Hola!';
    $scope.getScienceData = DashboardService.getScienceData;

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


              axisLabelDistance: 10
          },
          callback: function(chart){
              console.log("!!! lineChart callback !!!");
          }
      },
      title: {
          enable: true,
          text: 'Title for Line Chart',
          css: {
            color: 'darkblue'
          }
      },


      caption: {
          enable: true,
          html: '<b>Figure 1.</b>',
          css: {
              'color': 'darkblue',
              'text-align': 'justify',
              'margin': '40px 13px 0px 7px'
          }
      }
  };

  $scope.data3 = sinAndCos();

  /*Random Data Generator */
  function sinAndCos() {
      var sin = [],sin2 = [],
          cos = [], test = [];

      //Data is represented as an array of {x,y} pairs.
      for (var i = 0; i < 100; i++) {
          sin.push({x: i, y: Math.sin(i/10)});
          sin2.push({x: i, y: i % 10 == 5 ? null : Math.sin(i/10) *0.25 + 0.5});
          cos.push({x: i, y: .5 * Math.cos(i/10+ 2) + Math.random() / 10});
      }

      //Line chart data should be sent as an array of series objects.
      return [

        {
            values: [{x: 1989, y: 0.0},{x: 1990, y: -4.57},{x: 1991, y: -10.57},{x: 1992, y: -14.57},{x: 1993, y: -18.57}],
            key: 'Science Base', //key  - the name of the series.
            color: '#ff7f0e',  //color - optional: choose your own line color.
        },
        {
            values: [{x: 1989, y: 0.0001},{x: 1990, y: -1},{x: 1991, y: -17.57},{x: 1992, y: -21.57},{x: 1993, y: -30.57}],
            key: 'Google', //key  - the name of the series.
            color: '#aa7f0e'  //color - optional: choose your own line color.
        }
      ];
  }
}]);
