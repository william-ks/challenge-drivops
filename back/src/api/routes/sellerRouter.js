const express = require("express");
const router = express.Router();
const { create, read, update, del } = require("../controllers/sellersC");

router.post("/seller", create);
router.get("/seller", read);
router.put("/seller/:id", update);
router.delete("/seller/:id", del);

module.exports = router;
