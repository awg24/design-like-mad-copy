var Backbone = require("backbone");

module.exports = Backbone.Model.extend({
	defaults: {
		members: null,
		name: null,
		password: null,
		adminUser: null
	},
	idAtrribute: "id",
	parseClassname: "Organization"
});