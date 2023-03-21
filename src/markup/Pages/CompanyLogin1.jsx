import React from "react";
import { connect, useDispatch } from "react-redux";
import {
  loadingToggleAction,
  companyLoginAction,
} from "../../store/actions/AuthActions";
// image
import LoginCompany from "../../components/LoginUser/Login";
import RegisterLayout from "../../customComponents/RegisterLayout/RegisterLayout";
function Login(props) {
  const dispatch = useDispatch();
  function onLogin(data) {
    console.log("companylogin", data);
    dispatch(loadingToggleAction(true));
    dispatch(
      companyLoginAction(data.name.trim(), data.password.trim(), props.history)
    );
  }

  return (
    <RegisterLayout isLoginPage={true}>
      <h1 className='form-title mx-auto'>Đăng nhập</h1>
      <LoginCompany onLogin={onLogin} />
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
