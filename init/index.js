const mongoose = require("mongoose");
const initData = require("./data2");
const listing = require("../models/listing.js");

async function main(){
  await  mongoose.connect('mongodb://127.0.0.1:27017/wonderlust')
}

main().then(()=>{
    console.log("connection succesesful");
}).catch((err) =>{
    console.log(err);
})

    const init = async () =>{
        await listing.deleteMany({});
      let data = initData.data.map((obj) => ({
            ...obj, 
            owner: "67ffb23863dfcfb54ea2fdfd"
        }));
       await listing.insertMany(data);
        console.log("all data is deleted");
    }

    init();
   
     
   
