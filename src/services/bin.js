const Bins = require("../models/bins").Bins;
const randomKey = require("../utils/randomKey");
const response = require("../utils/response");

class BinService {
  async create(binObj, accountId) {
    let binId = await randomKey.generate(6);
    await Bins.create({
      bin_id: binId,
      name: binObj["name"],
      weight: binObj["weight"],
      max_weight: binObj["max_weight"],
      account_id: accountId,
    });
    let resData = {
      bin_id: binId,
    };
    return response.handleSuccessResponseWithData("Bin added", resData);
  }
  async list(accountId) {
    let bins = await Bins.findAll({
      where: {
        account_id: accountId,
        is_deleted: 0,
      },
      attributes: [
        "bin_id",
        "name",
        "weight",
        "max_weight",
        "created_at",
        "updated_at",
      ],
      raw: true,
    });
    return response.handleSuccessResponseWithData("Bins list", bins);
  }
  async update(binObj, accountId) {
    await Bins.update(
      {
        name: binObj["name"],
        weight: binObj["weight"],
        max_weight: binObj["max_weight"],
      },
      {
        where: {
          bin_id: binObj["bin_id"],
          account_id: accountId,
          is_deleted: 0,
        },
      }
    );
    return response.handleSuccessResponse("Bin Updated");
  }
  async delete(binId, accountId) {
    await Bins.update(
      {
        is_deleted: 1,
      },
      {
        where: {
          bin_id: binId,
          account_id: accountId,
          is_deleted: 0,
        },
      }
    );
    return response.handleSuccessResponse("Bin deleted");
  }
}
module.exports = new BinService();
