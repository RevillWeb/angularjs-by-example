'use strict';
angular
    .module('app.core')
    .controller('ViewController', function($scope, $location, PageValues, show, ShowService, $routeParams) {
        //Set page title and description
        PageValues.title = "VIEW";
        PageValues.description = "Overview, seasons & info for '" + show.original_name + "'.";
        //Setup view model object
        var vm = this;
        vm.show = show;
        vm.setBannerImage = function() {
            return {
                'background': 'url(http://image.tmdb.org/t/p/original/' + vm.show.backdrop_path + ') no-repeat',
                'background-size': '100%',
                'background-position': '80% 30%'
            };
        };
    });