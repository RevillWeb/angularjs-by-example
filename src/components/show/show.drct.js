angular
    .module('app.core')
    .directive('show', show);
function show () {
    var directive = {
        link: link,
        templateUrl: 'components/show/show.tpl.html',
        restrict: 'E',
        scope: {
            show: '=show'
        }
    };
    return directive;
    function link(scope) {
        scope.getImageUrl = function(url) {
            var parts = url.split('.');
            return parts[0] + '.' + parts[1] + '.' + parts[2] + '-138.' + parts[3];
        };
        scope.getOverview = function() {
            return scope.show.overview.substr(0, 200);
        };
    }
}