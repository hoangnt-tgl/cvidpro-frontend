import { toast } from "react-hot-toast";
import { logoutNoti, toastNoti } from "../../constants/notifications";
import { toastPromise } from "../../hooks/useToast";
import {
  formatError,
  employeeLogin,
  companyLogin,
  runLogoutTimer,
  saveTokenInLocalStorage,
  employeeSignUp,
  companySignUp,
} from "../../services/AuthService";
import swal from "sweetalert";

export const SIGNUP_CONFIRMED_ACTION = "[signup action] confirmed signup";
export const SIGNUP_FAILED_ACTION = "[signup action] failed signup";
export const LOGIN_CONFIRMED_ACTION = "[login action] confirmed login";
export const LOGIN_FAILED_ACTION = "[login action] failed login";
export const LOADING_TOGGLE_ACTION = "[Loading action] toggle loading";
export const LOGOUT_ACTION = "[Logout action] logout action";

export function employeeSignupAction(data, history) {
  return (dispatch) => {
    let signupApi = employeeSignUp(data)
      .then((response) => {
        dispatch(confirmedSignupAction({}));
        swal({
          title: "Đăng kí thành công",
          text: "Vui lòng kiểm tra email để kích hoạt tài khoản",
          icon: "success",
          button: "OK",
        });
        // history.push("/employee/login");
      })
      // .catch((error) => {
      //   const errorMessage = formatError(error.response.data.message || "");
      //   dispatch(signupFailedAction(errorMessage));
      // });
    toastPromise(signupApi, toastNoti("register"));
  };
}

export function employeeLoginAction(email, password, history) {
  return (dispatch) => {
    let loginApi = employeeLogin(email, password)
      .then((response) => {
        saveTokenInLocalStorage(response.data);
        runLogoutTimer(dispatch, response.data.expiresIn * 1000, history);
        dispatch(loginConfirmedAction(response.data));
        if (response.data.confirm2.confirmed === 1) {
          history.push("/jobs-profile");
        } else {
          history.push("/jobs-my-resume");
        }
      })
      // .catch((error) => {
      //   const errorMessage = formatError(error.response.data.message || "");
      //   dispatch(loginFailedAction(errorMessage));
      // });
    toastPromise(loginApi, toastNoti("login"));
  };
}

export function companySignupAction(data, history) {
  return (dispatch) => {
    const signupApi = companySignUp(data)
      .then((response) => {
        dispatch(confirmedSignupAction({}));
        // history.push("/company/login");
      })
      // .catch((error) => {
      //   const errorMessage = formatError(error.response.data.message || "");
      //   dispatch(signupFailedAction(errorMessage));
      // });
    toastPromise(signupApi, toastNoti("register"));
  };
}

export function companyLoginAction(email, password, history) {
  return (dispatch) => {
    const loginApi = companyLogin(email, password)
      .then((response) => {
        console.log(response.data);
        saveTokenInLocalStorage(response.data);
        runLogoutTimer(dispatch, response.data.expiresIn * 1000, history);
        dispatch(loginConfirmedAction(response.data));
        history.push("/company-profile");
      })
      // .catch((error) => {
      //   const errorMessage = formatError(error.response.data.message || "");
      //   dispatch(loginFailedAction(errorMessage));
      // });
    toastPromise(loginApi, toastNoti("login"));
  };
}
export function logout(history) {
  localStorage.removeItem("userDetails");
  console.log(history);
  let accessHref = [
    "/",
    "/login",
    "/employee/login",
    "/company/login",
    "/employee/register",
    "/company/register",
  ];
  toast.success(logoutNoti);
  if (
    history &&
    history.location &&
    history.location.pathname &&
    accessHref.indexOf(history.location.pathname) === -1
  ) {
    history.push("/");
  }
  return {
    type: LOGOUT_ACTION,
  };
}

// export function loginAction(email, password, history) {
//   return (dispatch) => {
//     login(email, password)
//       .then((response) => {
//         console.log(response);
//         saveTokenInLocalStorage(response.data);
//         runLogoutTimer(dispatch, response.data.expiresIn * 1000, history);
//         dispatch(loginConfirmedAction(response.data));
//         history.push("/");
//       })
//       .catch((error) => {
//         const errorMessage = formatError(error.response.data);
//         dispatch(loginFailedAction(errorMessage));
//       });
//   };
// }

export function loginFailedAction(data) {
  return {
    type: LOGIN_FAILED_ACTION,
    payload: data,
  };
}

export function loginConfirmedAction(data) {
  return {
    type: LOGIN_CONFIRMED_ACTION,
    payload: data,
  };
}

export function confirmedSignupAction(payload) {
  return {
    type: SIGNUP_CONFIRMED_ACTION,
    payload,
  };
}

export function signupFailedAction(message) {
  return {
    type: SIGNUP_FAILED_ACTION,
    payload: message,
  };
}

export function loadingToggleAction(status) {
  return {
    type: LOADING_TOGGLE_ACTION,
    payload: status,
  };
}
