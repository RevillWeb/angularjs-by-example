class PopularController implements ng.IController {
    constructor(private $scope,
        private PageValues: PageValues,
        private shows) {
            PageValues.title = "POPULAR";
            PageValues.description = "The most popular TV shows.";
    }
}


angular
    .module('app.core')
    .controller('PopularController', PopularController);