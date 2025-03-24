require("dotenv").config();

exports.mongoURL = process.env.MONGO_URL;
exports.port = process.env.PORT || 5000;
exports.secretJwt = process.env.CLIENT_SECRET;
