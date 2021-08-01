const router = require("express").Router();
const activityRoutes = require("./activityRoutes");
const moodRoutes = require("./moodRoutes");
const userRoutes = require("./userRoutes");
const aumRoutes = require("./aumRoutes");

router.use("/activity", activityRoutes);
router.use("/mood", moodRoutes);
router.use("/user", userRoutes);
router.use("/aum", aumRoutes);

module.exports = router;
