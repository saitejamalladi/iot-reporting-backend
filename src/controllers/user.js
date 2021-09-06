const { validationResult } = require("express-validator");
const userService = require("../services/user");
const response = require("../utils/response");
const constants = require("../constants");

class UserController {
  async register(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json(response.handleValidationError(errors.array()));
        return;
      }
      let responseObj = await userService.register(
        req.body,
        req.tokenInfo[constants.ACCOUNT_ID]
      );
      res.status(responseObj.status_code).json(responseObj);
    } catch (err) {
      return next(err);
    }
  }
  async update(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json(response.handleValidationError(errors.array()));
        return;
      }
      let responseObj = await userService.update(
        req.body,
        req.tokenInfo[constants.USER_ID]
      );
      res.status(responseObj.status_code).json(responseObj);
    } catch (err) {
      return next(err);
    }
  }
  async resetPassword(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json(response.handleValidationError(errors.array()));
        return;
      }
      let responseObj = await userService.resetPassword(req.body);
      res.status(responseObj.status_code).json(responseObj);
    } catch (err) {
      return next(err);
    }
  }
  async listUsers(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json(response.handleValidationError(errors.array()));
        return;
      }
      let responseObj = await userService.listUsers(
        req.tokenInfo[constants.ACCOUNT_ID]
      );
      res.status(responseObj.status_code).json(responseObj);
    } catch (err) {
      return next(err);
    }
  }
  async getInfo(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json(response.handleValidationError(errors.array()));
        return;
      }
      let responseObj = await userService.getInfo(
        req.tokenInfo[constants.USER_ID]
      );
      res.status(responseObj.status_code).json(responseObj);
    } catch (err) {
      return next(err);
    }
  }
  async listCompanies(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json(response.handleValidationError(errors.array()));
        return;
      }
      let responseObj = await userService.listCompanies();
      res.status(responseObj.status_code).json(responseObj);
    } catch (err) {
      return next(err);
    }
  }
  async listPermissions(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json(response.handleValidationError(errors.array()));
        return;
      }
      let responseObj = await userService.listPermissions(
        req.tokenInfo[constants.ROLES]
      );
      res.status(responseObj.status_code).json(responseObj);
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = new UserController();
