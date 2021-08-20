const Users = require("../models/users").Users;
const response = require("../utils/response");

class UserService {
  async listUsers() {
    return response.handleSuccessResponse(await Users.findAll());
  }
}
module.exports = new UserService();
