// import axios from "axios";

export const isAuthenticated = (state) => {
  if (state.auth.auth.idToken) return true;
  if (localStorage.getItem('key')) return true;
  let userDetails = JSON.parse(localStorage.getItem('userDetails'));

  if (userDetails && userDetails.idToken) {
    state.auth.auth.idToken = userDetails.idToken;
    return true;
  }
  console.log('you are not authenticated');
  return false;
};
