class ViewController {    

    setBannerImage = () => {
        return {
            'background': 'url() no-repeat',
            'background-size': '100%',
            'background-position': '100% 0%'
        };
    };
    
    constructor(private $scope,
        private $location,
        private PageValues: PageValues,
        private show,
        private ShowService: ShowService) {
            PageValues.title = "VIEW";
            PageValues.description = "Overview, seasons & info for '" + show.original_name + "'.";    

            this.show.cast = [];
            ShowService.getCast(this.show.id).then((response) => {
                this.show.cast = response.cast;
            });
        }
}

angular
    .module('app.core')
    .controller('ViewController', ViewController);