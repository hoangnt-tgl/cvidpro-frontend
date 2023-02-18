import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header2 from "./../Layout/HeaderCompany";
import Footer from "./../Layout/Footer";
import { Modal } from "react-bootstrap";
import { createDepartment, getMyCompany } from "../../services/CompanyApi";
import { getListDepartment } from "../../services/DepartmentApi";

function CompanyDepartment(props) {
  const [companyInfo, setCompanyInfo] = useState({});
  const [reload, setReload] = useState(false);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [company, setCompany] = useState(false);
  const [addDepartment, setAddDepartment] = useState(false);
  const [listDepartment, setListDepartment] = useState([]);
  const [newDepartment, setNewDepartment] = useState({
    departmentName: "",
    managerName: "",
    managerEmail: "",
  });
  const [selectedDepartment, setSelectedDepartment] = useState({});

  function handleSelectDepartment(department) {
    setSelectedDepartment(department);
    setCompany(true);
  }

  async function handleAddDepartment() {
    await createDepartment({ ...newDepartment, companyId: companyInfo._id });
    setAddDepartment(false);
    setReload(true);
  }
  useEffect(() => {
    async function fetchData() {
      let myCompany = await getMyCompany(props.history);
      setCompanyInfo(myCompany);
    }
    fetchData();
    window.addEventListener("resize", () => setInnerWidth(window.innerWidth));
    setReload(false);
  }, []);
  useEffect(() => {
    async function fetchData() {
      let data = await getListDepartment(companyInfo._id);
      setListDepartment(data.data);
    }
    fetchData();
    window.addEventListener("resize", () => setInnerWidth(window.innerWidth));
    setReload(false);
  }, [reload]);

  return (
    <>
      <Header2 />
      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full bg-white p-t50 p-b20">
            <div className="container">
              <div className="m-b30">
                <div className="job-bx browse-job clearfix">
                  <div className="job-bx-title  clearfix">
                    <h5 className="font-weight-700 pull-left text-uppercase">
                      Quản lý phòng ban
                    </h5>
                  </div>
                  {/* Nút tạo phòng ban bên phải */}
                  {companyInfo?.confirm2?.confirmed === 1 && (
                    <div className="float-right">
                      <button
                        className="site-button float-right mb-3"
                        onClick={() => setAddDepartment(true)}
                      >
                        Tạo phòng ban
                      </button>
                    </div>
                  )}
                  <table className="table-job-bx cv-manager company-manage-job">
                    <thead>
                      <tr>
                        <th>Tên phòng ban</th>
                        {innerWidth > 768 && <th>Người quản lí</th>}
                        {innerWidth > 768 && <th>Email</th>}
                        <th>Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listDepartment?.length === 0 && (
                        <>
                          <tr className="text-center">
                            <td colSpan="4">Chưa có phòng ban nào</td>
                          </tr>
                        </>
                      )}
                      {companyInfo.confirm2?.confirmed !== 1 && (
                        <>
                          <tr className="text-center">
                            <td colSpan="4">Tài khoản chưa được duyệt</td>
                          </tr>
                        </>
                      )}
                      {
                        listDepartment.map((department, index) => {
                          return (
                            <tr key={index}>
                              <td className="job-name">
                                <Link
                                  to={`company-manage-jobs?key=${department.key}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{ color: "blue" }}
                                >
                                  {department.departmentName}
                                </Link>
                              </td>
                              {innerWidth > 768 && (
                                <td className="application text-primary">
                                  {department.managerName}
                                </td>
                              )}
                              {innerWidth > 768 && (
                                <td className="expired pending">
                                  {department.managerEmail}
                                </td>
                              )}
                              <td className="job-links">
                                <Link
                                  to={"#"}
                                  onClick={() =>
                                    handleSelectDepartment(department)
                                  }
                                >
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
                    <div className="modal-dialog m-0" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <div className="logo-img">
                            <img
                              alt=""
                              src={require("./../../images/logo/icon2.png")}
                            />
                          </div>
                          <h5 className="modal-title">
                            {selectedDepartment.departmentName}
                          </h5>
                          <button
                            type="button"
                            className="close"
                            onClick={() => setCompany(false)}
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body w-100">
                          <ul>
                            <li>
                              <strong>Người quản lí</strong>
                              <p> {selectedDepartment.managerName} </p>
                            </li>
                            <li>
                              <strong>Email</strong>
                              <p>{selectedDepartment.managerEmail}</p>
                            </li>
                            {/* <li>
                                <strong>Deseription :</strong>
                                <p>
                                  Lorem Ipsum is simply dummy text of the
                                  printing and typesetting industry has been the
                                  industry's standard dummy text ever since.
                                </p>
                              </li> */}
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
      <Footer />
    </>
  );
}
export default CompanyDepartment;
