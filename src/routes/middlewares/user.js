const { check } = require("express-validator");
const moment_tz = require("moment-timezone");
const constants = require("../../constants");

class UserMiddleware {
  validate(method) {
    switch (method) {
      case constants.VALIDATIONS.CREATE: {
        return [
          check("name", "Missing name").exists(),
          check("email", "Missing email").exists(),
          check("email", "Invalid email").isEmail(),
          check("phone_number", "Missing phone_number").exists(),
          check("phone_number", "Invalid phone_number").isInt(),
          check("country_code", "Missing country_code").exists(),
          check("country_code", "Invalid country_code").isInt(),
          check("password", "missing password").exists(),
          check("confirm_password").custom((value, { req }) => {
            if (value === req.body.password) {
              return true;
            }
            throw new Error("confirm_password does not match password");
          }),
          check(
            "password",
            "password doesn`t meet the password complexity policy"
          ).isLength({ min: 5, max: 15 }),
          check("timezone").custom((value, { req }) => {
            if (!req.body.timezone || moment_tz.tz.zone(req.body.timezone)) {
              return true;
            }
            throw new Error("invalid timezone");
          }),
        ];
      }
    }
  }
}

module.exports = new UserMiddleware();
