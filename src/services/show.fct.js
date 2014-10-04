'use strict';

/*
 * Contains a service to communicate with the TRACK TV API
 */
angular
    .module('app.services')
    .constant('TRAKT_API_KEY', '43232be0b3972a27cbd7cf7208225b9f')
    .constant('TRAKT_BASE_URL', 'http://api.trakt.tv')
    .factory('ShowService', dataService);

function dataService($http, TRAKT_API_KEY, TRAKT_BASE_URL, $log, $q, $cacheFactory) {
    var cacheFactory = $cacheFactory('ShowService');
    var data = {
        'getPremieres': getPremieres,
        'get': get,
        'getComments': getComments,
        'search': search,
        'getTrending': getTrending
    };
    function makeRequest(url, name) {
        var cache = cacheFactory.get(name);
        var deferred = $q.defer();
        if (cache) {
            deferred.resolve(cache);
        } else {
            $http({
                'url': TRAKT_BASE_URL + '/' + url,
                'method': 'JSONP'
            }).then(function(response){
                cacheFactory.put(name, response.data);
                deferred.resolve(response.data);
            }).catch(dataServiceError);
        }
        return deferred.promise;
    }
    function getPremieres() {
        return makeRequest('calendar/premieres.json/' + TRAKT_API_KEY + '/?callback=JSON_CALLBACK', 'getPremieres');
    }
    function get(id) {
        return makeRequest('show/summary.json/' + TRAKT_API_KEY + '/' + id + '/?callback=JSON_CALLBACK', 'get');
    }
    function getComments(id) {
        return makeRequest('show/comments.json/' + TRAKT_API_KEY + '/' + id + '/?callback=JSON_CALLBACK', 'getComments');
    }
    function search(query) {
        return makeRequest('search/shows.json/' + TRAKT_API_KEY + '?query=' + query + '&callback=JSON_CALLBACK', 'search');
    }
    function getTrending() {
        return makeRequest('shows/trending.json/' + TRAKT_API_KEY + '/?callback=JSON_CALLBACK', 'getTrending');
    }
    return data;

    function dataServiceError(errorResponse) {
        var data = (typeof errorResponse.data != 'undefined') ? ": " + errorResponse.data : ".";
        $log.error('XHR Failed for ShowService' + data);
    }
}