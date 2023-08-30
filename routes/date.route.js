const express = require("express");
const router = express.Router();
const DateController = require("../controllers/date.controller");

router.post("/add_user", DateController.add_user);

router.post("/get_hours", DateController.get_hours);

router.get("/get_users", DateController.get_users);

module.exports = router;
