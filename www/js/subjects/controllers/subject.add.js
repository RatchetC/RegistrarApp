(function () {

  'use strict';

  var app = angular.module('Subjects');

  app.controller('SubjectAddCtrl', control);

  control.$inject = ['$state', '$ionicPopup', '$http', 'subjectsSrvc', 'eventSubjectMappingsSrvc'];

  function control($state, $ionicPopup, $http, subjectsSrvc, eventSubjectMappingsSrvc) {

    var vm = angular.extend(this, {
      subject: {
        id: new Date().getTime().toString(),
        nickname: ''
      }
    });

    function init() {

      // load the currEvent object from the device
      vm.currEvent = angular.fromJson(window.localStorage.currEvent);
      if (vm.currEvent === undefined) { // if it is null
        $ionicPopup.alert({
          title: 'Select Event',
          template: 'There is no event selected. Please select your event.'
        });
        $state.go('event-list'); // send the user to the event list so that they can pick one
      }

      // load file full of nicknames used to suggest nicknames
      $http.get('names.json').then(
        function success(response) {
          vm.namesList = response.data.data;
        },
        function failure(error) {
          console.error(error);
          $ionicPopup.alert({
            title: 'Error',
            template: 'Failed to load nicknames.'
          });
        }
      );
    }

    init();

    vm.saveSubject = function () {
      subjectsSrvc.getAllSubjects({ // send a request to Restlet to get subject with the same nickname that was entered
        params: {
          nickname: vm.subject.nickname
        }
      }).then(
        function success(data) { // success callback
          if (data.length == 0) { // if a subject with the entered nickname doesn't exist, add this one to the db
            // unique name, send to database
            subjectsSrvc.postSubject(vm.subject).then(
              function success(data) {
                // create mapping
                var eventSubjectMapping = {
                  id: new Date().getTime().toString(),
                  subject: data.id,
                  event: vm.currEvent.id
                };
                // send mapping to the database
                eventSubjectMappingsSrvc.postEventSubjectMapping(eventSubjectMapping).then(
                  function success(response) { // success callback (show success popup)
                    $ionicPopup.alert({
                      title: 'Success!',
                      template: 'The nickname \'' + data.nickname + '\' was registered successfully!!'
                    });
                  },
                  function failure(error) { // failure callback (show relevant failure popup)
                    console.error(error);
                    $ionicPopup.alert({
                      title: 'Error!',
                      template: 'Failed to save event-subject mapping to the database.'
                    });
                  }
                );
              },
              function failure(error) { // failure callback
                console.error(error);
                $ionicPopup.alert({
                  title: 'Error!',
                  template: 'Failed to save subject to the database.'
                });
              }
            );
          } else {
            // name taken!
            $ionicPopup.alert({ // inform the registrar
              title: 'Error!',
              template: 'The nickname \'' + vm.subject.nickname + '\' is already taken. It was not registered successfully.'
            });
          }
        },
        function failure(error) { // failure callback
          console.error(error);
          $ionicPopup.alert({
            title: 'Error!',
            template: 'Failed to retrieve subject from the database.'
          });
        }
      );

    };

    // randomly pick 2 nicknames and concatenate them then display the suggestion in the text box
    vm.suggestSubject = function () {
      var nickname = vm.namesList[Math.floor(Math.random() * vm.namesList.length)].word;
      nickname += ' ' + vm.namesList[Math.floor(Math.random() * vm.namesList.length)].word;
      vm.subject.nickname = nickname;
    };

    vm.changeEvent = function () {
      $ionicPopup.confirm({ // make sure in case it was a . . . misclick?
        title: 'Change Event',
        template: 'Are you sure that you want to change the selected event?'
      }).then(function (response) {
        var YES = true;
        if (response === YES) {
          $state.go('event-list');
        }
      });
    };

  }

})();
