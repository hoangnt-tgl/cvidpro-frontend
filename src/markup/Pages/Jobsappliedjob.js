import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header2 from "./../Layout/HeaderEmployee";
import Footer from "./../Layout/Footer";
import { Table } from "react-bootstrap";
import Profilesidebar from "./../Element/Profilesidebar";
import { displayTime } from "../../services/TimeService";
import { gẹtApplyJobForEmployee } from "../../services/EmployeeApi";
import loginbg from "./../../images/bg6.jpg";
import "../../css/jobsave.css"

function Jobsappliedjob(props) {
  const [jobList, setJobList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    window.scrollTo(0, 0);
    async function fetchData() {
      gẹtApplyJobForEmployee("employee").then((res) => {
        setJobList(res.data);
        setIsLoading(false);
      });
    }
    fetchData();
  }, []);
  return (
    <>
      <Header2 />
      <div className="page-content bg-white" >
        <div className="content-block">
          <div className="section-full bg-white p-t50 p-b20"  
          style={{
            backgroundImage: "url(" + loginbg + ")",
            backgroundSize: "cover",
          }}>
            <div className="container">
              <div className="m-b30 browse-job">
                <div className="job-bx-title clearfix d-flex align-items-center">
                  <h5 className="font-weight-700 pull-left text-uppercase mr-auto my-0 jobposition">
                    Vị trí đã ứng tuyển
                  </h5>
                  <div className="float-right">
                    {/* <span className="select-title">Lọc theo</span>
                        <select className="custom-btn">
                          <option>All</option>
                          <option>Đang tuyển</option>
                          <option>Dừng tuyển</option>
                          <option>Đã được duyệt</option>
                          <option>Đang chờ duyệt</option>
                          <option>Không được duyệt</option>
                        </select> */}
                  </div>
                </div>
                <ul className="post-job-bx browse-job">
                  <Table striped bordered hover size="sm">
                    <thead>
                      <tr>
                        <th className="jobbox">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck1"
                            />
                            <label className="custom-control-label" />
                          </div>
                        </th>
                        <th className="jobbox">Vị trí tuyển dụng</th>
                        <th className="jobbox">Chức vụ</th>
                        <th className="jobbox">Địa điểm</th>
                        <th className="jobbox">Thời gian ứng tuyển</th>
                        <th className="jobbox">Trạng thái</th>
                      </tr>
                    </thead>
                    <tbody>
                      {jobList?.map((item, index) => (
                        <tr>
                          <td>
                            {/* checkbox */}
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customCheck1"
                              />
                              <label className="custom-control-label" />
                            </div>
                          </td>
                          <td>
                            <Link
                              to={`/search-job/job-detail/${item._id}`}
                              target="_blank"
                            >
                              {item.jobInfo.title}
                            </Link>
                          </td>
                          <td>{item.jobInfo.position}</td>
                          <td>{item.jobInfo.location}</td>
                          <td>{displayTime(item.createdAt)}</td>
                          <td></td>
                        </tr>
                      ))}

                      {!isLoading && jobList?.length === 0 && (
                        <td colspan="6" className="jobbox">
                          <div className="text-center">
                            <h3 className="text-danger">
                              Bạn chưa ứng tuyển công việc nào
                            </h3>
                            <Link
                              to="/jobs-saved-jobs"
                              className="site-button button-sm"
                            >
                              Tìm kiếm công việc
                            </Link>
                          </div>
                        </td>
                      )}
                    </tbody>
                  </Table>
                </ul>
              </div>
              {/* Tổng tiền bên góc phải và nút thanh toán ở dưới */}
              <div className="row">
                <div className="col-md-6">
                  <div className="d-flex justify-content-between">
                    <div className="d-flex align-items-center">
                      <h5 className="font-weight-700 text-uppercase mr-3 jobposition">
                        Tổng tiền
                      </h5>
                      <h5 className="font-weight-700 text-uppercase jobposition">0 VND</h5>
                    </div>
                    <div className="d-flex align-items-center">
                      <h5 className="font-weight-700 text-uppercase mr-3 jobposition">
                        Số lượng
                      </h5>
                      <h5 className="font-weight-700 text-uppercase jobposition">0</h5>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex justify-content-end">
                    <Link to="/jobs-saved-jobs" className="site-button button">
                      Thanh toán
                    </Link>
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
export default Jobsappliedjob;
