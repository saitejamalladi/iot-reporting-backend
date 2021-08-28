const { validationResult } = require("express-validator");
const deviceService = require("../services/device");
const response = require("../utils/response");
const constants = require("../constants");

class DeviceController {
  async list(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json(response.handleValidationError(errors.array()));
        return;
      }
      let responseObj = await deviceService.list(
        req.tokenInfo[constants.ACCOUNT_ID]
      );
      res.status(responseObj.status_code).json(responseObj);
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = new DeviceController();
