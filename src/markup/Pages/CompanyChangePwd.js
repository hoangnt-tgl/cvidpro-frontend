import React from "react";
import { Link } from "react-router-dom";
import Header2 from "../Layout/HeaderCompany";
import Footer from "../Layout/Footer";
import CompanySidebar from "./../Element/CompanySidebar";
function CompanyChangePwd(props) {
  return (
    <>
      <Header2 />
      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full bg-white browse-job p-t50 p-b20">
            <div className="container">          
                <div className="m-b30">
                  <div className="job-bx job-profile section-full bg-white"   
                  style={{
                    border: "2px solid #000",
                    width: "550px",
                    marginInline: "auto",
                    marginBottom: "auto",
                  }}>
                    <div className="job-bx-title clearfix">
                      <h5 className="font-weight-700 pull-left text-uppercase">
                        Thay đổi mật khẩu
                      </h5>
                    </div>
                    <form>
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label>Mật khẩu cũ</label>
                            <input type="password" className="form-control" />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label>Mật khẩu mới </label>
                            <input type="password" className="form-control" />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label>Xác nhận mật khẩu</label>
                            <input type="password" className="form-control" />
                          </div>
                        </div>
                        <div className="col-lg-12 m-b10">
                          <button className="site-button">
                            Cập nhật mật khẩu
                          </button>
                        </div>
                      </div>
                    </form>
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
export default CompanyChangePwd;
