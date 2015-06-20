'use strict';

// Controller Module
var contactControllers = angular.module('contactControllers', []);
// Controller for displaying the list of teams, with 2 second timeout delay    
contactControllers.controller('contactListController', [ "$scope", "$timeout", "contactService",
  function ($scope, $timeout, contactService) {
    $timeout(function(){
      contactService.contactsList(function(data){
        $scope.contact = data;
        $scope.loading = false;
      });
    }, 2000);
  $scope.sortField = 'lname';
  $scope.reverse = false;
}]);
// Controller for displaying the details of the team when the name is clicked, with 3 second timeout delay
contactControllers.controller('contactDetailController', ["$scope", "$timeout", "$routeParams", "contactService",
	function ($scope, $timeout, $routeParams, contactService){
    $timeout(function(){
      contactService.contactsDetail($routeParams.contactId, function(data){
        $scope.contact = data;
        $scope.loading = false;
      });
    }, 2000);
}]);
// Controller that handles the add team page and how the data is passed to the PHP file.
contactControllers.controller('addContactController', ["$scope", "$http", "$location", "contactService", "assembleFormDataService",
  function ($scope, $http, $location, contactService, assembleFormDataService){
    $scope.addContact = function(){
     var readyFormData = assembleFormDataService.populateFormData($scope.fname, $scope.lname, $scope.address, $scope.city, $scope.zipcode, $scope.mnumber, $scope.lnumber, $scope.relation, $scope.photoSubmit);  
      contactService.addContacts(readyFormData, function(){
        $location.path('/contacts');         
      });
    }; 
}]);
//Controller that handles the edit team page and how the data is pulled/pushed to the DB
contactControllers.controller('editContactController', ["$scope", "$routeParams", "$http", "$location", "contactService", "assembleFormDataService",
  function ($scope, $routeParams, $http, $location, contactService, assembleFormDataService){
    contactService.contactsDetails($routeParams.contactId, function(data){
      $scope.contactedit = data;
    });
  $scope.editContact = function(){
    var readyFormData = assembleFormDataService.populateFormData($scope.contactedit.fname, $scope.contactedit.lname, $scope.contactedit.address, $scope.contactedit.city, $scope.contactedit.zipcode, $scope.contactedit.mnumber, $scope.contactedit.lnumber, $scope.contacteditt.relation, $scope.contactedit.photo);  
      contactService.editContact($routeParams.contactId, readyFormData, function(){
        $location.path('/contacts');         
    });
  };
}]);
// Controller that handles the team deletion
contactControllers.controller('deleteContactController', ["$scope", "$routeParams", "$http", "$location", "contactService",
  function ($scope, $routeParams, $http, $location, contactService){
    contactService.contactsDetails($routeParams.contactId, function(data){
      $scope.contactdelete = data;
    });
    $scope.deleteContact = function(){
      contactService.deleteContact($routeParams.contactId, function(data){
        $location.path('/contacts');
      });
    };
}]);
// Handles which nav bar element is in an active state
function HeaderController($scope, $location) 
{ 
    $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
}
