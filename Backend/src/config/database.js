import mongoose from "mongoose";

async function connectToDb() {

  mongoose.connect(process.env.MONGO_URI)
  .then(()=>{
    console.log("Connected to MongoDB")
  })
  
} 

export default connectToDb
