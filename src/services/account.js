const Accounts = require("../models/users").Accounts;
const randomKey = require("../utils/randomKey");
const response = require("../utils/response");

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
    let childAccounts = await Accounts.findAll({
      where: {
        parent_account: accountId,
        is_deleted: 0,
      },
      raw: true,
    });
    return response.handleSuccessResponseWithData(
      "Child Accounts",
      childAccounts
    );
  }
}
module.exports = new AccountService();
