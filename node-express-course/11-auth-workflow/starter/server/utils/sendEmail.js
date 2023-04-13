const nodemailer = require("nodemailer");
const nodemailerConfig = require("./nodemailerConfig")
const emailObject = require("./sendVerificationEmail")

const sendEmail = async function () {
  let testAccount = await nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport(nodemailerConfig);

  let info = await transporter.sendMail(emailObject);
};

module.exports = sendEmail