const db = require("../models/scales");
const sequelize = db.sequelize;
const Accounts = require("../models/users").Accounts;
const RegisteredDevices = require("../models/scales").RegisteredDevices;
const Scales = require("../models/scales").Scales;
const ScaleData = require("../models/scales").ScaleData;
const Service = require("../models/scales").Service;
const ServiceWasteConfig = require("../models/scales").ServiceWasteConfig;
const randomKey = require("../utils/randomKey");
const response = require("../utils/response");

class ScaleService {
  async create(scaleObj, accountId) {
    let scaleId = await randomKey.generate(6);
    let deviceExists = await RegisteredDevices.count({
      where: {
        device_id: scaleObj["device_id"],
        account_id: accountId,
        is_deleted: 0,
      },
    });
    if (!deviceExists) {
      await RegisteredDevices.create({
        device_id: scaleObj["device_id"],
        account_id: accountId,
      });
    }
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
  async listAll(accountId) {
    // let scales = await Scales.findAll({
    //   where: {
    //     is_deleted: 0,
    //   },
    //   include: [
    //     {
    //       model: RegisteredDevices,
    //       where: {
    //         account_id: accountId,
    //       },
    //       attributes: [],
    //     },
    //   ],
    //   raw: true,
    // });
    let scales = await sequelize.query(
      " SELECT `Scales`.`id_scales`, `Scales`.`scale_id`, `Scales`.`name`, " +
        "`Scales`.`serial_num`, `Scales`.`device_id`, `Scales`.`created_at`, " +
        "`Scales`.`updated_at`, `Scales`.`is_deleted` " +
        "FROM `scales` AS `Scales` INNER JOIN `registered_devices` " +
        "AS `RegisteredDevice` ON `Scales`.`device_id` = `RegisteredDevice`.`device_id` " +
        "AND `RegisteredDevice`.`account_id` = :account_id WHERE `Scales`.`is_deleted` = 0",
      {
        replacements: {
          account_id: accountId,
        },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    return response.handleSuccessResponseWithData("Scales list", scales);
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
  async report() {
    let dailyData = await sequelize.query(
      "select location, DATE_FORMAT(created_at, '%Y-%m-%d') as report_date, " +
        "sum(net_weight) as total_weight " +
        "from scale_data sd " +
        "where created_at >= DATE(NOW()) - INTERVAL 7 DAY and created_at < DATE(NOW()) " +
        "group by location, DATE_FORMAT(created_at, '%Y-%m-%d') " +
        "order by DATE_FORMAT(created_at, '%Y-%m-%d')",
      {
        replacements: {},
        type: sequelize.QueryTypes.SELECT,
      }
    );
    let Day28Avg = await sequelize.query(
      "select location, sum(net_weight)/count(1) as average_weight " +
        "from scale_data sd where created_at >= DATE(NOW()) - INTERVAL 28 DAY " +
        "and created_at < DATE(NOW()) " +
        "group by location",
      {
        replacements: {},
        type: sequelize.QueryTypes.SELECT,
      }
    );
    let Day7Avg = await sequelize.query(
      "select location, sum(net_weight)/count(1) as average_weight " +
        "from scale_data sd where created_at >= DATE(NOW()) - INTERVAL 7 DAY " +
        "and created_at < DATE(NOW()) " +
        "group by location",
      {
        replacements: {},
        type: sequelize.QueryTypes.SELECT,
      }
    );
    let resData = {
      daily_data: dailyData,
      day_28_avg: Day28Avg,
      day_7_avg: Day7Avg,
    };
    return response.handleSuccessResponseWithData("Report", resData);
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
  async getConfig(accountId) {
    let accountInfo = await Accounts.findOne({
      where: {
        account_id: accountId,
        is_deleted: 0,
      },
      attributes: ["company_id"],
      raw: true,
    });
    if (!accountInfo || !accountInfo["company_id"])
      return response.handleNotFoundRequest("account not found");
    let companyId = accountInfo["company_id"];
    let service = await Service.findAll({
      where: {
        company_id: companyId,
      },
      attributes: ["service"],
      raw: true,
    });
    let services = service.map((service) => service["service"]);
    let serviceWaste = await ServiceWasteConfig.findAll({
      where: {
        company_id: companyId,
      },
      attributes: ["service_waste"],
      raw: true,
    });
    let serviceWastes = serviceWaste.map(
      (serviceWaste) => serviceWaste["service_waste"]
    );

    let resData = {
      service: services,
      service_waste: serviceWastes,
    };
    return response.handleSuccessResponseWithData("Scale Config", resData);
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
