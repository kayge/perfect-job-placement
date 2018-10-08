'use strict';

appModule.controller('CommonController', ['$scope', '$http', '$location', '$uibModal', '$stateParams', '$rootScope', '$timeout', '$state', 'icdb', 'alertService',
    function($scope, $http, $location, $uibModal, $stateParams, $rootScope, $timeout, $state, icdb, alertService) {

        $scope.comnObj = {};




        // -------------- Init Site Settings -------------------
        $scope.comnObj.siteSettings = {};

        $scope.comnObj.siteSettings.init = function() {
            icdb.get('AppConfig', function(response) {
                $scope.comnObj.siteSettings.data = {};
                $scope.comnObj.siteSettings.data = response[0];
            });            
        }

        $scope.comnObj.siteSettings.init();











        // -------------- Init Global data --------------------

        $rootScope.g.globalvarObj = {};

        $scope.comnObj.init = function() {

            icdb.get('JobLocations', function(response) {
                $rootScope.g.globalvarObj.cites = response;
            });

            icdb.get('Qualifications', function(response) {
                $rootScope.g.globalvarObj.qualification = response;
            });

            icdb.get('AreaOfInterest', function(response) {
                $rootScope.g.globalvarObj.areaOfInterest = response;
            });
        }

        $scope.comnObj.init();
	}
]);