const express = require("express");
const router = express.Router();
const {
  sellersStatistics,
  salesValueStatistics,
  salesAverage,
} = require("../controllers/chartC");

router.get("/chartBySeller", sellersStatistics);
router.get("/chartBySaleValue", salesValueStatistics);
router.get("/chartBySalesAverage", salesAverage);

module.exports = router;
