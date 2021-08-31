const roles = require("./roles");
const validations = require("./validations");

module.exports = {
  BCRYPT_SALT_ROUNDS: 10,
  USERNAME: "USERNAME",
  ACCOUNT_ID: "ACCOUNT_ID",
  ACCOUNT_NAME: "ACCOUNT_NAME",
  USER_ID: "USER_ID",
  VALIDATIONS: validations,
  ROLES: roles,
};
