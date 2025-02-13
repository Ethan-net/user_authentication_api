const userSchema = require("../model/user.model");
const bcrypt = require("bcryptjs");
const generateTokenAndSetCookie = require("../utils/generateTokenAndSetCookie");
const {
  sendVerificationEmail,
  sendwelcomeEmail,
  sendPassResetEmail,
  sendPasswordSuccessEmail,
} = require("../mailtrap/emails");

const crypto = require("crypto");

const signup = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const verifyEmail = await userSchema.findOne({ email: email });
    if (verifyEmail) {
      return res.status(402).json({
        message: "user already existing",
      });
    }
    const hashpass = await bcrypt.hash(password, 10);

    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const user = new userSchema({
      email,
      name,
      password: hashpass,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    });
    await user.save();

    generateTokenAndSetCookie(res, user._id);

    await sendVerificationEmail(user.email, verificationToken);

    res.status(201).json({
      success: true,
      messsage: "User created successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (e) {
    return res.status(401).json({
      message: "sign up unsuccessfully",
      success: false,
    });
  }
};

const verifyEmail = async (req, res) => {
  const { code } = req.body;

  try {
    // Find the user with the matching verification token and ensure it's not expired
    const user = await userSchema.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    // If no user is found, return an error
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification token",
      });
    }

    // Update user verification status
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    // Send a welcome email
    await sendwelcomeEmail(user.email, user.name);

    // Respond with success
    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    console.error("Error verifying email:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userSchema.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "cannot find user",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password",
      });
    }
    generateTokenAndSetCookie(res, user._id);

    user.lastLogin = new Date();
    await user.save();

    res.status(200).json({
      message: "User Login Successfully",
      success: true,
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("error in login");
    res.status(400).json({
      success: false,
      message: `unable to login due to ${error}`,
    });
  }
};
const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

const forgotPass = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.respond(400).json({
        message: " User does not exist",
        status: false,
      });
    }
    const resetToken = crypto.randomBytes(20).toString("hex");
    const tokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; //expires after 1hr

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = tokenExpiresAt;

    await user.save();

    //send email

    await sendPassResetEmail(
      user.email,
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`
    );
    res.status(201).json({
      message: "Reset Password Email sent Sucessfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: `failed to send Reset password email due to ${error}`,
      status: false,
    });
  }
};

const resetPass = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        message: "Password Required",
        statust: false,
      });
    }

    const user = await userSchema.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        message: " invalid or expired token",
        status: false,
      });
    }
    //update password

    const hashpass = await bcrypt.hash(password, 10);

    user.password = hashpass;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;

    await user.save();

    await sendPasswordSuccessEmail(user.email);

    res.status(200).json({
      message: "Password reset successfully",
      status: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "unable to reset Password",
      status: false,
    });
  }
};

const checkAuth = async (req, res) => {
  try {
    const user = await userSchema.findById(req.userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user not found",
      });
    }
    res.status(200).json({
      success: true,
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  signup,
  login,
  logout,
  verifyEmail,
  forgotPass,
  resetPass,
  checkAuth,
};
