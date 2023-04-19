const sendEmail = require("./sendEmail");

const sendVerificationEmail = async ({
  name,
  email,
  verificationToken,
  origin,
}) => {
  const verificationLink = `${origin}/user/verify-email?token=${verificationToken}&email=${email}`
  const message = `<p>Please click <a href=${verificationLink}>here</a> to verify your account</p>`;
  return sendEmail({
    to: email,
    subject: "Verification confirmation",
    html: `<h2>Hello, ${name.split(" ")[0]}!</h2> 
      ${message}
    `,
  });
};

module.exports = sendVerificationEmail;
