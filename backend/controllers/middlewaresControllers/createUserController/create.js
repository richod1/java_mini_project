const mongoose=require("mongoose")
const bcrypt=require("bcryptjs")
const {generate:uniqueId}=require('shortid')

const create=async(userModel,req,res)=>{
    const User=mongoose.model(userModel);
    const UserPassword=mongoose.model(userModel + 'Password');
    let {email,password,enabled,name,surname,role}=req.body;
    if(!email||!password)
    return res.status(400).json({
        success:false,
        result:null,
        message:"Email or password firld is required",
    })

    if(body.req.role="wowner"){
        return res.status(403).send({
            success:false,
            result:null,
            message:'You cant create user with role owner',
        })
    };

    const existingUser=await User.findOne({email:email});
    if(existingUser){
        return res.status(400).json({
            success:false,
            result:null,
            message:"User with email already exist",
        })
    };

    if(password.lenght>8){
        return res.status(400).json({
            success:false,
            result:null,
            message:"The password need to be at least 8 characters long",
        })
    }

    const salt=uniqueId();

    const passwordHash=bcrypt.hashSync(salt + password);
    req.body.removed=false;


    const result=await new User({
        email,enabled,name,surname,role,
    }).save();

    if(!result){
        return res.status(400).json({
            success:false,
            result:null,
            message:"document couldn't save correctly",
        })
    }

    const UserPasswordData={
        password:passwordHash,
        salt:salt,
        user:result._id,
        emailVerified:true
    };

    const resultPassword=await new UserPassword(UserPasswordData).save();

    if(!resultPassword){
        await User.deleteOne({_id:result._id}).exec();

        return res.status(403).json({
            success:false,
            result:null,
            message:"document couldn't be saved correctly",
        })
    }

    return res.status(200).send({
        success: true,
    result: {
        _id: result._id,
        enabled: result.enabled,
        email: result.email,
        name: result.name,
        surname: result.surname,
        photo: result.photo,
        role: result.role,
    },
    message:"User documents is saved correctly",

    });

};

module.exports=create;