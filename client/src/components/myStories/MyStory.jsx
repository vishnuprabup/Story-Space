import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./MyStory.css";
import { getMyStoriesAction } from "../../redux/features/stories/storySlice";
import Navbar from "../navbar/Navbar";
import StoryList from "../storyList/StoryList";
import { useNavigate } from "react-router-dom";

const MyStory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = useSelector((state) => state.user.user.data.email);

  useEffect(() => {
    dispatch(getMyStoriesAction({ email }));
  }, [dispatch, email]);
  const data = useSelector((state) => state.stories.data);
  const stories = !data.error.state ? [...data].reverse() : [];
  return (
    <div className="container">
      <Navbar />
      <div className="my-story-inner-container">
        {stories.length ? (
          stories.map((d) => (
            <div
              className="myStory"
              key={d._id}
              onClick={() => navigate(`/blog/${d._id}`)}
            >
              <StoryList {...d} />
            </div>
          ))
        ) : (
          <p>No Results Found</p>
        )}
      </div>
    </div>
  );
};

export default MyStory;
