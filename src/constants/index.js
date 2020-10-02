const auth = require('./auth');
const roles = require('./roles');
const user = require('./user');

module.exports = {
	BCRY_SALT_ROUNDS: 10,
	USER_ID: "USER_ID",
	USER_ROLE: "USER_ROLE",
	AUTH: auth,
	USER: user,
	ROLES: roles
};