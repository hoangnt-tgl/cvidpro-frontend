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
import Header from "../../components/Header/Header";
import ForgetPass from "../../components/ModalForgetPass/ForgetPass";

function Login(props) {
  const [forgetPass, setForgetPass] = useState(false);
  const inputFiled = [
    {
      register: "name",
      placeholder: "số điện thoại",
      title: "Số CVID",
      type: "text",
      description: {
        isShow: false,
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
    <>
      <Header />
      <RegisterLayout isLoginPage={true}>
        <div
          style={{
            height: "90vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h1 className='form-title mx-auto'>Đăng nhập</h1>
          <LoginEmployee
            setForgetPass={setForgetPass}
            onLogin={onLogin}
            where='employee'
            inputFiled={inputFiled}
          />
        </div>
      </RegisterLayout>
      <ForgetPass openModal={forgetPass} setOpenModal={setForgetPass} />
    </>
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
