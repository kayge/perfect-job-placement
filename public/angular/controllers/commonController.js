'use strict';

appModule.controller('CommonController', ['$scope', '$http', '$location', '$uibModal', '$stateParams', '$rootScope', '$timeout', '$state', 'icdb', 'alertService',
    function($scope, $http, $location, $uibModal, $stateParams, $rootScope, $timeout, $state, icdb, alertService) {

        $scope.comnObj = {};
        $rootScope.g.adminData = globalObj;



        // -------------- Common vars -------------------





        // ---------- Get Subscription -------------------
    	$rootScope.g.getSubscription = function(email) {
            if (!email) {
                return;
            }

            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!re.test(String(email).toLowerCase())) {
                alertService.flash('error', 'Email not valid.');
                return;
            }

            $http.post('/api/user/subscribed', {
                email: email
            }).success(function(response) {
                
                $rootScope.g.scontact = '';

                if (response.status == 1) {
                    alertService.flash('error', 'Something is wrong.');
                }
                if (response.status == 2) {
                    alertService.flash('error', 'Emial already subscribed!');
                }
                if (response.status == 3) {
                    alertService.flash('success', 'Emial has been subscribed successfully.');
                }
            });
        }







        // -------------- Init Site Settings -------------------
        $scope.comnObj.siteSettings = {};

        $scope.comnObj.siteSettings.init = function() {
            icdb.get('AppConfig', function(response) {
                $scope.comnObj.siteSettings.data = {};
                $scope.comnObj.siteSettings.data = response[0];
            });            
        }
        $scope.comnObj.siteSettings.init();

	}
]);