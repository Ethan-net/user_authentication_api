
const { MailtrapClient } = require("mailtrap");


require('dotenv').config()

const ENDPOINT = process.env.MAILTRAP_ENDPOINT ;
const TOKEN = process.env.MAILTRAP_TOKEN


const mailtrapclient = new MailtrapClient({
  endpoint: ENDPOINT,
  token: TOKEN
});


const sender = {
  email: "hello@demomailtrap.com", 
  name: "myAuthTest",
};




module.exports = { mailtrapclient, sender}