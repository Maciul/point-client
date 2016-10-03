angular
  .module("pointApp")
  .factory('DashboardService', ['$http', '$q', function($http, $q) {

    return  {
      formSubmit: formSubmit
    };

    function formSubmit(form) {
      var promises = [];

      promises.push($http.get('https://point380.herokuapp.com/sciencebase/' +form.year));

      Object.keys(form.data).forEach(function(key) {
        if (typeof(form.data[key]) == 'object') {
          promises.push($http.get('https://point380.herokuapp.com/companies/'+form.data[key].name));
        } else if (form.data[key]) {
          promises.push($http.get('https://point380.herokuapp.com/companies/'+form.data[key]));
        } else {
          console.log('empty')
        }
      });

// DATABASE CALL WITH SCIENCE BASE YEAR AND COMPANIES FROM FORM

      return $q.all(promises).then(function(data) {

// INSERT WEIGHTS INTO EACH COMPANY DATA

        for (var z = 1; z < data.length; z++) {
          data[z].data.data.weight = (form.weight[z] / 100);
        }

        var sciencebase = data[0].data.data[0];
        var year = parseFloat(sciencebase.year);
        var finalData = {
          result: [],
          noData: []
        };
        var values = [];
        var numerator = {};
        var numeratorBaseYr = {};
        var numeratorTargetYr = {};
        var numeratorGap = {};
        var denominator = {};
        var denominatorTarget = 0;
        var portfolio = [];
        var baseNumber = 0;
        var scienceBaseStart = 0;

//FUNCTION USED TO SET BASE YEAR AND GET COMPANY GRAPH VALUES

        getCompanyGraphData = function() {
          Object.keys(emissions).forEach(function(key) {
            if(emissions[key] !== 0 && emissions[key] !== null && baseNumber === 0 && key >= year) {
              baseNumber = emissions[key];

// SET GRAPH START VALUE TO CURRENT SCIENCE BASE VALUE.

            for (var i = 0; i < finalData.result[0].values.length; i++) {
              if (finalData.result[0].values[i].x == key) {
                scienceBaseStart = finalData.result[0].values[i].y;
                values.push({x: key, y: scienceBaseStart});
              }
            }

// CONTINUE WITH ASSIGNMENT CUMULATIVE REDUCTION VALUES

              } else if(emissions[key] !== 0 && emissions[key] !== null && baseNumber !== 0) {
                cumReduction = (((emissions[key] /  baseNumber) -1) * 100) + scienceBaseStart;

              values.push({x: key, y: cumReduction});

              if (!numerator[key]) {
//PORTFOLIO
                numerator[key] = weight * scopeEmission[key] * (cumReduction);
                denominator[key] = scopeEmission[key] * weight;
// TARGET
                numeratorBaseYr = weight * scopeEmission[key] * dbBaseYr;
                numeratorGap = weight * scopeEmission[key] * dbGap;
                numeratorTargetYr  = weight * scopeEmission[key] * dbTargetYr;
                denominatorTarget = scopeEmission[key] * weight;

              } else {
// PORTFOLIO
                numerator[key] += weight * scopeEmission[key] * (cumReduction);
                denominator[key] += scopeEmission[key] * weight;

// TARGET
                numeratorBaseYr += weight * scopeEmission[key] * dbBaseYr;
                numeratorGap += weight * scopeEmission[key] * dbGap;
                numeratorTargetYr += weight * scopeEmission[key] * dbTargetYr;
                denominatorTarget += scopeEmission[key] * weight;
              }
              }
          });
          if(values.length < 1) {
            finalData.noData.push({key: companyName})
          } else {
          finalData.result.push({values: values, key: companyName});
          values = [];
          baseNumber = 0;
          }
        };

        getPorfolioData = function() {
          if (finalData.result.length > 1) {
            Object.keys(numerator).forEach(function(key) {
              values.push({x:key, y: (numerator[key] / denominator[key])});
            });
              finalData.result.push({values: values, key: 'Portfolio'});
          }
        };

        getTargetData = function() {
          if (finalData.result.length > 1) {
            targetBaseYear = (Math.round(numeratorBaseYr / denominatorTarget));
            console.log((numeratorGap / denominatorTarget) / 100);
            targetGap = (numeratorGap / denominatorTarget) / 100;
            targetYear = Math.round(numeratorTargetYr / denominatorTarget);
            var targetYearValue;
            for (var i = 0; i < finalData.result[0].values.length; i++) {
              if (finalData.result[0].values[i].x == targetYear) {
                targetYearValue = finalData.result[0].values[i].y * targetGap;
              }
            }

            finalData.result.push(
              { values:[{ x: targetBaseYear, y: 0},{ x: targetYear, y: targetYearValue}],
                key: 'Target'
            });
        }
      };


        sciencebase.target.forEach(function(item, index) {
          values.push({x: year + index, y: parseFloat(item)});
        });
        finalData.result.push({values: values, key: 'Science Basis'});
        values = [];

// LOOP THROUGH COMPANIES TO GET GRAPH DATA

    for (var i = 1; i < data.length; i++) {
      if(data[i].data.data !== null) {
          companyName = data[i].data.data.name;
          weight = data[i].data.data.weight;
          scopeEmission = data[i].data.data.emissions[0];
          emissions = data[i].data.data.emissionsgdp[0];

// TARGET LINE VARIABLES

          dbBaseYr = data[i].data.data.target[0].base;
          dbGap = data[i].data.data.target[0].gap2EIA;
          dbTargetYr = data[i].data.data.target[0].target;

        getCompanyGraphData();
      }
    }
        getPorfolioData();
        getTargetData();
        return finalData;
    });
    }

  }]);
