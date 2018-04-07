(function () {

  'use strict';

  var app = angular.module('EventSubjectMappings');

  app.factory('eventSubjectMappingsSrvc', eventSubjectMappingsSrvc);

  eventSubjectMappingsSrvc.$inject = ['$q', 'activityevents'];

  function eventSubjectMappingsSrvc($q, activityevents) {

    var service = {};

    service.postEventSubjectMapping = function postEventSubjectMapping(mapping) {
      var promiseObj = $q.defer();
      var config = {};
      activityevents.postEventSubjectMappings(mapping, config).then(
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