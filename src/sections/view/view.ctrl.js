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
                'background': 'url() no-repeat',
                'background-size': '100%',
                'background-position': '100% 0%'
            };
        };
        vm.show.cast = [];
        ShowService.getCast(vm.show.id).then(function(response){
            vm.show.cast = response.cast;
        });
    });