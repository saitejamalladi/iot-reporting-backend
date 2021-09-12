const Accounts = require("../models/users").Accounts;
const Users = require("../models/users").Users;
const Companies = require("../models/users").Companies;
const Permissions = require("../models/users").Permissions;
const db = require("../models/users");
const sequelize = db.sequelize;

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
      role: user["role"],
    });
    return response.handleSuccessResponse("User registered successfully");
  }
  async update(user) {
    let userInfo = Users.findOne({
      where: {
        id_users: user["id_users"],
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
          account_id: user["account_id"],
          role: user["role"],
          address: user["address"],
          address2: user["address2"],
        },
        {
          where: {
            id_users: user["id_users"],
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
    let users = await sequelize.query(
      "select u.*, a.name as account_name from users u, accounts a " +
        "where u.account_id = a.account_id and u.is_deleted = 0 and a.is_deleted = 0 " +
        "and a.company_id in (select company_id from accounts " +
        "where account_id = :account_id and is_deleted = 0)",
      {
        replacements: {
          account_id: accountId,
        },
        type: sequelize.QueryTypes.SELECT,
      }
    );
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
        "role",
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

  async listPermissions(roleName){
    let permissions = await Permissions.findAll({
      where: {
        rolename : roleName
      }
    });
    return response.handleSuccessResponseWithData("Permissions list", permissions);
  }
  async delete(username){
    await Users.update({
      is_deleted: 1,
    }, {
      where: {
        username : username,
        is_deleted: 0,
      }
    });
    return response.handleSuccessResponse("User deleted Successfully");
  }
}
module.exports = new UserService();
