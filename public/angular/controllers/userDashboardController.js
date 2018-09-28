'use strict';

appModule.controller('UserDashboardController', ['$scope', '$http', '$location', '$uibModal', '$stateParams', '$rootScope', '$timeout', '$state', 'icdb', 'alertService',
    function($scope, $http, $location, $uibModal, $stateParams, $rootScope, $timeout, $state, icdb, alertService) {

    	$scope.udObj = {};




    	//
    	$scope.udObj.jobObj = {};


    	// ------------ Manage Profile --------------
    	$scope.udObj.jobObj.list = {};
    	$scope.udObj.jobObj.list.isLoading = false;
    	$scope.udObj.jobObj.list.data = [];
    	
    	$scope.udObj.jobObj.list.init = function() {

    		// if ($scope.udObj.jobObj.list.data.length) {
    		// 	return;
    		// }

    		$scope.udObj.jobObj.list.isLoading = true;


       		$http.post('/api/v1/get-client-jobs', {
       			skip: 0
       		}).success(function(response) {
				console.log("result >>>>>", response);
				$scope.udObj.jobObj.list.data = response.jobs;

				$timeout(function() {
					$scope.udObj.jobObj.list.isLoading = false;
				}, 500);
			});
       	}

       	$scope.udObj.jobObj.list.init();





       	// -------------- Create Job -------------------
		// $scope.dbObj.postObj = {};
		// $scope.dbObj.postObj.model = {};

		// $scope.dbObj.postObj.openModal = function() {
		// 	$scope.dbObj.postObj.model.jobWorkType = 1;
		// 	$scope.dbObj.postObj.model.candidateType = 1;
		// 	$scope.dbObj.postObj.model.salaryType = 1;
		// 	$scope.dbObj.postObj.model.interviewDateFrom = new Date();
		// 	$scope.dbObj.postObj.model.interviewDateTo = new Date();
		// 	$scope.dbObj.postObj.model.requiredDoc = [];
		// 	$scope.dbObj.postObj.model.department = [];
		// 	$scope.dbObj.postObj.model.requiredDoc.push($rootScope.g.adminData.requiredDocuments[0]);
		// 	$('#add-new-job').modal('show');
		// }

		// $scope.dbObj.postObj.closeModal = function() {
		// 	$scope.dbObj.postObj.model = {};
		// 	$scope.dbObj.postObj.isSubmited = false;
		// 	$scope.dbObj.postObj.isReqSent = false;
		// 	$('#add-new-job').modal('hide');
		// }

		// $scope.dbObj.postObj.isSubmited = false;
		// $scope.dbObj.postObj.isReqSent = false;
		// $scope.dbObj.postObj.submit = function(form) {

		// 	if (!form.$valid) {
		// 		$scope.dbObj.postObj.isSubmited = true;
		// 		return;
		// 	}

		// 	$scope.dbObj.postObj.isReqSent = true;
		// 	$scope.dbObj.postObj.model.userId = $rootScope.g.loggedUser._id;

		// 	icdb.insert('JobsBazaar', $scope.dbObj.postObj.model, function(result) {
		// 		$scope.dbObj.postObj.closeModal();
	 //            alertService.flash('success', 'Job has been created successfully.');
	 //        });
		// }



		// 		// -------------- Update Job -------------------
		// $scope.jobMgmtObj.edit = {};
		// $scope.jobMgmtObj.edit.model = {};

		// $scope.jobMgmtObj.edit.openModal = function(row) {
		// 	$scope.jobMgmtObj.edit.model = angular.copy(row);
		// 	$scope.jobMgmtObj.edit.model.interviewDateFrom = new Date(row.interviewDateFrom);
		// 	$scope.jobMgmtObj.edit.model.interviewDateTo = new Date(row.interviewDateTo);

		// 	$('#update-job-data').modal('show');
		// }

		// $scope.jobMgmtObj.edit.closeModal = function() {
		// 	$scope.jobMgmtObj.edit.model.model = {};
		// 	$scope.jobMgmtObj.edit.isSubmited = false;
		// 	$scope.jobMgmtObj.edit.isReqSent = false;
		// 	$('#update-job-data').modal('hide');
		// }

		// $scope.jobMgmtObj.edit.isSubmited = false;
		// $scope.jobMgmtObj.edit.isReqSent = false;
		// $scope.jobMgmtObj.edit.submit = function(form) {

		// 	if (!form.$valid) {
		// 		$scope.jobMgmtObj.edit.isSubmited = true;
		// 		return;
		// 	}

		// 	$scope.jobMgmtObj.edit.isReqSent = true;

		// 	icdb.update('JobsBazaar', $scope.jobMgmtObj.edit.model._id, $scope.jobMgmtObj.edit.model, function(result) {
		// 		$scope.jobMgmtObj.edit.closeModal();
		// 		alertService.flash('success', 'Job has been created successfully.');
		// 	});
		// }









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