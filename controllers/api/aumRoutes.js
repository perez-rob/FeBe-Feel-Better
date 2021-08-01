const router = require("express").Router();
const { Mood, Activity, AUM, User } = require("../../models");

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

    res.status(200).json(aumData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
