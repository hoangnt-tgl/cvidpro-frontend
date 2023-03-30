import React from 'react';
import './styles.css';
const Stepper = ({ step, totalStep, Step, setStep }) => {
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
            {' '}
            <div className='steps-body'>
              {totalStep.map((item, index) => {
                return (
                  <div
                    className={
                      Step === item.step
                        ? 'step step-completed'
                        : Step < item.step
                        ? 'step'
                        : 'step step-completed'
                    }
                    onClick={() => {
                      if (Step > item.step) setStep(item.step);
                    }}
                  >
                    {item.title}
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <>
            {' '}
            <div className='steps-body'>
              {totalStep.map((item, index) => {
                return (
                  <div
                    className={
                      Step === item.step ? 'step step-active' : 'd-none'
                    }
                  >
                    {item.title}
                  </div>
                );
              })}
            </div>{' '}
          </>
        )}
      </div>
    </div>
  );
};

export default Stepper;
