angular
  .module("pointApp")
  .factory('DashboardService', ['$http', '$q', function($http, $q) {

    var companyData;

    return  {
      formSubmit: formSubmit
    };

    function formSubmit(form) {
      console.log(form);
      var promises = [];

      promises.push($http.get('https://point380.herokuapp.com/sciencebase/' +form.year));

      Object.keys(form.data).forEach(function(key) {
        promises.push($http.get('https://point380.herokuapp.com/companies/'+form.data[key]));
      });

      return $q.all(promises).then(function(data) {

        for (var z = 1; z < data.length; z++) {
          data[z].data.data.weight = form.weight[z];
        }

        var sciencebase = data[0].data.data[0];
        var year = parseFloat(sciencebase.year);
        var result = [];
        var values = [];
        var numerator = {};
        var denominator = {};
        var portfolio = [];
        var baseNumber = 0;

        getCompanyGraphData = function() {
          Object.keys(emissions).forEach(function(key) {
            if(emissions[key] !== 0 && emissions[key] !== null && baseNumber === 0 && key >= year) {
              baseNumber = emissions[key];
// SET GRAPH START VALUE TO CURRENT SCIENCE BASE VALUE.
            for (var i = 0; i < result[0].values.length; i++) {
              if (result[0].values[i].x == key) {
                values.push({x: key, y: result[0].values[i].y});
              }
            }
// CONTINUE WITH ASSIGNMENT CUMULATIVE REDUCTION VALUES
              } else if(emissions[key] !== 0 && emissions[key] !== null && baseNumber !== 0) {
                cumReduction = ((emissions[key] /  baseNumber) -1) * 100;

              values.push({x: key, y: cumReduction});

              if (!numerator[key]) {
                numerator[key] = (weight * scopeEmission[key] * cumReduction);
                denominator[key] = scopeEmission[key] * weight;

              } else {
                numerator[key] += weight * scopeEmission[key] * cumReduction;
                denominator[key] += scopeEmission[key] * weight;
              }
              }
          });
        };

        getPorfolioData = function() {
          Object.keys(numerator).forEach(function(key) {
            values.push({x:key, y: (numerator[key] / denominator[key])});
      });
    };

        sciencebase.target.forEach(function(item, index) {
          values.push({x: year + index, y: parseFloat(item)});
        });
        result.push({values: values, key: 'Science Base'});
        values = [];

// LOOP THROUGH COMPANIES TO GET GRAPH DATA

    for (var i = 1; i < data.length; i++) {
      if(data[i].data.data !== null) {
          companyName = data[i].data.data.name;
          weight = data[i].data.data.weight;
          scopeEmission = data[i].data.data.emissions[0];
          emissions = data[i].data.data.emissionsgdp[0];

        getCompanyGraphData();

        result.push({values: values, key: companyName});
        values = [];
        baseNumber = 0;
      }
    }
      console.log(values)
        getPorfolioData();
        result.push({values: values, key: 'Portfolio'})
        return result;
    });
    }

  }]);
