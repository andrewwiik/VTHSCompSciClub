"use strict";

var contactApp = angular.module('contactApp', ['ngAnimate']);
    contactApp.controller('contactController', [ "$scope", "$http", function ($scope, $http){
      $http({method: 'GET', url: 'contact.php'}).success(function(data){
        $scope.contact = data;
      });
    $scope.sortField = 'contact';
    $scope.reverse = true;
}]);