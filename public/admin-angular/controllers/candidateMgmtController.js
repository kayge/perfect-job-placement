appModule.controller('CandidateMgmtController', ['$scope', '$http', '$location', '$uibModal', '$stateParams', '$rootScope', '$timeout', '$state', 'icdb', 'alertService',
    function($scope, $http, $location, $uibModal, $stateParams, $rootScope, $timeout, $state, icdb, alertService) {
		
		
		$scope.candObj = {};
		$rootScope.g.adminData = globalObj;


		// --------- Get job data -------------
		$scope.candObj.list = {};
		$scope.candObj.list.loading = false;
		$scope.candObj.list.data = [];

		$scope.candObj.list.init = function() {
			$scope.candObj.list.loading = true;

			icdb.get('CandidateRegister', function(result) {
				$scope.candObj.list.data = result;

				$timeout(function() {
					$scope.candObj.list.loading = false;
				}, 10);
			});
		}




		// ------------ Filter data ssection --------------------------
		$scope.candObj.fltObj = {};
		$scope.candObj.fltObj.model = {};

		$scope.candObj.fltObj.submit = function() {
			console.log($scope.candObj.fltObj.model);	
		}




		// -------------- Update candidates -------------------
		$scope.cdUser = {};
		$scope.cdUser.create = {};
		$scope.cdUser.create.model = {};

		$scope.cdUser.create.openModal = function(dataRow) {
			$scope.cdUser.create.model = angular.copy(dataRow);
			
			if (!isNaN(new Date(dataRow.birthDate))) {
				$scope.cdUser.create.model.birthDate = new Date(dataRow.birthDate);
			} else {
				$scope.cdUser.create.model.birthDate = new Date();
			}

			$('#candidate-register-modal').modal('show');
		}


		$scope.cdUser.create.closeModal = function() {
			$scope.cdUser.create.model = {};
			$scope.cdUser.create.isSubmited = false;
			$scope.cdUser.create.isReqSent = false;
			$('#candidate-register-modal').modal('hide');
		}



		$scope.cdUser.create.isSubmited = false;
		$scope.cdUser.create.isReqSent = false;

		$scope.cdUser.create.submit = function(form) {

			if (!form.$valid) {
				$scope.cdUser.create.isSubmited = true;
				return;
			}

			$scope.cdUser.create.isReqSent = true;
			console.log($scope.cdUser.create.model);

	        icdb.update('CandidateRegister', $scope.cdUser.create.model._id, $scope.cdUser.create.model, function(response) {
				$scope.cdUser.create.closeModal();
	            alertService.flash('success', 'Job has been updates successfully.');
	        });
		}




		// -------------- Delete Job -------------------
		$scope.candObj.delete = {};
		$scope.candObj.delete.openModal = function(row, status) {
			if (status) {
				row.confirm = true;
				return;
			}

			icdb.remove('CandidateRegister', row._id, function(result) {
				for (var i in $scope.candObj.list.data) {
					if ($scope.candObj.list.data[i]._id == row._id) {
						$scope.candObj.list.data.splice(i, 1);
					}
				}
			});
		}

	}
]);