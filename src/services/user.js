const Users = require("../models/users").Users;
const Companies = require("../models/users").Companies;
const bcrypt = require("bcrypt");
const constants = require("../constants");
const SALT_ROUNDS = constants.BCRYPT_SALT_ROUNDS;
const response = require("../utils/response");
const randomKey = require("../utils/randomKey");

class UserService {
  async register(user, accountId) {
    let userId = await randomKey.generate(6);
    let userAccountId = user["account_id"] || accountId;
    await Users.create({
      user_id: userId,
      first_name: user["first_name"],
      last_name: user["last_name"],
      email: user["email"],
      username: user["username"],
      password: await bcrypt.hash(user["password"], SALT_ROUNDS),
      account_id: userAccountId,
      address: user["address"],
      address2: user["address2"],
    });
    return response.handleSuccessResponse("User registered successfully");
  }
  async update(user, userId) {
    let userInfo = Users.findOne({
      where: {
        user_id: userId,
        is_deleted: 0,
      },
      raw: true,
    });
    if (userInfo) {
      await Users.update(
        {
          first_name: user["first_name"],
          last_name: user["last_name"],
          email: user["email"],
          address: user["address"],
          address2: user["address2"],
        },
        {
          where: {
            user_id: userId,
            is_deleted: 0,
          },
        }
      );
      return response.handleSuccessResponse("User updated successfully");
    }
    return response.handleNotFoundRequest("user not found");
  }
  async resetPassword(user) {
    let userInfo = await Users.findOne({
      where: {
        username: user["username"],
        is_deleted: 0,
      },
      raw: true,
    });
    if (userInfo) {
      await Users.update(
        {
          password: await bcrypt.hash(user["password"], SALT_ROUNDS),
        },
        {
          where: {
            username: user["username"],
            is_deleted: 0,
          },
        }
      );
      return response.handleSuccessResponse("Password updated successfully");
    }
    return response.handleNotFoundRequest("user not found");
  }

  async listUsers(accountId) {
    let users = await Users.findAll({
      where: {
        account_id: accountId,
        is_deleted: 0,
      },
      raw: true,
    });
    return response.handleSuccessResponseWithData("User list", users);
  }
  async getInfo(userId) {
    let userInfo = await Users.findOne({
      where: {
        user_id: userId,
        is_deleted: 0,
      },
      attributes: [
        "user_id",
        "first_name",
        "last_name",
        "email",
        "account_id",
        "username",
        "created_at",
        "updated_at",
        "address",
        "address2",
      ],
      raw: true,
    });
    if (userInfo) {
      return response.handleSuccessResponseWithData("User Info", userInfo);
    }
    return response.handleNotFoundRequest("User not found");
  }
  async listCompanies() {
    let companies = await Companies.findAll({
      where: {
        is_deleted: 0,
      },
      raw: true,
    });
    return response.handleSuccessResponseWithData("Companies list", companies);
  }
}
module.exports = new UserService();
