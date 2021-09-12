const { check } = require("express-validator");
const constants = require("../../constants");

class AccountMiddleware {
  validate(method) {
    switch (method) {
      case constants.VALIDATIONS.CREATE: {
        return [
          check("company_id").custom((value, { req }) => {
            if (req.body.company_id || req.body.parent_account) {
              return true;
            }
            throw new Error("Missing company_id");
          }),
          check("parent_account").custom((value, { req }) => {
            if (req.body.company_id || req.body.parent_account) {
              return true;
            }
            throw new Error("Missing parent_account");
          }),
          check("name", "Missing name").exists(),
        ];
      }
      case constants.VALIDATIONS.UPDATE: {
        return [
          check("name", "Missing name").exists(),
          check("account_id", "Missing account_id").exists(),
        ];
      }
    }
  }
}

module.exports = new AccountMiddleware();
