const { validationResult } = require("express-validator");
const userService = require("../services/user");
const response = require("../utils/response");

class UserController {
  async listUsers(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json(response.handleValidationError(errors.array()));
        return;
      }
      let responseObj = await userService.listUsers();
      res.status(responseObj.status_code).json(responseObj);
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = new UserController();
