export function getSortTime(time) {
  let date = new Date(time);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  return day + "-" + month + "-" + year;
}

export function formatTimeInput(time) {
  let date = new Date(time);
  let year = date.getFullYear();
  let month = (date.getMonth() + 1).toString().padStart(2, "0");
  let day = date.getDate().toString().padStart(2, "0");
  return year + "-" + month + "-" + day;
}

export function getMonthYear(time) {
  let date = new Date(time);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  return month + "/" + year;
}

// Viết 1 hàm displayTime nhận vào 1 thời gian và trả về 1 chuỗi có định dạng hh:mm dd/mm/yyyy nếu thời gian không hợp lệ thì trả về chuỗi --/--/---- (ví dụ: 12:00 01/01/2020)
export function displayTime(time) {
  if (time === "" || time === null || time === undefined) {
    return "--/--/----";
  }
  let date = new Date(time);
  let year = date.getFullYear();
  let month = (date.getMonth() + 1).toString().padStart(2, "0");
  let day = date.getDate().toString().padStart(2, "0");
  let hour = date.getHours().toString().padStart(2, "0");
  let minute = date.getMinutes().toString().padStart(2, "0");
  return hour + ":" + minute + " " + day + "/" + month + "/" + year;
}

export function formatMonthInput(time) {
  if (time === "" || time === null || time === undefined) {
    return "";
  }
  let date = new Date(time);
  let year = date.getFullYear();
  let month = (date.getMonth() + 1).toString().padStart(2, "0");
  return year + "-" + month;
}