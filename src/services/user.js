const emailService = require('./email');
const CustomerModel = require('../models/customers').Customers;
const StaffDetailsModel = require('../models/staff').StaffDetails;
const UserCredentialsModel = require('../models/users').UserCredentials;
const RandomKeyService = require('./randomKey');
const constants = require('../constants');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = constants.BCRY_SALT_ROUNDS;
const response = require("../utils/response");

class UserService {
	async createUserCredentials(userId, password, role) {
		let encryptedPassword = await bcrypt.hash(password, SALT_ROUNDS);
		await UserCredentialsModel.create({
			user_id: userId,
			password: encryptedPassword,
			role: role
		});
	}
	async createCustomer(user) {
		let userId = user['phone_number'];
		await this.createUserCredentials(userId, user['password'], constants.ROLES.CUSTOMER);
		let customerId = await RandomKeyService.generate(16);
		await CustomerModel.create({
			customer_id: customerId,
			name: user.name,
			email: user.email,
			phone_number: user['phone_number'],
			country_code: user['country_code'],
			timezone: user['timezone'],
			user_id: userId
		});
		emailService.sendWelcomeEmail(user);
		let responseData = {
			"user_id": userId,
			"customer_id": customerId
		};
		return response.handleSuccessResponseWithData("Registration successful", responseData)
	}
	async createSalesStaff(user) {
		let userId = user['email'];
		let tempPassword = await RandomKeyService.generate(8);
		await this.createUserCredentials(userId, tempPassword, constants.ROLES.STAFF);
		await StaffDetailsModel.create({
			name: user.name,
			email: user.email,
			phone_number: user['phone_number'],
			country_code: user['country_code'],
			timezone: user['timezone'] || 'Asia/Kolkata',
			user_id: userId
		});
		emailService.sendInvitationEmail(user, tempPassword);
		return response.handleSuccessResponse("Staff invitation Sent");
	}
}
module.exports = new UserService();