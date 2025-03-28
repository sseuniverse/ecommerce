require("dotenv").config();

exports.mongoURL = process.env.MONGO_URL;
exports.port = process.env.PORT || 5000;
exports.secretJwt = process.env.CLIENT_SECRET;
exports.payPalClient = process.env.PAYPAL_CLIENT_ID
exports.payPalSecret = process.env.PAYPAL_CLIENT_SECRET