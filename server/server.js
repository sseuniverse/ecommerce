const express = require("express");
const { connectDB } = require("./helpers/mongo.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { mongoURL, port } = require("./helpers/env");

const app = express();
connectDB(mongoURL);

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
  })
);

app.use(cookieParser());
app.use(express.json());

app.listen(port, () => console.log(`Server is running on port ${port}`));
