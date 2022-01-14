const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv').config();
const app = express();
const pinRoute = require("./routes/pins");
const userRoute = require("./routes/users");

app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("MongoDB Connected!");
    })
    .catch((err)=>console.log(err));

app.use("/api/pins", pinRoute);
app.use("/api/users", userRoute);


app.listen(8800, ()=>{
    console.log("Bakend server is runing");
})