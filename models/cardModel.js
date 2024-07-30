const mongoose=require('mongoose')

const CardSchema = new mongoose.Schema({
    title: String, 
    desc: String
    ,mx:Number
 });
const Card =mongoose.model("Cards",CardSchema)
module.exports=Card