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
				templateUrl: 'views/contacts/welcome.html'
			}).
			when('/contacts', {
				templateUrl: 'views/contacts/contactList.html',
				controllers: 'contactListController'
			}).
			when('/contacts/:contactId', {
				templateUrl: 'views/contacts/contactTemplate.html',
				controllers: 'contactDetailController'
			}).
			when('/add', {
				templateUrl: 'views/contacts/addContact.html',
				controllers: 'addContactController'
			}).
			when('/edit/:contactId', {
				templateUrl: 'views/contacts/editContact.html',
				controllers: 'editContactController'	
			}).
			when('/delete/:contactId', {
				templateUrl: 'views/contacts/deleteContact.html',
				controllers: 'deleteContactController'	
			}).
			otherwise({
				redirectTo: '/contacts'
		});
	}]);
