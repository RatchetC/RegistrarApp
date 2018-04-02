(function () {

  'use strict';

  var app = angular.module('Events');

  app.controller('EventListCtrl', control);

  control.$inject = ['$ionicHistory', '$ionicPopup', 'allEvents'];

  function control($ionicHistory, $ionicPopup, allEvents) {

    var vm = angular.extend(this, {
      events: allEvents
    });

    vm.selectEvent = function selectEvent(event) {
      $ionicPopup.confirm({
        title: 'Confirm Selection',
        template: 'Are you sure you want to change to this event?'
      }).then(function (response) {

        var YES = true;

        if (response === YES) {
          window.localStorage.currEvent = angular.toJson(event);
          $ionicHistory.goBack();
        }

      });
    };

  }

})();