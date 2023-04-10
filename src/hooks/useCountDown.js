import React from 'react';
import { useEffect } from 'react';

const useCountDown = (time, trigger, setIsGetOtp) => {
  const [duaration, setDuration] = React.useState(time);
  const [minutes, setMinutes] = React.useState();
  const [seconds, setSeconds] = React.useState();

  function countDown() {
    if (duaration >= 60) {
      setMinutes(Math.floor(duaration / 60).toString());
    } else {
      setMinutes('00');
    }
    if (duaration > 0) {
      if (duaration % 60 < 10) {
        setSeconds('0' + Math.floor(duaration % 60).toString());
      } else setSeconds(Math.floor(duaration % 60).toString());
    } else {
      setSeconds('00');
      setIsGetOtp(false);
    }
  }
  useEffect(() => {
    let timer;
    if (trigger) {
      timer =
        duaration > 0 && setInterval(() => setDuration(duaration - 1), 1000);
      countDown();
    } else {
      setDuration(time);
    }
    return () => clearInterval(timer);
  }, [duaration, trigger]);

  useEffect(() => {
    // console.log(duaration);
    // console.log(seconds);
  }, [duaration]);
  return { duaration, minutes, seconds };
};

export default useCountDown;
