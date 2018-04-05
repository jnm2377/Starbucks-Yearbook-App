const app = angular.module('starbucks_app', []);

app.controller('MainController', ['$http', '$scope', function($http, $scope) {


  this.user = {};
  this.registerForm = {};
  this.loginForm = {};
  this.logged = false; //if true, add, edit and delete buttons will appear
  this.baristas = []; //this array will hold all barista information
  this.regulars = []; //this array will hold all regular information
  this.baristaForm = {}; //will assign value on ng submit html side

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

  //LOAD ALL BARISTA INFORMATION
  this.getBaristas = () => {
    $http({
      method: 'get',
      url: '/baristas'
    }).then(response => {
      console.log(response.data);
      this.baristas = response.data;
    }).catch(err => console.error('Catch:', err));
  }

  this.getBaristas();

  //LOAD ALL REGULARS INFORMATION
  this.getRegulars = () => {
    $http({
      method: 'get',
      url: '/regulars'
    }).then(response => {
      console.log(response.data);
      this.regulars = response.data;
    }).catch(err => console.error('Catch:', err));
  }

  this.getRegulars();

  //ADD BARISTA
  this.addBarista = () => {
    $http({
      method: 'post',
      url: '/baristas',
      data: this.baristaForm
    }).then(response => {
      console.log('New barista form:', response.data);
      this.baristas.push(response.data);
      this.baristaForm = {};
      $scope.baristaForm.$setUntouched();
      $scope.baristaForm.setPristine();
    })
  }

  //UPDATE BARISTA

  //DELETE BARISTA

  //ADD REGULAR

  //UPDATE REGULAR

  //DELETE REGULAR


}]);
