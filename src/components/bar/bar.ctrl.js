'use strict';
angular
    .module('app.core')
    .controller('BarController', ['$scope', 'PageValues', function($scope, PageValues) {
        //Setup the view model object
        var vm = this;
        vm.data = PageValues;
    }]);