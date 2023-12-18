import dotenv from "dotenv";
dotenv.config();

export const corsOptions = {
  origin: process.env.STORY_SPACE_APP_CLIENT_DOMAIN,
  methods: ["GET", "PUT", "POST", "OPTIONS", "HEAD"],
  credentials: true,
  exposedHeaders: "Set-Cookie",
};
