import React from "react";
import { useEffect } from "react";
import FormBookInterView from "../components/CompanyMangeResume/FormBookInterview/FormBookInterView";
import { getCandidateForDepartment } from "../services/DepartmentApi";

const useGetTableAssessData = () => {
  const [listApplyCadi, setListApplyCadi] = React.useState([]);
  const [listSelectCandi, setListSelectCandi] = React.useState([]);
  const [tableData, setTableData] = React.useState([]);
  const [tableDataSelect, setTableDataSelect] = React.useState([]);
  let key = localStorage.getItem("key");
  async function getListApplyCandi() {
    setListApplyCadi(
      await getCandidateForDepartment(key, { sender: "employee" }).then(
        (res) => res.data
      )
    );
  }
  async function getListSelectCandi() {
    setListSelectCandi(
      await getCandidateForDepartment(key, { sender: "company" }).then(
        (res) => res.data
      )
    );
  }
  function createTable(list) {
    let tableData = [];
    tableData = list.map((item, idx) => {
      return [
        idx + 1,
        item.employeeInfo.name,
        item.jobInfo.departmentInfo.departmentName,
        item.jobInfo.title,
        item.rating,
        item.comment,
        item.status,
        item.interview.status,
        <FormBookInterView item={item} localkey={key} />,
        <input type='checkbox' className='checkbox-primary' />,
      ];
    });
    const tableLayout = {
      tableTilte: [
        "STT",
        "Họ và tên",
        "Phòng ban tuyển dụng",
        "Chức danh ứng viên",
        "Xếp loại",
        "Đánh giá",
        "Trạng thái",
        "Lịch phỏng vấn",
        "Thao tác",
        "chọn",
      ],
      tableData: tableData,
    };
    return tableLayout;
  }

  useEffect(() => {
    getListApplyCandi();
    getListSelectCandi();
  }, []);
  useEffect(() => {
    if (listApplyCadi.length > 0) {
      setTableData(createTable(listApplyCadi));
    }
  }, [listApplyCadi]);
  useEffect(() => {
    if (listSelectCandi.length > 0) {
      setTableDataSelect(createTable(listSelectCandi));
    }
  }, [listSelectCandi]);
  // useEffect(() => {
  //   console.log(tableData);
  // }, [tableData]);
  return { listApplyCadi, tableData, tableDataSelect };
};

export default useGetTableAssessData;
