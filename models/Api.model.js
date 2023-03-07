const mongoose=require("mongoose")

const ApiSchema=mongoose.Schema({
    productId:Number,
    quantity:Number,
    operation:String

})

const ApiModel=mongoose.model("api",ApiSchema)

module.exports={ApiModel}