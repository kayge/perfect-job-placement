appModule.controller('userInquiryMgmtController', ['$scope', '$http', '$location', '$uibModal', '$stateParams', '$rootScope', '$timeout', '$state', 'icdb', 'alertService',
    function($scope, $http, $location, $uibModal, $stateParams, $rootScope, $timeout, $state, icdb, alertService) {
		
		
		$scope.userInqObj = {};
		$rootScope.g.adminData = globalObj;


		// --------- Get subscriber data -------------
		$scope.userInqObj.list = {};
		$scope.userInqObj.list.loading = false;
		$scope.userInqObj.list.data = [];

		$scope.userInqObj.list.init = function() {
			$scope.userInqObj.list.loading = true;

			icdb.get('Inquiry', function(result) {
				$scope.userInqObj.list.data = result;
				console.log("$scope.userInqObj.list.data >>>", $scope.userInqObj.list.data);

				$timeout(function() {
					$scope.userInqObj.list.loading = false;
				}, 1000);
			});
		}




		// --------- Remove subscriber -------------
		$scope.userInqObj.list.remove = {};
		$scope.userInqObj.list.remove.submit = function(dataRow, status) {

			if (!status) {
				dataRow.isDelete = true;
				return;
			}

			icdb.remove('Inquiry', dataRow._id, function(result) {
				
				for (var i in $scope.userInqObj.list.data) {
					if ($scope.userInqObj.list.data[i]._id == dataRow._id) {
						$scope.userInqObj.list.splice(i, 1);
					}
				}
			});
		}

	}
]);