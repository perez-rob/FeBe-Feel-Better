const router = require("express").Router();

const apiRoutes = require("./api");

const homeRoutes = require("./homeRoutes");

router.use("/", homeRoutes);
router.use("/api", apiRoutes);

router.use("*", (req, res) => {
  res
    .status(404)
    .send(`<h1>404 - ${req.originalUrl} is not a valid endpoint for FeBe</h1>`);
});

module.exports = router;
