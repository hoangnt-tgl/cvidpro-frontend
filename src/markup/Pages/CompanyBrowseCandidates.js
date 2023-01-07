import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header2 from "../Layout/Header2";
import Footer from "../Layout/Footer";
import { Form } from "react-bootstrap";
import { Modal } from "react-bootstrap";

import CompanySidebar from "../Element/DepartmentSidebar";
const managerBlog = [
  {
    id: 1,
    image: require("./../../images/testimonials/pic1.jpg"),
    title: "Alexander Weir",
  },
  {
    id: 2,
    image: require("./../../images/testimonials/pic2.jpg"),
    title: "Jennifer Wood",
  },
  {
    id: 3,
    image: require("./../../images/testimonials/pic3.jpg"),
    title: "Melissa Hassib",
  },
];
function Companymanage(props) {
  const [company, setCompany] = useState(false);
  const [contacts, setContacts] = useState(managerBlog);
  return (
    <>
      <Header2 />
      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full bg-white p-t50 p-b20">
            <div className="container">
              <div className="row">
                <CompanySidebar url={props.history.location} />

                <div className="col-xl-9 col-lg-8 m-b30">
                  <div className="section-full">
                    <div className="find-job-bx">
                      <form className="dezPlaceAni">
                        <div className="row">
                          <div className="col-lg-6 col-md-6">
                            <div className="form-group">
                              <label>Job Title, Keywords, or Phrase</label>
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder=""
                                />
                                <div className="input-group-append">
                                  <span className="input-group-text">
                                    <i className="fa fa-search"></i>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="form-group">
                              <label>City, State or ZIP</label>
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder=""
                                />
                                <div className="input-group-append">
                                  <span className="input-group-text">
                                    <i className="fa fa-map-marker"></i>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="form-group">
                              <Form.Control
                                as="select"
                                custom
                                className="select-btn"
                              >
                                <option>Select Sector</option>
                                <option>Construction</option>
                              </Form.Control>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <button
                              type="submit"
                              className="site-button btn-block"
                            >
                              Tìm ứng viên
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="job-bx browse-job clearfix">
                    <div className="job-bx-title  clearfix">
                      <h5 className="font-weight-700 pull-left">
                        Tìm thấy 3 ứng viên
                      </h5>
                      <div className="float-right input-group w-auto">
                        <span className="select-title">Lọc theo</span>
                        <select className="form-control">
                          <option>All</option>
                          <option>Chức danh 1</option>
                          <option>Chức danh 2</option>
                          <option>Chức danh 3</option>
                        </select>
                      </div>
                    </div>

                    <ul className="post-job-bx browse-job-grid post-resume row">
                      {contacts.map((item, index) => (
                        <li className="col-lg-6 col-md-6" key={index}>
                          <div className="post-bx">
                            <div className="d-flex m-b20">
                              <div className="job-post-info">
                                <h5 className="m-b0">
                                  <Link to={"/jobs-profile"}>{item.title}</Link>
                                </h5>
                                <p className="m-b5 font-13">
                                  <Link to={"#"} className="text-primary">
                                    UX / UI Designer{" "}
                                  </Link>
                                  at Atract Solutions
                                </p>
                                <ul>
                                  <li>
                                    <i className="fa fa-map-marker"></i>
                                    Sacramento, California
                                  </li>
                                  <li>
                                    <i className="fa fa-money"></i> $ 2500
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="job-time m-t15 m-b10">
                              <Link to={"#"} className="mr-1">
                                <span>PHP</span>
                              </Link>
                              <Link to={"#"} className="mr-1">
                                <span>Angular</span>
                              </Link>
                              <Link to={"#"} className="mr-1">
                                <span>Bootstrap</span>
                              </Link>
                            </div>
                            <Link
                              to={"/files/pdf-sample.pdf"}
                              target="blank"
                              className="job-links"
                            >
                              <i className="fa fa-download"></i>
                            </Link>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="pagination-bx m-t30 float-right">
                      <ul className="pagination">
                        <li className="previous">
                          <Link to={"#"}>
                            <i className="ti-arrow-left"></i> Prev
                          </Link>
                        </li>
                        <li className="active">
                          <Link to={"#"}>1</Link>
                        </li>
                        <li>
                          <Link to={"#"}>2</Link>
                        </li>
                        <li>
                          <Link to={"#"}>3</Link>
                        </li>
                        <li className="next">
                          <Link to={"#"}>
                            Next <i className="ti-arrow-right"></i>
                          </Link>
                        </li>
                      </ul>
                    </div>

                    <Modal
                      show={company}
                      onHide={setCompany}
                      className="modal fade modal-bx-info"
                    >
                      <div className="modal-dialog my-0" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <div className="logo-img">
                              <img
                                alt=""
                                src={require("./../../images/logo/icon2.png")}
                              />
                            </div>
                            <h5 className="modal-title">Company Name</h5>
                            <button
                              type="button"
                              className="close"
                              onClick={() => setCompany(false)}
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <ul>
                              <li>
                                <strong>Job Title :</strong>
                                <p> Web Developer – PHP, HTML, CSS </p>
                              </li>
                              <li>
                                <strong>Experience :</strong>
                                <p>5 Year 3 Months</p>
                              </li>
                              <li>
                                <strong>Deseription :</strong>
                                <p>
                                  Lorem Ipsum is simply dummy text of the
                                  printing and typesetting industry has been the
                                  industry's standard dummy text ever since.
                                </p>
                              </li>
                            </ul>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              onClick={() => setCompany(false)}
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </Modal>
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
export default Companymanage;
