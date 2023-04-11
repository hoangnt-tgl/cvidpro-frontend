import React from "react";
import TableAssess from "../../../../customComponents/TableAssess/TableAssess";

const TableResume = ({ tableData }) => {
  return (
    <div className='table-resume'>
      {tableData.tableData?.length > 0 && (
        <TableAssess tableLayout={tableData} title='Danh sách ứng viên' />
      )}
    </div>
  );
};

export default TableResume;
