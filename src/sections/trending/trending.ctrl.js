'use strict';
angular
    .module('app.core')
    .controller('TrendingController', function($scope, PageValues, shows) {
        //Set page title and description
        PageValues.title = "TRENDING";
        PageValues.description = "TV Shows that are being watched right now.";
        //Setup view model object
        var vm = this;
        vm.shows = shows;
    });