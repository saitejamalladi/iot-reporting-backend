const { check } = require("express-validator");
const constants = require("../../constants");

class BinMiddleware {
  validate(method) {
    switch (method) {
      case constants.VALIDATIONS.CREATE: {
        return [
          check("name", "Missing name").exists(),
          check("weight", "Missing weight").exists(),
          check("weight", "Invalid weight").isNumeric(),
          check("max_weight", "Missing max_weight").exists(),
          check("max_weight", "Invalid max_weight").isNumeric(),
        ];
      }
      case constants.VALIDATIONS.UPDATE: {
        return [
          check("name", "Missing name").exists(),
          check("weight", "Missing weight").exists(),
          check("weight", "Invalid weight").isNumeric(),
          check("max_weight", "Missing max_weight").exists(),
          check("max_weight", "Invalid max_weight").isNumeric(),
        ];
      }
    }
  }
}

module.exports = new BinMiddleware();
