(function () {

  'use strict';

  var app = angular.module('Subjects');

  app.controller('SubjectAddCtrl', control);

  control.$inject = ['$state', '$ionicPopup', 'subjectsSrvc'];

  function control($state, $ionicPopup, subjectsSrvc) {


    var vm = angular.extend(this, {
      subject: {
        id: new Date().getTime().toString(),
        nickname: ''
      }
    });

    function init() {
      if (vm.currEvent === undefined) {
        vm.currEvent = angular.fromJson(window.localStorage['currEvent']);
        if (vm.currEvent === undefined) {
          $ionicPopup.alert({
            title: 'Select Event',
            template: 'There is no event selected. Please select your event.'
          });
          $state.go('event-list');
        }
      }
    }

    init();

    vm.saveSubject = function () {
      subjectsSrvc.postSubject(vm.subject).then(
        function success(data) {
          subjectsSrvc.addSubject(data);
          $ionicPopup.alert({
            title: 'Success!',
            template: data.nickname + ' was registered successfully!!'
          });
        },
        function failure(error) {
          console.error(error);
        }
      );

    };

    vm.suggestSubject = function () {
      $http.get('../names.json');
      var randNames = [{

      }];
    };
  }

})();
