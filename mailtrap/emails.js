const { MailtrapClient } = require("mailtrap");
const { sender, client } = require("./mailtrap");

const {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
} = require("./emailsTemplate");

// Send Verification Email
const sendVerificationEmail = async (email, verificationToken) => {
  const recipients = [{ email }];

  try {
    const response = await client.send({
      from: sender,
      to: recipients,
      subject: "Verify Your Email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email Verification",
    });
    console.log("Verification email sent successfully", response);
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error(`Error sending email: ${error.message}`);
  }
};

// Send Welcome Email
const sendWelcomeEmail = async (email, name) => {
  const recipients = [{ email }];

  try {
    await client.send({
      from: sender,
      to: recipients,
      template_uuid: "397846dc-346e-4f69-9630-9cdb20a525bb",
      template_variables: {
        company_info_name: "MyAuthTest",
        name: name,
      },
    });
    console.log("Welcome email sent successfully");
  } catch (error) {
    console.error("Error sending welcome email:", error);
  }
};

// Send Password Reset Email
const sendPassResetEmail = async (email, resetUrl) => {
  const recipients = [{ email }];

  try {
    await client.send({
      from: sender,
      to: recipients,
      subject: "Reset Password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetUrl),
      category: "Password Reset",
    });
    console.log("Password reset email sent successfully");
  } catch (error) {
    console.log("Error sending reset password email:", error);
  }
};

// Send Password Reset Success Email
const sendPasswordSuccessEmail = async (email) => {
  const recipients = [{ email }];

  try {
    await client.send({
      from: sender,
      to: recipients,
      subject: "Reset Password Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Reset Password Successful",
    });
    console.log("Password reset success email sent successfully");
  } catch (error) {
    console.log("Error sending password reset success email:", error);
  }
};

// Exporting Functions
module.exports = {
  sendVerificationEmail,
  sendWelcomeEmail,
  sendPassResetEmail,
  sendPasswordSuccessEmail,
};
