const mongoose = require("mongoose");

exports.connectDB = async (url) => {
  // try {
  //     await mongoose.connect(url, {
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true,
  //     });
  //     console.log("MongoDB connected");
  // } catch (error) {
  //     console.log(error);
  // }
  try {
    await mongoose
      .connect(url, {
        useNewUrlParser: true,
        // useUnifiedTopology: true,
      })
      .then(() => console.log("MongoDB connected"));
  } catch (error) {
    console.log(error);
  }
};
