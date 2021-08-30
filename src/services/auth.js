const jwt = require("jsonwebtoken");
const constants = require("../constants");
const config = require("../config");
const response = require("../utils/response");
const db = require("../models/users");
const sequelize = db.sequelize;
const bcrypt = require("bcrypt");

class AuthService {
  async generateToken(auth) {
    let username = auth["username"];
    // let userInfo = await Users.findOne({
    //   where: {
    //     username: username,
    //     is_deleted: 0,
    //   },
    //   include: [
    //     {
    //       model: Accounts,
    //       attributes: ["name"],
    //     },
    //   ],
    //   raw: true,
    // });
    let users = await sequelize.query(
      "SELECT users.*, Account.name as account_name FROM users AS users " +
        "LEFT OUTER JOIN accounts AS Account " +
        "ON users.account_id = Account.account_id " +
        "WHERE users.username = :user_name " +
        "AND users.is_deleted = 0 LIMIT 1",
      {
        replacements: {
          user_name: username,
        },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    let userInfo = null;
    if (users && users.length > 0) {
      userInfo = users[0];
    }
    if (
      userInfo &&
      (await bcrypt.compare(auth["password"], userInfo["password"]))
    ) {
      let payload = {};
      payload[constants.USERNAME] = userInfo["username"];
      payload[constants.ACCOUNT_ID] = userInfo["account_id"];
      payload[constants.USER_ID] = userInfo["user_id"];
      payload[constants.ACCOUNT_NAME] = userInfo["account_name"];
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
