import React from 'react';
import { useEffect } from 'react';
import WrapperClickOutSide from '../WrapperClickOutSide/WrapperClickOutSide';
import './styles.css';
const ItemSelect = ({ value, option, setValue }) => {
  const [checked, setChecked] = React.useState(false);
  function handleCheck() {
    setChecked(!checked);
    if (!checked) {
      setValue((prev) => [...prev, option]);
    } else {
      setValue((prev) => prev.filter((item) => item.value !== option.value));
    }
  }
  useEffect(() => {
    if (value.find((item) => item.label === option.label)) {
      setChecked(true);
    }
  }, [value]);
  return (
    <div className='dropdown-item' onClick={handleCheck}>
      <div className='item-checkbox'>
        <input type='checkbox' value={option.value} checked={checked} />
      </div>
      <div className='item-label'> {option.label}</div>
    </div>
  );
};

const DropDownSelect = ({
  setValueForm,
  setChildStep1,
  checkStepRef,
  options,
  placeholder,
  clearErrors,
}) => {
  const [value, setValue] = React.useState([]);
  const [isShow, setIsShow] = React.useState(false);
  useEffect(() => {
    if (value.length > 0) {
      setValueForm('field', value);
      if (checkStepRef.current.field === false) {
        setChildStep1((prev) => prev + 1 / 3 / 4);
        checkStepRef.current.field = true;
      }
      clearErrors('field');
    } else {
      setValueForm('field', '');
    }
  }, [value]);
  return (
    <>
      <div class='dropdown dropdown-custom '>
        <div
          className='select-box'
          onClick={() => {
            setIsShow(!isShow);
          }}
        >
          {value.length > 0 && (
            <div className='result-box'>
              {value.map((item, idx) => {
                return idx === 0 ? (
                  <div className='result-item' key={idx}>
                    {item.label}{' '}
                  </div>
                ) : (
                  <div className='result-item' key={idx}>
                    ,{item.label}{' '}
                  </div>
                );
              })}
            </div>
          )}{' '}
          <div className='input-box'>
            <input
              type='text'
              placeholder={value.length === 0 ? placeholder : ''}
            />
          </div>
          <div>
            <i class='fa fa-chevron-down' aria-hidden='true'></i>
          </div>
        </div>{' '}
        <div className={isShow ? 'dropdown-box show' : 'dropdown-box'}>
          <WrapperClickOutSide isShow={isShow} setIsShow={setIsShow}>
            {options?.map((option, idx) => (
              <ItemSelect
                option={option}
                setValue={setValue}
                idx={idx}
                key={idx}
                value={value}
              />
            ))}
          </WrapperClickOutSide>
        </div>
      </div>
    </>
  );
};

export default DropDownSelect;
