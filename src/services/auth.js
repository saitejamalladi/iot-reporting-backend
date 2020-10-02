const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const constants = require('../constants');
const config = require('../config');
const SALT_ROUNDS = constants.BCRY_SALT_ROUNDS;
const response = require('../utils/response');
let AppClients = require('../models/users').AppClients;
let UserCredentialsModel = require('../models/users').UserCredentials;

class AuthService {
	async generateToken (auth) {
		let userId = auth['user_id'];
		let password = auth['password'];
		let userDetails = await UserCredentialsModel.findOne({
			where: {
				user_id: userId
			},
			attributes: ['password', 'role'],
			raw: true
		});
		if(userDetails) {
			if(await bcrypt.compare(password, userDetails['password'])) {
				let payload = {};
				payload[constants.USER_ID] = userId;
				payload[constants.USER_ROLE] = userDetails['role'].toUpperCase();
				let token = jwt.sign(payload, config.jwt.secret, {expiresIn: '10m'});
				let responseData = {
					"token": token
				};
				return response.handleSuccessResponseWithData("Access token", responseData);
			}
		}
		return response.handleUnauthorizedRequest("Invalid user credentials");
	};
	async getTokenInfo (token) {
		return new Promise((resolve, reject) => {
			jwt.verify(token, config.jwt.secret, async (error, tokenInfo) => {
				if (error)
					resolve(false);
				else
					resolve(tokenInfo);
			});
		});
	};
	async verifyAuthentication (clientId, clientSecret) {
		let clientInfo = await AppClients.findOne({
			where: {
				client_id: clientId,
				is_deleted: false
			},
			attributes: ['client_secret']
		});
		if(clientInfo)
			return await bcrypt.compare(clientSecret, clientInfo['client_secret']);
		return false;
	};
}
module.exports = new AuthService();