'use strict';

var express = require('express');
var router = express.Router();
var cors = require('cors');


var ctrl = {
    home: require('../controllers/home'),
    common: require('../controllers/common'),
    siteMgmt: require('../controllers/siteMgmt'),
    users: require('../controllers/users'),
    adminUsers: require('../controllers/adminUsers'),
    suerDashboard: require('../controllers/userDashboardController')
};




// define the home page route
router.get('/', ctrl.home.index);
router.get('/admin', ctrl.home.index1);


// Common routes
router.post('/api/common/add-data', ctrl.common.postAddData);
router.post('/api/common/get-data', ctrl.common.getData);
router.post('/api/common/get-condition', ctrl.common.getCondition);
router.post('/api/common/single-data', ctrl.common.getSingle);
router.post('/api/common/edit-data', ctrl.common.getEditData);
router.post('/api/common/delete', ctrl.common.getDeleteData);


router.post('/api/site/user-visitor', ctrl.common.siteVisitor);


// Auth routes
router.post('/api/user/register', ctrl.users.register);
router.post('/api/user/login', ctrl.users.login);
router.post('/api/user/subscribed', ctrl.users.subscribed);
router.post('/api/user/forgot-pass', ctrl.users.forgotPassword);
router.post('/api/user/change-pass', ctrl.users.changePassword);
router.get('/users/me', ctrl.users.me);
router.get('/users/signout', ctrl.users.signout);

// Admin Route
router.post('/api/admin-user/register', ctrl.adminUsers.register);
router.post('/api/admin-user/login', ctrl.adminUsers.login);
router.get('/api/admin/get/dashboard-counts', ctrl.adminUsers.getDbCount);



// Other routes
router.post('/api/site/get-jobs', ctrl.siteMgmt.getCurrentJobs);
router.post('/api/site/get-jobsby-filter', ctrl.siteMgmt.getJobsByFilter);



// User dashboars
router.post('/api/v1/get-client-jobs', ctrl.suerDashboard.getAllJobs);



module.exports = router;
