(function () {

  'use strict';

  var app = angular.module('Subjects');

  app.controller('SubjectAddCtrl', control);

  control.$inject = ['$state', '$ionicPopup', '$http', 'subjectsSrvc', 'eventSubjectMappingsSrvc', 'activityevents'];

  function control($state, $ionicPopup, $http, subjectsSrvc, eventSubjectMappingsSrvc, activityevents) {

    var vm = angular.extend(this, {
      subject: {
        id: new Date().getTime().toString(),
        nickname: ''
      },
      loadedJSON: false
    });

    function init() {
      
      vm.currEvent = angular.fromJson(window.localStorage.currEvent);
      if (vm.currEvent === undefined) {
        $ionicPopup.alert({
          title: 'Select Event',
          template: 'There is no event selected. Please select your event.'
        });
        $state.go('event-list');
      }

      $http.get('names.json').then(
        function sucess(response) {
          console.log(response.data.data);
          vm.namesList = response.data.data;
          console.log("Success!");
        },
        function failure(error) {
          console.error(error);
        }
      );
    }

    init();

    vm.saveSubject = function () {
      activityevents.getSubjects(
        { params : {
          nickname: vm.subject.nickname
        }
      }).then(
        function (response){
          console.log(response.data)
          if(response.data.length == 0){
            //unique name
            subjectsSrvc.postSubject(vm.subject).then(
              function success(data) {
                subjectsSrvc.addSubject(data);
                var eventSubjectMapping = {
                  id: new Date().getTime().toString(),
                  subject: data.id,
                  event: vm.currEvent.id
                };
                eventSubjectMappingsSrvc.postEventSubjectMapping(eventSubjectMapping).then(
                  function success(response) {
                    eventSubjectMappingsSrvc.addEventSubjectMapping(response.data);
                    $ionicPopup.alert({
                      title: 'Success!',
                      template: data.nickname + ' was registered successfully!!'
                    });
                  },
                  function failure(error) {
                    console.error(error);
                  }
                );
              },
              function failure(error) {
                console.error(error);
              }
            );
          } else {
            //name taken!
            $ionicPopup.alert({
              title: 'Error Name Taken!',
              template: vm.subject.nickname + ' was not registered successfully!!'
            });
          }
        },
        function (error){
          console.log(error);
        }
      );
      
    };

    vm.suggestSubject = function () {
      var nickname = vm.namesList[Math.floor(Math.random()*vm.namesList.length)].word;
      nickname += ' ' + vm.namesList[Math.floor(Math.random()*vm.namesList.length)].word;
      console.log(
        nickname
      );
      
      vm.subject.nickname = nickname;
    };
    
    vm.changeEvent = function () {

      $ionicPopup.confirm({
        title: 'Change Event',
        template: 'Are you sure that you want to change the selected event?'
      }).then( function (response) {
        var YES = true;
        if (response === YES) {
          $state.go('event-list');
        }
      });

    };

  }

})();
