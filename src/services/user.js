const Users = require("../models/users").Users;
const UserRoles = require("../models/users").UserRoles;
const Accounts = require("../models/users").Accounts;
const AccountRoles = require("../models/users").AccountRoles;
const Bins = require("../models/users").Bins;
const Categories = require("../models/users").Categories;
const Companies = require("../models/users").Companies;
const Devices = require("../models/users").Devices;
const Locations = require("../models/users").Locations;
const MealCount = require("../models/users").MealCount;
const bcrypt = require("bcrypt");
const constants = require("../constants");
const SALT_ROUNDS = constants.BCRYPT_SALT_ROUNDS;
const response = require("../utils/response");

class UserService {
  async register(user) {
    let parentId = user["parent_id"] ? user["parent_id"] : null;
    await Users.create({
      companyId: user["company_id"],
      username: user["username"],
      firstName: user["first_name"],
      lastName: user["last_name"],
      address: user["address"],
      address2: user["address2"],
      email: user["email"],
      parentId: parentId,
      password: await bcrypt.hash(user["password"], SALT_ROUNDS),
    });
    return response.handleSuccessResponse("User registered successfully");
  }
  async update(user, accountId) {
    let userInfo = Users.findOne({
      where: {
        accountId: accountId,
        accountStatus: 1,
      },
      raw: true,
    });
    if (userInfo) {
      await Users.update(
        {
          firstName: user["first_name"],
          lastName: user["last_name"],
          address: user["address"],
          address2: user["address2"],
          email: user["email"],
        },
        {
          where: {
            accountId: accountId,
            accountStatus: 1,
          },
        }
      );
      return response.handleSuccessResponse("User updated successfully");
    }
    return response.handleNotFoundRequest("user not found");
  }
  async resetPassword(user) {
    let userInfo = Users.findOne({
      where: {
        username: user["username"],
        accountStatus: 1,
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
            accountStatus: 1,
          },
        }
      );
      return response.handleSuccessResponse("Password updated successfully");
    }
    return response.handleNotFoundRequest("user not found");
  }

  async listUsers() {
    return response.handleSuccessResponse(await Users.findAll());
  }
  async getInfo(accountId) {
    let userInfo = await Users.findOne({
      where: {
        accountId: accountId,
        accountStatus: 1,
      },
      attributes: [
        "accountId",
        "companyId",
        "username",
        "address",
        "address2",
        "email",
        "firstName",
        "lastName",
        "parentId",
      ],
      raw: true,
    });
    if (userInfo) {
      return response.handleSuccessResponseWithData("User Info", userInfo);
    }
    return response.handleNotFoundRequest("User not found");
  }
  async listUserRoles() {
    return response.handleSuccessResponse(await UserRoles.findAll());
  }
  async listAccounts() {
    return response.handleSuccessResponse(await Accounts.findAll());
  }
  async listAccountRoles() {
    return response.handleSuccessResponse(await AccountRoles.findAll());
  }
  async listBins() {
    return response.handleSuccessResponse(await Bins.findAll());
  }
  async listCategories() {
    return response.handleSuccessResponse(await Categories.findAll());
  }
  async listCompanies() {
    return response.handleSuccessResponse(await Companies.findAll());
  }
  async listDevices() {
    return response.handleSuccessResponse(await Devices.findAll());
  }
  async listLocations() {
    return response.handleSuccessResponse(await Locations.findAll());
  }
  async listMealCount() {
    return response.handleSuccessResponse(await MealCount.findAll());
  }
}
module.exports = new UserService();
