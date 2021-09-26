const { validationResult } = require("express-validator");
const mealCountService = require("../services/mealcount");
const constants = require("../constants");
const response = require("../utils/response");

class MealCountController {
  async create(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json(response.handleValidationError(errors.array()));
        return;
      }
      let responseObj = await mealCountService.create(
        req.body,
        req.tokenInfo[constants.USER_ID]
      );
      res.status(responseObj.status_code).json(responseObj);
    } catch (err) {
      return next(err);
    }
  }
  async list(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json(response.handleValidationError(errors.array()));
        return;
      }
      let responseObj = await mealCountService.list(
        req.tokenInfo[constants.ACCOUNT_ID]
      );
      res.status(responseObj.status_code).json(responseObj);
    } catch (err) {
      return next(err);
    }
  }
  async delete(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json(response.handleValidationError(errors.array()));
        return;
      }
      let responseObj = await mealCountService.delete(req.params["meal_count_id"]);
      res.status(responseObj.status_code).json(responseObj);
    } catch (err) {
      return next(err);
    }
  }
  async listBenchmark(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json(response.handleValidationError(errors.array()));
        return;
      }
      let responseObj = await mealCountService.listBenchmark(
        req.tokenInfo[constants.ACCOUNT_ID]
      );
      res.status(responseObj.status_code).json(responseObj);
    } catch (err) {
      return next(err);
    }
  }
  async updateBenchmark(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json(response.handleValidationError(errors.array()));
        return;
      }
      let responseObj = await mealCountService.updateBenchmark(req.body);
      res.status(responseObj.status_code).json(responseObj);
    } catch (err) {
      return next(err);
    }
  }

}

module.exports = new MealCountController();
