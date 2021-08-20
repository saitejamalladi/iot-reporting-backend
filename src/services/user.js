const Users = require("../models/users").Users;
const UserRoles = require("../models/users").UserRoles;
const Accounts = require("../models/users").Accounts;
const AccountRoles = require("../models/users").AccountRoles;
const Bins = require("../models/users").Bins;
const Categories = require("../models/users").Categories;

const response = require("../utils/response");

class UserService {
  async listUsers() {
    return response.handleSuccessResponse(await Users.findAll());
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
}
module.exports = new UserService();
