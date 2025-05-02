const mongoose = require("mongoose");
const schema = mongoose.Schema;
const review = require("./review.js");
const User = require("./user.js");
const { required } = require("joi");

const bluePrint = new schema({
    title:{
        type:String,
        required: true
    },
    description:{
        type:String
    },
    image:{
       url:String,
       filename:String,
    },
    price:{
        type:Number,
        required: true
    },
    
    location:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    reviews:[{
        type: schema.Types.ObjectId,
        ref:"Review"
    }],
    owner:{
        type:schema.Types.ObjectId,
        ref:"User"
    },
    geometry:{
        type:{
            type:String,
            enum:["Point"],
            required:true
        },
        coordinates:{
            type:[Number],
            required:true
        }
    }
});

bluePrint.post("findOneAndDelete", async (data)=>{
  if(data){
    await review.deleteMany({ _id:{$in: data.reviews}})
  }
})

const Listing = mongoose.model("Listing", bluePrint);

module.exports = Listing;




