import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import Navbar from "../navbar/Navbar";
import "./Update.css";
import { updateStoryHandler } from "../../api/storyApi";

const Update = () => {
  const { blogId } = useParams();

  const story = useSelector((state) => state.stories.data.data);
  const userEmail = useSelector((state) => state.user.user.data.email);
  const [updateData, setUpdateData] = useState({
    title: story.title,
    // image: "",
    body: story.body,
  });

  const navigate = useNavigate();

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    // const { name, value, type, files } = event.target;
    setUpdateData((prevUpdateData) => ({
      ...prevUpdateData,
      [name]: value,
      // [name]: type === "files" ? files[0] : value,
    }));
  };

  const handleUpdateStory = async () => {
    try {
      const data = { ...updateData, blogId, userEmail };
      //   await createStoryHandler(data);
      await updateStoryHandler(data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <Navbar />
      <div className="update-container">
        {!story.loading ? (
          <div className="update-inner-container">
            <div className="update-header">
              <p>Edit your stories here</p>
            </div>
            <div className="update-form-container">
              <input
                name="title"
                type="text"
                placeholder="Title"
                value={updateData.title}
                onChange={handleFormChange}
              />
              {/* <input
            type="file"
            value={UpdateData.img}
            onChange={handleFormChange}
            name="image"
          /> */}
              <ReactQuill
                className="update-react-quill"
                value={updateData.body}
                onChange={(value) =>
                  setUpdateData((prevUpdateData) => ({
                    ...prevUpdateData,
                    body: value,
                  }))
                }
              />
            </div>
            <div className="update-actions">
              <button onClick={handleUpdateStory}>Update</button>
            </div>
          </div>
        ) : (
          <div className="update-inner-container">Loading...</div>
        )}
      </div>
    </div>
  );
};

export default Update;
