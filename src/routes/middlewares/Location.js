const { check } = require("express-validator");
const constants = require("../../constants");

class LocationMiddleware {
  validate(method) {
    switch (method) {
      case constants.VALIDATIONS.CREATE: {
        return [
            check("location", "Missing location").exists()
        ];
      }
      case constants.VALIDATIONS.DELETE: {
        return [
          check("location", "Missing location").exists(),
        ];
      }
    }
  }
}

module.exports = new LocationMiddleware();