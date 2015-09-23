var Backbone = require('backparse')({
    appId: 'S6Y7ni0haUcubEj98BcjWPl3lDPaYlVewgl53Prj',
    apiKey: 'E6IQ4vAZa9rfubgL3lpRvm5RXPAmcRm3rAhiWC69',
    apiVersion: 1
});

var _ = require("backbone/node_modules/underscore");

var User = require("../models/UserModel");

module.exports = Backbone.Collection.extend({
	model: User,
	parseClassName: '_User'
});