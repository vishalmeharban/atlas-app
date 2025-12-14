import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Hide/show header on scroll
  const controlHeader = () => {
    if (window.scrollY > lastScrollY) {
      setHideHeader(true); // scrolling down → hide
    } else {
      setHideHeader(false); // scrolling up → show
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlHeader);
    return () => {
      window.removeEventListener("scroll", controlHeader);
    };
  }, [lastScrollY]);

  return (
    <header className={hideHeader ? "hide-header" : ""}>
      <div className="container">
        <nav className="navbar-container">
          {/* Logo */}
          <div className="logo">
            <img src="/src/images/pngegg.png" alt="" />
          </div>

          {/* Hamburger Icon */}
          <div className="menu-icon" onClick={toggleMenu}>
            {menuOpen ? (
              <FaTimes className="icon" />
            ) : (
              <FaBars className="icon" />
            )}
          </div>

          {/* Navigation Links */}
          <div className={`menu ${menuOpen ? "active" : ""}`}>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/details">Country details</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
