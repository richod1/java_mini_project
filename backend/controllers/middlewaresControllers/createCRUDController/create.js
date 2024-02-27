const create=async (Model,req,res)=>{
    req.body.removed=false;
    const result=await new Model({
        ...req.body,
    }).save();

    return res.status(200).json({
        success:true,
        result,
        message:'Successfully created the document in the Model'
    })
}

module.exports=create;