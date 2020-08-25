const router = require("express").Router()
const db = require("../../database/daConnection")
const Joi = require("@hapi/joi")
const jwt = require("jsonwebtoken")

const schema = Joi.object({
    username: Joi.string().min(4).required().trim(),
    password: Joi.string().min(6).required().trim()
})

router.post("/", async(req, res)=> {

    const { username, password } = req.body

    var loginReg = []
    const userValidStm = "SELECT `id`,`username`, `password` FROM `users` WHERE `username` = ?"
    const row = db.execute(userValidStm, [username], (err, result)=>{
        loginReg = result

        // Check Username Provided if it exist
        if(result.length === 0){
            res.status(400).send("Invalid username or password")
        }else if(result[0].password !== password){
            // check if password are the same if user exist
            res.status(400).send("Wrong Password")
        }else{
            // create and Display json web token
            const token = jwt.sign({id:result[0].id}, "secret-hack")
            res.header("auth-token", token).json({
                id: result[0].id,
                token:token
            })
            //res.send("You are logged in!!!")
        }
    })

    // move to the android App

    try{

    }catch(err){
        console.log(err)
    }
})

module.exports = router