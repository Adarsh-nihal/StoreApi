
const express=require("express")
const apiRouter=express.Router()

const {ApiModel}=require("../models/Api.model")

apiRouter.get("/",async(req,res)=>{
   
    try{
        const api=await ApiModel.find();
        res.send(api)
    }
    catch(err){
        console.log(err)
        res.send({"err":"sometihing went wrong"})
    }
})


apiRouter.post("/add",async(req,res)=>{
    let ans=[]
    try{
        for(let i=0; i<req.body.length; i++){
            let data=await ApiModel.findOne({productId:req.body[i].productId})
            if(req.body[i].operation==="add"){
                if(data){
                  ans.push(await ApiModel.findOneAndUpdate({
                  productId:req.body[i].productId,
                  quantity:data.quantity+req.body[i].quantity
                  }))
                }
                else{
                    let {productId,quantity}=req.body[i]
                    ans.push(await ApiModel.create({productId,quantity}))
                }
            }
            else{
                if(data){
                    ans.push(await ApiModel.findOneAndUpdate({
                        productId:req.body[i].productId,
                        quantity:data.quantity-req.body[i].quantity
                    }))
                }
                else{
                    let {productId,quantity}=req.body[i]
                    ans.push(await ApiModel.create({productId,quantity}))
                }
            }
        }
    }
    catch(err){
console.log(err)
res.send({"msg":"something went wrong"})
    }
    })


module.exports={apiRouter}