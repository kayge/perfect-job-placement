'use strict';

var checkUserIsLoggedOrNot = function($q, $timeout, $http, $location, $rootScope, $state, status) {

    var deferred = $q.defer();

    $http.get('/users/me').success(function(user) {

        if (user && user._id) {
            $rootScope.g.loggedUser = user;
            $timeout(deferred.resolve);
        } else {
            $state.go('home');
        }
    }).error(function() {
        $timeout(deferred.resolve);
    });

    return deferred.promise;
}


var justCheckLogin = function($q, $timeout, $http, $location, $rootScope, $state, status) {

    $http.get('/users/me').success(function(user) {

        if (user && user._id) {
            $rootScope.g.loggedUser = user;
        }
    });
}


var checkLoggedIn = function($q, $timeout, $http, $location, $rootScope, $state) {
    return checkUserIsLoggedOrNot($q, $timeout, $http, $location, $rootScope, $state, true);
};


var checkLoggedOut = function($q, $timeout, $http, $location, $rootScope, $state) {
    return checkUserIsLoggedOrNot($q, $timeout, $http, $location, $rootScope, $state, false);
};

var _justCheckLogin = function($q, $timeout, $http, $location, $rootScope, $state) {
    return justCheckLogin($q, $timeout, $http, $location, $rootScope, $state, false);
};







var appModule = angular.module('tm', ['ngRoute', 'ngCookies', 'ngResource', 'ui.bootstrap', 'ui.router', 'toastr', 'ngAnimate']);

appModule.run(function($rootScope, $timeout, $location) {

    $rootScope.g = {};
    $rootScope.g.adminData = {};
    $rootScope.g.adminData = globalObj;


    $rootScope.$on( "$stateChangeSuccess", function(event, next, current) {
        $("html, body").animate({ scrollTop: 0 }, "slow");
    });

    $rootScope.g.getActiveClass = function(key) {
        if ($location.path() == key) {
            return 'active';
        }
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
            templateUrl: '/angular/views/users/login.html',
            resolve: {
                loggedin: _justCheckLogin
            }
        });

        $stateProvider.state('signup', {
            url: '/signup',
            templateUrl: '/angular/views/users/signup.html',
            resolve: {
                loggedin: _justCheckLogin
            }
        });

        $stateProvider.state('forgot-password', {
            url: '/forgot-password',
            templateUrl: '/angular/views/users/forgot-password.html',
            resolve: {
                loggedin: _justCheckLogin
            }
        });

        $stateProvider.state('home', {
            url: '/home',
            templateUrl: '/angular/views/index.html',
            resolve: {
                loggedin: _justCheckLogin
            }
        });

        $stateProvider.state('aboutus', {
            url: '/aboutus',
            templateUrl: '/angular/views/about-us.html',
            resolve: {
                loggedin: _justCheckLogin
            }
        });

        $stateProvider.state('category', {
            url: '/category/:key/:categoryId',
            templateUrl: '/angular/views/job-search.html',
            resolve: {
                loggedin: _justCheckLogin
            }
        });

        $stateProvider.state('blogs', {
            url: '/blogs',
            templateUrl: '/angular/views/blog-home.html',
            resolve: {
                loggedin: _justCheckLogin
            }
        });

        $stateProvider.state('contact', {
            url: '/contact',
            templateUrl: '/angular/views/contact.html',
            resolve: {
                loggedin: _justCheckLogin
            }
        });

        $stateProvider.state('user-dashboard', {
            url: '/user-dashboard',
            templateUrl: '/angular/views/users/user-dashboard.html',
            resolve: {
                loggedin: checkLoggedIn
            }
        });


        $urlRouterProvider.otherwise('/home');
    }
]);
