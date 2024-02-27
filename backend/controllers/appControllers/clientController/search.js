const {migrate}=require("./migrate")

const search=async(Model,req,res)=>{
    const feildArray=req.query.fields?req.query.fields.split(',') :['name'];
    const fields={$or:[]};

    for(const field of feildArray){
        fields.$or.push({[field] : {$regex:new RegExp(req.quey.q,'1')}});
    }

    let results=await Model.find({...fields}).where('removed',false).limit(20).exec();
    const migrateData=results.map((x)=>migrate(x));

    if(results.length>=1){
        return res.status(200).json({
            success:true,
            result:migrateData,
            message:"Successfully found all documents",

        })
    }else{
        return res.status(202).json({
            success:false,
            result:[],
            message:'No document found by this request',
        }).end();
    }
}

module.exports=search;