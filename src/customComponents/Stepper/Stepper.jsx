import React from "react";
import "./styles.css";
const Stepper = ({ step, totalStep, Step }) => {
  let innwerWidth = window.innerWidth;
  function checkProgressPer() {
    return step * 100;
  }
  return (
    <div className='my-sm-3'>
      <div className='steps'>
        <div className='steps-header'>
          <div className='progress'>
            <div
              className='progress-bar'
              role='progressbar'
              style={{ width: `${checkProgressPer()}%` }}
              aria-valuenow={40}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>
        {innwerWidth > 575 ? (
          <>
            {" "}
            <div className='steps-body'>
              {totalStep.map((item, index) => {
                return (
                  <div
                    className={
                      Step === item.step
                        ? "step step-active"
                        : Step < item.step
                        ? "step"
                        : "step step-completed"
                    }
                  >
                    {Step > item.step && (
                      <span className='step-indicator'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width={24}
                          height={24}
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth={2}
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          className='feather feather-check'
                        >
                          <polyline points='20 6 9 17 4 12' />
                        </svg>
                      </span>
                    )}
                    {item.title}
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <>
            {" "}
            <div className='steps-body'>
              {totalStep.map((item, index) => {
                return (
                  <div
                    className={
                      Step === item.step ? "step step-active" : "d-none"
                    }
                  >
                    {Step > item.step && (
                      <span className='step-indicator'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width={24}
                          height={24}
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth={2}
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          className='feather feather-check'
                        >
                          <polyline points='20 6 9 17 4 12' />
                        </svg>
                      </span>
                    )}
                    {item.title}
                  </div>
                );
              })}
            </div>{" "}
          </>
        )}
      </div>
    </div>
  );
};

export default Stepper;
