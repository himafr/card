const Card=require('../models/cardModel')
const Title=require('../models/titleModel')

exports.allCards=(req,res)=>{
    Card.find({}).then( (allcards)=>{  
     Title.find({}).then((lec)=>{
        console.log(allcards)
         res.render("index",{cas:allcards,mas:lec})
     })
        // mongoose.connection.close()
    })
}
exports.addCard=(req,res)=>{
    try{
        const cardTitle =req.body.cardName
        const cardDesc =req.body.cardDesc
        const cardmx =req.body.mx
        console.log(cardmx)
        const card = new Cards({  
            title: cardTitle, 
            desc: cardDesc,
            mx:cardmx    
        });
        card.save();        
        res.redirect("/admin") 
        
    }catch{
        res.send("something went wrong")
    }
}


app.post("/delete",(req,res)=>{
    const id= req.body.id
    console.log(id)
    Cards.findByIdAndDelete(id).then(()=>{
        res.redirect("/admin")
    })
    
})
app.post("/update",(req,res)=>{
    const id =req.body.id
    const title =req.body.editTitle
    const desc =req.body.editDesc
    const cardmx =req.body.mx
   
    Cards.findByIdAndUpdate(id,{title:title,desc:desc,mx:cardmx}).then(
        res.redirect("/admin")
    )
})
