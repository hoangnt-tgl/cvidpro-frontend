import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header2 from "./../Layout/HeaderEmployee";
import Footer from "./../Layout/Footer";
import { Table } from "react-bootstrap";
import Profilesidebar from "./../Element/Profilesidebar";
import { displayTime } from "../../services/TimeService";
import { gẹtApplyJobForEmployee } from "../../services/EmployeeApi";

function Jobsappliedjob(props) {
  const [jobList, setJobList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    window.scrollTo(0, 0);
    async function fetchData() {
      setJobList((await gẹtApplyJobForEmployee()).data);
      setIsLoading(false);
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
              <div className="m-b30 browse-job">
                <div className="job-bx-title clearfix d-flex align-items-center">
                  <h5 className="font-weight-700 pull-left text-uppercase mr-auto my-0">
                    Công việc đã ứng tuyển
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
                  {!isLoading && jobList?.length === 0 && (
                    <>
                      <div className="text-center">
                        <h3 className="text-danger">
                          Bạn chưa ứng tuyển công việc nào
                        </h3>
                        <Link
                          to="/jobs-saved-jobs"
                          className="site-button button-sm"
                        >
                          Tìm việc ngay
                        </Link>
                      </div>
                    </>
                  )}
                  <div className="row">
                  <Table responsive="sm">
                    </Table>
                    {jobList?.map((item, index) => (
                      <div className="col-lg-6 mb-2">
                        <li key={index}>
                          <div className="post-bx">
                            <div className="job-post-info m-a0">
                              <h4>
                                <Link
                                  to={`/search-job/job-detail/${item._id}`}
                                  target="_blank"
                                >
                                  {item.jobInfo.title}
                                </Link>
                              </h4>
                              <ul>
                                <li>
                                  <Link to={"#"}>{item.jobInfo.position}</Link>
                                </li>
                                <li>
                                  <i className="fa fa-map-marker"></i>{" "}
                                  {item.jobInfo.location}
                                </li>
                                {/* <li>
                                  <i className="fa fa-money"></i> 25,000
                                </li> */}
                              </ul>
                              <div className="job-time m-t15 m-b10">
                                {item.jobInfo.major.map((ele, index) => (
                                  <Link to={"#"} className="mr-1">
                                    <span>{ele}</span>
                                  </Link>
                                ))}
                              </div>
                              <div className="posted-info clearfix">
                                <p className="m-tb0 text-primary float-left">
                                  <span className="text-black m-r10">
                                    Lịch phỏng vấn:
                                  </span>{" "}
                                  {displayTime(item.interview?.date)}
                                </p>
                                {/* disable link */}
                                {item.interview?.date && (
                                  <div className="float-right">
                                    <Link
                                      to={"#"}
                                      className="btn-info button-sm mx-2"
                                    >
                                      Từ chối
                                    </Link>
                                    <Link
                                      to={"#"}
                                      className="site-button button-sm "
                                    >
                                      Xác nhận
                                    </Link>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </li>
                      </div>
                    ))}
                  </div>
                </ul>
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
