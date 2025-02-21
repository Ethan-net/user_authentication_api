const { MailtrapClient } = require("mailtrap");

const TOKEN = process.env.MAILTRAP_TOKEN || "your_mailtrap_api_token"; // Use env variable or fallback
const ENDPOINT =
  process.env.MAILTRAP_ENDPOINT || "https://send.api.mailtrap.io/"; // Default Mailtrap endpoint

const client = new MailtrapClient({
  token: TOKEN,
  endpoint: ENDPOINT,
});

const sender = {
  email: "hello@demomailtrap.com",
  name: "Auth Test",
};

module.exports = { client, sender };
