'use strict';

angular.module('contactServices', [])

// Factory responsible for assembling the form data before it's passed over the php
.factory('assembleFormDataService', function(){
	return {
		populateFormData: function(fname, lname, address, city, zipcode, mnumber, lnumber, relation, photoSubmit){
			var formData = new FormData();
			formData.append("fname", fname);
			formData.append("lname", lname);
			formData.append("address", address);
			formData.append("city", city);
			formData.append("zipcode", zipcode);
			formData.append("mnumber", mnumber);
			formData.append("lnumber", lnumber);
			formData.append("relation", relation);
			formData.append("photo", photoSubmit);
			return formData; 
		}
	};
})
// One big team service that handles the individual components we'll need for the teams
.factory('contactService', ['$http', function($http){
	return {
		contactsList: function(callback){
			$http.get('contacts/contacts.php?action=list').success(callback);
		},
		contactsDetails: function(id, callback){
			$http.get('contacts/contacts.php?action=detail&id=' + id).success(callback);
		},
		addContacts: function(readyFormData, callback){
			$http.post('contacts/contacts.php?action=add', readyFormData, { transformRequest: angular.identity, headers: { "Content-Type": undefined } }).success(callback);
		},
		editContact: function(id, readyFormData, callback){
			$http.post('contacts/contacts.php?action=edit&id=' + id, readyFormData, { transformRequest: angular.identity, headers: { "Content-Type": undefined } }).success(callback);
		},
		deleteContact: function(id, callback){
			$http.post('contacts/contacts.php?action=delete&id=' + id).success(callback);
		}
	}
}]);

