const Listing = require("./models/listing.js");
const {listingSchema,reviewSchema} = require("./schema.js");  
const ExpressError = require('./utils/ExpressError.js');
const Reviews = require("./models/review.js");
module.exports.isLoggdeIn = (req,res,next) =>{
    if(!req.isAuthenticated()){
       req.session.redirectUrl = req.originalUrl;
         req.flash("error","you need to login");
        return res.redirect("/wanderlust/login")
    }
    next();
}

module.exports.saveRedirectUrl = (req,res,next)=>{
  if(req.session.redirectUrl){
    res.locals.redirectUrl = req.session.redirectUrl;   
  }

  next();
}

module.exports.isOnwer = async (req,res,next) =>{
   let {id} = req.params;
   let listing = await Listing.findById(id);
   if(!listing.owner.equals(res.locals.currUser._id)){
       req.flash("error","You don't have permetion");
      return res.redirect(`/wanderlust/${id}/show`);
   }
   next()
}
module.exports.isAuthor = async (req,res,next) =>{
   let {id,reviewId} = req.params;
   let review = await Reviews.findById(reviewId);
   if(!review.author.equals(res.locals.currUser._id)){
       req.flash("error","You don't have permetion");
      return res.redirect(`/wanderlust/${id}/show`);
   }
   next()
}

// this function for validation error

module.exports.validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
      let errMsg = error.details.map((el) => el.message).join(",");
      throw new ExpressError(400, errMsg);
  } else {
      next();
  }
};


// this function for review validation error

 module.exports.validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
  };