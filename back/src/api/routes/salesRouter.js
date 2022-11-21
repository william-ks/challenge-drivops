const express = require("express");
const router = express.Router();
const { create, read, update, del } = require("../controllers/salesC");

router.post('/sales', create);
router.get("/sales", read);
router.put("/sales/:id", update);
router.delete("/sales/:id", del);

module.exports = router