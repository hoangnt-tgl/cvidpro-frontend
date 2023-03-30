import React, { useEffect } from 'react';
import { useState } from 'react';

const useClickOutSide = (ref) => {
  const [isOut, setIsOut] = useState(false);
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        // alert('You clicked outside of me!');
        setIsOut(true);
      } else {
        setIsOut(false);
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
  return { isOut };
};

export default useClickOutSide;
