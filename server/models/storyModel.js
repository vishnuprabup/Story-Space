import mongoose from "mongoose";

const storySchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    title: {
      type: String,
    },
    body: {
      type: String,
    },
  },
  { timestamps: true }
);

const Story = mongoose.model("stories", storySchema);
export default Story;
