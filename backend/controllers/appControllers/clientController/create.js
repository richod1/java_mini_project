const mongoose=require("mongoose")
const People=mongoose.model("People")
const Company=mongoose.model("Company")

// creating a document in a list of collection to rge database
const create=async(Model,req,res)=>{
    if(req.body.type==='people'){
        if(!req.body.people){
            return res.status(403).json({
                success:false,
                message:'Please selct people',
            })

        }else{
            let client=await Model.findOne({
                people:req.body.people,
                removed:false
            });

            if(client){
                return res.status(403).json({
                    success:false,
                    result:null,
                    message:'Client Already Exist'
                })
            }

            let {firstname,lastname}=await People.findOneAndUpdate({
                _id:req.body.people,
                removed:false,
            },{
                isClient:true
            },{
                new:true,
                runValidators:true,
            }).exec();
            req.body.name=firstname + '' + lastname;
            req.body.company=undefined;
        }
    }else{
        if(!req.body.company){
            return res.status(403).json({
                success:false,
                message:'Please select a company'
            })
        }else{
            let client=await Model.findOne({
                company:req.body.company,
                removed:false
            });
            if(client){
                return res.status(403).json({
                    sucess:false,
                    result:null,
                    message:"Client Already Exist",

                });
            }
            let {name}=await Company.findOneAndUpdate({_id:req.body.company,removed:false},{isClient:true},{new:true,runValidators:true}).exec();
            req.body.name=name;
            req.body.people=undefined;
        }
    }

    req.body.removed=false;
    const result=await new Model({
        ...req.body,
    }).save();


    return res.status(200).json({
        success:true,
        result,
        message:"Successfully created the document in the model"
    })
}

module.exports=create;