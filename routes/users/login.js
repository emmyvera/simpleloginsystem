const router = require("express").Router()
const db = require("../../database/daConnection")
const Joi = require("@hapi/joi")

const schema = Joi.object({
    username: Joi.string().min(4).required().trim(),
    password: Joi.string().min(6).required().trim()
})

router.post("/", async(req, res)=> {

    const { username, password } = req.body

    // Check Username Provided if it exist
    const userValidStm = "SELECT `username` FROM `users` WHERE `username` = ?"
    const row = db.execute(userValidStm, [username], (err, result)=>{
        res.send(result)
    })

    // check if password are the same if user exist
    // create and Display json web token
    // middleware for varefying jwt
    //create file details route
    // move to the android App

    try{

    }catch(err){
        console.log(err)
    }
})

module.exports = router