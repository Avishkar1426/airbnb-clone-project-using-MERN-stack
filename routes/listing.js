const express = require("express");
const router = express.Router();
const asyncWrap = require("../utils/asyncWrap.js");
const listing = require("../models/listing.js");
const {isLoggdeIn,isOnwer,validateListing} = require("../middalware.js")
const controllers = require("../controllers/listing.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage:storage});


router.get("/",asyncWrap(async (req,res) => {
    const initData = await listing.find({});
    res.render("listings/index.ejs",{initData});
}));
// show route
router.route("/:id/show") 
.get(asyncWrap(controllers.listingShow));

 // new route
 router.get("/newData",isLoggdeIn,asyncWrap(controllers.newData));

router.post("/newInfo",upload.single("listing[image]"),validateListing,asyncWrap(controllers.createData));


// edit route

router.get("/:id/edit",isLoggdeIn,isOnwer,asyncWrap(controllers.editData));

router.put("/:id/update",isLoggdeIn,isOnwer,upload.single("listing[image]"),validateListing,asyncWrap(controllers.updateData));

// search route

router.get("/search",asyncWrap(controllers.searchEngine));

// delete route

router.delete("/:id/delete",isLoggdeIn,isOnwer,asyncWrap(controllers.deleteData));

 module.exports = router;