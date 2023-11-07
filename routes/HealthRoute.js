const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("ShopEase Backend is Healthy");
});

module.exports = router;
