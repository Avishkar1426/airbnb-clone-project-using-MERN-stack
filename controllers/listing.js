const listing = require("../models/listing");

const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({accessToken:mapBoxToken});

module.exports.listingShow = async (req,res) =>{
    let {id} = req.params;
    let show = await listing.findById(id).populate({
      path:"reviews",
     populate:{
      path:"author"
     },
    
    }).populate("owner");
    if(!show){
      req.flash("error", "Listing you requested for does not exist");
      res.redirect("/wanderlust")
    }
    res.render("listings/show.ejs",{show});
}

module.exports.newData = (req,res) =>{
    res.render("listings/new.ejs")
}

module.exports.createData = async (req,res) =>{
let response = await geocodingClient

.forwardGeocode({
  query: req.body.listing.location,
  limit: 1
})
.send()
 
  let coordinates = response.body.features[0].geometry.coordinates;
  let url = req.file.path;
  let filename = req.file.filename;
  let newListing = new listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = {url,filename};
  newListing.geometry = {type:"Point",coordinates};
  await newListing.save();
  req.flash("success", "Listing created successfully")
  res.redirect(`/wanderlust/${newListing._id}/show`);
}

module.exports.editData = async (req,res) =>{
    let {id} = req.params;
    let data = await listing.findById(id);
    if(!data){
      req.flash("error", "Listing you requested for does not exist");
      res.redirect("/wanderlust")
    }
     
    let originalImageUrl = data.image.url;
    originalImageUrl.replace("/upload", "/upload/c_scale,h_100,w_200/")

    res.render("listings/edit.ejs",{data})
}

module.exports.updateData = async (req,res)=>{
  let {id} = req.params;
  let Listing = await listing.findByIdAndUpdate(id,{...req.body.listing});
  let response = await geocodingClient

.forwardGeocode({
  query: req.body.listing.location,
  limit: 1
})
.send()
let coordinates = response.body.features[0].geometry.coordinates;
Listing.geometry = {type:"Point",coordinates};
await Listing.save();


   if(typeof req.file !== "undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    Listing.image = {url,filename};
    await Listing.save();
   }
  
   req.flash("success", "Listing edit successfully")
   res.redirect(`/wanderlust/${id}/show`);
}
  


module.exports.deleteData = async (req,res) =>{
    let {id} = req.params;
    await listing.findByIdAndDelete(id);
    req.flash("success", "Listing delete successfully");
    res.redirect("/wanderlust");
}

module.exports.searchEngine = async (req,res) =>{
  let {search} = req.query;
  let searchData = await listing.find({$or:[{title:{$regex:search,$options:"i"}},{location:{$regex:search,$options:"i"}}]}).populate("owner").limit(10);
  if(searchData.length === 0){
    req.flash("error", "No listing found")
    res.redirect("/wanderlust")
  }
  res.render("listings/search.ejs",{searchData})
}
