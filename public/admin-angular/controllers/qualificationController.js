appModule.controller('QualificationController', ['$scope', '$http', '$location', '$uibModal', '$stateParams', '$rootScope', '$timeout', '$state', 'icdb', 'alertService',
    function($scope, $http, $location, $uibModal, $stateParams, $rootScope, $timeout, $state, icdb, alertService) {
	

		// -------------- Qualification -----------------------------
		$rootScope.g.adminData = globalObj;
		$scope.qlObj = {};


		// ---------------- Init section ----------------
		$scope.qlObj.list = {};
		$scope.qlObj.list.loading = false;
		$scope.qlObj.list.data = [];

		$scope.qlObj.list.init = function() {
			$scope.qlObj.list.loading = true;

			icdb.get('Qualifications', function(result) {
				$scope.qlObj.list.data = result;

				$timeout(function() {
	        		$scope.qlObj.list.loading = false;
	        	}, 10);
	        });
		}


		// ---------------- Insert section ----------------
		$scope.qlObj.add = {};
	    $scope.qlObj.add.model = {};
		$scope.qlObj.add.model.qualifyIn = '1';

		$scope.qlObj.add.submit = function() {
			icdb.insert('Qualifications', $scope.qlObj.add.model, function(result) {
				$scope.qlObj.add.model = {};
	            $scope.qlObj.add.model.qualifyIn = '1';
				$scope.qlObj.list.data.push(result);
	            alertService.flash('success', 'Qualifiction has been created successfully.');
	        });
		}


		// ---------------- Update section ----------------
		$scope.qlObj.edit = {};

		$scope.qlObj.edit.openModal = function(dataRow) {
			dataRow.isEdit = true;
		}

		$scope.qlObj.edit.submit = function(dataRow) {
			icdb.update('Qualifications', dataRow._id, {
	            name: dataRow.name,
	            qualifyIn: dataRow.qualifyIn
	        }, function(result) {
				dataRow.isEdit = false;
				
				for (var i in $scope.qlObj.list.data) {
					if ($scope.qlObj.list.data[i]._id == dataRow._id) {
						$scope.qlObj.list.data[i].name = dataRow.name;
						$scope.qlObj.list.data[i].qualifyIn = dataRow.qualifyIn;
					}
				}

	            alertService.flash('success', 'Qualifiction has been updated successfully.');
	        });
		}

		$scope.qlObj.edit.activeQa = function(row, status) {
			row.status = status;
			icdb.update('Qualifications', row._id, row, function(result) {

				$scope.qlObj.list.init();
				if (status) {
	            	alertService.flash('success', 'Qualifiction has been Activated successfully.');
				} else {
					alertService.flash('success', 'Qualifiction has been Deactivated successfully.');
				}
	        });
		}


		// ---------------- Delete section ----------------
		$scope.qlObj.delete = {};
		$scope.qlObj.delete.submit = function(dataRow, status) {

			if (status) {
				dataRow.isDelete = true;
				return;
			}

			icdb.remove('Qualifications', dataRow._id, function(result) {
				dataRow.isDelete = false;
				
				for (var i in $scope.qlObj.list.data) {
					if ($scope.qlObj.list.data[i]._id == dataRow._id) {
						$scope.qlObj.list.data.splice(dataRow, 1);
					}
				}

				alertService.flash('success', 'Qualifiction has been deleted successfully.');
			});
		}

	}
]);