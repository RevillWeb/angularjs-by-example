class PremieresController implements ng.IController {
    constructor(private shows: Show[],
        private PageValues: PageValues) {
            PageValues.title = "PREMIERES";
            PageValues.description = "Brand new shows showing this month.";
        }
}


angular
    .module('app.core')
    .controller('PremieresController', PremieresController);