appModule.controller('JobMgmtController', ['$scope', '$http', '$location', '$uibModal', '$stateParams', '$rootScope', '$timeout', '$state', 'icdb', 'alertService',
    function($scope, $http, $location, $uibModal, $stateParams, $rootScope, $timeout, $state, icdb, alertService) {
		
		
		$scope.jobMgmtObj = {};
		$rootScope.g.adminData = globalObj;


		// --------- Get job data -------------
		$scope.jobMgmtObj.list = {};
		$scope.jobMgmtObj.list.loading = false;
		$scope.jobMgmtObj.list.data = [];
		$scope.jobMgmtObj.list.count = 0;

		$scope.jobMgmtObj.list.init = function() {
			$scope.jobMgmtObj.list.loading = true;

			$http.post('api/admin/get-data/with-condition', {
				model: 'JobsBazaar',
				skip: $scope.jobMgmtObj.list.data.length,
				condition: {},
			}).success(function(response) {
				
				if (response.data && response.data.length) {
					for (var row in response.data) {
						$scope.jobMgmtObj.list.data.push(response.data[row]);
					}

					$scope.jobMgmtObj.list.count = response.count;
				}

				$timeout(function() {
	        		$scope.jobMgmtObj.list.loading = false;
	        	}, 10);
	        });
		}


		$scope.jobMgmtObj.list.isLoadMore = false;

		$scope.jobMgmtObj.list.loadMore = function() {
			$scope.jobMgmtObj.list.isLoadMore = true;

			$http.post('api/admin/get-data/with-condition', {
				model: 'JobsBazaar',
				skip: $scope.jobMgmtObj.list.data.length,
				condition: {},
			}).success(function(response) {
				
				if (response.data && response.data.length) {
					for (var row in response.data) {
						$scope.jobMgmtObj.list.data.push(response.data[row]);
					}

					$scope.jobMgmtObj.list.count = response.count;
				}

				$timeout(function() {
	        		$scope.jobMgmtObj.list.isLoadMore = false;
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

			$scope.jobMgmtObj.list.count = $scope.jobMgmtObj.list.count - 1;
		}


		// -------------- Delete Job -------------------
		$scope.jobMgmtObj.clone = {};
		$scope.jobMgmtObj.clone.create = function(cloneData) {
			
			var postData = angular.copy(cloneData);
			delete postData._id;

			icdb.insert('JobsBazaar', postData, function(response) {
				if (response.status) {
					$scope.jobMgmtObj.list.data.push(response.result);
					console.log($scope.jobMgmtObj.list.data);
					$scope.jobMgmtObj.list.count = $scope.jobMgmtObj.list.count + 1;
					alertService.flash('success', 'Job has been clone successfully.');
				}
			});
		}

	}
]);