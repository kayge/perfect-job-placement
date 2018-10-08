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
exports.getDataWithCondition = function(req, res) {

	if (!req.body.model) {
		res.json([]);
		return;
	}

	var commonModel = mongoose.model(req.body.model);

	commonModel.find(req.body.condition).sort({ createdAt: -1 }).limit(15).skip(req.body.skip).exec(function(err, responseData) {

		if(err) {
			res.json({
				status: false,
				count: 0,
				data: []
			});
			return;
		}

		commonModel.find(req.body.condition).count(function(err, count) {
			res.json({ 
				status: true,
				data: responseData,
				count: count,
			});
			return;
		});
	});
};




/**
 * Get job list with user data
 */
exports.getJobList = function(req, res) {


	//
	var JobsBazaarModel = mongoose.model('JobsBazaar');
	var TrackUniqueContactModel = mongoose.model('TrackUniqueContact');
	var CandidateRegister = mongoose.model('CandidateRegister');
	var jobIds = [];


	//
	JobsBazaarModel.find({ status: { $ne: 3 }}).exec(function(err, responseData) {


		//
		if(err) {
			res.json({
				status: false,
				data: []
			});
			return;
		}

		res.json({
			status: true,
			data: responseData
		});

		return;


		//
		var getUserDatail = function(contactNumber, callback) {
			CandidateRegister.find({ mobile: { $in: contactNumber }}, {
				name: true,
				mobile: true,
				qualifiction: true,
				city: true,
				gender: true,
				experience: true,
			}).exec(function(err, caRes) {
				callback(caRes);
			});
		}


		//
		if (responseData.length) {

			responseData = JSON.parse(JSON.stringify(responseData));
			var dCount = 0;
			
			//
			var loopFunction = function() {

				if (responseData.length > dCount) {

					TrackUniqueContactModel.find({ jobId:  responseData[dCount]._id }).exec(function(err, trackData) {

						var contacts = [];

						for (var td in trackData) {
							contacts.push(trackData[td].contact);
						}

						if (contacts.length) {
							getUserDatail(contacts, function(cbres1) {
								responseData[dCount].jobPoster = cbres1;
								dCount = dCount + 1;
								loopFunction();
							});
						} else {
							dCount = dCount + 1;
							loopFunction();
						}
					});
				} else {
					res.json({ 
						status: true,
						data: responseData,
					});
				}
			}

			loopFunction();

			return;
		}


		//
		res.json({
			status: false,
			data: []
		});
	});
};