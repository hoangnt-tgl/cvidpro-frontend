import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './styles.css';
import logo from '../../../images/logo/logocvid.jpg';
const Header = ({ isStick, navContainerRef }) => {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState();
  useEffect(() => {
    setCurrentPath(location.pathname);
    console.log(location.pathname);
  }, [location]);
  return (
    <div
      ref={navContainerRef}
      className={
        currentPath === '/employee/login' || currentPath === '/company/login'
          ? 'nav-container stick'
          : 'nav-container'
      }
    >
      <div className='header-nav'>
        <div className='header-nav-logo'>
          <Link to='/'>
            <img
              src={logo}
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
