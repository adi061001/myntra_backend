import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js"; // 🔥 import routes

const app = express();

app.use(express.json());

app.use(cors({
  origin: [
    "http://localhost:5174",
    "https://your-frontend.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// routes
app.use("/api/auth", authRoutes);



export default app;
