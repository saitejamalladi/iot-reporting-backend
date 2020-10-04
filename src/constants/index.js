const roles = require('./roles');
const validations = require('./validations');

module.exports = {
	BCRY_SALT_ROUNDS: 10,
	USER_ID: "USER_ID",
	USER_ROLE: "USER_ROLE",
	VALIDATIONS: validations,
	ROLES: roles
};