import React from "react";
import { format } from "date-fns";

import "./StoryList.css";
import { getUsername } from "../../utils/authUtils";
import { truncateHTML } from "../../utils/storyUtils";

const StoryList = (props) => {
  const username = getUsername(props.email);

  const truncatedHTML = truncateHTML(props.body, 120);

  return (
    <div className="story-contents">
      <div className="story-user">
        <p>{username}</p>
        <p>{format(new Date(props.updatedAt), "dd LLL yyyy")}</p>
      </div>
      <div className="story-data">
        <h3>{props.title}</h3>
        <div
          dangerouslySetInnerHTML={{ __html: truncatedHTML }}
          className="story-data-summary"
        />
      </div>
      <div className="story-line-breaker"></div>
    </div>
  );
};

export default StoryList;
