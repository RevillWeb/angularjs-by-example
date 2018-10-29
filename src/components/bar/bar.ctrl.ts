class BarController implements ng.IController {
    data : PageValues

    constructor(private $scope,       
        private PageValues : PageValues) {
            this.data = PageValues
        }
}

angular
    .module('app.core')
    .controller('BarController', BarController);