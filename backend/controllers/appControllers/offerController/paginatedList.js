const mongoose=require("mongoose")
const Model=mongoose.model('Offer')

const paginatedList=async(req,res)=>{
    const page=req.query.page|| 1;
    const limit=parsInt(req.query.items) || 10;
    const skip=page*limit-limit;

    const {sortBy='enabled',sortValue=-1,filter,equal}=req.query;

    const fieldArray=req.query.fields? req.query.fields.split(',') :[];
    let fields;

    fields=fieldArray.length===0 ? {} :{$or:[]};

    for(const field of fieldArray){
        fields.$or.push({[field]:{$regex:new RegExp(req.query.q,'i')}})
    }

    const resultPromise=Model.find({
        removed:false,

        [filter]:equal,...fields,
    })

    .skip(skip).limit(limit)
    .sort({[sortBy]:sortValue})
    .populate('createdBy','name')
    .exec();

    const countPromise=Model.countDocuments({
        removed:false,
        [filter]:equal,...fields,
    });

    const [result,count]=await Promise.all([resultPromise,countPromise]);

    const pages=Math.ceil(count/limit);


    const pagination={page,pages,count};

    if(count>0){
        return res.status(200).json({
            success:true,
            result,
            pagination,
            message:"Successfully found all documents",
        })
    }else{
        return res.status(203).json({
            success:true,
            result:[],
            pagination,
            message:'Collection is empty'
        })
    }
}

module.exports=paginatedList;