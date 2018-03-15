(function () {

  'use strict';

  var app = angular.module('Events');

  app.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider.state('event-list', {
      cache: false,
      url: '/event-list',
      templateUrl: 'templates/event.list.html',
      controller: 'EventListCtrl as vm',
      resolve: {
        allEvents: function (eventsSrvc) {
          return eventsSrvc.getAllEvents();
        }
      }
    });

    $urlRouterProvider.otherwise('name-input');

  });

})();