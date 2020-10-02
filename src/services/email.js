const nodemailer = require("nodemailer");
const config = require('../config');

let transporterOptions = {
	host: config.mailer.host,
	port: config.mailer.port,
	secure: false,
	auth: {
		user: config.mailer.username,
		pass: config.mailer.password
	},
};

class EmailService {
	async sendEmail(toList, subject, body, ccList, bccList) {
		let account = await nodemailer.createTestAccount();
		let transporter = nodemailer.createTransport(transporterOptions);
		await transporter.sendMail({
			to: toList,
			cc: ccList,
			bcc: bccList,
			subject: subject,
			text: body,
			html: body,
		});
	}
	async sendWelcomeEmail (user) {
		let text = "Welcome, " + user.name + "!\n\nWelcome to madhurams. Order your favourite sweets..";
		await this.sendEmail(user.email, "Registration Successful", text, "teja.malladi457@gmail.com", "");
	}
	async sendInvitationEmail (user, tempPassword) {
		let text = "Hi " + user.name + ", \n\nWe invite you to madhurams. Please use the below credentials to login. \n\nThanks. user_id: " + user['email'] + "\n Password: " + tempPassword + "\n\n Thanks";
		await this.sendEmail(user.email, "Registration Successful", text, "teja.malladi457@gmail.com", "");
	}
}

module.exports = new EmailService();