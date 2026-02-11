const googlelogin = require("../controller/authController")

const router =require("express").Router()


router.get("/test",(req,res)=>{
    res.send("this rout")
})
router.post("googlelogin",googlelogin)

module.exports=router