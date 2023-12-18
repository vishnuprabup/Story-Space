import React from "react";
import { format } from "date-fns";
import { getUsername } from "../../utils/authUtils";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";

import "./Blog.css";
import keyboard_logo from "../../assets/logo/Keyboard.png";
import trash_logo from "../../assets/logo/Trash.svg";
import Modal from "../modal/Modal";
import { useNavigate } from "react-router-dom";

const Blog = (props) => {
  const [isAuthor, setIsAuthor] = useState(false);
  const [delModal, setDelModal] = useState(false);
  const userEmail = useSelector((state) => state.user.user.data.email);
  const email = props.email;
  const username = getUsername(email);
  const navigate = useNavigate();

  useEffect(() => {
    if (userEmail === email) {
      setIsAuthor(true);
    }
  }, [email]);

  const closeModal = () => {
    setDelModal(false);
  };

  const handleDelete = () => {
    setDelModal(true);
  };

  const handleEdit = () => {
    navigate(`/update/${props._id}`);
  };

  return (
    <div className="blog-container">
      {!delModal ? (
        <div className="blog-inner-container">
          <div className="blog-header">
            <h3>{props.title}</h3>
          </div>
          {isAuthor ? (
            <div className="blog-actions">
              <div className="blog-user">
                <p>{username}</p>
                <p>|</p>
                <p>{format(new Date(props.updatedAt), "dd LLL yyyy")}</p>
              </div>
              <div className="blog-action-btn">
                <img
                  src={keyboard_logo}
                  alt="keyboard-logo"
                  onClick={handleEdit}
                />
                <img src={trash_logo} alt="Trash-logo" onClick={handleDelete} />
              </div>
            </div>
          ) : (
            <div className="blog-user-details">
              <p>{username}</p>
              <p>{format(new Date(props.updatedAt), "dd LLL yyyy")}</p>
            </div>
          )}
          <div className="blog-summary">
            <div
              dangerouslySetInnerHTML={{ __html: props.body }}
              className="story-data-summary"
            />
          </div>
        </div>
      ) : (
        <Modal closeModal={closeModal} blogId={props._id} />
      )}
    </div>
  );
};

export default Blog;
