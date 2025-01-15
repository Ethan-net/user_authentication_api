const { MailtrapClient } = require("mailtrap");
const { mailtrapclient, sender } = require("./mailtrap");

const {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
} = require("./emailsTemplate");

const sendVerificationEmail = async (email, verificationToken) => {
  const recipients = [{ email }];

  try {
    const response = await mailtrapclient.send({
      from: sender,
      to: recipients,
      subject: "verify Your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email Verification",
    });
    console.log("email sent successfully", response);
  } catch (error) {
    console.error("error send email", error);
    throw new Error(`error sending Email: ${error}`);
  }
};

const sendwelcomeEmail = async (email, name) => {
  const recipients = [{ email }];

  try {
    await mailtrapclient.send({
      from: sender,
      to: recipients,
      template_uuid: "397846dc-346e-4f69-9630-9cdb20a525bb",
      template_variables: {
        company_info_name: "myauthTest",
        name: name,
      },
    });
    console.log("welcome email sent successfully");
  } catch (error) {
    console.error("Error sending welcome email:", error);
  }
};

const sendPassResetEmail = async (email, resetUrl) => {
  recipients = [{ email }];

  try {
    const response = await mailtrapclient.send({
      from: sender,
      to: recipients,
      subject: "Reset Password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetUrl),
      category: " Password Reset",
    });
  } catch (error) {
    console.log("error sending Reset password Email", error);
  }
};

const sendPasswordSuccessEmail = async (email) => {
  recipients = [{ email }];

  try {
    const response = await mailtrapclient.send({
      from: sender,
      to: recipients,
      subject: "Reset Password Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Reset Password Successful",
    });
  } catch (error) {
    return res.status(400).json({
      message: "error sending email",
      status: false,
    });
  }
};
module.exports = {
  sendVerificationEmail,
  sendwelcomeEmail,
  sendPassResetEmail,
  sendPasswordSuccessEmail,
};
