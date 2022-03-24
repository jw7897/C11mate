const express = require("express");
const controller = require("../controllers/controller.js");

const router = express.Router();

//GET "/": Render the Travel page when the user accesses the home page.
router.get("/", controller.travel);

//GET "/travel": Render the Travel page 
router.get("/travel", controller.travel);

//GET "/locus": Render the Locus page 
router.get("/locus", controller.locus);

//GET "/locus": Render the Compare page 
router.get("/compare", controller.locus);

router.post("/locus", controller.locusShow);

module.exports = router;
