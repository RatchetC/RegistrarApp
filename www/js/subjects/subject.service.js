(function () {

  'use strict';

  var app = angular.module('Subjects');

  app.factory('subjectsSrvc', subjectsSrvc);

  subjectsSrvc.$inject = ['$q', 'activityevents'];

  function subjectsSrvc($q, activityevents) {

    var service = {};

    service.subjects = [];
    
    service.postSubject = function (subject) {
      
      var promiseObj = $q.defer();

      var config = {};
      
      console.log(subject);

      activityevents.postSubjects(subject, config).then(
        function success(response) {
          console.log(response);
          promiseObj.resolve(response.data);
        },
        function failure(error) {
          promiseObj.reject(error);
        }
      );

      return promiseObj.promise;

    };

    service.addSubject = function (subject) {
      service.subjects.push(subject);
    };

    return service;

  }

})();