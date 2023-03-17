import React, { Suspense, useEffect } from "react";
import Index from "./markup/Markup";
import { connect, useDispatch } from "react-redux";
import { Route, Switch, withRouter } from "react-router-dom";
import { checkAutoLogin } from "./services/AuthService";
import { isAuthenticated } from "./store/selectors/AuthSelectors";
import "./css/plugins.css";
import "./css/style.css";
import "./css/templete.css";
import "./css/skin/skin-1.css";
import "./plugins/slick/slick.min.css";
import "./plugins/slick/slick-theme.min.css";

// import { ToastContainer } from 'react-toastify';
import HomePage from "./markup/Pages/Homepage1";
import EmployeeRegister from "./markup/Pages/EmployeeRegister";
import CompanyRegister from "./markup/Pages/CompanyRegister";
import EmployeeLogin from "./markup/Pages/EmployeeLogin";
import CompanyLogin from "./markup/Pages/CompanyLogin";
import JobDetailAdmin from "./markup/Pages/JobDetailAdmin";

import CompanyManageJob from "./markup/Pages/CompanyManageJobs";
import CompanyManageResume from "./markup/Pages/CompanyManageResume";
import CompanyBrowseCandidates from "./markup/Pages/CompanyBrowseCandidates";
import JobResumeAdmin from "./markup/Pages/JobResumeAdmin";
import EmployeeRegister1 from "./markup/Pages/EmployeeRegister1";
import CompanyRegister1 from "./markup/Pages/CompanyRegister1";
// import ForgotPassword from "./markup/Pages/ForgotPassword";
import { Toaster } from "react-hot-toast";

function App(props) {
  const dispatch = useDispatch();
  // useEffect(() => {
  //     checkAutoLogin(dispatch, props.history);
  // }, [dispatch, props.history]);

  let routes = (
    <Switch>
      <Route path='/' exact component={HomePage} />
      <Route path='/employee/login' exact component={EmployeeLogin} />
      <Route path='/company/login' exact component={CompanyLogin} />
      {/* <Route path='/employee/register' exact component={EmployeeRegister} /> */}
      <Route path='/employee/register' exact component={EmployeeRegister1} />
      <Route path='/company/register' exact component={CompanyRegister1} />
      {/* <Route path='/company/register1' exact component={CompanyRegister1} /> */}
      <Route path='/confirm/job-detail/:id' exact component={JobDetailAdmin} />
      <Route path='/confirm/job-resume/:id' exact component={JobResumeAdmin} />
    </Switch>
  );
  if (props.isAuthenticated) {
    return (
      <>
        <Suspense
          fallback={
            <div id='preloader'>
              <div className='sk-three-bounce'>
                <div className='sk-child sk-bounce1'></div>
                <div className='sk-child sk-bounce2'></div>
                <div className='sk-child sk-bounce3'></div>
              </div>
            </div>
          }
        >
          <Index />
        </Suspense>
        <Toaster />
      </>
    );
  } else {
    return (
      <div className='vh-100'>
        <Suspense
          fallback={
            <div id='preloader'>
              <div className='sk-three-bounce'>
                <div className='sk-child sk-bounce1'></div>
                <div className='sk-child sk-bounce2'></div>
                <div className='sk-child sk-bounce3'></div>
              </div>
            </div>
          }
        >
          {routes}
        </Suspense>
        <Toaster
          position='top-right'
          reverseOrder={false}
          gutter={8}
          containerClassName=''
          containerStyle={{}}
          toastOptions={{
            // Define default options
            className: "",
            duration: 3000,
            style: {
              background: "#363636",
              color: "#fff",
            },

            // Default options for specific types
            success: {
              duration: 3000,
              theme: {
                primary: "green",
                secondary: "black",
              },
            },
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: isAuthenticated(state),
  };
};

export default withRouter(connect(mapStateToProps)(App));
