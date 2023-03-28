export let registerNoti = "Successfully registered!, Please check your mail";
export let loginNoti = "Successfully logged in!";
export let logoutNoti = "Successfully logged out!";
let getTaxInfoNoti = "Lấy thông tin công ty thành công";
let successNoti = {
  taxInfo : getTaxInfoNoti,
  register: registerNoti,
  login: loginNoti,
  logout: logoutNoti,
};

export function toastNoti(key) {
  return {
    loading: "Wait a sec...",
    success: successNoti[key],
    error: `Something went wrong, please try again`,
  };
}
