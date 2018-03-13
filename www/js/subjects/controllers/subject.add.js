// import { get } from "http";

(function () {

  'use strict';

  var app = angular.module('Subjects');

  app.controller('SubjectAddCtrl', control);

  control.$inject = ['$state', '$ionicPopup', 'subjectsSrvc', 'activityevents'];

  function control($state, $ionicPopup, subjectsSrvc, activityevents) {


    var vm = angular.extend(this, {
      subject: {
        id: new Date().getTime().toString(),
        nickname: ''
      },
      loadedJSON: false
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
      if (vm.loadedJSON === false) {
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', '../../names.json', true); //replace data
        xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            vm.namesList = (JSON.parse(xobj.responseText)).data;
            vm.loadedJSON = true;
            console.log(vm.loadedJSON, vm.namesList);
          }
        };
        xobj.send(null);
      }
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
                $ionicPopup.alert({
                  title: 'Success!',
                  template: data.nickname + ' was registered successfully!!'
                });
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
      nickname += vm.namesList[Math.floor(Math.random()*vm.namesList.length)].word;
      console.log(
        nickname
      );
      
      vm.subject.nickname = nickname;
    };

  }

})();
