class PremieresController implements ng.IController {
    constructor(private shows: Show[]) {
            PageValues.instance.title = "PREMIERES";
            PageValues.instance.description = "Brand new shows showing this month.";
        }
}


angular
    .module('app.core')
    .controller('PremieresController', PremieresController);