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
import CompanyManageJob from "./markup/Pages/CompanyManageJobs";
import CompanyManageResume from "./markup/Pages/CompanyManageResume";
import CompanyBrowseCandidates from './markup/Pages/CompanyBrowseCandidates';
import JobResume from './markup/Pages/JobResume';
import Companyprofile from "./markup/Pages/Companyprofile";
// import ForgotPassword from "./markup/Pages/ForgotPassword";

function App(props) {
  const dispatch = useDispatch();
  // useEffect(() => {
  //     checkAutoLogin(dispatch, props.history);
  // }, [dispatch, props.history]);

  let routes = (
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/employee/login" exact component={EmployeeLogin} />
      <Route path="/company/login" component={CompanyLogin} />
      <Route path="/employee/register" component={EmployeeRegister} />
      <Route path="/company/register" component={CompanyRegister} />
      <Route path="/company-manage-jobs" component={CompanyManageJob} />
      <Route path="/company-manage-resume" component={CompanyManageResume} />
      <Route path="/company-browse-candidates" component={CompanyBrowseCandidates} />
      <Route path="/job-resume/:id" component={JobResume} />
      <Route path='/company-profile' exact component={Companyprofile} />
    </Switch>
  );
  if (props.isAuthenticated) {
    return (
      <>
        <Suspense
          fallback={
            <div id="preloader">
              <div className="sk-three-bounce">
                <div className="sk-child sk-bounce1"></div>
                <div className="sk-child sk-bounce2"></div>
                <div className="sk-child sk-bounce3"></div>
              </div>
            </div>
          }
        >
          <Index />
        </Suspense>
      </>
    );
  } else {
    return (
      <div className="vh-100">
        <Suspense
          fallback={
            <div id="preloader">
              <div className="sk-three-bounce">
                <div className="sk-child sk-bounce1"></div>
                <div className="sk-child sk-bounce2"></div>
                <div className="sk-child sk-bounce3"></div>
              </div>
            </div>
          }
        >
          {routes}
        </Suspense>
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
