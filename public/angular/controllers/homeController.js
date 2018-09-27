'use strict';

appModule.controller('HomeController', ['$scope', '$http', '$location', '$uibModal', '$stateParams', '$rootScope', '$timeout', '$state', 'icdb', 'alertService',
    function($scope, $http, $location, $uibModal, $stateParams, $rootScope, $timeout, $state, icdb, alertService) {

    	$scope.homeObj = {};
        $rootScope.g.adminData = globalObj;



        // -------------- Init Site Settings -------------------
        $scope.homeObj.jobObj = {};
        $scope.homeObj.jobObj.list = {};
        
        $scope.homeObj.jobObj.list.isLoading = false;
        $scope.homeObj.jobObj.skip = 0;
        $scope.homeObj.jobObj.data = [];
        var skip = 0;

        $scope.homeObj.jobObj.init = function() {
            $scope.homeObj.jobObj.list.isLoading = true;

            $http.post('/api/site/get-jobs', {
                skip: skip
            }).success(function(response) {
                skip = skip + 20;
                $scope.homeObj.jobObj.data = response.result;
                $scope.homeObj.jobObj.totalJobs = response.count;
                $scope.homeObj.jobObj.jobsByLocation = response.jobsByLocation;
                
                $timeout(function() {
                    $scope.homeObj.jobObj.list.isLoading = false;
                }, 200);
            });
        }



        // -------------- Init Site Settings -------------------
        $scope.homeObj.jobjByFilter = {};
        $scope.homeObj.jobjByFilter.list = {};
        
        $scope.homeObj.jobjByFilter.list.isLoading = false;
        $scope.homeObj.jobjByFilter.skip = 0;
        $scope.homeObj.jobjByFilter.data = [];
        var skip = 0;

        $scope.homeObj.jobjByFilter.init = function() {
            $scope.homeObj.jobjByFilter.list.isLoading = true;

            var condition = {};

            if ($state.params.key == 1) {
                condition.jobCategory = $state.params.categoryId;
            }
            if ($state.params.key == 2) {
                condition.jobCity = $state.params.categoryId;
            }


            $http.post('/api/site/get-jobsby-filter', {
                condition: condition,
                skip: skip
            }).success(function(response) {
                skip = skip + 20;
                $scope.homeObj.jobjByFilter.data = response.result;
                $scope.homeObj.jobjByFilter.totalJobs = response.count;
                $scope.homeObj.jobjByFilter.jobsByLocation = response.jobsByLocation;
                
                $timeout(function() {
                    $scope.homeObj.jobjByFilter.list.isLoading = false;
                }, 200);
            });
        }



        // ----------------------------
        $scope.homeObj.jobObj.list.filter = {
            isActive: 3
        };

        $scope.homeObj.getFilterData = function(key) {

            if (key == 3) {
                $scope.homeObj.jobObj.list.filter = {
                    isActive: 3
                };
                return;
            }

            $scope.homeObj.jobObj.list.filter = {
                isActive: key,
                filterObj: {
                    jobWorkType: key
                }
            };
        }




        // ------------ View job preview --------------
        $scope.homeObj.jobObj.preview = {};
        $scope.homeObj.jobObj.preview.data = {};

        $scope.homeObj.jobObj.preview.open = function(row) {
            $scope.homeObj.jobObj.preview.data = angular.copy(row);
            $('#job-preview').modal('show');
        }

        $scope.homeObj.jobObj.preview.close = function(row) {
            $scope.homeObj.jobObj.preview.data = {};
            $('#job-preview').modal('hide');
        }



        // -------------- Register User -------------------
        $scope.homeObj.jobObj.applyjob = {};
        $scope.homeObj.jobObj.applyjob.model = {};

        icdb.get('Qualifications', function(result) {
            $scope.homeObj.jobObj.applyjob.qualification = result;
        });

        icdb.get('JobLocations', function(result) {
            $scope.homeObj.jobObj.applyjob.cites = result;
        });


        $scope.homeObj.jobObj.applyjob.openModal = function(jobRow) {
            $scope.homeObj.jobObj.applyjob.model.jobId = jobRow._id;
            $('#confirm-contact').modal('show');
        }

        $scope.homeObj.jobObj.applyjob.closeModal = function() {
            $scope.homeObj.jobObj.applyjob.model = {};
            $scope.homeObj.jobObj.applyjob.isSubmited = false;
            $scope.homeObj.jobObj.applyjob.isReqSent = false;
            $('#apply-for-job').modal('hide');
            $('#confirm-contact').modal('hide');
        }


        $scope.homeObj.jobObj.applyjob.confirmUnique = {};
        $scope.homeObj.jobObj.applyjob.confirmUnique.isSubmited = false;
        $scope.homeObj.jobObj.applyjob.confirmUnique.isReqSent = false;

        $scope.homeObj.jobObj.applyjob.confirmUnique.submit = function(form) {

            if (!form.$valid) {
                $scope.homeObj.jobObj.applyjob.confirmUnique.isSubmited = true;
                return;
            }

            $scope.homeObj.jobObj.applyjob.confirmUnique.isReqSent = true;


            icdb.getCondition('TrackUniqueContact', {
                jobId: $scope.homeObj.jobObj.applyjob.model.jobId,
                contact: $scope.homeObj.jobObj.applyjob.model.mobile
            }, function(response) {
                if (response.length) {
                    alertService.flash('error', 'Sorry! You are allready apply for this job.');
                    $scope.homeObj.jobObj.applyjob.confirmUnique.isReqSent = false;
                    $scope.homeObj.jobObj.applyjob.confirmUnique.isSubmited = false;
                    return;
                }

                $scope.homeObj.jobObj.applyjob.confirmUnique.isReqSent = false;
                $scope.homeObj.jobObj.applyjob.confirmUnique.isSubmited = false;

                $('#confirm-contact').modal('hide');

                $timeout(function() {
                    $('#apply-for-job').modal('show');
                }, 500);
            });
        }


        $scope.homeObj.jobObj.applyjob.isSubmited = false;
        $scope.homeObj.jobObj.applyjob.isReqSent = false;

        $scope.homeObj.jobObj.applyjob.submit = function(form) {

            if (!form.$valid) {
                $scope.homeObj.jobObj.applyjob.isSubmited = true;
                return;
            }

            $scope.homeObj.jobObj.applyjob.isReqSent = true;

            icdb.insert('CandidateRegister', $scope.homeObj.jobObj.applyjob.model, function(response) {
                icdb.insert('TrackUniqueContact', {
                    jobId: $scope.homeObj.jobObj.applyjob.model.jobId,
                    contact: $scope.homeObj.jobObj.applyjob.model.mobile
                }, function(response1) {
                    $scope.homeObj.jobObj.applyjob.closeModal();
                    alertService.flash('success', 'Congratulations, You are successfully apply for job.');
                });
            });
        }

	}
]);