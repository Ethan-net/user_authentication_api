const Nodemailer = require("nodemailer");
const { MailtrapTransport } = require("mailtrap");

const TOKEN = "9269e7690f2e0c03c8f8859430594bb9";
// const ENDPOINT = send.api.mailtrap.io;
const transport = Nodemailer.createTransport(
  MailtrapTransport({
    token: TOKEN,
    // endpoint: ENDPOINT,
  })
);

const sender = {
  email: "hello@demomailtrap.com",
  name: "myAuthTest",
};
module.exports = { transport, sender };
