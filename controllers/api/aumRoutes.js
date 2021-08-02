const router = require("express").Router();
const withAuth = require("../../utils/auth");
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

    const aumData2 = await AUM.findAll({
      where: {
        [Op.and]: [
          { mood_id: req.params.id },
          { user_id: req.params.user },
          { result: false },
        ],
      },
    });

    const aums = aumData.map((aum) => aum.get({ plain: true }));
    const userAum = aumData2.map((aum2) => aum2.get({ plain: true }));
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

    res.status(200).json(results);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", withAuth, async (req, res) => {
  try {
    const newAum = await AUM.create(req.body);

    req.session.save(() => {
      req.session.resultPending = true;

      res.status(200).json(newAum);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", withAuth, async (req, res) => {
  try {
    const newAum = await AUM.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    req.session.save(() => {
      req.session.resultPending = false;

      res.status(200).json(newAum);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
