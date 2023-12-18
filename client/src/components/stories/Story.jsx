import React, { useEffect, useState } from "react";

import "./Story.css";
import { getStoriesAction } from "../../redux/features/stories/storySlice";
import { useDispatch, useSelector } from "react-redux";
import StoryList from "../storyList/StoryList";
import { useNavigate } from "react-router-dom";

const Story = () => {
  const [stories, setStories] = useState([]);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const storyData = useSelector((state) => state.stories.data);

  useEffect(() => {
    dispatch(getStoriesAction());
    if (storyData.length) {
      setStories([...storyData].reverse());
    }
  }, [storyData.length]);

  return (
    <div className="story-container">
      <div className="story-inner-container">
        {stories.length ? (
          stories.map((d) => (
            <div
              className="story-list"
              onClick={() => navigate(`/blog/${d._id}`)}
              key={d._id}
            >
              <StoryList {...d} />
            </div>
          ))
        ) : (
          <p className="story-no-results">Loading....</p>
        )}
      </div>
    </div>
  );
};

export default Story;
