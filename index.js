const express=require("express")
const {connection}=require("./Config/db")
const {apiRouter}=require("./route/api.route")
require("dotenv").config()

const app=express()
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("hello")
})

app.use("/api",apiRouter)
app.listen(process.env.PORT,async()=>{
    try{
        await connection;
        console.log("db connected successfull")
    }
    catch(err){
        console.log("db connection is fail")
        console.log(err)
    }
})