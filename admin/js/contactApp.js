'use strict';
// Football App Module
var contactApp = angular.module('contactApp', [
	'ngRoute', 
	'angularFileUpload',
	'contactControllers',
	'contactServices'
]);
// Football App route provider
contactApp.config(['$routeProvider', 
	function($routeProvider) {
		$routeProvider.
			when('/welcome', {
				templateUrl: 'contacts/welcome.html'
			}).
			when('/contacts', {
				templateUrl: 'contacts/contactList.html',
				controllers: 'contactListController'
			}).
			when('/contacts/:contactId', {
				templateUrl: 'contacts/contactTemplate.html',
				controllers: 'contactDetailController'
			}).
			when('/add', {
				templateUrl: 'contacts/addContact.html',
				controllers: 'addContactController'
			}).
			when('/edit/:contactId', {
				templateUrl: 'contacts/editContact.html',
				controllers: 'editContactController'	
			}).
			when('/delete/:contactId', {
				templateUrl: 'contacts/deleteContact.html',
				controllers: 'deleteContactController'	
			}).
			otherwise({
				redirectTo: '/welcome'
		});
	}]);
