import React from 'react'
import { Modal } from 'react-bootstrap'
// import NormalInput from '../../../customComponents/NormalInput/Index.jsx'
import MuiDatePicker from '../../../customComponents/MuiDatePicker/index.jsx'

const ModalUpdateProfile = ({
  openUpdate,
  setOpenUpdate,
  register,
  handleOnSubmit,
  handleSubmit,
}) => {
  return (
    <Modal
      fullscreen={true}
      size="lg"
      dialogClassName="modal-90w"
      show={openUpdate}
      onHide={setOpenUpdate}
      className="modal fade modal-bx-info"
    >
      <Modal.Header closeButton>
        <div className="logo-img">{/* <img alt='' src={icon} /> */}</div>
        <h5 className="modal-title text-center">Cập nhật thông tin cá nhân</h5>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(handleOnSubmit)} class="row">
          <div className="col-6 col-lg-6 col-md-12 m-b20">
            <label style={{ color: '#232323' }}>Họ và tên</label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-6 col-lg-6 col-md-12 m-b20">
            <label style={{ color: '#232323' }}>Ngày sinh</label>
            <MuiDatePicker
              className="form-control"
              format={'DD-MM-YYYY'}
              value={null}
            />
          </div>
          <div className="col-6 col-lg-6 col-md-12 m-b20">
            <label style={{ color: '#232323' }}>Giới tính</label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-6 col-lg-6 col-md-12 m-b20">
            <label style={{ color: '#232323' }}>Chức danh</label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-6 col-lg-6 col-md-12 m-b20">
            <label style={{ color: '#232323' }}>Học vấn</label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-6 col-lg-6 col-md-12 m-b20">
            <label style={{ color: '#232323' }}>Trình độ</label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-6 col-lg-6 col-md-12 m-b20">
            <label style={{ color: '#232323' }}>Email</label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-6 col-lg-6 col-md-12 m-b20">
            <label style={{ color: '#232323' }}>Số điện thoại</label>
            <input type="text" className="form-control" />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        {' '}
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => setOpenUpdate(false)}
        >
          Close
        </button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalUpdateProfile
