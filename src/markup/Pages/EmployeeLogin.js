import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  loadingToggleAction,
  loginAction,
} from "../../store/actions/AuthActions";
import { store } from "../../store/store";

// image
//import logo from "../../images/logo-full-white.png";
import loginbg from "./../../images/bg6.jpg";
import logo2 from "./../../images/logo-white2.png";

function Login(props) {
  const [username, setUsername] = useState("demo@example.com");
  let errorsObj = { username: "", password: "" };
  const [errors, setErrors] = useState(errorsObj);
  const [password, setPassword] = useState("123456");

  const dispatch = useDispatch();

  function onLogin(e) {
    e.preventDefault();
    let error = false;
    const errorObj = { ...errorsObj };
    if (username === "") {
      errorObj.username = "Vui lòng nhập số điện thoại";
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
    dispatch(loginAction(username, password, props.history));
  }

  return (
    <div className="page-wraper">
      <div
        className="page-content bg-white login-style2"
        style={{
          backgroundImage: "url(" + loginbg + ")",
          backgroundSize: "cover",
        }}
      >
        <div className="section-full">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-6 d-flex">
                <div className="text-white max-w400 align-self-center">
                  <div className="logo">
                    <Link to={"/"}>
                      <img src={logo2} alt="" />
                    </Link>
                  </div>
                  <h2 className="m-b10">Đăng nhập</h2>
                  <p className="m-b30">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry has been the industry.
                  </p>
                  <ul className="list-inline m-a0">
                    <li>
                      <Link to={""} className="m-r10 text-white ">
                        <i className="fa fa-facebook"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to={""} className="m-r10 text-white ">
                        <i className="fa fa-google-plus"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to={""} className="m-r10 text-white ">
                        <i className="fa fa-linkedin"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to={""} className="m-r10 text-white ">
                        <i className="fa fa-instagram"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to={""} className="m-r10 text-white">
                        <i className="fa fa-twitter"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="login-2 submit-resume p-a30 seth">
                  <div className="nav">
                    <form onSubmit={onLogin} className="col-12 p-a0 ">
                      <p className="font-weight-600">
                        If you have an account with us, please log in.
                      </p>
                      {props.errorMessage && (
                        <div className="bg-red-300 text-red-900 border border-red-900 p-1 my-2">
                          {props.errorMessage}
                        </div>
                      )}
                      {props.successMessage && (
                        <div className="bg-green-300 text-green-900 border border-green-900 p-1 my-2">
                          {props.successMessage}
                        </div>
                      )}
                      <div className="form-group ">
                        <label>E-Mail Address*</label>
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Type Your Username Address"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                          />
                          {errors.username && (
                            <div className="text-danger fs-12">
                              {errors.username}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Password *</label>
                        <div className="input-group">
                          <input
                            type="password"
                            className="form-control"
                            value={password}
                            placeholder="Type Your Password"
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          {errors.password && (
                            <div className="text-danger fs-12">
                              {errors.password}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-center">
                        <button className="site-button float-left">
                          login
                        </button>
                        <Link
                          to="register-2"
                          className="site-button-link forget-pass m-t15 float-right"
                        >
                          <i className="fa fa-unlock-alt"></i> Sign up
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="login-footer">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <span className="float-left">
                  © Copyright by{" "}
                  <i className="fa fa-heart m-lr5 text-red heart"></i>
                  <Link to={"#"}>DexignZone </Link>{" "}
                </span>
                <span className="float-right">All rights reserved.</span>
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
