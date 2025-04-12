const paypal = require("paypal-rest-sdk");
const { payPalClient, payPalSecret } = require("./env");

paypal.configure({
  mode: "sandbox",
  client_id: payPalClient,
  client_secret: payPalSecret,
});

module.exports = paypal;
