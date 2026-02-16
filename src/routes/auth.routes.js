import express from "express";
import { signup, login, googleAuth } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/google", googleAuth);
router.post("/login", login);

export default router;
