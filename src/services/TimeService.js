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

export function formatMonthInput(time) {
  if (time === "" || time === null || time === undefined) {
    return "";
  }
  let date = new Date(time);
  let year = date.getFullYear();
  let month = (date.getMonth() + 1).toString().padStart(2, "0");
  return year + "-" + month;
}