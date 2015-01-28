angular
    .module('app.core')
    .directive('show', show);
function show(ShowService) {
    var directive = {
        link: link,
        templateUrl: 'components/show/show.tpl.html',
        restrict: 'E',
        scope: {
            show: '='
        }
    };
    return directive;
    function link(scope) {
        scope.genres = [];
        ShowService.get(scope.show.id).then(function(response){
            scope.genres = response.genres;
        });
    }
}