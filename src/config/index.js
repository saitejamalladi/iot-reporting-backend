const mailer = require('./mailer');

module.exports = {
	app_host: process.env.APP_HOST,
	jwt: {
		secret: process.env.JWT_SIGNING_KEY
	},
	mailer: mailer,
	sql: {
		database: process.env.DB_NAME,
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		username: process.env.DB_USER,
		password: process.env.DB_PASS
	},
	elasticsearch: {
		version: process.env.ELASTIC_SEARCH_VERSION,
		host: process.env.ELASTIC_SEARCH_HOST,
		username: process.env.ELASTIC_SEARCH_USERNAME,
		password: process.env.ELASTIC_SEARCH_PASSWORD
	}
};