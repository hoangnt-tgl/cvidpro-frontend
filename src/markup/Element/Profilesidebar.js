import React from 'react';
import {Link} from 'react-router-dom';

function Profilesidebar(props){
	const url = props.url;
	return(
		<div className="col-xl-3 col-lg-4 m-b30">
			<div className="sticky-top">
				<div className="candidate-info">
					<div className="candidate-detail text-center">
						<div className="canditate-des">
							<Link to={''}>
								<img alt="" src={props.userInfo?.avatar} />
							</Link>
							<div className="upload-link" title="update" data-toggle="tooltip" data-placement="right">
								<input type="file" className="update-flie" />
								<i className="fa fa-camera"></i>
							</div>
						</div>
						<div className="candidate-title">
							<div className="">
								<h4 className="m-b5"><Link to={"#"}>{props?.userInfo?.name}</Link></h4>
								<p  className="m-b0"><Link to={"#"}>{props?.userInfo?.jobTitle}</Link></p>
							</div>
						</div>
					</div>
					<ul>
						<li><Link to={"/jobs-profile"} className={url === "/jobs-profile" ? 'active' : ''}>
							<i className="fa fa-user-o" aria-hidden="true"></i> 
							<span>Thông tin cá nhân</span></Link></li>
						<li><Link to={"/jobs-my-resume"} target="_blank" >
							<i className="fa fa-file-text-o" aria-hidden="true"></i> 
							<span>Lý lịch ứng viên</span></Link></li>
						<li><Link to={"/jobs-saved-jobs"} className={url === "/jobs-saved-jobs" ? 'active' : ''}>
							<i className="fa fa-heart-o" aria-hidden="true"></i> 
							<span>Tìm việc</span></Link></li>
						<li><Link to={"/jobs-applied-job"} className={url === "/jobs-applied-job" ? 'active' : ''}>
							<i className="fa fa-briefcase" aria-hidden="true"></i> 
							<span>Việc đã chọn</span></Link></li>
						<li><Link to={"/jobs-alerts"} className={url === "/jobs-alerts" ? 'active' : ''}>
							<i className="fa fa-bell-o" aria-hidden="true"></i> 
							<span>Lời mời</span></Link></li>
							<li><Link to={"/jobs-cv-manager"} className={url === "/jobs-cv-manager" ? 'active' : ''}>
							<i className="fa fa-id-card-o" aria-hidden="true"></i> 
							<span>CV Manager</span></Link></li>
						<li><Link to={"/jobs-change-password"} className={url === "/jobs-change-password" ? 'active' : ''}>
							<i className="fa fa-key" aria-hidden="true"></i> 
							<span>Thay đổi mật khẩu</span></Link></li>
						<li><Link to={"./"}>
							<i className="fa fa-sign-out" aria-hidden="true"></i> 
							<span>Log Out</span></Link>
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}
export default Profilesidebar;