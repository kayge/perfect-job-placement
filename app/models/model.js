'use strict';

var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema;


var AppConfig = new Schema({
	appTitle: String,
	headerTitle: String,
	appTagline: String,
	helpContact1: String,
	helpContact2: String,
	officeC1: String,
	officeC2: String,
	officeEmail: String,
	hrContact1: String,
	hrContact2: String,
	hrContactEmail: String,
	createdAt: Number,
	headerTotalJob: String,
	Address: String,
	appleAppLink: String,
	androidAppLink: String,
	googleLink: String,
	facebookLink: String,
	instaLink: String,
	linkedinLink: String,
	whatsAppinLink: String,
});


var OurTeam = new Schema({
	fullname: String,
	position: String,
	mobile: Number,
	email: String,
	photo: String,
	fblink: String,
	twitterlink: String,
	linkedinlink: String,
});

var AdminUsers = new Schema({
	firstName: String,
	lastName: String,
	email: String,
	password: String,
	createdAt: Number,
	isActive: {type: Boolean, default: true},
});

var Inquiry = new Schema({
	type: String,
	name: String,
	email: String,
	contact: String,
	subject: String,
	message: String,
	createdAt: Number,
	isRead: {type: Boolean, default: false},
	status: {type: Boolean, default: false},
});

var CandidateRegister = new Schema({
	name: String,
	email: String,
	image: String,
	resume: String,
	mobile: String,
	wpContact: String,
	gender: Boolean,
	city: String,
	currentLocation: String,
	birthDate: String,
	qualifiction: String,
	department: String,
	areaOfInterest: [],
	expectedSalary: String,
	experience: Boolean,
	jobId: String,
	experienceDetail: [],
	createdAt: Number,
	status: {type: Boolean, default: false},
});

var TrackUniqueContact = new Schema({
	jobId: String,
	contact: String,
	createdAt: Number,
	status: {type: Boolean, default: false},
});

var JobsBazaar = new Schema({
	jobTitle: String,
	notes: String,
	image: String,
	attachments: [],
	jobWorkType: String,
	qualification: String,
	candidateType: Number,
	jobPosition: String,
	workProfile: String,
	department: [],
	cexpRequired: String,
	salaryType: String,
	salary: String,
	jobCity: String,
	jobLocation: String,
	jobTiming: String,
	facility: String,
	jobCategory: String,
	userId: String,
	numbersOfCandidatesRequired: Number,
	interviewDateFrom: Date,
	interviewDateTo: Date,
	requiredDoc: [],
	createdAt: Number,
	status: {type: Number, default: 1}
});

mongoose.model('Inquiry', Inquiry);
mongoose.model('JobsBazaar', JobsBazaar);
mongoose.model('CandidateRegister', CandidateRegister);
mongoose.model('TrackUniqueContact', TrackUniqueContact);
mongoose.model('AppConfig', AppConfig);
mongoose.model('OurTeam', OurTeam);
mongoose.model('AdminUsers', AdminUsers);






var OurClients = new Schema({
	companyName: String,
	contactPersonName: String,
	email: String,
	password: String,
	contact: Number,
	wpContact: Number,
	address: String,
	companyWebsite: String,
	isActive: {type: Boolean, default: true},
	createdAt: Number
});

mongoose.model('OurClients', OurClients);





var QualificationSchema = new Schema({
	name: String,
	qualifyIn: String,
	status: {type: Boolean, default: false}
});

var AreaOfInterestSchema = new Schema({
	title: String,
	department: String,
	status: {type: Boolean, default: false}
});

var JobLocations = new Schema({
	city: String,
	status: {type: Boolean, default: false}
});

var SiteVisitorSchema = mongoose.Schema({
    session_id: String,
    site_mgmt_id: String,
    ip_address: String,

    user_id: String,
    timestamp: Number,
    user_agent: {},

    country: String,
    region: String,
    areaCode: String,
    countryCode: String,
    latitude: String,
    longitude: String,
    continentCode: String,
});

var SubscribedUser = new Schema({
	email: String,
	createdAt: Number,
	status: {type: Boolean, default: true},
});


mongoose.model('Qualifications', QualificationSchema);
mongoose.model('AreaOfInterest', AreaOfInterestSchema);
mongoose.model('JobLocations', JobLocations);
mongoose.model('SiteVisitor', SiteVisitorSchema);
mongoose.model('SubscribedUser', SubscribedUser);