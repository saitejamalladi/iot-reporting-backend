const { check } = require("express-validator");
const constants = require("../../constants");

class MealCountMiddleware {
  validate(method) {
    switch (method) {
      case constants.VALIDATIONS.UPDATE: {
        return [
          check("account_id", "Missing name").exists(),
          check("category", "Missing name").exists(),
          check("service", "Missing name").exists(),
          check("benchmark", "Missing benchmark").exists(),
          check("benchmark", "invalid benchmark").isDecimal(),
        ];
      }
    }
  }
}

module.exports = new MealCountMiddleware();
