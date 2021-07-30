const router = require("express").Router();
const { Mood, User, Activity, AUM } = require("../models");
const Op = require("sequelize").Op;
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  res.render("loginPage", {});
});

// *********************  TEST ROUTES FOR DB DEV  ************************ //

// GETS a user with their activities and moods, this is where you use req.params
router.get("/test/user/:id", async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      include: [
        {
          model: AUM,
          attributes: ["id"],
          include: [
            { model: Mood, attributes: ["name"] },
            { model: Activity, attributes: ["title"] },
          ],
        },
      ],
    });

    if (!userData) {
      res.status(400).json({ message: "ERROR" });
    }

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GETS moods with their activities and if the experience was positive or not
router.get("/test/mood/activity", async (req, res) => {
  try {
    const aumData = await Mood.findAll({
      attributes: ["name"],
      include: [
        {
          model: AUM,
          attributes: ["user_id", "result"],
          include: [{ model: Activity, attributes: ["title"] }],
        },
      ],
    });

    if (!aumData) {
      res.status(400).json({ message: "ERROR" });
    }

    res.status(200).json(aumData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GETS the number of times a certain activity was beneficial for a certain mood
router.get("/test/count/:mood/:activity", async (req, res) => {
  try {
    const aumData = await AUM.sum("result", {
      where: {
        mood_id: req.params.mood,
        activity_id: req.params.activity,
      },
    });

    if (!aumData) {
      res.status(400).json({ message: "ERROR" });
    }

    res.status(200).json(aumData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// *********************  END TEST ROUTES  ************************ //

module.exports = router;
