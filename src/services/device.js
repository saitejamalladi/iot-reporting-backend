const RegisteredDevices = require("../models/scales").RegisteredDevices;
const response = require("../utils/response");

class DeviceService {
  async list(accountId) {
    let registeredDevices = await RegisteredDevices.findAll({
      where: {
        account_id: accountId,
        is_deleted: 0,
      },
      attributes: ["device_id", "account_id", "created_at", "updated_at"],
      raw: true,
    });
    return response.handleSuccessResponseWithData(
      "Registered devices",
      registeredDevices
    );
  }
}
module.exports = new DeviceService();
