const router = require("express").Router();
const { Mood, User, Activity } = require("../models");
const Op = require("sequelize").Op;
// import auth middleware

router.get("/", async (req, res) => {
  res.render("loginPage", {});
});

module.exports = router;
