'use strict';

angular
    .module('app.routes', [])
    .config(config);

function config ($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'sections/home/home.tpl.html',
            controller: 'HomeController as home'
        })
        .when('/premieres', {
            templateUrl: 'sections/premieres/premieres.tpl.html',
            controller: 'PremieresController as premieres',
            resolve: {
                shows: function(ShowService) {
                    return ShowService.getPremieres();
                }
            }
        })
        .when('/search', {
            templateUrl: 'sections/search/search.tpl.html',
            controller: 'SearchController as search'
        })
        .when('/search/:query', {
            templateUrl: 'sections/search/search.tpl.html',
            controller: 'SearchController as search'
        })
        .when('/trending', {
            templateUrl: 'sections/trending/trending.tpl.html',
            controller: 'TrendingController as trending',
            resolve: {
                shows: function(ShowService) {
                    return ShowService.getTrending();
                }
            }
        })
        .when('/view/:id', {
            templateUrl: 'sections/view/view.tpl.html',
            controller: 'ViewController as view',
            resolve: {
                show: function(ShowService, $route) {
                    return ShowService.get($route.current.params.id);
                }
            }
        })
        .otherwise({
            redirectTo: '/'
        });
}