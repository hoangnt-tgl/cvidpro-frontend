import React from "react";
import "./styles.css";
const Header = ({ isStick, navContainerRef }) => {
  return (
    <div
      ref={navContainerRef}
      className={isStick ? "nav-container" : "nav-container stick"}
    >
      <div className='header-nav'>
        <div className='header-nav-logo'>
          <img
            src='https://www.freepnglogos.com/uploads/netflix-logo-0.png'
            alt='Netflix Logo'
            className='header-nav-logo-img'
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
