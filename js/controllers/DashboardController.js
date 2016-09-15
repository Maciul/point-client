angular
  .module("pointApp")
  .controller('DashboardController', ['$scope','$location', 'DashboardService',
  function($scope, $location, DashboardService) {
    $scope.greeting = 'Hola!';
    $scope.scienceData = []
    

    $scope.getScienceData = function() {
      DashboardService.getScienceData().then(function(data) {
        console.log(data)
        $scope.scienceData = data;

      });
    };
    $scope.data = [
      {
        values: [{"x":2008,"y":0},{"x":2009,"y":4.2},{"x":2010,"y":-0.3},{"x":2011,"y":-7.9},{"x":2012,"y":-9.2},{"x":2013,"y":-11.3},{"x":2014,"y":-13.1},{"x":2015,"y":-15.7},{"x":2016,"y":-18.5},{"x":2017,"y":-21.3},{"x":2018,"y":-24},{"x":2019,"y":-26.6},{"x":2020,"y":-29.2},{"x":2021,"y":-32.6},{"x":2022,"y":-35.8},{"x":2023,"y":-38.9},{"x":2024,"y":-41.9},{"x":2025,"y":-44.7},{"x":2026,"y":-47.9},{"x":2027,"y":-51},{"x":2028,"y":-54},{"x":2029,"y":-56.8},{"x":2030,"y":-59.4},{"x":2031,"y":-61.8},{"x":2032,"y":-64},{"x":2033,"y":-66.1},{"x":2034,"y":-68.2},{"x":2035,"y":-70.1},{"x":2036,"y":-71.9},{"x":2037,"y":-73.5},{"x":2038,"y":-75.1},{"x":2039,"y":-76.6},{"x":2040,"y":-78.1},{"x":2041,"y":-79.3},{"x":2042,"y":-80.4},{"x":2043,"y":-81.5},{"x":2044,"y":-82.6},{"x":2045,"y":-83.6},{"x":2046,"y":-84.4},{"x":2047,"y":-85.1},{"x":2048,"y":-85.8},{"x":2049,"y":-86.5},{"x":2050,"y":-87.2}],
        key: 'sciencebase'
      }]
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
                return d3.format(',.2f')(d)
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
