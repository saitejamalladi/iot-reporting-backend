const elasticsearch = require('elasticsearch');
const config = require('../config');
var client = new elasticsearch.Client({
	host: config.elasticsearch.host,
	httpAuth: config.elasticsearch.username + ':' + config.elasticsearch.password,
	log: 'trace',
	apiVersion: config.elasticsearch.version
});

client.ping({
	// ping usually has a 3000ms timeout
	requestTimeout: 3000
}, function (error) {
	if (error) {
		console.trace('elasticsearch cluster is down!');
	} else {
		console.log('Elastic search connected...........');
	}
});

module.exports = client;