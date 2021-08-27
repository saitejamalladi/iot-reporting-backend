const jwt = require("jsonwebtoken");
const constants = require("../constants");
const config = require("../config");
const response = require("../utils/response");
let Users = require("../models/users").Users;
const bcrypt = require("bcrypt");

class AuthService {
  async generateToken(auth) {
    let username = auth["username"];
    let userInfo = await Users.findOne({
      where: {
        username: username,
      },
      raw: true,
    });
    if (
      userInfo &&
      (await bcrypt.compare(auth["password"], userInfo["password"]))
    ) {
      let payload = {};
      payload[constants.USERNAME] = userInfo["username"];
      payload[constants.ACCOUNT_ID] = userInfo["account_id"];
      payload[constants.USER_ID] = userInfo["user_id"];
      let token = jwt.sign(payload, config.jwt.secret, { expiresIn: "10d" });
      let responseData = {
        token: token,
        userInfo: userInfo,
      };
      return response.handleSuccessResponseWithData(
        "Access token",
        responseData
      );
    }
    return response.handleUnauthorizedRequest("Invalid user credentials");
  }
  async getTokenInfo(token) {
    return new Promise((resolve) => {
      jwt.verify(token, config.jwt.secret, async (error, tokenInfo) => {
        if (error) resolve(false);
        else resolve(tokenInfo);
      });
    });
  }
}
module.exports = new AuthService();
