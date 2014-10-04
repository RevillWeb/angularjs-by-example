'use strict';
angular
    .module('app.core')
    .controller('ViewController', function($scope, $location, PageValues, show, ShowService, $routeParams) {
        //Set page title and description
        PageValues.title = "VIEW";
        PageValues.description = "Stats, commments & info for '" + show.title + "'.";
        //Setup view model object
        var vm = this;
        vm.show = show;
        vm.setBannerImage = function() {
            return {
                'background': 'url(' + vm.show.images.fanart + ') no-repeat',
                'background-size': '100%',
                'background-position': '80% 30%'
            };
        };
        //Load comments for show
        vm.loadComments = true;
        vm.comments = [];
        ShowService.getComments($routeParams.id).then(function(response){
            vm.loadComments = false;
            vm.comments = response;
        });
    });