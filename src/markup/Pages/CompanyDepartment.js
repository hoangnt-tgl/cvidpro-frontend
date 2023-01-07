import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header2 from "./../Layout/Header2";
import Footer from "./../Layout/Footer";
import { Modal } from "react-bootstrap";
import CompanySidebar from "./../Element/CompanySidebar";
import { createDepartment, getMyCompany } from "../../services/CompanyApi";

function CompanyDepartment(props) {
  const [companyInfo, setCompanyInfo] = useState({});
  const [reload, setReload] = useState(false);
  const [company, setCompany] = useState(false);
  const [addDepartment, setAddDepartment] = useState(false);
  const [newDepartment, setNewDepartment] = useState({
    departmentName: "",
    managerName: "",
    managerEmail: "",
  });

  async function handleAddDepartment() {
    await createDepartment(companyInfo._id, newDepartment);
    setAddDepartment(false);
    setReload(true);
  }
  useEffect(() => {
    async function fetchData() {
      let myCompany = await getMyCompany(props.history);
      setCompanyInfo(myCompany);
      console.log(myCompany);
    }
    fetchData();
    setReload(false);
  }, [reload]);
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
                  <div className="job-bx browse-job clearfix">
                    <div className="job-bx-title  clearfix">
                      <h5 className="font-weight-700 pull-left text-uppercase">
                        Quản lý phòng ban
                      </h5>
                      <div className="float-right">
                        <span className="select-title">Sort by freshness</span>
                        <select className="custom-btn">
                          <option>All</option>
                          <option>None</option>
                          <option>Read</option>
                          <option>Unread</option>
                          <option>Starred</option>
                          <option>Unstarred</option>
                        </select>
                      </div>
                    </div>
                    {/* Nút tạo phòng ban bên phải */}
                    <div className="float-right">
                      <button
                        className="site-button float-right mb-3"
                        onClick={() => setAddDepartment(true)}
                      >
                        Tạo phòng ban
                      </button>
                    </div>
                    <table className="table-job-bx cv-manager company-manage-job">
                      <thead>
                        <tr>
                          <th className="feature">
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                id="check12"
                                className="custom-control-input selectAllCheckBox"
                                name="example1"
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="check12"
                              ></label>
                            </div>
                          </th>
                          <th>Tên phòng ban</th>
                          <th>Người quản lí</th>
                          <th>Email</th>
                          <th>Thao tác</th>
                        </tr>
                      </thead>
                      <tbody>
                        {companyInfo.departments && companyInfo.departments.map((department, index) => {
                            return (
                                <tr key={index}>
                                <td className="feature">
                                    <div className="custom-control custom-checkbox">
                                    <input
                                        type="checkbox"
                                        className="custom-control-input"
                                        id="check1"
                                        name="example1"
                                    />
                                    <label
                                        className="custom-control-label"
                                        htmlFor="check1"
                                    ></label>
                                    </div>
                                </td>
                                <td className="job-name">
                                    <Link to={`company-manage-jobs?key=${department.key}`} target="_blank" rel="noopener noreferrer">{department.departmentName}</Link>
                                </td>
                                <td className="application text-primary">
                                    {department.managerName}
                                </td>
                                <td className="expired pending">
                                    {department.managerEmail}
                                </td>
                                <td className="job-links">
                                    <Link to={"#"} onClick={() => setCompany(true)}>
                                    <i className="fa fa-eye"></i>
                                    </Link>
                                    <Link to={"#"}>
                                    <i className="ti-trash"></i>
                                    </Link>
                                </td>
                                </tr>
                            );
                        })}
                      </tbody>
                    </table>
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

                    {/* Modal tạo phòng ban */}
                    <Modal
                      show={addDepartment}
                      onHide={setAddDepartment}
                      className="modal fade modal-bx-info"
                    >
                      <div className="modal-dialog my-0 w-100" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <div className="logo-img">
                              <img
                                alt=""
                                src={require("./../../images/logo/icon2.png")}
                              />
                            </div>
                            <h5 className="modal-title">Tạo phòng ban</h5>
                            <button
                              type="button"
                              className="close"
                              onClick={() => setAddDepartment(false)}
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <div className="form-group">
                              <label>Tên phòng ban</label>
                              <input
                                className="form-control"
                                placeholder="Nhập tên phòng ban"
                                value={newDepartment.departmentName}
                                onChange={(e) => {
                                  setNewDepartment({
                                    ...newDepartment,
                                    departmentName: e.target.value,
                                  });
                                }}
                                required
                              />
                            </div>
                            <div className="form-group">
                              <label>Người quản lí</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Nhập tên người quản lí"
                                value={newDepartment.managerName}
                                onChange={(e) => {
                                  setNewDepartment({
                                    ...newDepartment,
                                    managerName: e.target.value,
                                  });
                                }}
                              />
                            </div>
                            <div className="form-group">
                              <label>Email</label>
                              <input
                                type="email"
                                className="form-control"
                                placeholder="Nhập email"
                                value={newDepartment.managerEmail}
                                onChange={(e) => {
                                  setNewDepartment({
                                    ...newDepartment,
                                    managerEmail: e.target.value,
                                  });
                                }}
                              />
                            </div>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={handleAddDepartment}
                              disabled={newDepartment.departmentName === ""}
                            >
                              Lưu
                            </button>
                            <button
                              type="button"
                              className="btn btn-secondary"
                              onClick={() => setAddDepartment(false)}
                            >
                              Hủy
                            </button>
                          </div>
                        </div>
                      </div>
                    </Modal>

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
export default CompanyDepartment;
