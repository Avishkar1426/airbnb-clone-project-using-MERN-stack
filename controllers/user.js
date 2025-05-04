const User = require('../models/user');

module.exports.rigisterUser = async(req,res)=>{
     try{
        let {username,email,password} = req.body;
        let newUser = new User({email,username});
        let registerdUser = await User.register(newUser,password);
        req.login(registerdUser,(err)=>{
            if(err){
                next();
            }
            req.flash("success","wellcome to wanderlust");
            res.redirect('/wanderlust');
        })
     }catch(e){
        req.flash("error",e.message);
        res.redirect("/wanderlust/user")
     }
}

module.exports.userProfile = async (req,res)=>{
    req.flash("success","Wellcome back to Wanderlust");
    let originalUrl = res.locals.redirectUrl || "/wanderlust";
    res.redirect(originalUrl);
}

module.exports.userLogout = (req,res)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","Goodbye! See you soon");
        res.redirect("/wanderlust")
    })
}