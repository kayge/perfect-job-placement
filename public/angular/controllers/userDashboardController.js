'use strict';

appModule.controller('UserDashboardController', ['$scope', '$http', '$location', '$uibModal', '$stateParams', '$rootScope', '$timeout', '$state', 'icdb', 'alertService',
    function($scope, $http, $location, $uibModal, $stateParams, $rootScope, $timeout, $state, icdb, alertService) {

    	$scope.udObj = {};


    	// ------------ Manage Profile --------------
    	$scope.udObj.profileObj = {};
    	$scope.udObj.profileObj.model = {};
    	$scope.udObj.profileObj.isSubmited = false;
       	
       	$scope.udObj.profileObj.init = function() {
       		$scope.udObj.profileObj.model = angular.copy($rootScope.g.loggedUser);
       	}

       	$scope.udObj.profileObj.submit = function(form) {
       		if (!form.$valid) {
       			$scope.udObj.profileObj.isSubmited = true;
       			return;
       		}
       		$scope.udObj.profileObj.isReqSent = true;

       		icdb.update('OurTeam', $scope.udObj.profileObj.model._id, $scope.udObj.profileObj.model, function(result) {
       			$scope.udObj.profileObj.isSubmited = false;
       			$scope.udObj.profileObj.isReqSent = false;
				alertService.flash('success', 'Profile has been updated successfully.');
			});
       	}





       	// ------------ Chnage Password -----------------
		$scope.udObj.chPassObj = {};
		$scope.udObj.chPassObj.model = {};
		$scope.udObj.chPassObj.isSubmited = false;
		$scope.udObj.chPassObj.isReqSent = false;

		$scope.udObj.chPassObj.submit = function(form) {
			if (!form.$valid) {
				$scope.udObj.chPassObj.isSubmited = true;
				return;
			}
			if ($scope.udObj.chPassObj.model.oldPassword != $rootScope.g.loggedUser.password) {
				alertService.flash('error', 'Old Password is incorrect.');
				return;
			}

			$scope.udObj.chPassObj.isReqSent = true;

			$http.post('/api/user/change-pass', {
				_id: $rootScope.g.loggedUser._id,
				password: $scope.udObj.chPassObj.model.password
			}).success(function(result) {
				$scope.udObj.chPassObj.isSubmited = false;
				$scope.udObj.chPassObj.isReqSent = false;
				$scope.udObj.chPassObj.model = {};
				alertService.flash('success', 'Password has been updated successfully.');
			});
		}
	}
]);