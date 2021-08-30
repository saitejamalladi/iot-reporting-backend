const Accounts = require("../models/users").Accounts;
const randomKey = require("../utils/randomKey");
const response = require("../utils/response");
const db = require("../models/users");
const sequelize = db.sequelize;

class AccountService {
  async create(account) {
    let parentAccount = null;
    let companyId = account["company_id"];
    if (account["parent_account"]) {
      parentAccount = account["parent_account"];
      let parentAccountInfo = await Accounts.findOne({
        where: {
          account_id: account["parent_account"],
        },
        raw: true,
      });
      if (!parentAccountInfo) {
        return response.handleBadRequest("Parent Account Doesn`t exists");
      }
      parentAccount = parentAccountInfo["account_id"];
      companyId = parentAccountInfo["company_id"];
    }
    let accountId = await randomKey.generate(6);
    await Accounts.create({
      account_id: accountId,
      name: account["name"],
      company_id: companyId,
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
