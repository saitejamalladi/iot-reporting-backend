const auth = require('./auth');
const roles = require('./roles');
const users = require('./users');

module.exports = {
	BCRY_SALT_ROUNDS: 10,
	USER_ID: "USER_ID",
	USER_ROLE: "USER_ROLE",
	AUTH: auth,
	USER: users,
	ROLES: roles
};