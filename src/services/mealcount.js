const MealCountData = require("../models/mealcount").MealCountData;
const BenchmarkData = require("../models/mealcount").BenchmarkData;
const randomKey = require("../utils/randomKey");
const response = require("../utils/response");
const db = require("../models/users");
const sequelize = db.sequelize;

class MealCountService {
  async create(mealCountObj, userId) {
    let mealCountId = await randomKey.generate(6);
    let mealCountData = mealCountObj.map(mealCount => {
      return {
        ...mealCount,
        modified_by: userId,
        meal_count_id: mealCountId
      }
    })
    await MealCountData.bulkCreate(mealCountData);
    let resData = {
      meal_count_id: mealCountId,
    };
    return response.handleSuccessResponseWithData("Meal count added", resData);
  }
  async list(accountId) {
    let mealCount = await sequelize.query(
      "select m.*, a.name as account_name " +
      "from (select mcd.*, concat(u.first_name, ' ', u.last_name) as modified_by_user from meal_count_data mcd " +
      "  LEFT OUTER  JOIN users u ON u.user_id = mcd.modified_by and u.is_deleted = 0) as m, accounts a " +
      "  where m.account_id = a.account_id and m.is_deleted = 0 and a.is_deleted = 0 " +
      "and a.company_id in (select company_id from accounts " +
      "where account_id = :account_id and is_deleted = 0)",
      {
        replacements: {
          account_id: accountId,
        },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    return response.handleSuccessResponseWithData("Meal Count list", mealCount);
  }
  async delete(mealCountId) {
    await MealCountData.update(
      {
        is_deleted: 1,
      },
      {
        where: {
          meal_count_id: mealCountId,
          is_deleted: 0,
        },
      }
    );
    return response.handleSuccessResponse("Meal count deleted");
  }
  async listBenchmark(accountId) {
    let benchmarkData = await BenchmarkData.findAll({
      where: {
        account_id: accountId,
        is_deleted: 0,
      }
    });
    return response.handleSuccessResponseWithData("Benchmark list", benchmarkData);
  }
  async updateBenchmark(benchmarkObj) {
    await BenchmarkData.update({
      benchmark: benchmarkObj["benchmark"]
    }, {
      where: {
        category: benchmarkObj["category"],
        service: benchmarkObj["service"],
        account_id: benchmarkObj["account_id"],
        is_deleted: 0,
      }
    });
    return response.handleSuccessResponse("Benchmark updated");
  }
}
module.exports = new MealCountService();
