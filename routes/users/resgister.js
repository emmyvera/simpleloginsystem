const router = require("express").Router()
const db = require("../../database/daConnection")
const Joi = require("@hapi/joi")
const path = require("path")
const multer = require("multer")

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '/uploads/'))
    },

    filename:function (req, file, cb) {
        cb(null, file.fieldname+'-'+Date.now())
    }
})

const fileFilter = (req, file, cb) =>{
    if (file.mimetype == "image/jpeg" || file.mimetype == "image/png"){
        cb(null, true)
    }else{
        cb(null, false)
    }
}

const upload = multer({storage:storage, fileFilter:fileFilter})



const schema = Joi.object({
    username: Joi.string().min(4).required().trim(),
    email: Joi.string().min(7).email().required().trim(),
    password: Joi.string().min(6).required().trim(),
    confirmPassword: Joi.string().min(6).required().trim(),
    phoneNo: Joi.string().min(11).trim(),
    dob: Joi.string().min(6).trim()

})

router.post("/", upload.single("photo"), async(req, res) => {


    const {error} = await schema.validate(req.body)
    if(error){
        res.status(400).send(error.details[0].message)
    }

    const {username, password, confirmPassword, email, phoneNo, dob} = req.body

    if(password != confirmPassword) return res.status(400).send("Check Your Password!!!")


    try{
        
          //  const statementToUser = "INSERT INTO `users`(`username`,`password`,`gmail`,`phoneNo`,`DOB`,`image_url`) VALUES(?,?,?,?,?,?);";
          //  const [insert] = await db.promise().execute(statementToUser,[username, password, email, phoneNo, dob, ""]);
            res.send("Successful " + req.file)

    } catch(err){
        console.log(err)
    }

})

module.exports = router