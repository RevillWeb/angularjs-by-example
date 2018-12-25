class ViewController {

    setBannerImage = () => {
        return {
            'background': 'url() no-repeat',
            'background-size': '100%',
            'background-position': '100% 0%'
        };
    };

    constructor(private show : Show,
        private ShowService: ShowService) {
            PageValues.instance.title = "VIEW";
            PageValues.instance.description = `Overview, seasons & info for '${show.original_name}'.`;

            this.show.cast = [];
            ShowService.getCast(this.show.id).then((response : Show) => {
                this.show.cast = response.cast;
            });
        }
}

angular
    .module('app.core')
    .controller('ViewController', ViewController);