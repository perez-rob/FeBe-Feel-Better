const router = require("express").Router();
const { Mood, Activity, AUM, User } = require("../../models");
const Op = require("sequelize").Op;

router.get("/activityByMood/:id/:user", async (req, res) => {
  try {
    const aumData = await AUM.findAll({
      group: "activity_id",
      where: {
        mood_id: req.params.id,
        result: true,
      },
      include: [{ model: Activity }],
    });
    console.log("================");
    const aumData2 = await AUM.findAll({
      where: {
        [Op.and]: [
          { mood_id: req.params.id },
          { user_id: req.params.user },
          { result: false },
        ],
      },
    });

    console.log("USER", req.session.user_id);
    const aums = aumData.map((aum) => aum.get({ plain: true }));
    console.log("AUM1", aums);
    const userAum = aumData2.map((aum2) => aum2.get({ plain: true }));
    console.log("USERAUM", userAum);
    let results = [];
    let toAdd = true;
    for (let i = 0; i < aums.length; i++) {
      for (let j = 0; j < userAum.length; j++) {
        if (
          aums[i].activity.id === userAum[j].activity_id &&
          userAum[j].result === false
        ) {
          toAdd = false;
        }
      }
      if (toAdd === true) {
        results.push(aums[i]);
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
