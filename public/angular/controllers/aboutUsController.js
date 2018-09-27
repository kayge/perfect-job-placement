'use strict';

appModule.controller('AboutusController', ['$scope', '$http', '$location', '$uibModal', '$stateParams', '$rootScope', '$timeout', '$state', 'icdb', 'alertService',
    function($scope, $http, $location, $uibModal, $stateParams, $rootScope, $timeout, $state, icdb, alertService) {

    	$scope.absObj = {};


        // -------------------------------------------------
        $scope.absObj.team = {};
        $scope.absObj.team.teamMember = [];

        $scope.absObj.team.init = function() {
            icdb.get('OurTeam', function(result) {
                $scope.absObj.team.teamMember = result;
            });
        }
     
	}
]);