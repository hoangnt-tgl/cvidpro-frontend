import React, { useRef } from 'react';
import { useEffect } from 'react';
import useClickOutSide from '../../hooks/useClickOutSide';

const WrapperClickOutSide = ({ isShow, setIsShow, children }) => {
  const wrapperRef = useRef(null);
  const { isOut } = useClickOutSide(wrapperRef);
  useEffect(() => {
    if (isOut) setIsShow(false);
  }, [isOut]);
  return isShow && <div ref={wrapperRef}>{children}</div>;
};

export default WrapperClickOutSide;
