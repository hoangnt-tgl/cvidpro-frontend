import React from "react";
import { connect, useDispatch } from "react-redux";
import {
  loadingToggleAction,
  companyLoginAction,
} from "../../store/actions/AuthActions";
// image
import LoginCompany from "../../components/LoginUser/Login";
import RegisterLayout from "../../customComponents/RegisterLayout/RegisterLayout";
import { loginCompany } from "../../constants/description";
import Header from "../../components/Header/Header";
function Login(props) {
  const inputFiled = [
    {
      register: "name",
      placeholder: "",
      title: "Tên đăng nhập",
      type: "text",
      description: {
        isShow: true,
        content: loginCompany.username,
      },
    },
    {
      register: "password",
      placeholder: "",
      title: "Mật khẩu",
      type: "password",
      description: {
        isShow: false,
        content: loginCompany.username,
      },
    },
  ];
  const dispatch = useDispatch();
  function onLogin(data) {
    console.log("companylogin", data);
    dispatch(loadingToggleAction(true));
    dispatch(
      companyLoginAction(data.name.trim(), data.password.trim(), props.history)
    );
  }

  return (
    <>
      <Header />
      <RegisterLayout isLoginPage={true}>
        <h1 className='form-title mx-auto'>Đăng nhập</h1>
        <LoginCompany
          onLogin={onLogin}
          where='company'
          inputFiled={inputFiled}
        />
      </RegisterLayout>
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
