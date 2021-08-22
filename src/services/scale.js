const Scales = require("../models/scales").Scales;
const randomKey = require("../utils/randomKey");
const response = require("../utils/response");

class ScaleService {
  async create(scaleObj) {
    let scaleId = await randomKey.generate();
    await Scales.create({
      scale_id: scaleId,
      device_id: scaleObj["device_id"],
      name: scaleObj["name"],
      serial_num: scaleObj["serial_num"],
    });
    let resData = {
      scale_id: scaleId,
    };
    return response.handleSuccessResponseWithData("Scale added", resData);
  }
  async list(deviceId) {
    let scales = await Scales.findAll({
      where: {
        device_id: deviceId,
        is_deleted: 0,
      },
      attributes: [
        "scale_id",
        "name",
        "serial_num",
        "device_id",
        "created_at",
        "updated_at",
      ],
      raw: true,
    });
    return response.handleSuccessResponseWithData("Scales list", scales);
  }
  async update(scaleObj) {
    await Scales.update(
      {
        name: scaleObj["name"],
        serial_num: scaleObj["serial_num"],
      },
      {
        where: {
          scale_id: scaleObj["scale_id"],
          is_deleted: 0,
        },
      }
    );
    return response.handleSuccessResponse("Scale Updated");
  }
  async delete(scaleId) {
    await Scales.update(
      {
        is_deleted: 1,
      },
      {
        where: {
          scale_id: scaleId,
          is_deleted: 0,
        },
      }
    );
    return response.handleSuccessResponse("Scale deleted");
  }
}
module.exports = new ScaleService();
