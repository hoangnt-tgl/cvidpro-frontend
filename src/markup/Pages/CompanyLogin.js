import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  loadingToggleAction,
  companyLoginAction,
} from "../../store/actions/AuthActions";

// image
//import logo from "../../images/logo-full-white.png";
import loginbg from "./../../images/bg6.jpg";
import logo2 from "./../../images/logo-white2.png";

function Login(props) {
  const [email, setEmail] = useState("");
  let errorsObj = { email: "", password: "" };
  const [errors, setErrors] = useState(errorsObj);
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  function onLogin(e) {
    e.preventDefault();
    let error = false;
    const errorObj = { ...errorsObj };
    if (email === "") {
      errorObj.email = "Vui lòng nhập mã số thuế";
      error = true;
    }
    if (password === "") {
      errorObj.password = "Vui lòng nhập mật khẩu";
      error = true;
    }
    setErrors(errorObj);
    if (error) {
      return;
    }
    dispatch(loadingToggleAction(true));
    dispatch(companyLoginAction(email.trim(), password.trim(), props.history));
  }

  return (
    <div className='page-wraper'>
      <div
        className='page-content bg-white login-style2'
        style={{
          backgroundImage: "url(" + loginbg + ")",
          backgroundSize: "cover",
        }}
      >
        <div className='section-full'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-6 col-md-6 d-flex'>
                <div className='text-white max-w400 align-self-center'>
                  <div className='logo'>
                    <Link to={"/"}>
                      <img src={logo2} alt='' />
                    </Link>
                  </div>
                  <h2 className='m-b10'>Đăng nhập</h2>
                  <p className='m-b30'>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry has been the industry.
                  </p>
                  <ul className='list-inline m-a0'>
                    <li>
                      <Link to={""} className='m-r10 text-white '>
                        <i className='fa fa-facebook'></i>
                      </Link>
                    </li>
                    <li>
                      <Link to={""} className='m-r10 text-white '>
                        <i className='fa fa-google-plus'></i>
                      </Link>
                    </li>
                    <li>
                      <Link to={""} className='m-r10 text-white '>
                        <i className='fa fa-linkedin'></i>
                      </Link>
                    </li>
                    <li>
                      <Link to={""} className='m-r10 text-white '>
                        <i className='fa fa-instagram'></i>
                      </Link>
                    </li>
                    <li>
                      <Link to={""} className='m-r10 text-white'>
                        <i className='fa fa-twitter'></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className='col-lg-6 col-md-6'>
                <div className='login-2 submit-resume p-a30 seth'>
                  <div className='nav'>
                    <form onSubmit={onLogin} className='col-12 p-a0 '>
                      <p className='font-weight-600'>
                        Đăng nhập để tìm ứng viên
                      </p>
                      {props.errorMessage && (
                        <div className='bg-red-300 text-red-900 border border-red-900 p-1 my-2'>
                          {props.errorMessage}
                        </div>
                      )}
                      {props.successMessage && (
                        <div className='bg-green-300 text-green-900 border border-green-900 p-1 my-2'>
                          {props.successMessage}
                        </div>
                      )}
                      <div className='form-group '>
                        <label>Mã số thuế*</label>
                        <div className='input-group'>
                          <input
                            className='form-control'
                            placeholder='Nhâp mã số thuế'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          {/* <div className="input-group-append">
														<span className="input-group-text"><i className="fa fa-envelope"></i></span>
													</div> */}
                        </div>
                        {errors.email && (
                          <div className='text-danger fs-12'>
                            {errors.email}
                          </div>
                        )}
                      </div>
                      <div className='form-group mb-5'>
                        <label>Mật khẩu *</label>
                        <div className='input-group'>
                          <input
                            type='password'
                            className='form-control'
                            value={password}
                            placeholder='Nhập mật khẩu'
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                        {errors.password && (
                          <div className='text-danger fs-12'>
                            {errors.password}
                          </div>
                        )}
                        <Link
                          data-toggle='tab'
                          to='#forgot-password'
                          className='forget-pass mt-1 float-right'
                        >
                          <i className='fa fa-unlock-alt'></i> Quên mật khẩu
                        </Link>
                      </div>
                      <div className='text-center'>
                        <button className='site-button float-left'>
                          Đăng nhập
                        </button>
                        <Link
                          to='register'
                          className='site-button-link forget-pass m-t15 float-right'
                        >
                          <i className='fa fa-pencil-square-o'></i> Đăng ký
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className='login-footer'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-12 text-center'>
                <span className='float-left'>
                  © Copyright by{" "}
                  <i className='fa fa-heart m-lr5 text-red heart'></i>
                  <Link to={"#"}>CVIDPRO </Link>{" "}
                </span>
                <span className='float-right'>All rights reserved.</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMessage,
    successMessage: state.auth.successMessage,
    showLoading: state.auth.showLoading,
  };
};
export default connect(mapStateToProps)(Login);
