const paypal = require("paypal-rest-sdk");
// const { Client, Environment, LogLevel } = require("@paypal/paypal-server-sdk");
const { payPalClient, payPalSecret } = require("./env");

paypal.configure({
  mode: "sandbox",
  client_id: payPalClient,
  client_secret: payPalSecret,
});

// const paypal = new Client({
//   clientCredentialsAuthCredentials: {
//     oAuthClientId: payPalClient,
//     oAuthClientSecret: payPalSecret,
//   },
//   timeout: 0,
//   environment: Environment.Sandbox,
//   logging: {
//     logLevel: LogLevel.Info,
//     logRequest: {
//       logBody: true,
//     },
//     logResponse: {
//       logHeaders: true,
//     },
//   },
// });

module.exports = paypal;
