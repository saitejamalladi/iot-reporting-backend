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
      let responseObj = await userService.register(req.body);
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
        req.tokenInfo[constants.ACCOUNT_ID]
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
      let responseObj = await userService.listUsers();
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
        req.tokenInfo[constants.ACCOUNT_ID]
      );
      res.status(responseObj.status_code).json(responseObj);
    } catch (err) {
      return next(err);
    }
  }
  async listUserRoles(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json(response.handleValidationError(errors.array()));
        return;
      }
      let responseObj = await userService.listUserRoles();
      res.status(responseObj.status_code).json(responseObj);
    } catch (err) {
      return next(err);
    }
  }
  async listAccounts(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json(response.handleValidationError(errors.array()));
        return;
      }
      let responseObj = await userService.listAccounts();
      res.status(responseObj.status_code).json(responseObj);
    } catch (err) {
      return next(err);
    }
  }
  async listAccountRoles(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json(response.handleValidationError(errors.array()));
        return;
      }
      let responseObj = await userService.listAccountRoles();
      res.status(responseObj.status_code).json(responseObj);
    } catch (err) {
      return next(err);
    }
  }
  async listBins(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json(response.handleValidationError(errors.array()));
        return;
      }
      let responseObj = await userService.listBins();
      res.status(responseObj.status_code).json(responseObj);
    } catch (err) {
      return next(err);
    }
  }
  async listCategories(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json(response.handleValidationError(errors.array()));
        return;
      }
      let responseObj = await userService.listCategories();
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
  async listDevices(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json(response.handleValidationError(errors.array()));
        return;
      }
      let responseObj = await userService.listDevices();
      res.status(responseObj.status_code).json(responseObj);
    } catch (err) {
      return next(err);
    }
  }
  async listLocations(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json(response.handleValidationError(errors.array()));
        return;
      }
      let responseObj = await userService.listLocations();
      res.status(responseObj.status_code).json(responseObj);
    } catch (err) {
      return next(err);
    }
  }
  async listMealCount(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json(response.handleValidationError(errors.array()));
        return;
      }
      let responseObj = await userService.listMealCount();
      res.status(responseObj.status_code).json(responseObj);
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = new UserController();
