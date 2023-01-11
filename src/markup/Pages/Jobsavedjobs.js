import React from "react";
import { Link } from "react-router-dom";
import Header2 from "./../Layout/Header2";
import Footer from "./../Layout/Footer";
import SavedJobs from "./../Element/SavedJobs";
import { Form, FormControl } from "react-bootstrap";
import Select from "react-select";
import Profilesidebar from "./../Element/Profilesidebar";

function Jobsavedjobs(props) {
  return (
    <>
      <Header2 />
      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full bg-white p-t50 p-b20">
            <div className="container">
              <div className="row">
                <Profilesidebar url={props.location.pathname} />
                <div className="col-xl-9 col-lg-8 m-b30">
                  <div className="section-full">
                    <div className="find-job-bx">
                      <form className="dezPlaceAni">
                        <div className="row">
                          <div className="col-lg-6 col-md-6">
                            <div className="form-group">
                              <FormControl
                                as={Select}
                                custom
                                placeholder="Chuyên nghành mong muốn"
                              ></FormControl>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="form-group">
                              <FormControl
                                as={Select}
                                custom
                                placeholder="Chức danh mong muốn"
                              ></FormControl>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="form-group">
                              <FormControl
                                as={Select}
                                custom
                                placeholder="Chức vụ mong muốn"
                              >
                                <option>Select Sector</option>
                                <option>Construction</option>
                              </FormControl>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="form-group">
                              <FormControl
                                as={Select}
                                custom
                                placeholder="Môi trường làm việc mong muốn"
                              >
                                <option>Select Sector</option>
                                <option>Construction</option>
                              </FormControl>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="form-group">
                              <FormControl
                                as={Select}
                                custom
                                placeholder="Lĩnh vực mong muốn"
                              >
                                <option>Select Sector</option>
                                <option>Construction</option>
                              </FormControl>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="form-group">
                              <FormControl
                                as={Select}
                                custom
                                placeholder="Loại hình đơn vị tuyển dụng"
                              >
                                <option>Select Sector</option>
                                <option>Construction</option>
                              </FormControl>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="form-group">
                              <FormControl
                                as={Select}
                                custom
                                placeholder="Nơi làm việc mong muốn"
                              >
                                <option>Select Sector</option>
                                <option>Construction</option>
                              </FormControl>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <button
                              type="submit"
                              className="site-button btn-block"
                            >
                              Tìm việc
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <SavedJobs />
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

export default Jobsavedjobs;
