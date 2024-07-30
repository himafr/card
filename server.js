require("dotenv").config();
const mongoose = require('mongoose');
const app=require('./app')
const PORT = process.env.PORT || 3000

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB);
    console.log("connected to database");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("listening for requests");
    })
})
