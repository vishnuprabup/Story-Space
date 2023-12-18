import React from "react";

import "./Modal.css";
import exit_button from "../../assets/logo/exit.png";
import { deleteStory } from "../../api/storyApi";
import { useNavigate } from "react-router-dom";

const Modal = (props) => {
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      const blogId = props.blogId;
      await deleteStory({ blogId });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="modal-container">
      <div className="modal-inner-container">
        <div className="exit-btn">
          <h1>Delete</h1>
          <img
            src={exit_button}
            alt="exit-button"
            onClick={() => props.closeModal()}
          />
        </div>
        <div className="modal-text">
          <p>Are you sure you want to delete the story?</p>
        </div>
        <div className="modal-actions">
          <div className="cancel-btn" onClick={() => props.closeModal()}>
            Cancel
          </div>
          <div className="delete-btn" onClick={handleDelete}>
            Delete
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
