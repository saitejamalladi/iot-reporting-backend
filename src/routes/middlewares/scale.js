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
          check("location","Missing location").exists(),
        ];
      }
      case constants.VALIDATIONS.UPDATE: {
        return [
          check("name", "Missing name").exists(),
          check("serial_num", "Missing email").exists(),
          check("scale_id", "Missing scale_id").exists(),
        ];
      }
      case constants.VALIDATIONS.ADD_DATA: {
        return [
          check("scale_id", "Missing scale_id").exists(),
          check("bin_id", "Missing bin_id").exists(),
          check("gross_weight", "Missing gross_weight").isNumeric(),
          check("net_weight", "Missing net_weight").isNumeric(),
          check("service", "Missing service").exists(),
          check("category", "Missing category").exists(),
          check("sub_category1", "Missing sub_category1").exists(),
          check("sub_category2", "Missing sub_category2").exists(),
          check("location", "Missing location").exists(),
          check("service_waste", "Missing service_waste").exists(),
        ];
      }
    }
  }
}

module.exports = new ScaleMiddleware();
