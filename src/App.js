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
import Login from "./markup/Pages/Loginpage2";
import HomePage from "./markup/Pages/Homepage1";
import SignUp from "./markup/Pages/Register2";
import EmployeeRegister from "./markup/Pages/EmployeeRegister";
import CompanyRegister from "./markup/Pages/CompanyRegister";
import EmployeeLogin from "./markup/Pages/EmployeeLogin";
import CompanyLogin from "./markup/Pages/CompanyLogin";

//const SignUp = lazy(() => import('./markup/Pages/Register2'));
//const ForgotPassword = lazy(() => import('./markup/pages/ForgotPassword'));
/*  const Login = lazy(() => {
    return new Promise(resolve => {
    setTimeout(() => resolve(import('./markup/Pages/Loginpage2')), 500);
  });
});  */

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
