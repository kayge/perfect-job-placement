appModule.controller('SubscriberMgmtController', ['$scope', '$http', '$location', '$uibModal', '$stateParams', '$rootScope', '$timeout', '$state', 'icdb', 'alertService',
    function($scope, $http, $location, $uibModal, $stateParams, $rootScope, $timeout, $state, icdb, alertService) {
		
		
		$scope.subMgmtObj = {};
		$rootScope.g.adminData = globalObj;


		// --------- Get subscriber data -------------
		$scope.subMgmtObj.list = {};
		$scope.subMgmtObj.list.loading = false;
		$scope.subMgmtObj.list.data = [];

		$scope.subMgmtObj.list.init = function() {
			$scope.subMgmtObj.list.loading = true;

			icdb.get('SubscribedUser', function(result) {
				$scope.subMgmtObj.list.data = result;

				$timeout(function() {
					$scope.subMgmtObj.list.loading = false;
				}, 1000);
			});
		}




		// --------- Remove subscriber -------------
		$scope.subMgmtObj.list.remove = {};
		$scope.subMgmtObj.list.remove.submit = function(dataRow, status) {

			if (!status) {
				dataRow.isDelete = true;
				return;
			}

			icdb.remove('SubscribedUser', dataRow._id, function(result) {
				
				for (var i in $scope.subMgmtObj.list.data) {
					if ($scope.subMgmtObj.list.data[i]._id == dataRow._id) {
						$scope.subMgmtObj.list.splice(i, 1);
					}
				}
			});
		}

	}
]);