const mongoose=require("mongoose")

const Schema=mongoose.Schema;

const emailSchema=new Schema({
    removed:{
        type:Boolean,
        default:false,
    },
    enabled:{
        type:Boolean,
        default:false,
    },
    emailKey:{
        type:String,
        lowercase:true,
        required:true,
    },
    emailName:{
        tyep:String,
        required:true,
    },
    emailVariable:{
        type:Array,
    },
    emailBody:{
        type:String,
        required:true,
    },
    emailSubject:{
        typr:String,
        required:true,
    },
    language:{
        type:String,
        default:'us_en'
    },
    created:{
        type:Date,
        default:Date.now,
    },
    updated:{
        type:Date,
        default:Date.now,
    }
});

module.exports=mongoose.model('Email',emailSchema)