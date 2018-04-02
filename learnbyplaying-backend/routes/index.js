var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  console.log("yihaaa");
  res.json({ title: "Express" });
});

module.exports = router;
