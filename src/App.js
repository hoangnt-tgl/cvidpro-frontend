import React, { Suspense } from 'react';
import Index from './markup/Markup';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import { isAuthenticated } from './store/selectors/AuthSelectors';
import './css/plugins.css';
import './css/style.css';
import './css/templete.css';
import './css/skin/skin-1.css';
import './plugins/slick/slick.min.css';
import './plugins/slick/slick-theme.min.css';
import HomePage from './markup/Pages/Homepage1';
import EmployeeLogin from './markup/Pages/EmployeeLogin1';
import CompanyLogin from './markup/Pages/CompanyLogin1.jsx';
import JobDetailAdmin from './markup/Pages/JobDetailAdmin';
import JobResumeAdmin from './markup/Pages/JobResumeAdmin';
import EmployeeRegister1 from './markup/Pages/EmployeeRegister1';
import CompanyRegisterBoth from './markup/Pages/CompanyRegisterBoth.jsx';


import { Toaster } from 'react-hot-toast';
//mui time picker
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

const toastOptions = {
  // Define default options
  className: '',
  duration: 7000,
  style: {
    right: '0px',
    minWidth: '300px',
    fontSize: '20px',
    fontWeight: '500',
    zIndex: '9999',
  },
  // Default options for specific types
  success: {
    duration: 7000,
    theme: {
      primary: 'green',
      secondary: 'black',
    },
  },
};
function App(props) {
  let routes = (
    <Switch>
      <Route path='/' exact component={HomePage} />
      <Route path='/employee/login' exact component={EmployeeLogin} />
      <Route path='/company/login' exact component={CompanyLogin} />
      <Route path='/employee/register' exact component={EmployeeRegister1} />
      <Route path='/company/register' exact component={CompanyRegisterBoth} />
      <Route path='/confirm/job-detail/:id' exact component={JobDetailAdmin} />
      <Route path='/confirm/job-resume/:id' exact component={JobResumeAdmin} />
    </Switch>
  );
  if (props.isAuthenticated) {
    return (
      <>
        <LocalizationProvider dateAdapter={AdapterMoment}>
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
          <Toaster
            position='top-center'
            reverseOrder={false}
            gutter={8}
            containerClassName=''
            containerStyle={{}}
            toastOptions={toastOptions}
          />
        </LocalizationProvider>
      </>
    );
  } else {
    return (
      <div className='vh-100'>
        <LocalizationProvider dateAdapter={AdapterMoment}>
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
            position='top-center'
            reverseOrder={false}
            gutter={8}
            containerClassName=''
            containerStyle={{}}
            toastOptions={toastOptions}
          />
        </LocalizationProvider>
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
