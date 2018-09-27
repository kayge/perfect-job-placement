var uid = require('uid');

/**
 * Game Starter route '/'
 */
exports.index = function(req, res) {
	var userId = '';

	if(req.session && req.session.user && req.session.user._id) {
		userId = req.session.user._id;
	}

	res.render('siteLayout', {
		userId: userId
    });
}

exports.index1 = function(req, res) {
	var userId = '';

	if(req.session && req.session.user && req.session.user._id) {
		userId = req.session.user._id;
	}

    res.render('adminIndex', {
		userId: userId
    });
}
