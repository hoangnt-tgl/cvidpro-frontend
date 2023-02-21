import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import icon from "../../../images/logo/icon2.png";
import Select from "react-select";
import "./style.css";
import { listOptions } from "../../../constants/common";
import CheckBox from "../../../customComponents/CheckBox/CheckBox";
import ModalAssess from "../ModalAssess/ModalAssess";

const CardCandidates = ({ item, selectedParam }) => {
  const [openModal, setOpenModal] = useState(false);
  const [openDropDown, setOpenDropDown] = useState(false);
  function getYearsOld(string) {
    return new Date().getFullYear() - new Date(string).getFullYear();
  }
  return (
    <>
      <li className='col-lg-6 col-md-6'>
        <div className='card bg-white p-3 mb-4 shadow'>
          <div className='d-flex justify-content-between mb-4'>
            <div className='user-info'>
              <div className='user-info__img'>
                <img src={item.avatar} alt='User Img' />
              </div>
              <div className='user-info__basic'>
                <h5 className='mb-0'>{item.name}</h5>
                <p className='text-muted mb-0'>
                  {getYearsOld(item.birthday)} yrs, {item.gender}
                </p>
              </div>
            </div>
            <div className='dropdown open' style={{ height: "fit-content" }}>
              <div
                className='px-2'
                id='triggerId1'
                data-toggle='dropdown'
                aria-haspopup='true'
                aria-expanded='false'
                onClick={() => setOpenDropDown(!openDropDown)}
              >
                <i className='fa fa-ellipsis-v'></i>
              </div>
              <div
                className={`dropdown-menu ${openDropDown && "d-block"} `}
                aria-labelledby='triggerId1'
              >
                <div className='dropdown-item'>
                  <i className='fa fa-pencil mr-1'></i> Edit
                </div>
                <div className='dropdown-item text-danger'>
                  <i className='fa fa-trash mr-1'></i> Delete
                </div>
              </div>
            </div>
          </div>
          <div className='d-flex'>
            <p className='mx-1 font-weight-bold'>Ngành nghề : </p>
            <p className=''> {item.jobCriteria.major}</p>
          </div>
          <div className='d-flex'>
            <p className='mx-1 font-weight-bold'>Vị trí ứng tuyển : </p>
            <p> {item.jobCriteria.jobTitle}</p>
          </div>
          <div class='d-flex justify-content-between mt-4'>
            <div>
              <h5 class='mb-0'>
                07:15 PM
                <small class='ml-1'>2 Feb 2021</small>
              </h5>
            </div>
            <div
              class='text-success font-weight-bold btn-assess'
              onClick={() => setOpenModal(true)}
            >
              Đánh giá
            </div>
          </div>
        </div>
      </li>

      <ModalAssess
        openModal={openModal}
        setOpenModal={setOpenModal}
        employeeId={item._id}
        jobId={selectedParam.jobTitle}
      />
    </>
  );
};

export default CardCandidates;
