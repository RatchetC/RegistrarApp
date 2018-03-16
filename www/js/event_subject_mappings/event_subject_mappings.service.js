(function () {

  'use strict';

  var app = angular.module('EventSubjectMappings');

  app.factory('eventSubjectMappingsSrvc', eventSubjectMappingsSrvc);

  eventSubjectMappingsSrvc.$inject = ['$q', 'activityevents'];

  function eventSubjectMappingsSrvc($q, activityevents) {

    var service = {};

    service.subjectMappings = [];

    service.getAllEventSubjectMappings = function getAllEventSubjectMappings() {
      var promiseObj = $q.defer();
      var config = {};
      activityevents.getEventSubjectMappings(config).then(
        function success(response) {
          service.syncEventSubjectMappings(response.data);
          promiseObj.resolve(service.subjectMappings);
        },
        function failure(error) {
          promiseObj.reject(error);
        }
      );
      return promiseObj.promise;
    };

    service.postEventSubjectMapping = function postEventSubjectMapping(mapping) {
      var promiseObj = $q.defer();
      var config = {};
      activityevents.postEventSubjectMappings(mapping, config).then(
        function success(response) {
          promiseObj.resolve(response.data);
          service.addEventSubjectMapping(response.data);
        },
        function failure(error) {
          promiseObj.reject(error);
        }
      );
      return promiseObj.promise;
    };

    service.deleteEventSubjectMapping = function deleteEventSubjectMapping(mappingID) {
      var config = {};
      activityevents.deleteEventSubjectMappingsEventSubjectMappingid(mappingID, config).then(
        function success(response) {
          service.removeEventSubjectMapping(mappingID);
        },
        function failure(error) {
          console.error(error);
        }
      );
    };

    service.fetchAllEventSubjectMappings = function fetchAllEventSubjectMappings() {
      return service.subjectMappings;
    };

    service.addEventSubjectMapping = function addEventSubjectMapping(mapping) {
      service.subjectMappings.push(mapping);
    };

    service.removeEventSubjectMapping = function removeEventSubjectMapping(mappingID) {
      for (var i = 0; i < service.subjectMappings.length; i++) {
        if (service.subjectMappings[i].id === mappingID) {
          service.subjectMappings.splice(i, 1);
        }
      }
    }

    service.syncEventSubjectMappings = function syncEventSubjectMappings(data) {
      for (var testItemIndex in data) {
        var testitem = data[testItemIndex];
        var matchResult = service.subjectMappings.reduce(function (matches, item) { return ((item.id === testitem.id) ? matches + 1 : matches); }, 0);
        if (matchResult === 0) {
          service.subjectMappings.push(testitem);
        }
      }
    };

    return service;

  }

})();