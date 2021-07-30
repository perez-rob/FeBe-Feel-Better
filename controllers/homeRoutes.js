const router = require("express").Router();
const { Mood, User, Activity, AUM } = require("../models");
const Op = require("sequelize").Op;
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  res.render("loginPage", {});
});

router.get("/test/user", async (req, res) => {
  try {
    const userData = await User.findAll({
      include: [{ model: AUM, include: [{ model: Mood }] }],
    });

    if (!userData) {
      res.status(400).json({ message: "ERROR" });
    }

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/test/aum", async (req, res) => {
  try {
    const aumData = await AUM.findAll({
      include: [{ model: User }],
    });

    if (!aumData) {
      res.status(400).json({ message: "ERROR" });
    }

    res.status(200).json(aumData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
