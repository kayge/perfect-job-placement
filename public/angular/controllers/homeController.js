'use strict';

appModule.controller('HomeController', ['$scope', '$http', '$location', '$uibModal', '$stateParams', '$rootScope', '$timeout', '$state', 'icdb', 'alertService',
    function($scope, $http, $location, $uibModal, $stateParams, $rootScope, $timeout, $state, icdb, alertService) {

        
        //
        $scope.homeObj = {};
    	$scope.homeObj.cobj = {};





        // ------------------- Common Section ------------------------

        $scope.homeObj.cobj.commingSoon = function() {
            $('#comming-soon').modal('show');
        }


        $scope.homeObj.cobj.gotoLocation = function(key, id) {
            $location.path(key+id);
        }

        


        //
        $scope.homeObj.cobj.filter = {
            isActive: 3
        };

        //
        $scope.homeObj.cobj.getFilterData = function(key) {

            if (key == 3) {
                $scope.homeObj.cobj.filter = {
                    isActive: 3
                };
                return;
            }

            $scope.homeObj.cobj.filter = {
                isActive: key,
                filterObj: {
                    jobWorkType: key
                }
            };
        }











        // ---------------------------------------------------------------------
        // Init site settings
        // ---------------------------------------------------------------------



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











        // ---------------------------------------------------------------------
        // Get jobs
        // ---------------------------------------------------------------------


        $scope.homeObj.jobObj = {};
        $scope.homeObj.jobObj.list = {};
        
        $scope.homeObj.jobObj.list.isLoading = false;
        $scope.homeObj.jobObj.list.data = [];
        var skip = 0;

        $scope.homeObj.jobObj.init = function() {
            $scope.homeObj.jobObj.list.isLoading = true;

            $http.post('/api/site/get-jobs', {
                skip: skip
            }).success(function(response) {
                skip = skip + 20;
                
                $scope.homeObj.jobObj.list.data = response.result;
                $scope.homeObj.jobObj.totalJobs = response.count;
                $scope.homeObj.jobObj.jobsByLocation = response.jobsByLocation;
                
                $timeout(function() {
                    $scope.homeObj.jobObj.list.isLoading = false;
                }, 200);
            });
        }


        $scope.homeObj.jobObj.loadMore = function() {
            $scope.homeObj.jobObj.list.isLoadMore = true;

            $http.post('/api/site/get-jobs', {
                skip: skip
            }).success(function(response) {
                skip = skip + 20;

                if (response.result && response.result.length) {
                    for (var r in response.result) {
                        $scope.homeObj.jobObj.list.data.push(response.result[r]);
                    }
                }

                $scope.homeObj.jobObj.totalJobs = response.count;

                if (response.jobsByLocation && response.jobsByLocation.length) {
                    for (var r in response.jobsByLocation) {
                        $scope.homeObj.jobObj.jobsByLocation.push(response.jobsByLocation[r]);
                    }
                }
                
                $timeout(function() {
                    $scope.homeObj.jobObj.list.isLoadMore = false;
                }, 200);
            });
        }



        



        



        // ---------------------------------------------------------------------
        // Get jobs preview
        // ---------------------------------------------------------------------


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












        // ---------------------------------------------------------------------
        // Apply for job
        // ---------------------------------------------------------------------


        $scope.homeObj.jobObj.applyjob = {};
        $scope.homeObj.jobObj.applyjob.model = {};

        icdb.get('Qualifications', function(response) {
            $scope.homeObj.jobObj.applyjob.qualification = response;
        });

        icdb.get('JobLocations', function(response) {
            $scope.homeObj.jobObj.applyjob.cites = response;
        });


        $scope.homeObj.jobObj.applyjob.openModal = function(jobRow) {
            $scope.homeObj.jobObj.applyjob.model.jobId = jobRow._id;
            $('#confirm-contact').modal('show');
        }

        $scope.homeObj.jobObj.applyjob.closeModal = function() {
            $scope.homeObj.jobObj.applyjob.model = {};
            $scope.homeObj.jobObj.applyjob.isSubmited = false;
            $scope.homeObj.jobObj.applyjob.isReqSent = false;
            $scope.homeObj.jobObj.applyjob.confirmUnique.isSubmited = false;
            $scope.homeObj.jobObj.applyjob.confirmUnique.isReqSent = false;

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