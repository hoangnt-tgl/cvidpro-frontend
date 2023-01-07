import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header2 from "./../Layout/Header2";
import Footer from "./../Layout/Footer";
import { Form } from "react-bootstrap";
import GoogleMaps from "simple-react-google-maps";
import { getMyCompany } from "../../services/CompanyApi";
import {
  getSortTime,
  formatTimeInput,
  getMonthYear,
} from "../../services/TimeService";
import Select from "react-select";
import CompanySidebar from "./../Element/CompanySidebar";
function Companyprofile(props) {
  const [companyInfo, setCompanyInfo] = useState({});
  useEffect(() => {
    async function fetchData() {
      let myCompany = await getMyCompany(props.history);
      setCompanyInfo(myCompany);
      console.log(myCompany);
    }
    fetchData();
  }, []);
  return (
    <>
      <Header2 />
      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full bg-white p-t50 p-b20">
            <div className="container">
              <div className="row">
			  <CompanySidebar url={props.history.location}/>
                <div className="col-xl-9 col-lg-8 m-b30">
                  <div className="job-bx submit-resume">
                    <div className="job-bx-title clearfix">
                      <h5 className="font-weight-700 pull-left text-uppercase">
                        Thông tin công ty
                      </h5>
                      <Link
                        to={"/company-profile"}
                        className="site-button right-arrow button-sm float-right"
                      >
                        Back
                      </Link>
                    </div>
                    <form>
                      <div className="row m-b30">
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Tên công ty</label>
                            <input
                              type="text"
                              className="form-control"
                              value={companyInfo.companyName}
                              //   onChange={(e) => setCompanyInfo({ ...companyInfo, companyName: e.target.value })}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Mã số thuế</label>
                            <input
                              type="email"
                              className="form-control"
                              value={companyInfo.username}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Ngày thành lập </label>
                            <input
                              type="text"
                              className="form-control"
                              value={formatTimeInput(companyInfo.openDate)}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Loại hình công ty</label>
                            <input
                              className="form-control"
                              value={companyInfo.companyType}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Nghành nghề chính</label>
                            <input
                              className="form-control"
                              value={companyInfo.mainIndustry}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="job-bx-title clearfix">
                        <h5 className="font-weight-700 pull-left text-uppercase">
                          Thông tin người liên hệ
                        </h5>
                      </div>
                      <div className="row m-b30">
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Họ và tên</label>
                            <input
                              type="text"
                              className="form-control"
                              value={companyInfo.name}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Phone</label>
                            <input
                              type="text"
                              className="form-control"
                              value={companyInfo.phone}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Email</label>
                            <input
                              type="email"
                              className="form-control"
                              value={companyInfo.email}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Chức vụ</label>
                            <input
                              type="text"
                              className="form-control"
                              value={companyInfo.position}
                            />
                          </div>
                        </div>
                      </div>
                      <button type="submit" className="site-button m-b30">
                        Update Setting
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default Companyprofile;
