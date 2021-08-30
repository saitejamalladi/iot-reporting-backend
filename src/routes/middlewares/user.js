const { check } = require("express-validator");
const constants = require("../../constants");

class UserMiddleware {
  validate(method) {
    switch (method) {
      case constants.VALIDATIONS.REGISTER: {
        return [
          check("first_name", "Missing first_name").exists(),
          check("last_name", "Missing last_name").exists(),
          check("email", "Missing email").exists(),
          check("email", "Invalid email").isEmail(),
          check("address", "Missing address").exists(),
          check("address2", "Missing address2").exists(),
          check("username", "Missing username").exists(),
          check("password", "missing password").exists(),
          check("confirm_password").custom((value, { req }) => {
            if (value === req.body.password) {
              return true;
            }
            throw new Error("confirm_password does not match password");
          }),
          check(
            "password",
            "password doesn`t meet the password complexity policy (min 5, max 15)"
          ).isLength({ min: 5, max: 15 }),
        ];
      }
      case constants.VALIDATIONS.UPDATE: {
        return [
          check("first_name", "Missing first_name").exists(),
          check("last_name", "Missing last_name").exists(),
          check("address", "Missing address").exists(),
          check("address2", "Missing address2").exists(),
          check("email", "Missing email").exists(),
          check("email", "Invalid email").isEmail(),
        ];
      }
      case constants.VALIDATIONS.RESET_PASSWORD: {
        return [
          check("username", "Missing username").exists(),
          check("password", "missing password").exists(),
          check("confirm_password").custom((value, { req }) => {
            if (value === req.body.password) {
              return true;
            }
            throw new Error("confirm_password does not match password");
          }),
          check(
            "password",
            "password doesn`t meet the password complexity policy (min 5, max 15)"
          ).isLength({ min: 5, max: 15 }),
        ];
      }
    }
  }
}

module.exports = new UserMiddleware();
