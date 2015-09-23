var Backbone = require('backparse')({
    appId: 'S6Y7ni0haUcubEj98BcjWPl3lDPaYlVewgl53Prj',
    apiKey: 'E6IQ4vAZa9rfubgL3lpRvm5RXPAmcRm3rAhiWC69',
    apiVersion: 1
});
var validator = require("validator");
var _ = require("backbone/node_modules/underscore");

module.exports = Backbone.Model.extend({
	defaults: {
		ApplicantId: null,
		username: null,
		OrganizerId: null,
		rating: null
	},
	idAttribute: "objectId",
	parseClassName: "UserOrganizerRelation"
});