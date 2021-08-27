const { check } = require("express-validator");
const constants = require("../../constants");

class AccountMiddleware {
  validate(method) {
    switch (method) {
      case constants.VALIDATIONS.CREATE: {
        return [
          check("company_id", "Missing company_id").exists(),
          check("name", "Missing name").exists(),
          check("parent_account", "Missing parent_account").exists(),
        ];
      }
    }
  }
}

module.exports = new AccountMiddleware();
