const express = require("express");
const controller = require("../controllers/controller.js");

const router = express.Router();

//GET "/": Render the Travel page when the user accesses the home page.
router.get("/", controller.travel);

//GET "/travel": Render the Travel page 
router.get("/travel", controller.travel);

router.get("/locus", controller.locus);


module.exports = router;
