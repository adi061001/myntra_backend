import dotenv from "dotenv";
import app from "./app.js";
import mongoose from "mongoose";

dotenv.config();

// MongoDB connect
app.get("/test-env", (req,res)=>{
  res.send(process.env.JWT_SECRET || "NO SECRET");
});
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// server start
app.listen(process.env.PORT || 5000, () => {
  console.log("Server running on port 5000");

});
