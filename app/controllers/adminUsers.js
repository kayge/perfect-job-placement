'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    hbs = require('hbs'),
    async = require('async'),
    helperCTRL = require('./helper');







/**
 * Logout
 */
exports.signout = function(req, res) {

    if (res.session && res.session.user) {
        res.session.user = undefined;
    }

    req.session = null;
    res.redirect('/');
};




/**
 * Send User
 */
exports.me = function(req, res) {
    res.json(req.user || null);
};



/**
 * Register
 */
exports.register = function(req, res) {

    var userModel = mongoose.model('AdminUsers');

    req.body.email = req.body.email.toLowerCase();
    req.body.createdAt = new Date().getTime();

    var user = new userModel(req.body);

    user.save(function(err, userResponse) {
        if (err) {
            res.json({status: false});
            return;    
        }
        res.json({status: true});
    });
}



/**
 * Login
 */
exports.login = function(req, res) {
    var userModel = mongoose.model('AdminUsers');

    userModel.findOne({
        email: req.body.email.toLowerCase(),
        password: req.body.password,
    }).exec(function(err, result) {

        if (err) {
            res.json({
                status: false
            });
            return;
        }

        if (result && result._id) {
            req.session.user = result;
            res.json({
                status: true,
                result: result
            });
            return;
        }

        res.json({
            status: false,
        });
        return;
    });
}



/**
 * Forgot Password
 */
exports.forgotPassword = function(req, res) {
    var ourClients = mongoose.model('OurClients');

    ourClients.findOne({
        email: req.body.email.toLowerCase()
    }).exec(function(err, result) {

        if (err) {
            res.json({
                status: 1
            });
            return;
        }

        if (result && result._id) {
            let newPassword = '123';

            let htmlData = ('<table>').toString()
                .concat('<tr>')
                    .concat('<td style="font-weight: bold;">Email</td><td>&nbsp;&nbsp;:&nbsp;&nbsp;</td>')
                    .concat('<td>').concat(req.body.email).concat('</td>')
                .concat('</tr>')
                .concat('<tr>')
                    .concat('<td style="font-weight: bold;">New Password</td><td>&nbsp;&nbsp;:&nbsp;&nbsp;</td>')
                    .concat('<td>').concat(newPassword).concat('</td>')
                .concat('</tr>')
            .concat('</table>');

            const template = hbs.compile(htmlData);
            const compiledHTML = template({
                host: req.headers.host
            });

            helperCTRL.sendMail({
                to: req.body.email,
                from: 'hrd.pjob@gmail.com',
                subject: 'Forgot Password',
                html: compiledHTML
            }, (mailError, mailResponse) => {
                if (mailError) {
                    return res.json({
                        status: false,
                        msg: 'Problem into email send'
                    });
                }

                ourClients.update({
                     email: req.body.email.toLowerCase()
                }, {
                    password: newPassword
                } ).exec(function(err, result) {});

                return res.json({
                    status: 2
                });
            });
            return;
        }

        res.json({
            status: 3,
        });
        return;
    });
}



/**
 * Change Password
 */
exports.changePassword = function(req, res) {
    var ourClients = mongoose.model('OurClients');

    ourClients.update({
        _id: req.body._id
    }, {
        password: req.body.password
    }).exec(function(err, result) {

        if (err) {
            res.json({
                status: false
            });
            return;
        }

        req.session.user.password = req.body.password;

        res.json({
            status: true,
        });
        return;
    });
}




/**
 * Get Count
 */
exports.getDbCount = function(req, res) {
    var siteVisitor = mongoose.model('SiteVisitor');
    var dubscribedUser = mongoose.model('SubscribedUser');
    var ourClients = mongoose.model('OurClients');
    var candidateRegister = mongoose.model('CandidateRegister');
    var jobsBazaar = mongoose.model('JobsBazaar');


    async.parallel({
        getSiteVisitor: function(callback) {
            siteVisitor.find({}).count(function(err, count) {
                callback(null, count)
            });
        },
        getSubscribedUser: function(callback) {
            dubscribedUser.find({}).count(function(err, count) {
                callback(null, count)
            });
        },
        getOurClients: function(callback) {
            ourClients.find({}).count(function(err, count) {
                callback(null, count)
            });
        },
        getCandidateRegister: function(callback) {
            candidateRegister.find({}).count(function(err, count) {
                callback(null, count)
            });
        },
        getJobsBazaar: function(callback) {
            jobsBazaar.find({ status: 2 }).count(function(err, count) {
                callback(null, count)
            });
        }
    }, function(err, results) {
        res.json(results);
    });
}