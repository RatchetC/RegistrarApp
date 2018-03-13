(function () {

  'use strict';

  var app = angular.module('Events');

  app.controller('EventListCtrl', control);

  control.$inject = ['$state', '$ionicHistory', 'allEvents'];

  function control($state, $ionicHistory, allEvents) {

    var vm = angular.extend(this, {
      events: allEvents
    });

    vm.selectEvent = function selectEvent(event) {
      console.warn(event);
      window.localStorage['currEvent'] = angular.toJson(event);
      $ionicHistory.goBack();
    };

  }

})();