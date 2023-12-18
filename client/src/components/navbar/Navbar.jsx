import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../redux/features/users/userSlice";

const Navbar = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutAction());
  };

  const [isActive, setIsActive] = useState(false);

  const className = isActive ? "active" : "inactive";

  const handleBurger = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="navbar-container">
      <div className="navbar-inner-container">
        <div className="navbar-logo">
          <NavLink to="/">Story Space</NavLink>
        </div>
        {user ? (
          <div className={`navbar-actions ${className}`}>
            <NavLink to="/write">Write</NavLink>
            <NavLink to="/my-story">My-Story</NavLink>
            <NavLink onClick={handleLogout}>Logout</NavLink>
          </div>
        ) : (
          <div className={`navbar-actions ${className}`}>
            <NavLink to="/auth">Sign in</NavLink>
          </div>
        )}
        <div className={`hamburger ${className}`} onClick={handleBurger}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
