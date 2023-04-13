import React from 'react';
import './styles.css';
const Loader = ({ height, spinHeight }) => {
  return (
    <div className='loader-container' style={{ height: ` ${height}px` }}>
      <div
        className='spinner'
        style={{
          height: `${spinHeight}px`,
          width: `${spinHeight}px`,
          borderRadius: `${spinHeight}px`,
        }}
      ></div>
    </div>
  );
};

export default Loader;
