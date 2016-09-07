angular
  .module("pointApp")
  .service('MainService', ['$http', function($http) {

    return {
      toggleLogin: toggleLogin,
      toggleSignup: toggleSignup
    };

    function toggleLogin(form) {
      form.isSignupOpen = false;
      form.isLoginOpen = !form.isLoginOpen;
    }

    function toggleSignup(form) {
      form.isLoginOpen = false;
      form.isSignupOpen = !form.isSignupOpen;
    }

  }]);
