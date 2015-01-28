'use strict';
angular
    .module('app.core')
    .controller('HomeController', function($scope, PageValues) {
        //Set page title and description
        PageValues.title = "HOME";
        PageValues.description = "Learn AngularJS using best practice real world examples.";
        //Setup view model object
        var vm = this;
        vm.tutorials = [
            {
                title: "INTRODUCTION",
                description: "An introduction to the AngularJS by example application and the tutorial series. All about why this project exists, what the tutorial series is likely to include and who the tutorials are for.",
                link: "http://www.google.com/"
            },
            {
                title: "PROJECT STRUCTURE & MODULARITY",
                description: "Looking at project structure in terms of AngularJS modularity and also how best to lay out your directories to make development a breeze.",
                link: "#"
            },
            {
                title: "CONTROLLERS",
                description: "Investigating the different ways you can write AngularJS controllers along with recommended best practices.",
                link: "#"
            },
            {
                title: "SHARING DATA WITH SERVICES",
                description: "How to effectively share data around your AngularJS application and when best to use the different types of service available.",
                link: "#"
            },
            {
                title: "WRITING DIRECTIVES",
                description: "Theories behind directive design and how to best implement them within your application.",
                link: "#"
            },
            {
                title: "BUILD PROCESS",
                description: "So you have an awesome AngularJS app, how do you get it ready for production and deployment? Using Gulp & GitFlow to get the job done.",
                link: "#"
            }
        ];
    });