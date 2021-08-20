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
