
const express = require("express");
var router = express.Router();

router.use('/patrient',require('./Patrient'))

module.exports = router