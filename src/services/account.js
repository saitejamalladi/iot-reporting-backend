const Accounts = require("../models/users").Accounts;
const randomKey = require("../utils/randomKey");
const response = require("../utils/response");
const db = require("../models/users");
const sequelize = db.sequelize;

class AccountService {
  async create(account) {
    let accountId = await randomKey.generate(6);
    let parentAccount = account["parent_account"]
      ? account["parent_account"]
      : null;
    await Accounts.create({
      account_id: accountId,
      name: account["name"],
      company_id: account["company_id"],
      parent_account: parentAccount,
    });
    let resData = {
      account_id: accountId,
    };
    return response.handleSuccessResponseWithData(
      "Account registered successfully",
      resData
    );
  }
  async getInfo(accountId) {
    let accountInfo = await sequelize.query(
      "select account_id, name, (select count(1) from accounts where " +
        "parent_account = ac1.account_id and is_deleted = 0) child_account " +
        "from accounts ac1 where account_id = :account_id and is_deleted = 0",
      {
        replacements: {
          account_id: accountId,
        },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    if (accountInfo) {
      return response.handleSuccessResponseWithData(
        "Account info",
        accountInfo
      );
    }
    return response.handleNotFoundRequest("Account not found");
  }
  async list() {
    let accounts = await Accounts.findAll({
      where: {
        is_deleted: 0,
      },
      raw: true,
    });
    return response.handleSuccessResponseWithData("Accounts  list", accounts);
  }
  async listChildAccounts(accountId) {
    let childAccounts = await sequelize.query(
      "select account_id, name, (select count(1) from accounts where " +
        "parent_account = ac1.account_id and is_deleted = 0) child_account " +
        "from accounts ac1 where parent_account = :account_id and is_deleted = 0",
      {
        replacements: {
          account_id: accountId,
        },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    return response.handleSuccessResponseWithData(
      "Child Accounts",
      childAccounts
    );
  }
}
module.exports = new AccountService();
