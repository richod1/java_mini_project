const mongoose=require("mongoose")


const read=async(userModel,req,res)=>{
    const User=mongoose.model(userModel);

    const tmpResult=await User.findOne({
        _id:req.params.id,
        removed:false,
    }).exec();

    if(!tmpResult){
        return res.status(404).json({
            success:false,
            result:null,
            message:'No document found',
        })
    }else{
        let result={
            _id:tmpResult._id,
            enabled:tmpResult.enabled,
            email:tmpResult.email,
            name:tmpResult.name,
            surname:tmpResult.surname,
            photo:tmpResult.photo,
            role:tmpResult.role,
        };
        return res.status(200).json({
            success:true,
            result,
            message:'we found this document',
        })
    }
};

module.exports=read;