const router = require("express").Router()
const db = require("../../database/daConnection")
const Joi = require("@hapi/joi")
const path = require("path")
const multer = require("multer")
const  fs  = require("fs");

//  THis is for our multer showing it where to upload our file
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
    const dir = "./uploads/";

        if(!fs.existsSync(dir)){
            fs.mkdirSync(dir)
        }

        cb(null, dir)
    },

    // this rename our file uploaded 
    filename:function (req, file, cb) {
        cb(null, file.filename +"-"+ Date.now() + path.extname(file.originalname))
    }
})

// This is check for our image uploaded 
const fileFilter = (req, file, cb) =>{
    if (file.mimetype == "image/jpeg" || file.mimetype == "image/png"){
        cb(null, true)
    }else{
        cb(null, false)
    }
}

const upload = multer({storage:storage, fileFilter:fileFilter})



// this is for seting up our Joi for validation 
const schema = Joi.object({
    username: Joi.string().min(4).required().trim(),
    email: Joi.string().min(7).email().required().trim(),
    password: Joi.string().min(6).required().trim(),
    confirmPassword: Joi.string().min(6).required().trim(),
    phoneNo: Joi.string().min(11).trim(),
    dob: Joi.string().min(6).trim()

})

// This actually do the posting
router.post("/", upload.single("photo"), async(req, res) => {


    // This is for validation
    const {error} = await schema.validate(req.body)
    if(error){
        res.status(400).send(error.details[0].message)
    }

    // this declears our variable in the body of our form 
    const {username, password, confirmPassword, email, phoneNo, dob} = req.body

    // this validate our password
    if(password != confirmPassword) return res.status(400).send("Check Your Password!!!")

    // this does the insert of new entries to the mysql database
    try{

        let file = req.file
        let filename = ""

        // Check for the file if uploaded or not
        if (typeof file !== "undefined"){
            filename = req.file.filename
        }

        const statementToUser = "INSERT INTO `users`(`username`,`password`,`gmail`,`phoneNo`,`DOB`,`image_url`) VALUES(?,?,?,?,?,?);";
        const [insert] = await db.promise().execute(statementToUser,[username, password, email, phoneNo, dob, filename]);
        res.send("Successful " + req.file)

    } catch(err){
        console.log(err)
    }

})

module.exports = router