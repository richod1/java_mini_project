const express=require("express")
const app=express()

const cors=require("cors")
const BodyParser=require("body-parser")
const cookieParser=require("cookie-parser")
require("dotenv").config({origin:true,credentials:true})
const compression=require("compression")
app.use(cors())
app.use(cookieParser())
// app.use(BodyParser().json())
app.use(express.json())
app.use(express.urlencoded({extended:true}))



module.exports=app;