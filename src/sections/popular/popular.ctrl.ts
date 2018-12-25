class PopularController implements ng.IController {
    constructor(private shows: Show[]) {
            PageValues.instance.title = "POPULAR";
            PageValues.instance.description = "The most popular TV shows.";
    }
}


angular
    .module('app.core')
    .controller('PopularController', PopularController);