class ShowDirectiveController implements ng.IController {
    static $inject = ['$scope', 'ShowService']
    
    constructor(private $scope : any, private ShowService : ShowService) {
        $scope.genres = [];
        ShowService.get($scope.show.id).then((response : Show) => {
            $scope.genres = response.genres;
        });
        return this;
    }
}

class ShowDirective implements ng.IDirective {
    constructor() {};
    
    controller = ShowDirectiveController;    
    templateUrl = 'components/show/show.tpl.html';
    restrict = 'E';
    scope = {
        show: '='
    }

    public static Factory(): ng.IDirectiveFactory {
        return () => new ShowDirective();
    }
}

angular
    .module('app.core')
    .directive('show', ShowDirective.Factory());
