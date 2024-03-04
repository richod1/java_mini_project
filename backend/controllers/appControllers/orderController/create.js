const {loadSettings,increaseBySettingKey}=require("../../../middlwares/settings")

const {generateUniqueNumber}=require("../../../middlewares/inventory")


const create=async (Model,req,res)=>{
    let body=req.body;

    body['createdBy']=req.admin._id;

    const settings=await loadSettings();
    const last_order_number=settings['last_order_number'];
    body.number=generateUniqueNumber(last_order_number);

    const result=await new Model(body).save();

    increaseBySettingKey({
        settingKey:'last_order_number',
    });

    return res.status(200).json({
        success:true,
        result,
        message:"Order created successfully",
    })
}

module.exports=create;