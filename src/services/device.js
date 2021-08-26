const RegisteredDevices = require("../models/scales").RegisteredDevices;
const randomKey = require("../utils/randomKey");
const response = require("../utils/response");

class DeviceService {
  async register(accountId) {
    let deviceId = await randomKey.generate(6);
    await RegisteredDevices.create({
      device_id: deviceId,
      account_id: accountId,
    });
    let resData = {
      device_id: deviceId,
    };
    return response.handleSuccessResponseWithData("Device registered", resData);
  }
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
