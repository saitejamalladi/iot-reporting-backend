const { validationResult } = require("express-validator");
const scaleService = require("../services/scale");
const response = require("../utils/response");

class ScaleController {
  async create(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json(response.handleValidationError(errors.array()));
        return;
      }
      let responseObj = await scaleService.create(req.body);
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
      let responseObj = await scaleService.update(req.body);
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
      let responseObj = await scaleService.list(req.params["device_id"]);
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
      let responseObj = await scaleService.delete(req.params["scale_id"]);
      res.status(responseObj.status_code).json(responseObj);
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = new ScaleController();
