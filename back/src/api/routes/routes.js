const express = require("express");
const router = express.Router();
const managerRouter = require("./managerRouter");
const sellerRouter = require("./sellerRouter");
const carRouter = require("./carRouter");
const salesRouter = require("./salesRouter");
const auth = require("../middleware/auth");
const chartC = require("./ChartRouter");

router.use(managerRouter);
router.use(auth);
router.use(sellerRouter);
router.use(carRouter);
router.use(salesRouter);
router.use(chartC);

module.exports = router;
