import React from "react";
import { Modal, ModalDialog } from "react-bootstrap";
import TableAssess from "../../../customComponents/TableAssess/TableAssess";
import { createTable } from "../../../helperFC/Function";
import icon from "../../../images/logo/icon2.png";
import "./styles.css";

const ModalTableAssess = ({
  openTable,
  setOpenTable,
  item,
  currentJobLookingFor,
}) => {
  // createTable();

  const tableLayout = {
    tableTilte: [
      "CÁC YÊU CẦU VÀ MONG MUỐN",
      "CHỨC DANH CÔNG VIỆC CỦA ĐƠN VỊ TUYỂN DỤNG",
      "CVID",
      "KẾT QUẢ",
    ],
    tableData: createTable(currentJobLookingFor, item),
  };
  return (
    <>
      <Modal
        fullscreen={true}
        size='lg'
        dialogClassName='modal-90w'
        show={openTable}
        onHide={setOpenTable}
        className='modal fade modal-bx-info'
      >
        <Modal.Header closeButton>
          <div className='logo-img'>
            <img alt='' src={icon} />
          </div>
          <h5 className='modal-title text-center'>Đánh giá</h5>
        </Modal.Header>
        <Modal.Body>
          <TableAssess
            tableLayout={tableLayout}
            title={"Bảng đánh giá sơ bộ giữ chức danh công việc với NLD"}
          />
        </Modal.Body>
        <Modal.Footer>
          {" "}
          <button
            type='button'
            className='btn btn-secondary'
            onClick={() => setOpenTable(false)}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalTableAssess;

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
