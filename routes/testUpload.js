const router = require("express").Router()
const multer = require("multer")
const path = require("path");
const  fs  = require("fs");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
    const dir = "./uploads/";

        if(!fs.existsSync(dir)){
            fs.mkdirSync(dir)
        }

        cb(null, dir)
    },

    filename:function (req, file, cb) {
        cb(null, file.filename +"-"+ Date.now() + path.extname(file.originalname))
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

router.post("/", upload.single("image"), async(req, res) => {
    res.send(req.file)
})

module.exports = router