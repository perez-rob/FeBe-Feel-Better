const router = require("express").Router();
const activityRoutes = require("./activityRoutes");
const moodRoutes = require("./moodRoutes");
const userRoutes = require("./userRoutes");

router.use("/activity", activityRoutes);
router.use("/mood", moodRoutes);
router.use("/user", userRoutes);

module.exports = router;
