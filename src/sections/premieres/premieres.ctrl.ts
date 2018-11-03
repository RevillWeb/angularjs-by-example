class PremieresController implements ng.IController {
    constructor(private $scope,
        private shows,
        private PageValues: PageValues) {
            PageValues.title = "PREMIERES";
            PageValues.description = "Brand new shows showing this month.";
        }
}


angular
    .module('app.core')
    .controller('PremieresController', PremieresController);