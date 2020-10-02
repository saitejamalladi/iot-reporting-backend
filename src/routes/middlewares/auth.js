const { check } = require('express-validator');
const response = require('../../utils/response');
const authService = require('../../services/auth');
const bcrypt = require('bcrypt');
const constants = require('../../constants');
const SALT_ROUNDS = constants.BCRY_SALT_ROUNDS;

class AuthMiddleware {
	validate (method) {
		switch (method) {
			case constants.AUTH.GENERATE_TOKEN: {
				return [
					check('user_id', 'missing user_id').exists(),
					check('password', 'missing password').exists(),
				]
			}
		}
	}

	async verifyBasicAuthentication (req, res, next) {
		if(req.headers['authorization'] && req.headers['authorization'].startsWith("Basic")) {
			let clientInfo = Buffer.from(req.headers.authorization.split(" ")[1], 'base64').toString();
			if(!clientInfo || clientInfo.split(':').length !== 2 )
				return res.status(401).json(response.handleBadRequest('Missing client details'));
			let clientId = clientInfo.split(':')[0];
			let clientSecret = clientInfo.split(":")[1];
			let clientSecretHash = await bcrypt.hash(clientSecret, SALT_ROUNDS);
			if(await authService.verifyAuthentication(clientId, clientSecret)) {
				next();
			} else {
				res.status(401).send(response.handleUnauthorizedRequest('Invalid credentials'));
			}
		} else {
			res.status(400).send(response.handleBadRequest('Missing credentials'));
		}
	}

	async verifyBearerToken (req, res, next) {
		if(req.headers['authorization']) {
			let token = req.headers['authorization'];
			if (token.startsWith('Bearer ')) {
				// Remove Bearer from string
				token = token.slice(7, token.length);
			}
			let tokenInfo = await authService.getTokenInfo(token);
			if(tokenInfo) {
				req.tokenInfo = tokenInfo;
				let userRole = tokenInfo[constants.USER_ROLE];
				if(constants.ROLES.URL[userRole].includes(req.baseUrl)) {
					next();
				} else {
					return res.status(401).json(response.handleUnauthorizedRequest("You dont have sufficient privilege to access this. Please check with the admin"))
				}
			} else {
				return res.status(401).json(response.handleUnauthorizedRequest("Invalid token"));
			}
		} else {
			return res.status(400).send(response.handleBadRequest('Missing token'));
		}
	}
}

module.exports = new AuthMiddleware();