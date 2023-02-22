export function compareItemArr(arr) {
  if (arr[0] === arr[1]) {
    return "Đạt";
  } else {
    return "Không đạt";
  }
}

export function compareItemArrNum(arr) {
  if (arr[0] >= arr[1]) {
    return "Đạt";
  } else {
    return "Không đạt";
  }
}

export function createTable(currentJobLookingFor, item) {
  let tableData = [
    ["Trình độ"],
    ["Chuyên ngành"],
    ["Chức danh công việc"],
    ["Chức vụ"],
    ["Lĩnh vực làm việc"],
    ["Loại hình đơn vị tuyển dụng"],
    ["Môi trường làm việc"],
    ["Nơi làm việc"],
    ["Số năm kinh nghiệm"],
  ];
  tableData = tableData.map((row, idx) => {
    if (idx === 0) {
      if (Array.isArray(currentJobLookingFor.level)) {
        let level = currentJobLookingFor.level.join();
        row.push(level);
      } else {
        row.push(currentJobLookingFor.level);
      }
      if (Array.isArray(item.level)) {
        let level = item.level.join();
        row.push(level);
      } else {
        row.push(item.level);
      }
      row.push(compareItemArr(row.slice(-2)));
    }
    if (idx === 1) {
      if (Array.isArray(currentJobLookingFor.major)) {
        let major = currentJobLookingFor.major.join();
        row.push(major);
      } else {
        row.push(currentJobLookingFor.major);
      }
      if (Array.isArray(item.jobCriteria.major)) {
        let major = item.jobCriteria.major.join();
        row.push(major);
      } else {
        row.push(item.jobCriteria.major);
      }
      row.push(compareItemArr(row.slice(-2)));
    }
    if (idx === 2) {
      if (Array.isArray(currentJobLookingFor.title)) {
        let title = currentJobLookingFor.title.join();
        row.push(title);
      } else {
        row.push(currentJobLookingFor.title);
      }
      if (Array.isArray(item.jobCriteria.jobTitle)) {
        let title = item.jobCriteria.jobTitle.join();
        row.push(title);
      } else {
        row.push(item.jobCriteria.jobTitle);
      }
      row.push(compareItemArr(row.slice(-2)));
    }
    if (idx === 3) {
      if (Array.isArray(currentJobLookingFor.position)) {
        let position = currentJobLookingFor.position.join();
        row.push(position);
      } else {
        row.push(currentJobLookingFor.position);
      }
      if (Array.isArray(item.jobCriteria.position)) {
        let position = item.jobCriteria.position.join();
        row.push(position);
      } else {
        row.push(item.jobCriteria.position);
      }
      row.push(compareItemArr(row.slice(-2)));
    }
    if (idx === 4) {
      if (Array.isArray(currentJobLookingFor.industry)) {
        let industry = currentJobLookingFor.industry.join();
        row.push(industry);
      } else {
        row.push(currentJobLookingFor.industry);
      }
      if (Array.isArray(item.jobCriteria.industry)) {
        let industry = item.jobCriteria.industry.join();
        row.push(industry);
      } else {
        row.push(item.jobCriteria.industry);
      }
      row.push(compareItemArr(row.slice(-2)));
    }
    if (idx === 5) {
      if (Array.isArray(currentJobLookingFor.companyInfo.companyType)) {
        let companyType = currentJobLookingFor.companyInfo.companyType.join();
        row.push(companyType);
      } else {
        row.push(currentJobLookingFor.companyInfo.companyType);
      }
      if (Array.isArray(item.jobCriteria.companyType)) {
        let companyType = item.jobCriteria.companyType.join();
        row.push(companyType);
      } else {
        row.push(item.jobCriteria.companyType);
      }
      row.push(compareItemArr(row.slice(-2)));
    }
    if (idx === 6) {
      if (Array.isArray(currentJobLookingFor.workingEnvironment)) {
        let companyType = currentJobLookingFor.workingEnvironment.join();
        row.push(companyType);
      } else {
        row.push(currentJobLookingFor.workingEnvironment);
      }
      if (Array.isArray(item.jobCriteria.environment)) {
        let companyType = item.jobCriteria.environment.join();
        row.push(companyType);
      } else {
        row.push(item.jobCriteria.environment);
      }
      row.push(compareItemArr(row.slice(-2)));
    }
    if (idx === 7) {
      if (Array.isArray(currentJobLookingFor.location)) {
        let companyType = currentJobLookingFor.location.join();
        row.push(companyType);
      } else {
        row.push(currentJobLookingFor.location);
      }
      if (Array.isArray(item.jobCriteria.province)) {
        let companyType = item.jobCriteria.province.join();
        row.push(companyType);
      } else {
        row.push(item.jobCriteria.province);
      }
      row.push(compareItemArr(row.slice(-2)));
    }
    if (idx === 8) {
      if (Array.isArray(currentJobLookingFor.experience)) {
        let companyType = currentJobLookingFor.experience.join();
        row.push(companyType);
      } else {
        row.push(currentJobLookingFor.experience);
      }
      let candidatesEx = 0;
      item.workExperience.forEach((item) => {
        let time =
          new Date(item.end).getFullYear() - new Date(item.start).getFullYear();
        candidatesEx = candidatesEx + time;
      });
      row.push(candidatesEx);
      row.push(compareItemArrNum(row.slice(-2)));
    }
    return row;
  });
  console.log(tableData);
  return tableData;
}
