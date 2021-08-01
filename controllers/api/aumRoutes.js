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
    console.log(aumData);
    console.log("++++++++++++++++++++++++++++++++++");
    const aums = await aumData.map((aum) => aum.get({ plain: true }));
    console.log(aums);

    res.status(200).json(aums);
  } catch (err) {
    res.status(500).json(err);
  }
});
// :mood/:user
router.get("/activityExUser/", async (req, res) => {
  try {
    const aumData = await Activity.findAll({
      include: [{ model: AUM }],
    });

    if (!aumData) {
      res.status(400).json({ message: "ERROR" });
    }
    console.log(aumData);
    console.log("++++++++++++++++++++++++++++++++++");
    const aums = await aumData.map((aum) => aum.get({ plain: true }));
    console.log(aums);

    res.status(200).json(aums);
  } catch (err) {
    res.status(500).json(err);
  }
});

// const aumData = await Activity.findAll({
//   include: [
//     {
//       model: AUM,
//       where: {
//         [Op.not]: [
//           {
//             [Op.and]: [
//               { mood_id: req.params.mood },
//               { user_id: req.params.user },
//               { result: false },
//             ],
//           },
//         ],
//       },
//     },
//   ],
// });

router.get("/activityExUser/:mood/:user", async (req, res) => {
  try {
    const aumData = await Activity.findAll({
      include: [
        {
          model: AUM,
          where: {
            [Op.not]: [
              {
                [Op.and]: [
                  { mood_id: req.params.mood },
                  { user_id: req.params.user },
                  { result: false },
                ],
              },
            ],
          },
        },
      ],
    });

    if (!aumData) {
      res.status(400).json({ message: "ERROR" });
    }
    console.log(aumData);
    console.log("++++++++++++++++++++++++++++++++++");
    const aums = await aumData.map((aum) => aum.get({ plain: true }));
    console.log(aums);

    res.status(200).json(aums);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
