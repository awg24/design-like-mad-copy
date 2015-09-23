var Backbone = require('backparse')({
    appId: 'S6Y7ni0haUcubEj98BcjWPl3lDPaYlVewgl53Prj',
    apiKey: 'E6IQ4vAZa9rfubgL3lpRvm5RXPAmcRm3rAhiWC69',
    apiVersion: 1
});

var NonProfit = require("../models/NonProfitModel");

module.exports = Backbone.Collection.extend({
	model: NonProfit,
	parseClassName: 'NonProfit'
});