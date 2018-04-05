const app = angular.module('starbucks_app', []);

app.controller('MainController', ['$http', '$scope', function($http, $scope) {


  this.user = {};
  this.registerForm = {};
  this.loginForm = {};
  this.logged = false; //if true, add, edit and delete buttons will appear
  this.baristas = []; //this array will hold all barista information
  this.regulars = []; //this array will hold all regular information
  this.baristaForm = {}; //will assign value on ng submit html side
  this.updateBaristaForm = {};
  this.regularForm = {};
  this.updateRegularForm = {};
  this.LoginBox = false;
  this.LogReg = true;

  //LOGIN MODAL
  this.openlogreg = () => {
    this.LogReg = true;
    console.log("I clicked on sign in", this.clickSignIn);
    this.LoginBox = true;
    console.log("login should open:", this.LoginBox);
  }

  this.closelogreg = () => {
    this.LogReg = false;
  }

  //LOGIN
  this.login = () => {
    $http({
      method: 'post',
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
    }).catch(err => console.error('Catch:', err));
  }

  //UPDATE BARISTA
  this.updateBarista = (barista) => {
    $http({
      method: 'put',
      url: '/baristas/' + barista._id,
      data: this.updateBaristaForm
    }).then(response => {
      console.log('Updated barista:', response.data);

      const updateByIndex = this.baristas.findIndex(item => item._id === response.data._id);
      this.baristas.splice(updateByIndex, 1, response.data)
      this.updateBaristaForm = {};

    }).catch(err => console.error('Catch:', err));
  }

  //DELETE BARISTA
  this.deleteBarista = (barista) => {
    $http({
      method: 'delete',
      url: '/baristas/' + barista._id
    }).then(response => {
      console.log('Deleted:', response.data);

      const removeByIndex = this.baristas.findIndex(item => item._id === barista._id);
      this.baristas.splice(removeByIndex, 1);
    }).catch(err => console.error('Catch:', err));
  }

  //ADD REGULAR
  this.addRegular = () => {
    $http({
      method: 'post',
      url: '/regulars',
      data: this.regularForm
    }).then(response => {
      console.log('New regular form:', response.data);
      this.regulars.push(response.data);
      this.regularForm = {};
      $scope.regularForm.$setUntouched();
      $scope.regularForm.$setPristine();
    }).catch(err => console.error('Catch:', err));
  }

  //UPDATE REGULAR
  this.updateRegular = (regular) => {
    $http({
      method: 'put',
      url: '/regulars/' + regular._id,
      data: this.updateRegularForm
    }).then(response => {
      console.log('updated regular:', response.data);

      const updateByIndex = this.baristas.findIndex(item => item._id === response.data._id);
      this.baristas.splice(updateByIndex, 1, response.data);
      this.updateRegularForm = {};
    }).catch(err => consoler.error('Catch:', err));
  }

  //DELETE REGULAR


}]);
