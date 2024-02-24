const mongoose=require("mongoose")

const Model=mongoose.model('Setting');

const listAllSettings=async ()=>{
    try{
        // Query the datebase fro list of all results

        const result=await Model.find({
            removed:false,
        }).exec();

        if(result.length > 0){
            return result;
        }else{
            return [];
        }
    }catch{
        return [];
    }
}

module.exports=listAllSettings;