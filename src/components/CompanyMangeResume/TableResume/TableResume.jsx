import React from "react";
import TableAssess from "../../../customComponents/TableAssess/TableAssess";
import useGetTableAssessData from "../../../hooks/useGetTableAssessData";

const TableResume = () => {
  const { listApplyCadi } = useGetTableAssessData();
  function createTable() {
    let tableData = [];
    tableData = listApplyCadi.map((item, idx) => {
      return [
        idx + 1,
        item.employeeInfo._id,
        item.jobInfo.departmentId,
        item.jobInfo.title,
        item.rating,
        item.comment,
        item.interview.status,
        "dont know",
        <div className='d-flex'>
          <button className='btn btn-primary'>Đặt lịch pv</button>
          <button className='btn btn-danger'>Xóa</button>
        </div>,
        <input type='checkbox' />,
      ];
    });
    return tableData;
  }
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
    tableData: createTable(),
    // tableData: [
    //   ["Trình độ", "Đại học", "Đại học", "Đạt"],
    //   [
    //     "Chuyên ngành",
    //     "Công nghệ điện - điện tử",
    //     "Công nghệ điện - điện tử",
    //     "Đạt",
    //   ],
    //   [
    //     "Chức danh công việc",
    //     "Kỹ sư điện hệ thống",
    //     "Kỹ sư điện hệ thống",
    //     "Đạt",
    //   ],
    //   ["Chức vụ", "Trưởng phòng", "Trưởng phòng", "Đạt"],
    //   ["Lĩnh vực làm việc", "Kỹ thuật", "Kỹ thuật", "Đạt"],
    //   ["Loại hình đơn vị tuyển dụng", "Cổ phần", "Cổ phần", "Đạt"],
    //   ["Môi trường làm việc", "Tất cả", "Tất cả", "Đạt"],
    //   ["Nơi làm việc", "TpHCM", "TpHCM", "Đạt"],
    //   ["Số năm kinh nghiệm", "10 năm", "10 năm", "Đạt"],
    //   ["Trình độ", "Đại học", "Đại học", "Đạt"],
    //   ["Tiêu chí đánh giá", "", "", ""],
    //   ["TC1", "9 điểm", "9 điểm", "Đạt"],
    //   ["TCn", "8 điểm", "8 điểm", "Đạt"],
    // ],
  };
  return (
    <div>
      <TableAssess tableLayout={tableLayout} title='Danh sách ứng viên' />
    </div>
  );
};

export default TableResume;
