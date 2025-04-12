const Settings = require("../../models/Settings");

const fetchSettings = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User id is required!",
      });
    }

    const settings = await Settings.findOne({ userId });

    if (!settings) {
      const createSettings = new Settings({ userId });
      createSettings.save();

      res.status(200).json({
        success: true,
        data: createSettings,
      });
    } else {
      res.status(200).json({
        success: true,
        data: settings,
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

const editSetting = async (req, res) => {
  try {
    const { userId } = req.params;
    const formData = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User id is required!",
      });
    }

    const address = await Settings.findOneAndUpdate(
      { userId: userId },
      formData,
      { new: true }
    );

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Setting not found",
      });
    }

    res.status(200).json({
      success: true,
      data: address,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

module.exports = { editSetting, fetchSettings };
