const router= require('express').Router();

const apiRoutes= require('./api');

const homeRoutes= require ('./homeRoutes');

router.use('/',homeRoutes);
router.use('/api',apiRoutes); 

module.exports=router; 
// const router = require("express").Router();
// const apiRoutes = require("./api");
// const homeRoutes = require("./homeRoutes");

// router.use("/api", apiRoutes);
// router.use("/", homeRoutes);

// // might need to edit or comment this out
// router.use("*", (req, res) => {
//   res
//     .status(404)
//     .send(
//       `<h1>404 - ${req.originalUrl} is not a valid endpoint for Bare Blogger</h1>`
//     );
// });

// module.exports = router;

