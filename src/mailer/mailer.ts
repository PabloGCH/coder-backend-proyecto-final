
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
	host: 'smtp.ethereal.email',
	port: 587,
	auth: {
		user: process.env.ADMIN_MAIL,
		pass: process.env.ADMIN_PASSWORD
	},
	secure: false,
	tls: {
		rejectUnauthorized: false
	}
})
