const router = require("express").Router();
const { Mood, Activity, AUM, User } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const moodEl = await Mood.findAll({
      attributes: ["name", "description"],
    });
    res.status(200).json(moodEl);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const moodE2 = await Mood.findByPk(req.params.id);

    if (!moodE2) {
      res.status(400).json({ message: "ERROR: No mood found with that ID" });
    }

    res.status(200).json(moodE2);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const postMood = await Mood.create({
      ...req.body,
    });
    res.status(200).json(postMood);
  } catch (err) {
    res.status(400).json(err);
  }
});
router.put("/:id", async (req, res) => {
  try {
    const updateMood = await Mood.update(
      {
        name: req.body.name,
        description: req.body.description,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(updateMood);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleteMood = await Mood.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(deleteMood);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
