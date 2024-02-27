const {migrate}=require("./migrate")

const read=async (Model,req,res)=>{
    let result=await Model.findOne({
        _id:req.params.id,
        removed:false,
    }).exec();

    if(!result){
        return res.status(404).json({
            success:false, 
            result:null,
            message:'No document found',
        })
    }else{
        const migrateData=migrate(result);

        return res.status(200).json({
            success:true,
            result:migrateData,
            message:'we found this document',
        })
    }
}

module.exports=read;