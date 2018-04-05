const app = angular.module('starbucks_app', []);

app.controller('MainController', ['$http', function($http) {


  this.user = {};
  this.registerForm = {};
  this.logged = false;

  //LOGIN

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
  
}]);
