import express from "express";
import dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";

import "./setup/mongooseConnection.js";
import authRouter from "./router/authRouter.js";
import storyRouter from "./router/storyRouter.js";
import { corsOptions } from "./setup/authSetup.js";

const app = express();
const port = process.env.STORY_SPACE_APP_SERVER_PORT || 3100;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/story", storyRouter);

app.use("/", (req, res) => {
  res.send("Server Started");
});

app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});
