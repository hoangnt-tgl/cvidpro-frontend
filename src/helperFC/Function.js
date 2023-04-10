import { vnListPhone } from '../constants/common';
const pass = 'Đạt';
const notPass = 'Không đạt';

export function isItemIncludes(arr, item) {
  if (arr.includes(item)) {
    return pass;
  } else {
    return notPass;
  }
}
export function isItemMatch(required, item) {
  if (required === item) {
    return pass;
  } else {
    return notPass;
  }
}
export function compareItemArrNum(exnNeed, exnHave) {
  if (Number(exnNeed) >= Number(exnHave)) {
    return pass;
  } else {
    return notPass;
  }
}

export function createTable(currentJobLookingFor, item) {
  let tableData = [
    ['Trình độ'],
    ['Chuyên ngành'],
    ['Chức danh công việc'],
    ['Chức vụ'],
    ['Lĩnh vực làm việc'],
    ['Loại hình đơn vị tuyển dụng'],
    ['Môi trường làm việc'],
    ['Nơi làm việc'],
    ['Số năm kinh nghiệm'],
  ];
  tableData = tableData.map((row, idx) => {
    if (idx === 0) {
      let level = currentJobLookingFor.level.join(', ');
      row.push(level);
      row.push(item.level);
      row.push(isItemIncludes(currentJobLookingFor.level, item.level));
    }
    if (idx === 1) {
      let major = currentJobLookingFor.major.join(', ');
      row.push(major);
      row.push(item.jobCriteria.major);
      row.push(
        isItemIncludes(currentJobLookingFor.major, item.jobCriteria.major)
      );
    }
    if (idx === 2) {
      row.push(currentJobLookingFor.title);
      row.push(item.jobCriteria.jobTitle);
      row.push(
        isItemMatch(currentJobLookingFor.title, item.jobCriteria.jobTitle)
      );
    }
    if (idx === 3) {
      row.push(currentJobLookingFor.position);
      let position = item.jobCriteria.position.join(', ');
      row.push(position);
      row.push(
        isItemIncludes(item.jobCriteria.position, currentJobLookingFor.position)
      );
    }
    if (idx === 4) {
      row.push(currentJobLookingFor.industry);
      let industry = item.jobCriteria.industry.join(', ');
      row.push(industry);
      row.push(
        isItemIncludes(item.jobCriteria.industry, currentJobLookingFor.industry)
      );
    }
    if (idx === 5) {
      row.push(currentJobLookingFor.companyInfo.companyType);
      row.push(item.jobCriteria.companyType);
      row.push(
        isItemMatch(
          currentJobLookingFor.companyInfo.companyType,
          item.jobCriteria.companyType
        )
      );
    }
    if (idx === 6) {
      row.push(currentJobLookingFor.workingEnvironment);
      let companyType = item.jobCriteria.environment.join(', ');
      row.push(companyType);
      row.push(
        isItemIncludes(
          item.jobCriteria.environment,
          currentJobLookingFor.workingEnvironment
        )
      );
    }
    if (idx === 7) {
      row.push(currentJobLookingFor.location);
      row.push(item.jobCriteria.province);
      row.push(
        isItemMatch(currentJobLookingFor.location, item.jobCriteria.province)
      );
    }
    if (idx === 8) {
      row.push(currentJobLookingFor.experience);
      let candidatesEx = 0;
      item.workExperience.forEach((item) => {
        let time =
          new Date(item.end).getFullYear() - new Date(item.start).getFullYear();
        candidatesEx = candidatesEx + time;
      });
      row.push(candidatesEx);
      row.push(
        compareItemArrNum(currentJobLookingFor.experience, candidatesEx)
      );
    }
    return row;
  });
  // console.log(tableData);
  return tableData;
}

export function validatePhoneVn(e) {
  if (e.target.value.length >= 3) {
    let threeDigit = e.target.value.slice(0, 3);
    console.log(threeDigit);
    return vnListPhone.includes(threeDigit);
  }
  return true;
}

export function formatDate(date) {
  var d = new Date(date);
  var month = '' + (d.getMonth() + 1);
  var day = '' + d.getDate();
  var year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [day, month, year].join('-');
}
