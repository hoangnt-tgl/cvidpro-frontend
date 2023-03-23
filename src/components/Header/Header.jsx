import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
const Header = ({ isStick, navContainerRef }) => {
  return (
    <div
      ref={navContainerRef}
      className={isStick ? "nav-container" : "nav-container stick"}
    >
      <div className='header-nav'>
        <div className='header-nav-logo'>
          <Link to='/'>
            <img
              src='https://www.freepnglogos.com/uploads/netflix-logo-0.png'
              alt='Netflix Logo'
              className='header-nav-logo-img'
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
