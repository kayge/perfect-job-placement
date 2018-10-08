'use strict';

var checkUserIsLoggedOrNot = function($q, $timeout, $http, $location, $rootScope, $state, status) {

    var deferred = $q.defer();

    $http.get('/users/me').success(function(user) {

        if (user && user._id) {
            $rootScope.g.loggedUser = user;
            $timeout(deferred.resolve);
        } else {
            $state.go('login');
        }
    }).error(function() {
        $timeout(deferred.resolve);
    });

    return deferred.promise;
}


var checkLoggedIn = function($q, $timeout, $http, $location, $rootScope, $state) {
    return checkUserIsLoggedOrNot($q, $timeout, $http, $location, $rootScope, $state, true);
};


var checkLoggedOut = function($q, $timeout, $http, $location, $rootScope, $state) {
    return checkUserIsLoggedOrNot($q, $timeout, $http, $location, $rootScope, $state, false);
};







var appModule = angular.module('adminModule', ['ngRoute', 'ngCookies', 'ngResource', 'ui.bootstrap', 'ui.router', 'toastr', 'ngAnimate']);

appModule.run(function($rootScope, $timeout, $state, $location) {

    $rootScope.g = {};
    $rootScope.g.adminData = {};

    $rootScope.$on( "$stateChangeSuccess", function(event, next, current) {
        $("html, body").animate({ scrollTop: 0 }, "slow");
    });

    $rootScope.g.stateGo = function(key) {
        $state.go(key);
    }

    $rootScope.g.getActiveClass = function(key) {
        if ($location.path() == key) {
            return 'active';
        }
        return '';
    }
});




appModule.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',

    function($stateProvider, $urlRouterProvider, $locationProvider) {


        $locationProvider.html5Mode({
            enabled: false,
            requireBase: true
        }).hashPrefix('!');


        $stateProvider.state('login', {
            url: '/login',
            templateUrl: '/admin-angular/views/users/login.html'
        });

        $stateProvider.state('signup', {
            url: '/signup',
            templateUrl: '/admin-angular/views/users/signup.html'
        });

        $stateProvider.state('forgot-password', {
            url: '/forgot-password',
            templateUrl: '/admin-angular/views/users/forgot-password.html'
        });

        $stateProvider.state('dashboard', {
            url: '/dashboard',
            templateUrl: '/admin-angular/views/dashboard.html',
            resolve: {
                loggedin: checkLoggedIn
            }
        });

        $stateProvider.state('qualification', {
            url: '/qualification',
            templateUrl: '/admin-angular/views/manage-qualification.html',
            resolve: {
                loggedin: checkLoggedIn
            }
        });

        $stateProvider.state('location-mgmt', {
            url: '/location-mgmt',
            templateUrl: '/admin-angular/views/manage-location.html',
            resolve: {
                loggedin: checkLoggedIn
            }
        });

        $stateProvider.state('sitecontent-mgmt', {
            url: '/sitecontent-mgmt',
            templateUrl: '/admin-angular/views/manage-site-content.html',
            resolve: {
                loggedin: checkLoggedIn
            }
        });

        $stateProvider.state('jobs-mgmt', {
            url: '/jobs-mgmt',
            templateUrl: '/admin-angular/views/manage-jobs.html',
            resolve: {
                loggedin: checkLoggedIn
            }
        });

        $stateProvider.state('candidates-mgmt', {
            url: '/candidates-mgmt',
            templateUrl: '/admin-angular/views/candidates-mgmt.html',
            resolve: {
                loggedin: checkLoggedIn
            }
        });

        $stateProvider.state('company-user-mgmt', {
            url: '/company-user-mgmt',
            templateUrl: '/admin-angular/views/manage-company-user.html',
            resolve: {
                loggedin: checkLoggedIn
            }
        });

        $stateProvider.state('inquiry-mgmt', {
            url: '/inquiry-mgmt',
            templateUrl: '/admin-angular/views/manage-user-inquiry.html',
            resolve: {
                loggedin: checkLoggedIn
            }
        });


        $urlRouterProvider.otherwise('/login');
    }
]);
