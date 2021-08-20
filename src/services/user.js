const Users = require("../models/users").Users;
const UserRoles = require("../models/users").UserRoles;
const response = require("../utils/response");

class UserService {
  async listUsers() {
    return response.handleSuccessResponse(await Users.findAll());
  }

  async listUserRoles() {
    return response.handleSuccessResponse(await UserRoles.findAll());
  }
}
module.exports = new UserService();
