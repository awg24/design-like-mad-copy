var Backbone = require('backparse')({
    appId: 'S6Y7ni0haUcubEj98BcjWPl3lDPaYlVewgl53Prj',
    apiKey: 'E6IQ4vAZa9rfubgL3lpRvm5RXPAmcRm3rAhiWC69',
    apiVersion: 1
});
var validator = require("validator");
var _ = require("backbone/node_modules/underscore");


module.exports = Backbone.Model.extend({
	defaults: {
		name: null,
		email: null,
		username: null,
		password: null,
		portfolioUrl: null,
		userType: null,
		designerType: null,
		skillRating: null,
		developerLinks: null,
		tshirtSize: null,
		additionalSkills: null,
		additionalComments: null,
		phoneNum: null,
		userEdu:null

	},
	validate: function(attr){
		var errors = {};
		if(!attr.name){
			errors.name =  "Field must not be blank";
		}
		if(!attr.email){
			errors.email =  "Field must not be blank";
		} else if(!validator.isEmail(attr.email)){
			errors.email =  "Not a valid email address";
		}
		if(!attr.username){
			errors.username =  "Field must not be blank";
		} else if(!validator.isAlphanumeric(attr.username)){
			errors.username =  "Username must only contain numbers and letters";
		}
		if(!attr.password){
			errors.password =  "Field must not be blank";
		} else if(attr.password.length < 4){
			errors.password = "Password must be longer 3 characters!"
		}
		if(!attr.userType){
			errors.userType =  "Type must be declared";
		}

		if(_.isEmpty(errors)){
			return false;
		} else {
			return errors;
		}

	},
	idAttribute: "objectId",
	parseClassName: "_User",
	isUser: true
});
