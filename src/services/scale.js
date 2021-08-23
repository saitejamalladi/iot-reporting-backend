const Scales = require("../models/scales").Scales;
const ScaleData = require("../models/scales").ScaleData;
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
  async addData(scaleData) {
    await ScaleData.create({
      scale_id: scaleData["scale_id"],
      bin_id: scaleData["bin_id"],
      gross_weight: scaleData["gross_weight"],
      net_weight: scaleData["net_weight"],
      service: scaleData["service"],
      category: scaleData["category"],
      sub_category1: scaleData["sub_category1"],
      sub_category2: scaleData["sub_category2"],
      location: scaleData["location"],
      service_waste: scaleData["service_waste"],
    });
    return response.handleSuccessResponse("Scale data added");
  }
  async listData(scaleId) {
    let scaleData = await ScaleData.findAll({
      where: {
        scale_id: scaleId,
        is_deleted: 0,
      },
      attributes: [
        "id_scale_data",
        "scale_id",
        "gross_weight",
        "net_weight",
        "bin_id",
        "service",
        "category",
        "sub_category1",
        "sub_category2",
        "location",
        "service_waste",
        "created_at",
        "updated_at",
      ],
      raw: true,
    });
    return response.handleSuccessResponseWithData("Scale data", scaleData);
  }
  async deleteData(idScaleData) {
    await Scales.update(
      {
        is_deleted: 1,
      },
      {
        where: {
          id_scale_data: idScaleData,
        },
      }
    );
    return response.handleSuccessResponse("Scale Data deleted");
  }
}
module.exports = new ScaleService();
