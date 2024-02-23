const mongoose=require(mongoose)


const connectDb=()=>{
    mongoose.connect(`${process.env.MONGO_URL}`).then((response)=>{
        console.log("Database connected successfully!",response);
    }).catch(err=>console.log("failed to connect database",err))
}

module.exports=connectDb;