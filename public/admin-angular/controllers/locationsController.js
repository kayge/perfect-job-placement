appModule.controller('LocationController', ['$scope', '$http', '$location', '$uibModal', '$stateParams', '$rootScope', '$timeout', '$state', 'icdb', 'alertService',
    function($scope, $http, $location, $uibModal, $stateParams, $rootScope, $timeout, $state, icdb, alertService) {

		// ---------------------- Job Locations ------------------------------------
		$scope.jl = {};


		// ---------------- Init section ----------------
		$scope.jl.list = {};
		$scope.jl.list.loading = false;
		$scope.jl.list.data = [];

		$scope.jl.list.init = function() {
			$scope.jl.list.loading = true;

			icdb.get('JobLocations', function(result) {
				$scope.jl.list.data = result;

				$timeout(function() {
					$scope.jl.list.loading = false;
				}, 10);
	        });
		}


		// ---------------- Insert section ----------------
		$scope.jl.add = {};
	    $scope.jl.add.model = {};

		$scope.jl.add.submit = function() {
			icdb.insert('JobLocations', $scope.jl.add.model, function(response) {
				$scope.jl.add.model = {};
				$scope.jl.list.data.push(response);
	            alertService.flash('success', 'Job Location has been created successfully.');
	        });
		}


		// ---------------- Update section ----------------
		$scope.jl.edit = {};

		$scope.jl.edit.openModal = function(row) {
			row.isEdit = true;
		}

		$scope.jl.edit.submit = function(dataRow) {
			icdb.update('JobLocations', dataRow._id, {
	            city: dataRow.city
	        }, function(response) {
				dataRow.isEdit = false;
					
				for (var i in $scope.jl.list.data) {
					if ($scope.jl.list.data[i]._id == dataRow._id) {
						$scope.jl.list.data[i].city = dataRow.city;
					}
				}

				alertService.flash('success', 'Job Location has been updated successfully.');
			});
		}

		$scope.jl.edit.activeQa = function(row, status) {
			row.status = status;
			icdb.update('JobLocations', row._id, row, function(response) {
				if (status) {
	            	alertService.flash('success', 'Job Location has been Activated successfully.');
				} else {
					alertService.flash('success', 'Job Location has been Deactivated successfully.');
				}
	        });
		}


		// ---------------- Delete section ----------------
		$scope.jl.delete = {};
		$scope.jl.delete.submit = function(dataRow, status) {

			if (status) {
				dataRow.isDelete = true;
				return;
			}

			icdb.remove('JobLocations', dataRow._id, function(result) {
				dataRow.isDelete = false;
				
				for (var i in $scope.jl.list.data) {
					if ($scope.jl.list.data[i]._id == dataRow._id) {
						$scope.jl.list.data.splice(i, 1);
					}
				}

	            alertService.flash('success', 'Job Location has been deleted successfully.');
	        });
		}








		// ---------------------- Area of interest ------------------------------------
		$scope.jl.aofintObj = {};

		// ---------------- Init section ----------------
		$scope.jl.aofintObj.list = {};
		$scope.jl.aofintObj.list.loading = false;
		$scope.jl.aofintObj.data = [];
		$scope.jl.aofintObj.area = [];

		$scope.jl.aofintObj.init = function() {

			$scope.jl.aofintObj.list.loading = true;

			icdb.get('AreaOfInterest', function(result) {
				$scope.jl.aofintObj.data = result;
		        
		        icdb.get('Qualifications', function(result) {
					$scope.jl.aofintObj.area = result;

					$timeout(function() {
						$scope.jl.aofintObj.list.loading = false;
					}, 10);
		        });
	        });
		}
		$scope.jl.aofintObj.init();


		// ---------------- Insert section ----------------
		$scope.jl.aofintObj.add = {};
	    $scope.jl.aofintObj.add.model = {};

		$scope.jl.aofintObj.add.submit = function() {
			icdb.insert('AreaOfInterest', $scope.jl.aofintObj.add.model, function(result) {
				$scope.jl.aofintObj.add.model = {};
				$scope.jl.aofintObj.init();
	            alertService.flash('success', 'Area Of Interest has been created successfully.');
	        });
		}


		// ---------------- Update section ----------------
		$scope.jl.aofintObj.edit = {};

		$scope.jl.aofintObj.edit.openModal = function(row) {
			row.isEdit = true;
		}

		$scope.jl.aofintObj.edit.submit = function(row) {
			icdb.update('AreaOfInterest', row._id, {
	            city: row.city
	        }, function(result) {
				row.isEdit = false;
				$scope.jl.aofintObj.init();
	            alertService.flash('success', 'Area Of Interest has been updated successfully.');
	        });
		}

		$scope.jl.aofintObj.edit.activeQa = function(row, status) {
			row.status = status;
			icdb.update('AreaOfInterest', row._id, row, function(result) {

				$scope.jl.aofintObj.init();
				if (status) {
	            	alertService.flash('success', 'Area Of Interest has been Activated successfully.');
				} else {
					alertService.flash('success', 'Area Of Interest has been Deactivated successfully.');
				}
	        });
		}


		// ---------------- Delete section ----------------
		$scope.jl.aofintObj.delete = {};
		$scope.jl.aofintObj.delete.confirm = function(row, status) {

			if (status) {
				row.confirm = true;
				return;
			}

			icdb.remove('AreaOfInterest', row._id, function(result) {
				row.confirm = false;
				$scope.jl.aofintObj.init();
	            alertService.flash('success', 'Area Of Interest has been deleted successfully.');
	        });
		}

	}
]);