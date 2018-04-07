(function () {

  'use strict';

  var app = angular.module('Subjects');

  app.factory('subjectsSrvc', subjectsSrvc);

  subjectsSrvc.$inject = ['$q', 'activityevents'];

  function subjectsSrvc($q, activityevents) {

    var service = {};

    service.getAllSubjects = function getAllSubjects(config) {
      var promiseObj = $q.defer();
      activityevents.getSubjects(config).then(
        function success(response) {
          promiseObj.resolve(response.data);
        },
        function failure(error) {
          promiseObj.reject(response.data);
        }
      );
      return promiseObj.promise;
    };

    service.postSubject = function postSubject(subject) {
      var promiseObj = $q.defer();
      var config = {};
      activityevents.postSubjects(subject, config).then(
        function success(response) {
          promiseObj.resolve(response.data);
        },
        function failure(error) {
          promiseObj.reject(error);
        }
      );
      return promiseObj.promise;
    };

    return service;

  }

})();