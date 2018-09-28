appModule.controller('DashboardController', ['$scope', '$http', '$location', '$uibModal', '$stateParams', '$rootScope', '$timeout', '$state', 'icdb', 'alertService',
    function($scope, $http, $location, $uibModal, $stateParams, $rootScope, $timeout, $state, icdb, alertService) {



		// -------------- Manage Dashboard ---------------
		$scope.dbObj = {};
		$scope.dbObj.comObj = {};	
		$rootScope.g.adminData = globalObj;



		$scope.dbObj.comObj.loading = false;

		$scope.dbObj.comObj.initGlobal = function() {

			$scope.dbObj.comObj.loading = true;

			$http.get('/api/admin/get/dashboard-counts').then(function(response) {
				$scope.dbObj.comObj.totalCounts = response.data;

				$timeout(function() {
					$scope.dbObj.comObj.loading = false;
				}, 10);
			});
		}


		// -------------- Create Job -------------------
		$scope.dbObj.postObj = {};
		$scope.dbObj.postObj.model = {};

		$scope.dbObj.postObj.openModal = function() {
			$scope.dbObj.postObj.model.jobWorkType = 1;
			$scope.dbObj.postObj.model.candidateType = 1;
			$scope.dbObj.postObj.model.salaryType = 1;
			$scope.dbObj.postObj.model.interviewDateFrom = new Date();
			$scope.dbObj.postObj.model.interviewDateTo = new Date();
			$scope.dbObj.postObj.model.requiredDoc = [];
			$scope.dbObj.postObj.model.department = [];
			$scope.dbObj.postObj.model.requiredDoc.push($rootScope.g.adminData.requiredDocuments[0]);
			$('#add-new-job').modal('show');
		}

		$scope.dbObj.postObj.closeModal = function() {
			$scope.dbObj.postObj.model = {};
			$scope.dbObj.postObj.isSubmited = false;
			$scope.dbObj.postObj.isReqSent = false;
			$('#add-new-job').modal('hide');
		}

		$scope.dbObj.postObj.isSubmited = false;
		$scope.dbObj.postObj.isReqSent = false;
		$scope.dbObj.postObj.submit = function(form) {

			if (!form.$valid) {
				$scope.dbObj.postObj.isSubmited = true;
				return;
			}

			$scope.dbObj.postObj.isReqSent = true;
			$scope.dbObj.postObj.model.userId = $rootScope.g.loggedUser._id;

			icdb.insert('JobsBazaar', $scope.dbObj.postObj.model, function(result) {
				$scope.dbObj.postObj.closeModal();
	            alertService.flash('success', 'Job has been created successfully.');
	        });
		}




		// -------------- Register User -------------------
		$scope.dbObj.rgUser = {};
		$scope.dbObj.rgUser.model = {};

		$scope.dbObj.rgUser.openModal = function() {
			$scope.dbObj.rgUser.model.jobWorkType = 1;
			$scope.dbObj.rgUser.model.candidateType = 1;
			$scope.dbObj.rgUser.model.salaryType = 1;
			$scope.dbObj.rgUser.model.areaOfInterest = [];
			$('#confirm-contact').modal('show');
		}

		$scope.dbObj.rgUser.offlineUserReg = function() {
			$scope.dbObj.rgUser.model.jobWorkType = 1;
			$scope.dbObj.rgUser.model.candidateType = 1;
			$scope.dbObj.rgUser.model.salaryType = 1;
			$scope.dbObj.rgUser.model.gender = 1;
			$scope.dbObj.rgUser.model.areaOfInterest = [];
			$('#register-user').modal('show');
		}

		$scope.dbObj.rgUser.closeModal = function() {
			$scope.dbObj.rgUser.model = {};
			$scope.dbObj.rgUser.isSubmited = false;
			$scope.dbObj.rgUser.isReqSent = false;
			$('#register-user').modal('hide');
			$('#confirm-contact').modal('hide');
		}


		$scope.dbObj.rgUser.confirmUnique = {};
		$scope.dbObj.rgUser.confirmUnique.isSubmited = false;
		$scope.dbObj.rgUser.confirmUnique.isReqSent = false;

		$scope.dbObj.rgUser.confirmUnique.submit = function(form) {

			if (!form.$valid) {
				$scope.dbObj.rgUser.confirmUnique.isSubmited = false;
				return;
			}

			$scope.dbObj.rgUser.confirmUnique.isReqSent = true;


			icdb.getCondition('TrackUniqueContact', {
				jobId: $scope.dbObj.rgUser.model.jobId,
				contact: $scope.dbObj.rgUser.model.mobile
			}, function(response) {
				if (response.length) {
					alertService.flash('error', 'Sorry! You are allready apply for this job.');
					$scope.dbObj.rgUser.confirmUnique.isReqSent = false;
					$scope.dbObj.rgUser.confirmUnique.isSubmited = false;
					return;
				}

				$scope.dbObj.rgUser.confirmUnique.isReqSent = false;
				$scope.dbObj.rgUser.confirmUnique.isSubmited = false;

				$('#confirm-contact').modal('hide');

				$timeout(function() {
					$('#register-user').modal('show');
				}, 500);
	        });
		}


		$scope.dbObj.rgUser.isSubmited = false;
		$scope.dbObj.rgUser.isReqSent = false;

		$scope.dbObj.rgUser.submit = function(form) {

			if (!form.$valid) {
				$scope.dbObj.rgUser.isSubmited = true;
				return;
			}

			$scope.dbObj.rgUser.isReqSent = true;

	        icdb.insert('CandidateRegister', $scope.dbObj.rgUser.model, function(response) {
	        	icdb.insert('TrackUniqueContact', {
	        		jobId: $scope.dbObj.rgUser.model.jobId,
					contact: $scope.dbObj.rgUser.model.mobile
	        	}, function(response1) {
					$scope.dbObj.rgUser.closeModal();
		            alertService.flash('success', 'Job has been created successfully.');
	        	});
	        });
		}
	
	}
]);