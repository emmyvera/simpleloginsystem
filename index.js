const express = require("express")
const app = express()
const db = require("./database/daConnection")

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(__dirname))

require("dotenv").config();

db.connect(async(err) => {
    if(err){
        throw err
    }
    const dbOn = await console.log("The Database is up and running...")
})

//All Route
const registration = require("./routes/users/resgister")
app.use("/register", registration)

const login = require("./routes/users/login")
app.use("/login", login)

const upImage = require("./routes/testUpload")
app.use("/up", upImage)

app.listen(5000, ()=>{
    console.log(`This Webapp is available on port 5000...`)
})

