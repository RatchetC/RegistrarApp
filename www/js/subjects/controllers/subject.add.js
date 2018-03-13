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
      // loading: false
    });

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