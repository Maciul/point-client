angular
  .module("pointApp")
  .factory('DashboardService', ['$http', '$q', function($http, $q) {

    var companyData;

    return  {
      formSubmit: formSubmit
    };

    function formSubmit(form) {
      console.log(form)
      var promises = [];

      promises.push($http.get('https://point380.herokuapp.com/sciencebase/' +form.year))

      Object.keys(form.data).forEach(function(key) {
        promises.push($http.get('https://point380.herokuapp.com/companies/'+form.data[key]))
      });

      return $q.all(promises).then(function(data) {
        companyData = data;
        console.log(companyData)
        var sciencebase = data[0].data.data[0];
        var year = parseFloat(sciencebase.year);
        var result = [];
        var values = [];
        var baseNumber = 0

        getCompanyGraphData = function(emissions) {
          Object.keys(emissions).forEach(function(key) {
            if(emissions[key] !== 0 && emissions[key] !== null && baseNumber === 0 && key >= year) {
              baseNumber = emissions[key];
        // SET INITIAL VALUE TO SCIENCE BASE
            for (var i = 0; i < result[0].values.length; i++) {
              if (result[0].values[i].x == key) {
                values.push({x: key, y: result[0].values[i].y});
              }
            }
        // CONTINUE WITH ASSIGNING VALUES FOR OTHER YEARS
              } else if(emissions[key] !== 0 && emissions[key] !== null && baseNumber !== 0) {
              values.push({x: key, y: ((emissions[key] /  baseNumber) -1) * 100});
              }
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
        emissions = data[i].data.data.emissionsgdp[0];

        getCompanyGraphData(emissions);

        result.push({values: values, key: companyName});
        values = [];
        baseNumber = 0;
      }
    }
        return result
    });
    }

  }]);
