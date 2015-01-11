angular
    .module('app.core')
    .directive('show', show);
function show (ShowService) {
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
//        scope.loaded = false;
//        scope.getShow = function() {
//            ShowService.get(scope.show.ids.trakt).then(function(data){
//               console.log(data);
//                scope.loaded = true;
//            }, function(error){
//                console.log(error);
//            });
//        }
//        scope.getShow();
        scope.getImageUrl = function(url) {
            var parts = url.split('.');
            return parts[0] + '.' + parts[1] + '.' + parts[2] + '-138.' + parts[3];
        };
        scope.getOverview = function() {
            return scope.show.overview.substr(0, 200);
        };
    }
}