const mongoose=require('mongoose')

const Title =mongoose.model("Title",{
    name:String
})
module.exports=Title