import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";

function CompanySidebar(props) {
    const [companyName, setCompanyName] = useState('')
    const url = props.url.pathname;
    useEffect(() => {
        let name = JSON.parse(localStorage.getItem('userDetails')).companyName;

        setCompanyName(name);
        console.log("CompanySidebar", props.url.pathname);
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
                <Link to={"#"}>{companyName}</Link>
              </h4>
            </div>
          </div>
          <ul>
            <li>
              <Link to={"/company-profile"} className={url === "/company-profile" ? 'active' : ''}>
                <i className="fa fa-user-o" aria-hidden="true"></i>
                <span>Thông tin công ty</span>
              </Link>
            </li>
            <li>
              <Link to={"/company-department"} className={url === "/company-department" ? 'active' : ''}>
                <i className="fa fa-user-o" aria-hidden="true"></i>
                <span>Phòng ban</span>
              </Link>
            </li>
            <li>
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
            </li>
            <li>
              <Link to={"/company-change-password"} className={url === "/company-change-password" ? 'active' : ''}>
                <i className="fa fa-key" aria-hidden="true"></i>
                <span>Change Password</span>
              </Link>
            </li>
            <li>
              <Link to={"./"}>
                <i className="fa fa-sign-out" aria-hidden="true"></i>
                <span>Log Out</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default CompanySidebar;
