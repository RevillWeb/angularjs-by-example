'use strict';
angular
    .module('app.core')
    .controller('PopularController', ['$scope', 'PageValues', 'shows', function($scope, PageValues, shows) {
        //Set page title and description
        PageValues.title = "POPULAR";
        PageValues.description = "The most popular TV shows.";
        //Setup view model object
        var vm = this;
        vm.shows = shows;
    }]);