import express from "express";
import {
  loginController,
  logoutController,
  signupController,
  profileController,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/login", loginController);
router.post("/signup", signupController);
router.get("/logout", logoutController);
router.get("/profile", profileController);

export default router;
