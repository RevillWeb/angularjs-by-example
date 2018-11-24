class PopularController implements ng.IController {
    constructor(private PageValues: PageValues) {
            PageValues.title = "POPULAR";
            PageValues.description = "The most popular TV shows.";
    }
}


angular
    .module('app.core')
    .controller('PopularController', PopularController);