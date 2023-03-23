import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";

const useScroll = () => {
  const [isStick, setIsStick] = useState(true);
  const navContainerRef = useRef(null);
  const containerRef = useRef(null);
  function handleScroll() {
    if (containerRef.current && navContainerRef.current) {
      let container = containerRef.current;
      let nav = navContainerRef.current;
      //   const { scrollTop, scrollHeight, clientHeight } = navContainer;
      //   const isBottom = scrollTop + clientHeight >= scrollHeight;
      //   console.log("top", navContainer.getBoundingClientRect().top);
      //   console.log(navContainer.getBoundingClientRect());
      console.log(container.getBoundingClientRect());
      if (
        -container.getBoundingClientRect().y >
        nav.getBoundingClientRect().height
      ) {
        setIsStick(false);
      } else {
        setIsStick(true);
      }
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    console.log("isStick", isStick);
  }, [isStick]);
  return { navContainerRef, isStick, containerRef };
};

export default useScroll;
