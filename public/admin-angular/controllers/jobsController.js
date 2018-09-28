appModule.controller('JobMgmtController', ['$scope', '$http', '$location', '$uibModal', '$stateParams', '$rootScope', '$timeout', '$state', 'icdb', 'alertService',
    function($scope, $http, $location, $uibModal, $stateParams, $rootScope, $timeout, $state, icdb, alertService) {
		
		
		$scope.jobMgmtObj = {};
		$rootScope.g.adminData = globalObj;


		// --------- Get job data -------------
		$scope.jobMgmtObj.list = {};
		$scope.jobMgmtObj.list.loading = false;
		$scope.jobMgmtObj.list.data = [];

		$scope.jobMgmtObj.list.init = function() {
			$scope.jobMgmtObj.list.loading = true;

			icdb.getCondition('JobsBazaar', {
				status: { $ne: 3 }
			}, function(response) {
				$scope.jobMgmtObj.list.data = response;

				$timeout(function() {
					$scope.jobMgmtObj.list.loading = false;
				}, 10);
	        });
		}


		// -------------- Update Job -------------------
		$scope.jobMgmtObj.edit = {};
		$scope.jobMgmtObj.edit.model = {};

		$scope.jobMgmtObj.edit.openModal = function(row) {
			$scope.jobMgmtObj.edit.model = angular.copy(row);
			$scope.jobMgmtObj.edit.model.interviewDateFrom = new Date(row.interviewDateFrom);
			$scope.jobMgmtObj.edit.model.interviewDateTo = new Date(row.interviewDateTo);

			$('#update-job-data').modal('show');
		}

		$scope.jobMgmtObj.edit.closeModal = function() {
			$scope.jobMgmtObj.edit.model.model = {};
			$scope.jobMgmtObj.edit.isSubmited = false;
			$scope.jobMgmtObj.edit.isReqSent = false;
			$('#update-job-data').modal('hide');
		}

		$scope.jobMgmtObj.edit.isSubmited = false;
		$scope.jobMgmtObj.edit.isReqSent = false;
		$scope.jobMgmtObj.edit.submit = function(form) {

			if (!form.$valid) {
				$scope.jobMgmtObj.edit.isSubmited = true;
				return;
			}

			$scope.jobMgmtObj.edit.isReqSent = true;

			icdb.update('JobsBazaar', $scope.jobMgmtObj.edit.model._id, $scope.jobMgmtObj.edit.model, function(response) {
				$scope.jobMgmtObj.edit.closeModal();
				alertService.flash('success', 'Job has been created successfully.');
			});
		}

		$scope.jobMgmtObj.edit.activeJob = function(row) {
			icdb.update('JobsBazaar', row._id,{
				status: row.status
			}, function(response) {
				$scope.jobMgmtObj.edit.closeModal();
				alertService.flash('success', 'Job status has been updates successfully.');
			});
		}



		// -------------- Delete Job -------------------
		$scope.jobMgmtObj.delete = {};
		$scope.jobMgmtObj.delete.openModal = function(row, status) {
			if (status) {
				row.isDelete = true;
				return;
			}

			icdb.remove('JobsBazaar', row._id, function(response) {
				for (var i in $scope.jobMgmtObj.list.data) {
					if ($scope.jobMgmtObj.list.data[i]._id == row._id) {
						$scope.jobMgmtObj.list.data.splice(i, 1);
					}
				}
			});
		}

	}
]);