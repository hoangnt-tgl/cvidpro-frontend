import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import RegisterLayout from "../../customComponents/RegisterLayout/RegisterLayout";
import {
  loadingToggleAction,
  employeeLoginAction,
} from "../../store/actions/AuthActions";
import LoginEmployee from "../../components/LoginUser/Login";
import { loginEmployee } from "../../constants/description";

function Login(props) {
  const inputFiled = [
    {
      register: "name",
      placeholder: "",
      title: "Tên đăng nhập",
      type: "text",
      description: {
        isShow: true,
        content: loginEmployee.username,
      },
    },
    {
      register: "password",
      placeholder: "",
      title: "Mật khẩu",
      type: "password",
      description: {
        isShow: false,
        content: loginEmployee.username,
      },
    },
  ];
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
      <LoginEmployee
        onLogin={onLogin}
        where='employee'
        inputFiled={inputFiled}
      />
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
