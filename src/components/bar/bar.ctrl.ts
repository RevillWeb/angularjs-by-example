class BarController implements ng.IController {
    data : PageValues

    constructor() {
            this.data = PageValues.instance
        }
}

angular
    .module('app.core')
    .controller('BarController', BarController);