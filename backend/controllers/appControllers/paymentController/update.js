const mongoose=require("mongoose")
const Model=mongoose.model('Payment')
const Invoice=mongoose.model('Invoice')

const custom=require("../../pdfController")
const {calculate}=require("../../../helpers")

const update=async(req,res)=>{
    const {amount}=req.body;
    if(amount===0){
        return res.status(202).json({
            success:false,
            result:null,
            message:`The Minimum Amount couldn't be 0`,
        })
    };

    const previousPayment=await Model.findOne({
        _id:req.params.id,
        removed:false,
    })

    const {amount:previousAmount}=previousPayment;
    const {id:invoiceId,total,discount,credit:previousCredit}=previousPayment.invoice;

    const {amount:currentAmount}=req.body;

    const changeAmount=calculate.sub(currentAmount,previousAmount);
    const maxAmount=calculate.sub(total,calculate.add(discount,previousCredit));

    if(changeAmount > maxAmount){
        return res.status(202).json({
            success:false,
            result:null,
            message:`The Max Amount you can add is ${maxAmount + previousAmount}`,
            error:`The Max Amount you can is ${maxAmount + previousAmount}`,

        });
    }


    let paymentStatus=calculate.sub(total,discount)===calculate.add(previousCredit,changeAmount)
    ? 'paid' : calculate.add(previousCredit,changeAmount) > 0 ?'partially':'unpaid';
    const updatedDate=new Date();
    const updates={
        number:req.body.number,
        date:req.body.date,
        amount:req.body.amount,
        paymentMode:req.body.paymentMode,
        ref:req.body.ref,
        description:req.body.description,
        upadetd:updatedDate,
    }

    const result=await Model.findOneAndUpdate({
        _id:req.params.id,removed:false
    },{$set:updates},{new:true}).exec();

    const updateInvoice=await Invoice.findOneAndUpdate({_id:result.invoice._id.toString()},{
        $inc:{credit:changeAmount},
        $set:{
            paymentStatus:paymentStatus,
        },
    },{new:true}).exec();

    return res.status(200).json({
        success:true,
        result,
        message:'Successfully updated the payment',
    })


}


module.exports=update;