angular
  .module("pointApp")
  .factory('DashboardService', ['$http', '$q', function($http, $q) {

    return  {
      // getScienceData: getScienceData,
      formSubmit: formSubmit
    };

    function formSubmit(form) {
      var sciencebase = $http.get('https://point380.herokuapp.com/sciencebase/' +form.year),
      company1 = $http.get('https://point380.herokuapp.com/companies/'+form.company1),
      company2 = $http.get('https://point380.herokuapp.com/companies/'+form.company2),
      company3 = $http.get('https://point380.herokuapp.com/companies/'+form.company3),
      company4 = $http.get('https://point380.herokuapp.com/companies/'+form.company4),
      company5 = $http.get('https://point380.herokuapp.com/companies/'+form.company5);

      return $q.all([sciencebase, company1, company2, company3, company4, company5]).then(function(data) {
        var sciencebase = data[0].data.data[0];
        var company1 = data[1].data.data;
        var company2 = data[2].data.data;
        var company3 = data[3].data.data;
        var company4 = data[4].data.data;
        var company5 = data[5].data.data;


        var year = parseFloat(sciencebase.year);
        var result = [];
        var values = [];
        var priorValue = 0;
        console.log(company1)
        console.log(company2)
        sciencebase.target.forEach(function(item, index) {
          values.push({x: year + index, y: parseFloat(item)});
        });
        result.push({values: values, key: 'Science Base'});
        values = [];
        emissions = company1.emissionsgdp[0];

        Object.keys(emissions).forEach(function(key) {
          if(emissions[key-1] !== 0 && emissions[key] !== 0 && emissions[key] !== null && emissions[key-1] !== null) {
          values.push({x: key, y: priorValue + ((emissions[key] /  emissions[key-1]) -1) * 100});
          priorValue = priorValue + ((emissions[key] /  emissions[key-1]) -1) * 100;
        }
      });
        result.push({values: values, key: company1.name});
        // values = [];
        // emissions = company2.emissionsgdp[0];
      //
      //   Object.keys(emissions).forEach(function(key) {
      //     if(emissions[key-1] !== 0 && emissions[key] !== 0 && emissions[key] !== null && emissions[key-1] !== null) {
      //     values.push({x: key, y: ((emissions[key] /  emissions[key-1]) -1) * 100});
      //     priorValue = ((emissions[key] /  emissions[key-1]) -1) * 100;
      //   }
      //   });
      //   result.push({values: values, key: company2.name});
      //   values = [];
      //   emissions = company3.emissionsgdp[0];
      //
      //   Object.keys(emissions).forEach(function(key) {
      //     if(emissions[key-1] !== 0 && emissions[key] !== 0 && emissions[key] !== null && emissions[key-1] !== null) {
      //     values.push({x: key, y: ((emissions[key] /  emissions[key-1]) -1) * 100});
      //     priorValue = ((emissions[key] /  emissions[key-1]) -1) * 100;
      //   }
      //   });
      //   result.push({values: values, key: company3.name});
      //   values = [];
      //   emissions = company4.emissionsgdp[0];
      //
      //   Object.keys(emissions).forEach(function(key) {
      //     if(emissions[key-1] !== 0 && emissions[key] !== 0 && emissions[key] !== null && emissions[key-1] !== null) {
      //     values.push({x: key, y: ((emissions[key] /  emissions[key-1]) -1) * 100});
      //     priorValue = ((emissions[key] /  emissions[key-1]) -1) * 100;
      //   }
      // });
      //   result.push({values: values, key: company4.name});
      //   values = [];
      //   emissions = company5.emissionsgdp[0];
      //
      //   Object.keys(emissions).forEach(function(key) {
      //   if(emissions[key-1] !== 0 && emissions[key] !== 0 && emissions[key] !== null && emissions[key-1] !== null) {
      //     values.push({x: key, y: ((emissions[key] /  emissions[key-1]) -1) * 100});
      //     priorValue = ((emissions[key] /  emissions[key-1]) -1) * 100;
      //   }
      // });
      //   result.push({values: values, key: company5.name});
      //   values = [];

        return result
    });
    }
  }]);
