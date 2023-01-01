import {
  formatError,
  login,
  runLogoutTimer,
  saveTokenInLocalStorage,
  employeeSignUp,
  signUp,
} from "../../services/AuthService";

export const SIGNUP_CONFIRMED_ACTION = "[signup action] confirmed signup";
export const SIGNUP_FAILED_ACTION = "[signup action] failed signup";
export const LOGIN_CONFIRMED_ACTION = "[login action] confirmed login";
export const LOGIN_FAILED_ACTION = "[login action] failed login";
export const LOADING_TOGGLE_ACTION = "[Loading action] toggle loading";
export const LOGOUT_ACTION = "[Logout action] logout action";

export function signupAction(data, history) {
  return (dispatch) => {
    signUp(data)
      .then((response) => {
        console.log(response);
        saveTokenInLocalStorage(response.data);
        runLogoutTimer(dispatch, response.data.expiresIn * 1000, history);
        dispatch(confirmedSignupAction(response.data));
        history.push("/home");
      })
      .catch((error) => {
        const errorMessage = formatError(error.response.data);
        dispatch(signupFailedAction(errorMessage));
      });
  };
}
export function employeeSignupAction(data, history) {
  return (dispatch) => {
    employeeSignUp(data)
      .then((response) => {
        let auth = {
          idToken: response.data.idToken,
          refreshToken: response.data.refreshToken,
          expiresIn: response.data.expiresIn,
          id: response.data._id,
        };
        saveTokenInLocalStorage(auth);
        runLogoutTimer(dispatch, response.data.expiresIn * 1000, history);
        dispatch(confirmedSignupAction(response.data));
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
        const errorMessage = formatError("");
        dispatch(signupFailedAction(errorMessage));
      });
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
    "/register-2",
  ];
  if (
    history &&
    history.location &&
    history.location.pathname &&
    accessHref.indexOf(history.location.pathname) === -1
  ) {
    history.push("/login");
  }
  return {
    type: LOGOUT_ACTION,
  };
}

export function loginAction(email, password, history) {
  return (dispatch) => {
    login(email, password)
      .then((response) => {
        console.log(response);
        saveTokenInLocalStorage(response.data);
        runLogoutTimer(dispatch, response.data.expiresIn * 1000, history);
        dispatch(loginConfirmedAction(response.data));
        history.push("/");
      })
      .catch((error) => {
        const errorMessage = formatError(error.response.data);
        dispatch(loginFailedAction(errorMessage));
      });
  };
}

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
