const router = require("express").Router();
const { Mood, Activity, AUM, User } = require("../../models");
const Op = require("sequelize").Op;

router.get("/activityByMood/:id", async (req, res) => {
  try {
    const aumData = await AUM.findAll({
      group: "activity_id",
      where: {
        mood_id: req.params.id,
        result: true,
      },
      include: [{ model: Activity }],
    });

    if (!aumData) {
      res.status(400).json({ message: "ERROR" });
    }
    const aums = await aumData.map((aum) => aum.get({ plain: true }));
    console.log(aums);

    res.status(200).json(aums);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/activityExUser/:mood/:user", async (req, res) => {
  try {
    const activityData = await Activity.findAll();

    const aumData = await AUM.findAll({
      where: {
        [Op.and]: [
          { mood_id: req.params.mood },
          { user_id: req.params.user },
          { result: false },
        ],
      },
    });

    // if (!aumData) {
    //   res.status(400).json({ message: "ERROR" });
    // }

    const activities = activityData.map((act) => act.get({ plain: true }));
    const aums = aumData.map((aum) => aum.get({ plain: true }));
    console.log(activities);
    console.log(aums);
    let results = [];
    let toAdd = true;
    for (let i = 0; i < activities.length; i++) {
      for (let j = 0; j < aums.length; j++) {
        if (
          activities[i].id === aums[j].activity_id &&
          aums[j].result === false
        ) {
          toAdd = false;
        }
      }
      if (toAdd === true) {
        results.push(activities[i]);
      } else {
        toAdd = true;
      }
    }
    console.log(results);
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
