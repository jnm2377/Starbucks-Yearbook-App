const app = angular.module('starbucks_app', []);

app.controller('MainController', ['$http', function($http) {


  this.user = {};
  this.registerForm = {};
  this.loginForm = {};
  this.logged = false;

  //LOGIN
  this.login = () => {
    $http({
      method: '/post',
      url: '/sessions/login',
      data: this.loginForm
    }).then(response => {
      console.log(response.data);
      this.user = response.data;
      this.logged = true;
    }).catch(err => console.error('Catch:', err.message));
  }

  //REGISTER
  this.register = () => {
    $http({
      method: 'post',
      url: '/users',
      data: this.registerForm
    }).then(response => {
      console.log(response.data);

      this.user = response.data;
      this.logged = true;
    }).catch( err => console.error('Catch:', err.message));
  }

  //CHECK TO SEE IF USER IS LOGGED IN
  $http({
    method: 'get',
    url: '/sessions'
  }).then(response => {
    if (response.data.user) {
      this.user = response.data.user;
      console.log(this.user);
      this.logged = true;
    }
  }).catch(err => console.error('Catch:', err.message));

}]);
