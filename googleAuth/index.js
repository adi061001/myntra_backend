 const expess = require("express")
const appRouter = require("./routes/AuthRout")
const app =expess()
require("dotenv").config()
const port=process.env.PORT


app.get("/",(req,res)=>{
    res.send("this the server ")
})

app.use("/auth",appRouter)


app.listen(port,()=>{
    console.log(`server is running ${port}`)
})