const express = require("express");
const router = express.Router();

//route POST form/forms
//desc Test basic form with back-end and front-end integration.
//access Public
router.post("/", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

module.exports = router;
