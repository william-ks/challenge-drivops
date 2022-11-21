const express = require("express");
const router = express.Router();
const multer = require("../../services/multer");
const {
  createImage,
  createCar,
  read,
  update,
  del,
} = require("../controllers/carsC");

router.post("/car/image", multer.single("image"), createImage);
router.post("/car", createCar);
router.get("/car", read);
router.put("/car/:id", update);
router.delete("/car/:id", del);

module.exports = router;
