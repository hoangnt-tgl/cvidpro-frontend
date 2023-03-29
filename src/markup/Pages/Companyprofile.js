import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header2 from './../Layout/HeaderCompany'
import Footer from './../Layout/Footer'
import { Form } from 'react-bootstrap'
import GoogleMaps from 'simple-react-google-maps'
import { getMyCompany } from '../../services/CompanyApi'
import {
  getSortTime,
  formatTimeInput,
  getMonthYear,
} from '../../services/TimeService'
import Select from 'react-select'
import CompanySidebar from './../Element/CompanySidebar'
function Companyprofile(props) {
  const [companyInfo, setCompanyInfo] = useState({})
  useEffect(() => {
    async function fetchData() {
      let myCompany = await getMyCompany(props.history)
      setCompanyInfo(myCompany)
      console.log(myCompany)
    }
    fetchData()
  }, [])
  return (
    <>
      <Header2 />
      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full bg-white p-t50 p-b20">
            <div className="container">
              <div className="m-b30">
                <div className="job-bx submit-resume row">
                  <div className="col-lg-6 col-md-12">
                    <div className="border-bottom clearfix mb-4">
                      <h5 className="font-weight-700 pull-left text-uppercase">
                        Thông tin công ty
                      </h5>
                    </div>
                    <form>
                      <div className="row m-b30">
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label className="border-bottom w-100 pb-1 mb-3">
                              Tên công ty
                            </label>
                            <p
                              style={{ height: 38, lineHeight: '38px' }}
                              className="mb-0"
                            >
                              {companyInfo.companyName}
                            </p>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label className="border-bottom w-100 pb-1 mb-3">
                              Mã số thuế
                            </label>
                            <p
                              style={{ height: 38, lineHeight: '38px' }}
                              className="mb-0"
                            >
                              {companyInfo.username}
                            </p>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label className="border-bottom w-100 pb-1 mb-3">
                              Loại hình công ty
                            </label>
                            <p
                              style={{ height: 38, lineHeight: '38px' }}
                              className="mb-0"
                            >
                              {companyInfo.companyType}
                            </p>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label className="border-bottom w-100 pb-1 mb-3">
                              Nghành nghề chính
                            </label>
                            <p
                              style={{ height: 38, lineHeight: '38px' }}
                              className="mb-0"
                            >
                              {companyInfo.mainIndustry}
                            </p>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="border-bottom clearfix mb-4">
                      <h5 className="font-weight-700 pull-left text-uppercase">
                        Thông tin người liên hệ
                      </h5>
                    </div>
                    <div className="row m-b30">
                      <div className="col-lg-12">
                        <div className="form-group">
                          <label className="border-bottom w-100 pb-1 mb-3">
                            Họ và tên
                          </label>
                          <p
                            style={{ height: 38, lineHeight: '38px' }}
                            className="mb-0"
                          >
                            {companyInfo.name}
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group">
                          <label className="border-bottom w-100 pb-1 mb-3">
                            Phone
                          </label>
                          <div className="row align-items-center pr-3">
                            <p className="col-9 mb-0 text-danger">
                              Chưa xác thực
                            </p>
                            <button className="col-3 btn btn-primary btn-md">
                              Xác thực
                            </button>
                          </div>
                          {/* <div className="row align-items-center pr-3">
                            <p className="col-9 mb-0">{companyInfo.phone}</p>
                            <button className="col-3 btn btn-primary btn-md">
                              Cập nhật
                            </button>
                          </div> */}
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group">
                          <label className="border-bottom w-100 pb-1 mb-3">
                            Email
                          </label>
                          <div className="row align-items-center pr-3">
                            <p className="col-9 mb-0 text-danger">
                              Chưa xác thực
                            </p>
                            <button className="col-3 btn btn-primary btn-md">
                              Xác thực
                            </button>
                          </div>
                          {/* <div className="row align-items-center pr-3">
                            <p className="col-9 mb-0">{companyInfo.email}</p>
                            <button className="col-3 btn btn-primary btn-md">
                              Cập nhật
                            </button>
                          </div> */}
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group">
                          <label className="border-bottom w-100 pb-1 mb-3">
                            Chức vụ
                          </label>
                          <p
                            style={{ height: 38, lineHeight: '38px' }}
                            className="mb-0"
                          >
                            {companyInfo.position}
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
export default Companyprofile
