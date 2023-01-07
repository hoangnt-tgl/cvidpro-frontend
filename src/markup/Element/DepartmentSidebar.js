import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { getDepartmentByKey } from "../../services/CompanyApi";

function CompanySidebar(props) {
    
    const url = props.url.pathname;
    useEffect(() => {
    }, []);

  return (
    <div className="col-xl-3 col-lg-4 m-b30">
      <div className="sticky-top">
        <div className="candidate-info company-info">
          <div className="candidate-detail text-center">
            <div className="canditate-des">
              <Link to={"#"}>
                <img alt="" src={require("./../../images/logo/icon3.jpg")} />
              </Link>
              <div
                className="upload-link"
                title="update"
                data-toggle="tooltip"
                data-placement="right"
              >
                <input type="file" className="update-flie" />
                <i className="fa fa-pencil"></i>
              </div>
            </div>
            <div className="candidate-title">
              <h4 className="m-b5">
                <Link to={"#"}>{props.name}</Link>
              </h4>
            </div>
          </div>
          <ul>
            <li>
              <Link to={"/company-manage-jobs"} className={url === "/company-manage-jobs" ? 'active' : ''}>
                <i className="fa fa-user-o" aria-hidden="true"></i>
                <span>Vị trí tuyển dụng</span>
              </Link>
            </li>
            <li>
              <Link to={"/company-browse-candidates"} className={url === "/company-browse-candidates" ? 'active' : ''}>
                <i className="fa fa-user-o" aria-hidden="true"></i>
                <span>Tìm ứng viên</span>
              </Link>
            </li>
            <li>
              <Link to={"/company-manage-resume"} className={url === "/company-manage-resume" ? 'active' : ''}>
                <i className="fa fa-user-o" aria-hidden="true"></i>
                <span>Ứng viên đã chọn</span>
              </Link>
            </li>
            {/* <li>
              <Link to={"/company-post-jobs"} className={url === "/company-post-jobs" ? 'active' : ''}>
                <i className="fa fa-file-text-o" aria-hidden="true"></i>
                <span>Post A Job</span>
              </Link>
            </li>
            <li>
              <Link to={"/company-transactions"} className={url === "/company-transactions" ? 'active' : ''}>
                <i className="fa fa-random" aria-hidden="true"></i>
                <span>Transactions</span>
              </Link>
            </li>
            <li>
              <Link to={"/company-manage-job"} className={url === "/company-manage-job" ? 'active' : ''}>
                <i className="fa fa-briefcase" aria-hidden="true"></i>
                <span>Manage jobs</span>
              </Link>
            </li>
            <li>
              <Link to={"/company-resume"} className={url === "/company-resume" ? 'active' : ''}>
                <i className="fa fa-id-card-o" aria-hidden="true"></i>
                <span>Resume</span>
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default CompanySidebar;
