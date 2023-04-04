import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header2 from './../Layout/HeaderEmployee'
import Footer from './../Layout/Footer'
import Profilesidebar from './../Element/Profilesidebar'
import {
  getMyResume,
  addSchool,
  deleteSchool,
  sendOTP,
  confirmPhone,
  addShortTraining,
  deleteShortTraining,
  addWorkExperience,
  deleteWorkExperience,
} from '../../services/EmployeeApi'
function Jobprofile(props) {
  const [userInformation, setUserInformation] = useState({})
  const [reload, setReload] = useState(false)
  useEffect(() => {
    async function fetchData() {
      const response = await getMyResume(props.history)
      setUserInformation(response)
    }
    fetchData()
  }, [reload])

  return (
    <>
      <Header2 />
      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full bg-white browse-job p-t50 p-b20 px-3">
            <div className="container">
              <div className="m-b30">
                <div className="job-bx submit-resume row">
                  <div className="col-lg-6 col-md-12">
                    <div
                      className="border-bottom clearfix m-0 mb-4 row align-items-center"
                      style={{ paddingBottom: 10.5 }}
                    >
                      <h5 className="font-weight-700 pull-left text-uppercase mb-0">
                        Thông tin cá nhân
                      </h5>
                      <div style={{ cursor: 'pointer', marginLeft: 16 }}>
                        <i
                          class="fa fa-pencil-square-o"
                          style={{ fontSize: 20, color: '#0275d8' }}
                          aria-hidden="true"
                        ></i>
                      </div>
                    </div>
                    <form>
                      <div className="row m-b30">
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label className="border-bottom w-100 pb-1 mb-3">
                              Họ và tên
                            </label>
                            <p style={{ minHeight: 38 }} className="mb-0">
                              {userInformation.name}
                            </p>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label className="border-bottom w-100 pb-1 mb-3">
                              Nghề nghiệp
                            </label>
                            <p style={{ minHeight: 38 }} className="mb-0">
                              {userInformation.jobTitle}
                            </p>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label className="border-bottom w-100 pb-1 mb-3">
                              Ngôn ngữ
                            </label>
                            <p style={{ minHeight: 38 }} className="mb-0">
                              Chưa cập nhật
                            </p>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label className="border-bottom w-100 pb-1 mb-3">
                              Tuổi
                            </label>
                            <p style={{ minHeight: 38 }} className="mb-0">
                              Chưa cập nhật
                            </p>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label className="border-bottom w-100 pb-1 mb-3">
                              Mức lương gần đây
                            </label>
                            <p style={{ minHeight: 38 }} className="mb-0">
                              Chưa cập nhật
                            </p>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label className="border-bottom w-100 pb-1 mb-3">
                              Mức lương mong muốn
                            </label>
                            <p style={{ minHeight: 38 }} className="mb-0">
                              Chưa cập nhật
                            </p>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label className="border-bottom w-100 pb-1 mb-3">
                              Mô tả
                            </label>
                            <p style={{ minHeight: 38 }} className="mb-0">
                              Chưa cập nhật
                            </p>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="border-bottom clearfix mb-4">
                      <h5 className="font-weight-700 pull-left text-uppercase">
                        Thông tin liên hệ
                      </h5>
                    </div>
                    <div className="row m-b30">
                      <div className="col-lg-12">
                        <div className="form-group">
                          <label className="border-bottom w-100 pb-1 mb-3">
                            Họ và tên
                          </label>
                          <p style={{ minHeight: 38 }} className="mb-0">
                            {userInformation.name}
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group">
                          <label className="border-bottom w-100 pb-1 mb-3">
                            Số điện thoại
                          </label>
                          <div className="row align-items-center pr-3">
                            <p className="col mb-0">0123456789</p>
                            <div className="row align-items-center pr-3">
                              <p className="col mb-0 text-danger font-20">
                                <i
                                  class="fa fa-times-circle"
                                  aria-hidden="true"
                                ></i>
                              </p>
                              <button className="btn btn-primary btn-md">
                                Xác thực
                              </button>
                            </div>
                            {/* <div className="row align-items-center pr-3">
                              <p className="col mb-0 text-success font-20">
                                <i
                                  class="fa fa-check-circle"
                                  aria-hidden="true"
                                ></i>
                              </p>
                              <button className="btn btn-primary btn-md">
                                Cập nhật
                              </button>
                            </div> */}
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group">
                          <label className="border-bottom w-100 pb-1 mb-3">
                            Email
                          </label>
                          <div className="row align-items-center pr-3">
                            <p className="col mb-0">user123@gmail.com</p>
                            <div className="row align-items-center pr-3">
                              <p className="col mb-0 text-danger font-20">
                                <i
                                  class="fa fa-times-circle"
                                  aria-hidden="true"
                                ></i>
                              </p>
                              <button className="btn btn-primary btn-md">
                                Xác thực
                              </button>
                            </div>
                            {/* <div className="row align-items-center pr-3">
                              <p className="col mb-0 text-success font-20">
                                <i
                                  class="fa fa-check-circle"
                                  aria-hidden="true"
                                ></i>
                              </p>
                              <button className="btn btn-primary btn-md">
                                Cập nhật
                              </button>
                            </div> */}
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group">
                          <label className="border-bottom w-100 pb-1 mb-3">
                            Địa chỉ
                          </label>
                          <p style={{ minHeight: 38 }} className="mb-0">
                            {userInformation.address}
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group">
                          <label className="border-bottom w-100 pb-1 mb-3">
                            Thành phố
                          </label>
                          <p style={{ minHeight: 38 }} className="mb-0">
                            Chưa cập nhật
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group">
                          <label className="border-bottom w-100 pb-1 mb-3">
                            Postcode
                          </label>
                          <p style={{ minHeight: 38 }} className="mb-0">
                            11223344
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
export default Jobprofile
