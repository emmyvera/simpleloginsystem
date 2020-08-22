const express = require("express")
const app = express()
const db = require("./database/daConnection")

app.use(express.urlencoded({extended:false}));
app.use(express.json());
require("dotenv").config();

db.connect(async(err) => {
    if(err){
        throw err
    }
    const dbOn = await console.log("The Database is up and running...")
})

app.listen(5000, ()=>{
    console.log(`This Webapp is available on port 5000...`)
})

