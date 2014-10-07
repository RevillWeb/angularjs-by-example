'use strict';

/*
 * Premieres controller unit test
 */

describe('Controller: PremieresController', function() {

    var showFactory;

    // load the controller's module
    beforeEach(module('app', function($provide){
        // Add mock cache service
        showFactory = {};

        showFactory.getPremieres = function(){
            return shows;
        };

        $provide.value('showFactory', showFactory);
    }));

    var ctrl,
        scope,
        shows = [],
        $location;

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope, _$location_){
        $location = _$location_;
        scope = $rootScope.$new();
        shows = showFactory.getPremieres();
        ctrl = $controller('PremieresController', {
            $scope: scope,
            shows: shows
        });
    }));

    // Check some defaults
    it('should have some default variables defined', function(){
        // Check if they are defined
        expect(ctrl.shows).toBeDefined();
        /*
        expect(ctrl.ordering).toBeDefined();
        expect(ctrl.go).toBeDefined();

        // Check if the default values are correct
        expect(ctrl.isLoading).toBeTruthy();
        expect(ctrl.ordering).toEqual('countryName');
        */
    });

});