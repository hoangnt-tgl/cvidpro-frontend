import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import RegisterLayout from "../../customComponents/RegisterLayout/RegisterLayout";
import {
  loadingToggleAction,
  employeeLoginAction,
} from "../../store/actions/AuthActions";
import LoginEmployee from "../../components/LoginUser/Login";

function Login(props) {
  const dispatch = useDispatch();

  function onLogin(data) {
    console.log("companylogin", data);
    dispatch(loadingToggleAction(true));
    dispatch(
      employeeLoginAction(data.name.trim(), data.password.trim(), props.history)
    );
  }

  return (
    <RegisterLayout isLoginPage={true}>
      <h1 className='form-title mx-auto'>Đăng nhập</h1>
      <LoginEmployee onLogin={onLogin} />
    </RegisterLayout>
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
