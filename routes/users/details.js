const router = require("express").Router()
const verify = require("../validate")
const db = require("../../database/daConnection")

router.get("/:id", verify, async (req, res) => {
    id = req.id.id

    if(id === parseInt(req.params.id)){

    try{
        const userStatement = "SELECT `username`, `gmail`, `phoneNo`, `DOB`,`image_url` FROM `users` WHERE id = " + id
        const [ row ] = await db.promise().execute(userStatement, (err, result) => {
            res.send(result)

        })
    }catch(err){ console.log(err) }

}else{
    res.status(401).send("Access Denied")
}

})

module.exports = router