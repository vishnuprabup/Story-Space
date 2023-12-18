import axios from "axios";

const API = axios.create({
  // baseURL: process.env.REACT_APP_SERVER_DOMAIN,
  baseURL: "https://story-space-server.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const createStoryHandler = (storyData) =>
  API.post("/story/create-story", storyData);
export const getStories = () => API.get("/story/getStories");
export const getMyStories = (email) => API.post("/story/getMyStories", email);
export const getBlog = (blogId) => API.post("/story/blog", blogId);
export const deleteStory = (blogId) => API.post("/story/delete", blogId);
export const updateStoryHandler = (updatedStory) =>
  API.post("/story/updateMyStory", updatedStory);
