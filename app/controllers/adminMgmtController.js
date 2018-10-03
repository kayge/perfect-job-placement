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