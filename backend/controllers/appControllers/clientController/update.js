const mongoose=require("mongoose")

const update=async(Model,req,res)=>{
    //finding fields by id and updating with required field
    return res.status(200).json({
        success:false,
        result:null,
        message:'Cannot update client once is created'
    })
}

module.exports=update;