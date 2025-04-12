const express = require("express");

const {
  fetchSettings,
  editSetting,
} = require("../../controllers/settings/setting-controller");

const router = express.Router();

router.put("/update/:userId", fetchSettings);
router.get("/get/:userId", editSetting);

module.exports = router;
