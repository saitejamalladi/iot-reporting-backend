const { check } = require("express-validator");
const constants = require("../../constants");

class ScaleMiddleware {
  validate(method) {
    switch (method) {
      case constants.VALIDATIONS.REGISTER: {
        return [
          check("name", "Missing name").exists(),
          check("serial_num", "Missing email").exists(),
          check("device_id", "Missing device_id").exists(),
        ];
      }
      case constants.VALIDATIONS.UPDATE: {
        return [
          check("name", "Missing name").exists(),
          check("serial_num", "Missing email").exists(),
          check("scale_id", "Missing scale_id").exists(),
        ];
      }
    }
  }
}

module.exports = new ScaleMiddleware();
