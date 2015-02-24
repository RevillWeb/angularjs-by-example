'use strict';

/*
 * Contains a service to communicate with the TRACK TV API
 */
angular
    .module('app.services')
    .constant('API_KEY', '87de9079e74c828116acce677f6f255b')
    .constant('BASE_URL', 'http://api.themoviedb.org/3')
    .factory('ShowService', dataService);

function dataService($http, API_KEY, BASE_URL, $log, moment) {
    var data = {
        'getPremieres': getPremieres,
        'get': get,
        'search': search,
        'getPopular': getPopular,
        'getCast': getCast
    };
    function makeRequest(url, params) {
        var requestUrl = BASE_URL + '/' + url + '?api_key=' + API_KEY;
        angular.forEach(params, function(value, key){
            requestUrl = requestUrl + '&' + key + '=' + value;
        });
        return $http({
            'url': requestUrl,
            'method': 'GET',
            'headers': {
                'Content-Type': 'application/json'
            },
            'cache': true
        }).then(function(response){
            return response.data;
        }).catch(dataServiceError);
    }
    function getPremieres() {
        //Get first day of the current month
        var date = new Date();
        date.setDate(1);
        return makeRequest('discover/tv', {'first_air_date.gte': moment(date).format('DD-MM-YYYY'), append_to_response: 'genres'}).then(function(data){
            return data.results;
        });
    }
    function get(id) {
        return makeRequest('tv/' + id, {});
    }
    function getCast(id) {
        return makeRequest('tv/' + id + '/credits', {});
    }
    function search(query) {
        return makeRequest('search/tv', {query: query}).then(function(data){
            return data.results;
        });
    }
    function getPopular() {
        return makeRequest('tv/popular', {}).then(function(data){
            return data.results;
        });
    }
    return data;

    function dataServiceError(errorResponse) {
        $log.error('XHR Failed for ShowService');
        $log.error(errorResponse);
        return errorResponse;
    }
}