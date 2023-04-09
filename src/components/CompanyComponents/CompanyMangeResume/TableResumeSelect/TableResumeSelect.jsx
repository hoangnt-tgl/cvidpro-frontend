import React from "react";
import TableAssess from "../../../customComponents/TableAssess/TableAssess";

const TableResumeSelect = ({ tableData }) => {
  return (
    <div className='table-resume'>
      {tableData.tableData?.length > 0 && (
        <TableAssess
          tableLayout={tableData}
          title='Danh sách ứng viên được chọn'
        />
      )}
    </div>
  );
};

export default TableResumeSelect;
