class SearchController {
    query: string;
    shows: any[];
    loading: boolean;

    setSearch = () => {
        const query = encodeURI(this.query);
        this.$location.path(`/search/${query}`);
    }
    performSearch = (query : string) => {
        this.loading = true;
        this.ShowService.search(query).then((response : Show[]) => {
            this.shows = response;
            this.loading = false;
        });
    };

    constructor(private $location : ng.ILocationService,
        private $routeParams: any,
        private ShowService: ShowService) {
            PageValues.instance.title = "SEARCH";
            PageValues.instance.description = "Search for your favorite TV shows.";

            this.query = '';
            this.shows = [];
            this.loading = false;

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