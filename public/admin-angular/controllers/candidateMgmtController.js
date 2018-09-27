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