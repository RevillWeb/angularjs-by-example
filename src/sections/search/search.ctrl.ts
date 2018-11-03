class SearchController {
    query: string;
    shows: any[];
    loading: boolean;

    setSearch = () => {
        const query = encodeURI(this.query);
        this.$location.path(`/search/${query}`);
    }
    performSearch = (query) => {
        this.loading = true;
        this.ShowService.search(query).then((response) => {
            this.shows = response;
            this.loading = false;
        });
    };
    
    constructor(private $location : ng.ILocationService,
        private $routeParams,
        private ShowService: ShowService,
        private PageValues: PageValues) {
            PageValues.title = "SEARCH";
            PageValues.description = "Search for your favorite TV shows.";

            this.query = null;
            this.shows = [];
            this.loading = null;
            
            if (typeof $routeParams.query != "undefined") {
                this.performSearch($routeParams.query);
                this.query = decodeURI($routeParams.query);
            }
        }
}

'use strict';
angular
    .module('app.core')
    .controller('SearchController', SearchController);