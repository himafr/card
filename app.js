const express =require("express")
const app = express()
const bodyParser =require("body-parser")
app.set("view engine","ejs");
const cardRoute=require('./routes/cardRoute')
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))


const users =[{
    id:50,
    name:"hima"
    ,password:"zx123"
}]
app.post("/login",(req,res)=>{
    const user = req.body.user;
    const pass = req.body.pass;
    const allcards= Cards.find({})  
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

app.use('cards',cardRoute)

                app.get("/admin",(req,res)=>{
                    Cards.find({}).then( (allcards)=>{ 
                        Titles.find({}).then((lec)=>{
                            res.render("admin",{cas:allcards,logged:0,"id":1,mas:lec})
                        })
                        // mongoose.connection.close()
            })
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

module.exports=app
