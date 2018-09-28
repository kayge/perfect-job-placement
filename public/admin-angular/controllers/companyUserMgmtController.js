appModule.controller('companyUserMgmtController', ['$scope', '$http', '$location', '$uibModal', '$stateParams', '$rootScope', '$timeout', '$state', 'icdb', 'alertService',
    function($scope, $http, $location, $uibModal, $stateParams, $rootScope, $timeout, $state, icdb, alertService) {
		
		
		$scope.cpUserObj = {};
		$rootScope.g.adminData = globalObj;


		// --------- Get subscriber data -------------
		$scope.cpUserObj.list = {};
		$scope.cpUserObj.list.loading = false;
		$scope.cpUserObj.list.data = [];

		$scope.cpUserObj.list.init = function() {
			$scope.cpUserObj.list.loading = true;

			icdb.get('OurClients', function(result) {
				$scope.cpUserObj.list.data = result;

				$timeout(function() {
					$scope.cpUserObj.list.loading = false;
				}, 1000);
			});
		}




		// --------- Remove subscriber -------------
		$scope.cpUserObj.list.remove = {};
		
		$scope.cpUserObj.list.remove.submit = function(dataRow, status) {

			if (!status) {
				dataRow.isDelete = true;
				return;
			}

			icdb.remove('OurClients', dataRow._id, function(result) {
				
				for (var i in $scope.cpUserObj.list.data) {
					if ($scope.cpUserObj.list.data[i]._id == dataRow._id) {
						$scope.cpUserObj.list.data.splice(i, 1);
					}
				}
			});
		}

	}
]);