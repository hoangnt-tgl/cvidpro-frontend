import React from 'react';
import { connect, useDispatch } from 'react-redux';
import {
  loadingToggleAction,
  companyLoginAction,
} from '../../store/actions/AuthActions';
// image
import LoginCompany from '../../components/ComAndEm/LoginUser/Login';
import RegisterLayout from '../../components/Layout/RegisterLayout/RegisterLayout'; 
import { loginCompany } from '../../constants/description';
import Header from '../../components/Layout/Header/Header';
import ForgetPass from '../../components/ComAndEm/ModalForgetPass/ForgetPass';
import { useState } from 'react';
function Login(props) {
  const [forgetPass, setForgetPass] = useState(false);
  const [isIndividual, setIsIndividual] = React.useState(false);
  const inputFiled = [
    {
      register: 'name',
      placeholder: '',
      title: 'Mã số thuế',
      type: 'text',
      description: {
        isShow: false,
        content: loginCompany.username,
      },
    },
    {
      register: 'password',
      placeholder: '',
      title: 'Mật khẩu',
      type: 'password',
      description: {
        isShow: false,
        content: loginCompany.username,
      },
    },
  ];
  const inputFiledIn = [
    {
      register: 'name',
      placeholder: '',
      title: 'Số điện thoại',
      type: 'text',
      description: {
        isShow: false,
        content: loginCompany.username,
      },
    },
    {
      register: 'password',
      placeholder: '',
      title: 'Mật khẩu',
      type: 'password',
      description: {
        isShow: false,
        content: loginCompany.username,
      },
    },
  ];
  const dispatch = useDispatch();
  function onLogin(data) {
    console.log('companylogin', data);
    dispatch(loadingToggleAction(true));
    dispatch(
      companyLoginAction(data.name.trim(), data.password.trim(), props.history)
    );
  }

  return (
    <>
      <Header />

      <RegisterLayout isLoginPage={true}>
        <div
          style={{
            height: '90vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <h1 className='form-title mx-auto'>Đăng nhập</h1>
          <LoginCompany
            setForgetPass={setForgetPass}
            setIsIndividual={setIsIndividual}
            isIndividual={isIndividual}
            onLogin={onLogin}
            where='company'
            inputFiled={isIndividual ? inputFiledIn : inputFiled}
          />
        </div>
      </RegisterLayout>
      {forgetPass && (
        <ForgetPass
          openModal={forgetPass}
          setOpenModal={setForgetPass}
          isCompany={true}
        />
      )}
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
