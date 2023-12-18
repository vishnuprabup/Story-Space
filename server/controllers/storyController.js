import Story from "../models/storyModel.js";
import User from "../models/userModel.js";

export const createStoryController = async (req, res) => {
  try {
    const email = req.body.user;
    if (email && req.body.title) {
      const oldUser = await User.findOne({ email });
      if (oldUser) {
        await Story.create({
          email,
          title: req.body.title,
          body: req.body.body,
        });
        res.status(200).json({
          message: "Story Created",
        });
      } else {
        res.status(400).json({
          message: "User not found",
        });
      }
    } else {
      res.status(400).json({
        message: "Invalid data",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
    console.log(error);
  }
};

export const getStoriesController = async (req, res) => {
  try {
    const stories = await Story.find();
    res.status(200).json(stories);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
    console.log(error);
  }
};

export const getMyStoriesController = async (req, res) => {
  try {
    const { email } = req.body;
    if (email) {
      const stories = await Story.find({ email: email });
      res.status(200).json(stories);
    } else {
      res.status(400).json({
        message: "Invalid Credentials",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getBlogController = async (req, res) => {
  try {
    const { blogId } = req.body;
    if (blogId) {
      const blog = await Story.findOne({ _id: blogId });
      if (blog) {
        res.status(200).json({
          data: blog
        });
      } else {
        res.status(400).json({
          message: `No blog found for this ${blogId} id`,
        });
      }
    } else {
      res.status(400).json({
        message: "Invalid Blog id",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server error",
    });
  }
};

export const getDeleteController = async (req, res) => {
  try {
    const { blogId } = req.body;
    if (blogId) {
      await Story.deleteOne({ _id: blogId });
      res.status(200).json({
        message: "Story deleted",
      });
    } else {
      res.status(400).json({
        message: "Invalid Blog id",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server error",
    });
  }
};

export const updateController = async (req, res) => {
  try {
    const { blogId, userEmail } = req.body;
    if (blogId) {
      const oldStory = await Story.findOne({ _id: blogId });
      const { email } = oldStory._doc;
      if (email === userEmail) {
        await Story.updateOne(
          { _id: blogId },
          { title: req.body.title, body: req.body.body }
        );
        res.status(200).json({
          message: "Story updated",
        });
      } else {
        res.status(400).json({
          message: "User not authorized to edit this story",
        });
      }
    } else {
      res.status(400).json({
        message: "Invalid Blog id",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
