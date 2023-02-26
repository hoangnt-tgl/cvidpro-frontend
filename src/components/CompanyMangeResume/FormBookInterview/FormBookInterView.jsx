import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import "./styles.css";
import DatePicker from "./Datepicker";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { bookInterView } from "../../../services/DepartmentApi";
const FormBookInterView = ({ item, localkey }) => {
  const [openTable, setOpenTable] = React.useState(false);
  const [startDate, setStartDate] = useState(new Date());

  const schema = yup
    .object({
      address: yup.string().required("Vui lòng nhập địa chỉ"),
      interviewer: yup.string().required("Vui lòng nhập tên người phỏng vấn"),
      email: yup.string().required("Vui lòng nhập email"),
      phoneNumber: yup
        .number()
        .required("Vui lòng nhập số điện thoại")
        .typeError("Vui lòng nhập số điện thoại"),
      time: yup
        .date()
        .required("Vui lòng nhập thời gian")
        .min(new Date(), "Thời gian không hợp lệ"),
      note: yup.string(),
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

  async function handleOnSubmit(data) {
    const dataSubmit = {
      date: data.time,
      address: data.address,
      interviewer: data.interviewer,
      interviewerEmail: data.email,
      interviewerPhone: data.phoneNumber,
      note: data.note,
    };
    console.log(item);
    try {
      await bookInterView(localkey, item._id, dataSubmit);
      setOpenTable(false);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className='d-flex'>
        <button
          className='btn btn-primary mx-1'
          onClick={() => setOpenTable(true)}
        >
          Đặt lịch pv
        </button>
        <button className='btn btn-danger mx-1'>Xóa</button>
      </div>
      <Modal
        size='lg'
        show={openTable}
        onHide={setOpenTable}
        className='modal fade modal-bx-info'
      >
        <div className='form-book-interview d-flex justify-content-center'>
          <div className='page-wrapper py-5 w-100'>
            <div className='wrapper wrapper--w900'>
              <div className='card card-6'>
                <div className='card-heading d-flex justify-content-center'>
                  <h2 className='title mx-auto'>Đặt lịch phỏng vấn</h2>
                </div>
                <div class='card-body'>
                  <form onSubmit={handleSubmit(handleOnSubmit)}>
                    <div className='form-row'>
                      <div className='name'>Địa chỉ</div>
                      <div className='value'>
                        <input
                          class='input--style-6'
                          type='text'
                          nameName='full_name'
                          placeholder='Địa chỉ'
                          {...register("address")}
                        />
                      </div>
                      {errors?.address?.message && (
                        <p>
                          <>{errors?.address?.message}</>
                        </p>
                      )}
                    </div>
                    <div className='form-row'>
                      <div className='name'>Người phỏng vấn</div>
                      <div className='value'>
                        <div className='input-group'>
                          <input
                            className='input--style-6'
                            name='interviewer'
                            placeholder='Người phỏng vấn'
                            {...register("interviewer")}
                          />
                        </div>
                      </div>
                      {errors?.interviewer?.message && (
                        <p>
                          <>{errors?.interviewer?.message}</>
                        </p>
                      )}
                    </div>
                    <div className='form-row'>
                      <div className='name'>Email</div>
                      <div className='value'>
                        <div className='input-group'>
                          <input
                            className='input--style-6'
                            type='email'
                            name='email'
                            placeholder='example@email.com'
                            {...register("email")}
                          />
                        </div>
                      </div>
                      {errors?.email?.message && (
                        <p>
                          <>{errors?.email?.message}</>
                        </p>
                      )}
                    </div>
                    <div className='form-row'>
                      <div className='name'>Số điện thoại</div>
                      <div className='value'>
                        <div className='input-group'>
                          <input
                            type='number'
                            className='input--style-6'
                            name='phoneNumber'
                            placeholder='Số điện thoại'
                            {...register("phoneNumber")}
                          />
                        </div>
                      </div>
                      {errors?.phoneNumber?.message && (
                        <p>
                          <>{errors?.phoneNumber?.message}</>
                        </p>
                      )}
                    </div>
                    <div className='form-row'>
                      <div className='name'>Thời gian</div>
                      <div className='pick-time'>
                        <DatePicker
                          setValue={setValue}
                          startDate={startDate}
                          setStartDate={setStartDate}
                          {...register("time")}
                        />
                      </div>
                      {errors?.time?.message && (
                        <p>
                          <>{errors?.time?.message}</>
                        </p>
                      )}
                    </div>
                    <div className='form-row'>
                      <div className='name'>Ghi chú</div>
                      <div className='value'>
                        <div className='input-group'>
                          <textarea
                            class='textarea--style-6'
                            name='note'
                            placeholder='Ghi chú'
                            {...register("note")}
                          ></textarea>
                        </div>
                        {errors?.note?.message && (
                          <p>{errors?.note?.message}</p>
                        )}
                      </div>
                    </div>
                    <div className='card-footer d-flex justify-content-center'>
                      <button
                        className='btn btn--radius-2 btn--blue-2 btn-primary'
                        type='submit'
                      >
                        Send
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default FormBookInterView;
