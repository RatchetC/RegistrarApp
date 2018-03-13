(function () {

  'use strict';

  var app = angular.module('Subjects');

  app.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider.state('name-input', {
      cache: false,
      url: '/name-input',
      templateUrl: 'templates/subject.add.html',
      controller: 'SubjectAddCtrl as vm'
    });

    $urlRouterProvider.otherwise('name-input');

  });


})();