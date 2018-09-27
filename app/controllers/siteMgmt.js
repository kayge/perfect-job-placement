'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	async = require('async'),
	uid = require('uid'),
	helperCTRL = require('./helper');




/**
 *
 */
exports.getCurrentJobs = function(req, res) {

	var jobsModel = mongoose.model('JobsBazaar');
	var cityModel = mongoose.model('JobLocations');

	var finalRes = function(result, byCity) {

		jobsModel.countDocuments({ status: 2 }).exec(function(err, count) {
			res.json({
				result: result,
				jobsByLocation: byCity,
				count: count
			});
        });
	}


	jobsModel.find({
		status: 2
	}).skip(req.body.skip).limit(20).exec(function(err, jobResponse) {

		if (jobResponse && jobResponse.length) {
			jobResponse = JSON.parse(JSON.stringify(jobResponse));

			var cities = [];
			for (var i in jobResponse) {
				cities.push(jobResponse[i].jobCity);
			}

			cityModel.find({
				_id: { $in: cities }
			}, {
				city: true
			}).exec(function(err, cityRes) {

				for (var j in cityRes) {
					for (var i in jobResponse) {
						if (jobResponse[i].jobCity == cityRes[j]._id) {
							jobResponse[i].cityName = cityRes[j].city;
							jobResponse[i].cityId = cityRes[j]._id;
						}
					}
				}

				var byCity = [];
				var byCity1 = [];
				for (var row in jobResponse) {
					if (!byCity[jobResponse[row].jobCity]) {
						byCity[jobResponse[row].jobCity] = {
							_id: jobResponse[row].cityId,
							city: jobResponse[row].cityName,
							count: 1
						};
					} else {
						byCity[jobResponse[row].jobCity].count += 1;
					}
				}

				for (var row in byCity) {
					byCity1.push(byCity[row]);
				}
				
				finalRes(jobResponse, byCity1);
			});
		} else{
			finalRes(jobResponse);
		}
	});
};




/**
 *
 */
exports.getJobsByFilter = function(req, res) {

	var jobsModel = mongoose.model('JobsBazaar');
	var cityModel = mongoose.model('JobLocations');
	
	req.body.condition.status = 2;

	var finalRes = function(result) {

		jobsModel.countDocuments(req.body.condition).exec(function(err, count) {
			res.json({
				result: result,
				count: count
			});
        });
	}

	jobsModel.find(req.body.condition).skip(req.body.skip).limit(20).exec(function(err, jobResponse) {
		if (jobResponse && jobResponse.length) {
			jobResponse = JSON.parse(JSON.stringify(jobResponse));

			var cities = [];
			for (var i in jobResponse) {
				cities.push(jobResponse[i].jobCity);
			}

			cityModel.find({
				_id: { $in: cities }
			}, {
				city: true
			}).exec(function(err, cityRes) {

				for (var j in cityRes) {
					for (var i in jobResponse) {
						if (jobResponse[i].jobCity == cityRes[j]._id) {
							jobResponse[i].cityName = cityRes[j].city;
							jobResponse[i].cityId = cityRes[j]._id;
						}
					}
				}
				
				finalRes(jobResponse);
			});
		} else{
			finalRes(jobResponse);
		}
	});
};