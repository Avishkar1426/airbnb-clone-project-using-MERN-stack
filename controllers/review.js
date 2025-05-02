const reviews = require('../models/review');
const listing = require('../models/listing');


module.exports.createReview = async (req,res) =>{
    let {id} = req.params;
    let newReview = new reviews(req.body.review);
    newReview.author = req.user._id;
    let listingData = await listing.findById(id);
    newReview.save();
    listingData.reviews.push(newReview);
    await listingData.save();
    req.flash("success", "review created successfully");
    res.redirect(`/wanderlust/${id}/show`);
}

module.exports.deleteReview = async (req,res) =>{
    let {id,reviewId} = req.params;
    await reviews.findByIdAndDelete(id);
    await listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}})
    res.redirect(`/wanderlust/${id}/show`);
 }
