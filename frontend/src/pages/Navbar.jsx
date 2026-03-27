import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import "./Navbar.css"; 
import { FaUserTie } from "react-icons/fa";
import { FaBars, FaTimes } from "react-icons/fa";



const Navbar = () => {
  const [username, setUsername] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Logout function
  const logoutHandler = () => {
    localStorage.removeItem("todoapp");
    toast.success("Logout successfully");
    navigate("/login");
  };

  // Get username from localStorage
 useEffect(() => {
  try {
    const userData = JSON.parse(localStorage.getItem("todoapp") || "{}");
    setUsername(userData?.user?.username || "");
  } catch (error) {
    setUsername("");
  }
}, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
           
          <FaUserTie  className="user"/> 
          <i>Welcome</i> {username}!
        </div>

          <button
      className="menu-toggle "
      onClick={() => setIsOpen(!isOpen)}
    >
      {isOpen ? <FaTimes /> : <FaBars />}
    </button>

        <ul className={`navbar-nav ${isOpen ? "show-menu" : ""}`}>
          <li className="nav-item">
            <Link className="nav-link" to="/home">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/todoList">
              My Todo List
            </Link>
          </li>
          <li className="nav-item">
            <button className="logout-btn" onClick={logoutHandler}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;