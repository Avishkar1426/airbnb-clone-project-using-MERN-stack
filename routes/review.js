const express = require("express");
const router = express.Router({mergeParams:true});
const asyncWrap = require("../utils/asyncWrap.js");
const reviews = require("../models/review.js");
const listing = require("../models/listing.js");
const {validateReview,isLoggdeIn,isAuthor} = require("../middalware.js")
const controllers = require("../controllers/review.js");

// review route

router.post("/",isLoggdeIn,validateReview,asyncWrap(controllers.createReview));

// review delete route 

router.delete("/:reviewId", isLoggdeIn,isAuthor, asyncWrap(controllers.deleteReview)) ;

module.exports = router;