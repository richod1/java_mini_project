const mongoose=require("mongoose")
const Model=mongoose.model('Offer')


const read=async(req,res)=>{
    const result=await Model.findOne({
        _id:req.params.id,
        removed:false,
    }).populate('createdBy','name').exec();

    if(!result){
        return res.status(400).json({
            success:false,
            result:null,
            message:"No documents found!",
        })
    }else{
        return res.status(200).json({
            success:true,
            result,
            message:"we found a documents",
        })
    }
}

module.exports=read;