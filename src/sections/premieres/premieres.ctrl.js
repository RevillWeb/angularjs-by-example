'use strict';
angular
    .module('app.core')
    .controller('PremieresController', function($scope, shows, PageValues) {
        //Set page title and description
        PageValues.title = "PREMIERES";
        PageValues.description = "Brand new shows showing this month.";
        //Setup view model object
        var vm = this;
        vm.shows = shows;
    });