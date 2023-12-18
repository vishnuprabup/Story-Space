import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import "./Editor.css";
import { createStoryHandler } from "../../api/storyApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Editor = () => {
  const [editorData, setEditorData] = useState({
    title: "",
    // image: "",
    body: "",
  });

  const user = useSelector((state) => state.user.user.data.email);
  const data = useSelector((state) => state.stories);

  const navigate = useNavigate();

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    // const { name, value, type, files } = event.target;
    setEditorData((prevEditorData) => ({
      ...prevEditorData,
      [name]: value,
      // [name]: type === "files" ? files[0] : value,
    }));
  };

  const handleCreateStory = async () => {
    try {
      const data = { ...editorData, user };
      await createStoryHandler(data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="editor-container">
      {!data.loading ? (
        <div className="editor-inner-container">
          <div className="editor-header">
            <p>Write your stories here</p>
          </div>
          <div className="editor-form-container">
            <input
              name="title"
              type="text"
              placeholder="Title"
              value={editorData.title}
              onChange={handleFormChange}
            />
            {/* <input
            type="file"
            value={editorData.img}
            onChange={handleFormChange}
            name="image"
          /> */}
            <ReactQuill
              className="editor-react-quill"
              value={editorData.body}
              onChange={(value) =>
                setEditorData((prevEditorData) => ({
                  ...prevEditorData,
                  body: value,
                }))
              }
            />
          </div>
          <div className="editor-actions">
            <button onClick={handleCreateStory}>Post</button>
          </div>
        </div>
      ) : (
        <div className="editor-inner-container">Loading...</div>
      )}
    </div>
  );
};

export default Editor;
