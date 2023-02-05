import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header2 from "./../Layout/HeaderEmployee";
import Footer from "./../Layout/Footer";
import Profilesidebar from "./../Element/Profilesidebar";
import { displayTime } from "../../services/TimeService";
import { gẹtApplyJobForEmployee } from "../../services/EmployeeApi";
const postBlog = [
  { title: "PHP Web Developer" },
  { title: "Software Developer" },
  { title: "Branch Credit Manager" },
];

function Jobsappliedjob(props) {
  const employeeInfo = JSON.parse(localStorage.getItem("userDetails"));
  const [jobList, setJobList] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
    async function fetchData() {
      setJobList((await gẹtApplyJobForEmployee(employeeInfo._id)).data);
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
                  {jobList?.map((item, index) => (
                    <li key={index}>
                      <div className="post-bx">
                        <div className="job-post-info m-a0">
                          <h4>
                            <Link to={"#"}>{item.jobInfo.title}</Link>
                          </h4>
                          <ul>
                            <li>
                              <Link to={"#"}>{item.jobInfo.position}</Link>
                            </li>
                            <li>
                              <i className="fa fa-map-marker"></i>{" "}
                              {item.jobInfo.location}
                            </li>
                            <li>
                              <i className="fa fa-money"></i> 25,000
                            </li>
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

                            <Link
                              to={"#"}
                              className="site-button button-sm float-right"
                            >
                              Xác nhận
                            </Link>
                            <Link
                              to={"#"}
                              className="btn-info button-sm float-right mx-2"
                            >
                              Từ chối
                            </Link>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="pagination-bx m-t30">
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
