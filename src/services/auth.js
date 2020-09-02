const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const constants = require('../constants');
const config = require('../config');
const SALT_ROUNDS = constants.BCRY_SALT_ROUNDS;
const response = require('../utils/response');

const generateToken = async (auth) => {
	let userId = auth['user_id'];
	let password = auth['password'];
	let storedPassword = await bcrypt.hash("Idm@1234", SALT_ROUNDS);
	if(await bcrypt.compare(password, storedPassword)) {
		let payload = {};
		payload[constants.USER_ID] = userId;
		if(userId === 'admin')
			payload[constants.USER_ROLE] = constants.ROLES.ADMIN;
		else
			payload[constants.USER_ROLE] = constants.ROLES.CUSTOMER;
		let token = jwt.sign(payload, config.jwt.secret, { expiresIn: '10m'});
		let responseData = {
			"token": token
		};
		return response.handleSuccessResponseWithData("Access token", responseData);
	} else {
		return response.handleUnauthorizedRequest("Invalid user credentials");
	}
};
const getTokenInfo = (token) => {
	return new Promise((resolve, reject) => {
		jwt.verify(token, config.jwt.secret, async (error, tokenInfo) => {
			if (error)
				reject(false);
			resolve(tokenInfo);
		});
	});
};
const verifyAuthentication = async (clientId, clientSecret) => {
	let savedSecretHash = await bcrypt.hash('teja', SALT_ROUNDS);
	return await bcrypt.compare(clientSecret, savedSecretHash);
};

module.exports = {
	generateToken: generateToken,
	verifyAuthentication: verifyAuthentication,
	getTokenInfo: getTokenInfo
};