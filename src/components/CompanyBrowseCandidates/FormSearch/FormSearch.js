import React from "react";
import Select from "react-select";
const FormSearch = ({
  setSelectedParam,
  handleSubmit,
  listJob,
  listSchool,
}) => {
  return (
    <>
      {" "}
      <form className='dezPlaceAni' onSubmit={handleSubmit}>
        <div className='row'>
          <div className='col-lg-6 col-md-6'>
            <div className='form-group'>
              <Select
                options={listJob}
                placeholder='Chức danh công việc'
                onChange={(e) => {
                  setSelectedParam((prev) => ({
                    ...prev,
                    jobTitle: e.value,
                  }));
                }}
              />
            </div>
          </div>
          <div className='col-lg-6 col-md-6'>
            <div className='form-group'>
              <Select
                options={listSchool}
                placeholder='Chọn trường học'
                onChange={(e) => {
                  setSelectedParam((prev) => ({
                    ...prev,
                    schoolName: e.value,
                  }));
                }}
              />
            </div>
          </div>
          <div className='col-lg-6 col-md-6 mx-auto'>
            <button
              type='submit'
              className='site-button btn-block py-0'
              style={{ zIndex: "auto" }}
            >
              Tìm ứng viên
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default FormSearch;
