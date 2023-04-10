import React from "react";
import CheckBox from "../../../../customComponents/CheckBox/CheckBox.js";
import icon from "../../../../../src/images/logo/icon2.png";
import { Modal } from "react-bootstrap";
import FormAssess from "../FormAssess/FormAssess";
import { useState } from "react";
import { createOrder } from "../../../../services/OrderApi";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect } from "react";

const ModalAssess = ({ openModal, setOpenModal, jobId, employeeId }) => {
  let history = useHistory();
  const [input, setInput] = useState();
  const [check, setCheck] = useState(false);
  const schema = yup
    .object({
      rating: yup.string().required("Vui lòng đánh giá"),
      comment: yup.string().required("Vui lòng nhập nhận xét"),
    })
    .required();

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    console.log(errors);
  }, [errors]);
  async function handleOnSubmit(data) {
    // e.preventDefault();
    console.log(data);
    let dataSumit = {
      jobId,
      employeeId,
      comment: data.comment,
      rating: data.rating,
    };
    try {
      await createOrder(dataSumit);
      history.push(`/company-manage-resume`);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      {" "}
      <Modal
        show={openModal}
        onHide={setOpenModal}
        className='modal fade modal-bx-info'
      >
        <div className='modal-dialog my-0 w-100' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <div className='logo-img'>
                <img alt='' src={icon} />
              </div>
              <h5 className='modal-title text-center'>Đánh giá</h5>
              <button
                type='button'
                className='close'
                onClick={() => setOpenModal(false)}
              >
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body '>
              <form onSubmit={handleSubmit(handleOnSubmit)}>
                <div style={{ width: "fit-content", margin: "0 auto" }}>
                  <div className='d-flex'>
                    <p className='name'>Xếp loại :</p>
                    <CheckBox
                      setCheck={setCheck}
                      check={check}
                      setValue={setValue}
                      register={{ ...register("rating") }}
                    />
                    {errors?.rating?.message && (
                      <p>
                        <>{errors?.rating?.message}</>
                      </p>
                    )}
                  </div>
                  <FormAssess
                    setInput={setInput}
                    setValue={setValue}
                    register={{ ...register("comment") }}
                  />
                  {errors?.comment?.message && (
                    <p>
                      <>{errors?.comment?.message}</>
                    </p>
                  )}
                </div>
                <div className='d-flex justify-content-center mt-3'>
                  <button type='submit' className='btn btn-secondary'>
                    submit
                  </button>
                </div>
              </form>
            </div>

            <div className='modal-footer'>
              {/* <button
                type='button'
                className='btn btn-secondary'
                onClick={() => setOpenModal(false)}
              >
                Close
              </button> */}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalAssess;
