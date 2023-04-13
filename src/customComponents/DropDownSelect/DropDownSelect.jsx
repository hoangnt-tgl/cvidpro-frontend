import React, { useRef } from 'react';
import { useEffect } from 'react';
import WrapperClickOutSide from '../WrapperClickOutSide/WrapperClickOutSide';
import './styles.css';
import { useState } from 'react';
const ItemSelect = ({ value, option, setValue, search }) => {
  const [checked, setChecked] = React.useState(false);
  function handleCheck() {
    setChecked(!checked);
    if (!checked) {
      setValue((prev) => [...prev, option]);
    } else {
      setValue((prev) => prev.filter((item) => item.value !== option.value));
    }
    search.current.focus();
    search.current.value = '';
  }
  useEffect(() => {
    if (value.find((item) => item.label === option.label)) {
      setChecked(true);
    }
  }, [value]);
  return (
    <div className='dropdown-item' onClick={handleCheck}>
      <div className='item-checkbox'>
        <input type='checkbox' checked={checked} />
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
  register,
  preValue = [],
}) => {
  const search = useRef();
  const [displayOptions, setDisplayOptions] = useState(options);
  const [value, setValue] = React.useState(preValue);
  const [isShow, setIsShow] = React.useState(false);
  const isFirst = useRef(true);
  function handleSearch(search) {
    console.log(search);
    if (search.length > 0) {
      const result = options.filter(
        (item) => item.label.toLowerCase().search(search.toLowerCase()) !== -1
      );
      setDisplayOptions(result);
    } else {
      setDisplayOptions(options);
    }
  }
  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    } else {
      if (value.length > 0) {
        setValueForm(register, value);
        if (checkStepRef.current[register] === false) {
          setChildStep1();
          checkStepRef.current[register] = true;
        }
        clearErrors(register);
      } else {
        setValueForm(register, '');
      }
    }
  }, [value]);
  useEffect(() => {
    console.log(search.current.value);
  }, [search.current]);
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
              <div className='result-item'>
                {' '}
                {value.map((item) => item.label).join(', ')}
              </div>
            </div>
          )}
          <div className='input-box'>
            <input
              onChange={() => {
                handleSearch(search.current.value);
              }}
              ref={search}
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
            {displayOptions?.map((option, idx) => (
              <ItemSelect
                option={option}
                setValue={setValue}
                idx={idx}
                key={idx}
                value={value}
                search={search}
              />
            ))}
          </WrapperClickOutSide>
        </div>
      </div>
    </>
  );
};

export default DropDownSelect;
