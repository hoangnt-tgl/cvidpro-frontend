import React from "react";
import { useEffect } from "react";
import { getCandidateForDepartment } from "../services/DepartmentApi";

const useGetTableAssessData = () => {
  const [listApplyCadi, setListApplyCadi] = React.useState([]);
  const [tableData, setTableData] = React.useState([]);
  let key = localStorage.getItem("key");
  async function getListApplyCandi() {
    setListApplyCadi(
      await getCandidateForDepartment(key, { sender: "employee" }).then(
        (res) => res.data
      )
    );
  }
  function createTable() {
    let tableData = [];
    tableData = listApplyCadi.map((item, idx) => {
      return [
        idx + 1,
        item.employeeInfo.name,
        item.jobInfo.departmentInfo.departmentName,
        item.jobInfo.title,
        item.rating,
        item.comment,
        item.status,
        item.interview.status,
        <div className='d-flex'>
          <button className='btn btn-primary mx-1'>Đặt lịch pv</button>
          <button className='btn btn-danger mx-1'>Xóa</button>
        </div>,
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
  }, []);
  useEffect(() => {
    if (listApplyCadi.length > 0) {
      setTableData(createTable());
    }
  }, [listApplyCadi]);
  // useEffect(() => {
  //   console.log(tableData);
  // }, [tableData]);
  return { listApplyCadi, tableData };
};

export default useGetTableAssessData;
