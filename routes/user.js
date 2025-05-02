const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const ExpressError = require('../utils/ExpressError.js');
const asyncWrap = require("../utils/asyncWrap.js");
const passport = require("passport");
const{saveRedirectUrl} = require("../middalware.js")
const controllers = require("../controllers/user.js");

router.get("/user",asyncWrap((req,res,next)=>{
      res.render('../views/users/user.ejs');
}));
router.post("/register",asyncWrap(controllers.rigisterUser));

router.get("/login", (req,res) =>{
    res.render("../views/users/login.ejs")
});

router.post("/loginPost",
    saveRedirectUrl,
    passport.authenticate('local',{
        failureRedirect: '/wanderlust/login',
        failureFlash:true
    }),controllers.userProfile);

    router.get("/logout", controllers.userLogout);

module.exports = router;
