const { validationResult } = require("express-validator");
const authService = require("../services/auth");

class AuthController {
  async generateToken(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }
      let response = await authService.generateToken(req.body);
      res.status(200).json(response);
    } catch (err) {
      res.status(500).send(err);
    }
  }
}

module.exports = new AuthController();
