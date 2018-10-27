class NgEnterDirective implements ng.IDirective {
    public link = (scope, element : JQLite, attrs : ng.IAttributes) => {
        element.bind("keydown keypress", function(event) {
            if(event.which === 13) {
                scope.$apply(function(){
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
            }
        });
    }

    public static Factory(): ng.IDirectiveFactory {
        return () => new NgEnterDirective();
    }
}

angular
    .module('app.core')
    .directive('ngEnter', NgEnterDirective.Factory());