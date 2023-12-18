import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import User from "../models/userModel.js";
import { getUserName } from "../utils/authUtils.js";

dotenv.config();
const secret = process.env.STORY_SPACE_JWT_SECRET_KEY;

export const loginController = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    if (email && password) {
      const user = await User.findOne({ email });
      // const usera = await User.find();
      if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
          const { password, __v, _id, ...others } = user._doc;
          jwt.sign(others, secret, {}, (err, token) => {
            if (err) throw err;
            res
              .cookie("token", token, {
                sameSite: "none",
                httpOnly: false,
                secure: true,
              })
              .json({
                message: "Logged-in",
              });
          });
        } else {
          res.status(403).json({
            message: "Incorrect password",
          });
        }
      } else {
        res.status(400).json({
          message: "User not found. Please sign up",
        });
      }
    } else {
      res.status(400).json({
        message: "Invalid Credentials",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
    console.log(error);
  }
};

export const signupController = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    if (email && password) {
      const oldUser = await User.findOne({ email });
      if (!oldUser) {
        const hashedPassword = await bcrypt.hash(req.body.password, 8);
        const username = getUserName(email);
        const user = await User.create({
          email,
          password: hashedPassword,
          auth_mode: "email-password",
          username,
          email_verified: false,
        });
        const { password, __v, _id, ...others } = user._doc;
        jwt.sign(others, secret, {}, (err, token) => {
          if (err) throw err;
          res
            .cookie("token", token, {
              sameSite: "none",
              httpOnly: false,
              secure: true,
            })
            .json({
              message: "Signed-up",
            });
        });
        // res.status(200).json({
        //   data: others,
        // });
      } else {
        res.status(409).json({
          message: "User already exist please sign in",
        });
      }
    } else {
      res.status(400).json({
        message: "Invalid Credentials",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
    console.log(error);
  }
};

export const logoutController = (req, res) => {
  try {
    res.clearCookie("connect.sid");
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const profileController = (req, res) => {
  // const token = req.headers.authorization.split(" ")[1];
  const { token } = req.cookies;
  // console.log("token:", token);
  // console.log("secret:", secret);
  jwt.verify(token, secret, {}, (err, data) => {
    if (err) throw err;
    res.status(200).json({
      data,
    });
  });
};
