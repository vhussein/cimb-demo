var componentsApp = angular.module('components', ['ui.router']);

componentsApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/landing');

    $stateProvider
        .state('landing', {
            url: '/landing',
            templateUrl: 'app/views/landing.html'
        })
		.state('css3', {
            url: '/css3',
            templateUrl: 'app/views/css3/index.html'
        })
		.state('html5', {
            url: '/html5',
            templateUrl: 'app/views/html5/index.html'
        })
		.state('html5-demos', {
            url: '/html5-demos',
            templateUrl: 'app/views/html5-demos/index.html'
        })
        .state('angular', {
            url: '/angular',
            templateUrl: 'app/views/angular/index.html'
        })
        .state('kendoui', {
            url: '/kendoui',
            templateUrl: 'app/views/kendoui/index.html'
        })
        .state('kendoui-demos', {
            url: '/kendoui-demos',
            templateUrl: 'app/views/kendoui-demos/index.html'
        })
        .state('css3-demos', {
            url: '/css3-demos',
            templateUrl: 'app/views/css3-demos/bootstrap-css/index.html'
        });

});

componentsApp.controller('deviceMainController',['$scope','$state', function($scope, $state){
}]);