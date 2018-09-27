'use strict';

appModule.controller('AdminController', ['$scope', '$http', '$location', '$uibModal', '$stateParams', '$rootScope', '$timeout', '$state', 'icdb', 'alertService',
    function($scope, $http, $location, $uibModal, $stateParams, $rootScope, $timeout, $state, icdb, alertService) {

        $scope.adminObj = {};
        $rootScope.adobj = {};
    	$rootScope.adobj.comObj = {};
	}
]);