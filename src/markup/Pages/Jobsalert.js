import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header2 from "./../Layout/HeaderEmployee";
import Footer from "./../Layout/Footer";
import { gẹtApplyJobForEmployee } from "../../services/EmployeeApi";
import { Table } from "react-bootstrap";
import { displayTime } from "../../services/TimeService";
import { confirmJob } from "../../services/EmployeeApi";
function Jobsalert(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [jobList, setJobList] = useState([]);
  // delete data
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

  const handleConfirm = (id) => {
    confirmJob(id).then((res) => {
      gẹtApplyJobForEmployee("company").then((res) => {
        setJobList(res.data);
      });
    });
  };

  return (
    <>
      <Header2 />
      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full bg-white p-t50 p-b20">
            <div className="container">
              <div className="m-b30">
                <div className="job-bx table-job-bx browse-job clearfix">
                  <div className="job-bx-title clearfix">
                    <h5 className="font-weight-700 pull-left text-uppercase">
                      Lời mời
                    </h5>
                  </div>
                  <ul className="cv-manager w-100">
                    <Table striped bordered hover size="sm">
                      <thead>
                        <tr>
                          <th>Vị trí tuyển dụng</th>
                          <th>Chức vụ</th>
                          <th>Địa điểm</th>
                          <th>Thời gian ứng tuyển</th>

                          <th>Thông tin phỏng vấn</th>
                          <th>Tác vụ</th>
                        </tr>
                      </thead>
                      <tbody>
                        {jobList?.map((item, index) => (
                          <tr>
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

                            <td>
                              {item.status}
                              {item.status === "confirm" && (
                                <Link to={"#"}>Xem thông tin</Link>
                              )}
                            </td>

                            <td>
                              {/* Hai button */}
                              <div className="d-flex">
                                <Link
                                  to={"#"}
                                  className="btn btn-danger btn-sm m-1"
                                >
                                  <i className="fa fa-trash"></i>
                                </Link>
                                <Link
                                  to={"#"}
                                  className="btn btn-success btn-sm m-1"
                                  onClick={() => handleConfirm(item._id)}
                                >
                                  <i className="fa fa-check"></i>
                                </Link>
                              </div>
                            </td>
                          </tr>
                        ))}
                        <td colspan="6">
                          {!isLoading && jobList?.length === 0 && (
                            <>
                              <div className="text-center">
                                <h3 className="text-danger">
                                  Bạn chưa có lời mời nào
                                </h3>
                                <Link
                                  to="/jobs-saved-jobs"
                                  className="site-button button-sm"
                                >
                                  Tìm kiếm công việc
                                </Link>
                              </div>
                            </>
                          )}
                        </td>
                      </tbody>
                    </Table>
                  </ul>
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
export default Jobsalert;
