const mongoose=require("mongoose")


const Model=mongoose.model('Invoice')
const ModalPayment=mongoose.model('Payment')

const remove=async(req,res)=>{
    const deleteInvoice=await Model.findOneAndUpdate({
        _id:req.params.id,
        removed:false,
    },{
        $set:{
            removed:true,
        },
    }).exec();

    if(!deleteInvoice){
        return res.status(404).json({
            success:false,
            result:null,
            message:'Invoice not found',
        })
    }
    const paymentsInvoice=await ModalPayment.updateMany({
        invoice:deleteInvoice._id
    },{$set:{removed:true}});
    return res.status(200).json({
        success:true,
        result:deleteInvoice,
        message:'Invoice deleted successfully',
    })
}

module.exports={
    remove,
}