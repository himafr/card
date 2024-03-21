require("dotenv").config()
const express =require("express")
const app = express()
app.use(express.static("public"))
const bodyParser =require("body-parser")
app.use(bodyParser.urlencoded({extended:true}))
app.set("view engine","ejs");
const mongoose = require('mongoose');


const PORT = process.env.PORT || 3000

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB);
    console.log("zx");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
        
    const Cardsschema = new mongoose.Schema({
    title: String, 
    desc: String
    ,mx:Number
 });
const Cards =mongoose.model("Cards",Cardsschema)
const Titles =mongoose.model("Titles",{
    name:String
})
const users =[{
    id:50,
    name:"hima"
    ,password:"zx123"
}]
app.post("/login",(req,res)=>{
    const user = req.body.user;
    const pass = req.body.pass;
    const allcards= Cards.find({})
    
    // mongoose.connection.close()
    let iid =0;
    for(var element of users){
        if(user ==element.name&&pass==element.password){
            iid =element.id
        }   
    }  if(iid==0){   
        res.send("<h1>please check your email or oassword !")
    }
    else{
        console.log(iid)
        res.render("admin",{cas:allcards,logged:0,"id":iid})
    }
})

// var x=""
// Cards.find().then((fruits) => {
    // x=fruits
    // });
    // console.log(x)
    
    //  Cards.find({}).countDocuments().then((aa)=>{
        //     console.log(aa)
        // });
        //    var z=Cards.find({}).then((as)=>{
            // console.log(as)
            //    })
            // console.log(z)
            
            app.get("/",(req,res)=>{
                        Cards.find({}).then( (allcards)=>{  
                         Titles.find({}).then((lec)=>{
                            
                             res.render("index",{cas:allcards,mas:lec})
                         })
                            // mongoose.connection.close()
                        })
                })
                app.get("/admin",(req,res)=>{
                    Cards.find({}).then( (allcards)=>{ 
                        Titles.find({}).then((lec)=>{
                            res.render("admin",{cas:allcards,logged:0,"id":1,mas:lec})
                        })
                        // mongoose.connection.close()
            })
        })
            // app.post("/login",(req,res)=>{
                //     try{
                    //     const name = req.body.tes
                    //     const password = req.body.test
                    // if(name==admin.name&&password==admin.password){
                        //     res.render("admin",{"logged":1})
                        // }else{
                            //     res.render("admin",{"logged":2})
// }
// }catch{
    //     res.send("something went wrong pls try again later")
    // }
    // })
    app.post("/addCard",(req,res)=>{
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
})
    app.post("/addTitle",(req,res)=>{
        try{
            const cardTitle =req.body.Title
            // const cardmx =req.body.mx
            console.log(cardTitle)
            const title  = new Titles({  
                name: cardTitle, 
            });
            title.save();        
            res.redirect("/admin") 
            
        }catch{
            res.send("something went wrong")
        }
})

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



connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("listening for requests");
    })
})
