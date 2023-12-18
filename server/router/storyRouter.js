import express from "express";
import {
  createStoryController,
  getBlogController,
  getDeleteController,
  getMyStoriesController,
  getStoriesController,
  updateController,
} from "../controllers/storyController.js";

const router = express.Router();

router.post("/create-story", createStoryController);
router.get("/getStories", getStoriesController);
router.post("/getMyStories", getMyStoriesController);
router.post("/blog", getBlogController);
router.post("/delete", getDeleteController);
router.post("/updateMyStory", updateController);

export default router;
