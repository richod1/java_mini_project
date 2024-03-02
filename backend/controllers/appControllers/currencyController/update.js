const update=async(Model,req,res)=>{
    const updates={...req.body};

    if(updates.hasOwnProperty('removed')){
        delete updates.removed;
    }

    if(updates.hasOwnProperty('currency_code')){
        delete updates.currency_code;
    }

    const result=await Model.findOneAndUpdate({_id:req.params.id,removed:false},updates,{
        new:true,
        runValidators:true,
    }).exec();

    if(!result){
        return res.status(400).json({
            success:false,
            result:null,
            message:'No document found',
        })
    }else{
        return res.status(200).json({
            success:true,
            result,
            message:'we update the document',
        })
    }


}

module.exports=update;