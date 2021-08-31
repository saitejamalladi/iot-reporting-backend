const { check } = require("express-validator");
const response = require("../../utils/response");
const authService = require("../../services/auth");
const constants = require("../../constants");

class AuthMiddleware {
  validate(method) {
    switch (method) {
      case constants.VALIDATIONS.GENERATE_TOKEN: {
        return [
          check("username", "missing username").exists(),
          check("password", "missing password").exists(),
        ];
      }
    }
  }

  async verifyToken(req, res, next) {
    try {
      if (req.headers["authorization"]) {
        let token = req.headers["authorization"];
        if (token.startsWith("Bearer ")) {
          // Remove Bearer from string
          token = token.slice(7, token.length);
        }
        let tokenInfo = await authService.getTokenInfo(token);
        if (tokenInfo) {
          req.tokenInfo = tokenInfo;
          next();
        } else {
          return res
            .status(401)
            .json(response.handleUnauthorizedRequest("Invalid token"));
        }
      } else {
        return res.status(401).send(response.handleUnauthorizedRequest("Missing token"));
      }
    } catch (error) {
      return res
        .status(500)
        .send(
          response.handleInternalServerError("Internal server error" + error)
        );
    }
  }
}

module.exports = new AuthMiddleware();
